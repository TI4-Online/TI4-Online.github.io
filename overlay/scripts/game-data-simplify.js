"use strict";

/**
 * Wrangle GameData JSON into a format more directly processable for display.
 * Store the result back to streamer buddy.
 */
class GameDataSimplify {
  static _roundToPlayerColorNameToScore = {};

  static simplify(gameData) {
    const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
    const seatOrder = playerDataArray.map((playerData) => {
      const { colorName } = GameDataUtil.parsePlayerColor(playerData);
      return colorName;
    });

    const playerCount = playerDataArray.length;
    const lowerCount = Math.min(Math.floor(playerCount / 2), 4);
    const upperCount = Math.min(Math.ceil(playerCount / 2), 4);
    const seatLayout = {
      bottom: seatOrder.slice(0, lowerCount).reverse(),
      top: seatOrder.slice(lowerCount),
    };

    const simplified = {
      // Object.{tile:number, planets:Array.{string}}
      activeSystem: GameDataUtil.parseActiveSystem(gameData),

      // Array.{tile:number, x:number, y:number, ab?:string, rot?:number, regions:Array.{Object.{colorToUnitNameToCount:Object, attachments:Array.{string}}}}
      hexSummary: GameDataUtil.parseHexSummary(gameData),

      // Array.{Object.{name:string, colorNames:Array.{string}}}
      laws: GameDataUtil.parseLaws(gameData),

      // Object.{stage1:Array, stage2:Array, secret:Array, custodians:Array, sftt:Array, other:Array}
      // ArrayEntry: {name:string, abbr:string, scoredBy:Array.{string}}
      objectives: GameDataUtil.parseObjectives(gameData),

      // Object.{...} (color name to player data)
      players: {},

      // Integer
      round: GameDataUtil.parseRound(gameData),

      // Integer, points needed (normally 10)
      scoreboard: GameDataUtil.parseScoreboard(gameData),

      // Object.{top:Array.{string}, bottom:Array.{string}}
      seatLayout,

      // Array.{string} (clockwise from lower right around table)
      seatOrder,

      // String
      speaker: GameDataUtil.parseSpeakerColorName(gameData),

      // Object.{seconds:number, anchorTimestamp:number, anchorSeconds:number, direction:number, countDown:number}
      timer: GameDataUtil.parseTimer(gameData),

      // String
      turn: GameDataUtil.parseCurrentTurnColorName(gameData),

      // Array.{string}
      turnOrder: GameDataUtil.parseTurnOrder(gameData),

      // Array.{Object.{colorNameA:string, colorNameB:string, forwardStr:string, backwardStr:string}}
      whispers: GameDataUtil.parseWhispers(gameData),
    };

    playerDataArray.map((playerData) => {
      const { colorName, colorHex } = GameDataUtil.parsePlayerColor(playerData);
      simplified.players[colorName] = {
        active: GameDataUtil.parsePlayerActive(playerData), // boolean
        colorName, // string
        colorHex, // string
        faction: GameDataUtil.parsePlayerFaction(playerData), // string
        isSpeaker: colorName === simplified.speaker,
        isTurn: colorName === simplified.turn,
        name: GameDataUtil.parsePlayerName(playerData), // string
        // Object.{
        //  influence:Object.{avail:number, total:number},
        //  resources:Object.{avail:number, total:number},
        //  tradegoods:number,
        //  commodities:number,
        //  maxCommidities:number,
        //  techSkips:Object.{blue:number, green:number, red:number, yellow:number},
        //  traits:Object.{cultural:number, hazardous:number, industrial:number},
        //  tokens:Object.{fleet:number, strategy:number, tactics:number},
        //  alliances:Array.{string},
        //  leaders:Object.{agent:string, commander:string, hero:string},
        //  hand:Object.{action:number, promissory:number, secret:number}
        //}
        resources: GameDataUtil.parsePlayerResources(playerData),
        score: GameDataUtil.parsePlayerScore(playerData), // number
        // Array.{Object.{name:string,faceDown:boolean}}
        strategyCards: GameDataUtil.parsePlayerStrategyCards(playerData),
        // Array.{Object.{name:string,colorName:string}
        technology: GameDataUtil.parsePlayerTechnologies(playerData),
        unitUpgrades: GameDataUtil.parsePlayerUnitUpgrades(playerData), // Array.{string}
      };
    });

    // Add supporter player color to sfft entries.
    simplified.objectives.sftt.forEach((objective) => {
      const m = objective.name.match(".*\\(([A-Za-z]*)\\)$");
      if (m) {
        objective.supportColor = m[1].toLowerCase();
      }
    });

    // Tempo.
    const currentRound = simplified.round;
    const roundToStartOfRoundGameData =
      GameDataUtil.parseRoundToStartOfRoundGameData(gameData);
    roundToStartOfRoundGameData[currentRound + 1] = gameData; // not finished, but usable
    const roundToPlayerColorNameToScore =
      GameDataSimplify._roundToPlayerColorNameToScore; // keep memory
    for (let round = 1; round <= currentRound + 1; round++) {
      const roundGameData = roundToStartOfRoundGameData[round + 1];
      if (!roundGameData) {
        continue;
      }
      const playerColorNameToScore = {};
      roundToPlayerColorNameToScore[round] = playerColorNameToScore;
      const roundPlayerDataArray =
        GameDataUtil.parsePlayerDataArray(roundGameData);
      for (const playerData of roundPlayerDataArray) {
        const colorNameAndHex = GameDataUtil.parsePlayerColor(playerData);
        const score = GameDataUtil.parsePlayerScore(playerData);
        playerColorNameToScore[colorNameAndHex.colorName] = score;
      }
    }
    simplified.tempo = roundToPlayerColorNameToScore;

    // Is this a combat?  Look for more than one color in a region.
    simplified.isCombat = false;
    if (simplified.activeSystem.tile !== 0) {
      const activeSummary = simplified.hexSummary.filter(
        (entry) => entry.tile === simplified.activeSystem.tile
      )[0];
      if (activeSummary) {
        for (const region of activeSummary.regions) {
          if (Object.keys(region.colorToUnitNameToCount).length > 1) {
            simplified.isCombat = true;
            break;
          }
        }
      }
    }
    simplified.ti4calc = window.ti4calcWrapper(gameData);

    return simplified;
  }

  static post(simplified) {
    const protocol = location.protocol;
    const port = protocol === "http:" ? 8080 : 8081;
    const url = `${protocol}//localhost:${port}/postkey?key=buddy-simplified`;
    const options = {
      method: "POST",
      body: JSON.stringify(simplified),
      mode: "no-cors",
    };
    fetch(url, options)
      .then((response) => {
        console.log(`GameDataSimplify.post success: ${response.status}`);
      })
      .catch((error) => {
        console.log(`GameDataSimplify.post error: ${error}`);
      });
  }
}

new BroadcastChannel("onGameDataEvent").onmessage = (event) => {
  if (event.data.type === "UPDATE") {
    const simplified = GameDataSimplify.simplify(event.data.detail);
    GameDataSimplify.post(simplified);
  }
};
