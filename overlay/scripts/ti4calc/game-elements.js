(function (root) {
  root.dieSides = 10;

  root.BattleType = {
    Space: "Space",
    Ground: "Ground",
  };

  root.BattleSide = {
    attacker: "attacker",
    defender: "defender",
    opponent: function (battleSide) {
      return {
        attacker: "defender",
        defender: "attacker",
      }[battleSide];
    },
  };

  root.SideUnits = {
    attacker: "attackerUnits",
    defender: "defenderUnits",
  };

  var UnitType = {
    Flagship: "Flagship",
    WarSun: "WarSun",
    Dreadnought: "Dreadnought",
    Cruiser: "Cruiser",
    Carrier: "Carrier",
    Destroyer: "Destroyer",
    Fighter: "Fighter",
    Mech: "Mech",
    Infantry: "Infantry",
    PDS: "PDS",
  };

  root.UnitType = UnitType;

  var shortUnitType = {
    Flagship: "X",
    WarSun: "W",
    Dreadnought: "D",
    Cruiser: "C",
    Destroyer: "+",
    Carrier: "V",
    Fighter: "F",
    Mech: "M",
    Infantry: "I",
    PDS: "P",
    Cavalry: "T",
  };

  root.Race = {
    Arborec: "Arborec",
    Creuss: "Creuss",
    Hacan: "Hacan",
    JolNar: "JolNar",
    L1Z1X: "L1Z1X",
    Letnev: "Letnev",
    Mentak: "Mentak",
    Muaat: "Muaat",
    Naalu: "Naalu",
    Saar: "Saar",
    Sardakk: "Sardakk",
    Sol: "Sol",
    Virus: "Virus",
    Winnu: "Winnu",
    Xxcha: "Xxcha",
    Yin: "Yin",
    Yssaril: "Yssaril",
    Argent: "Argent",
    Cabal: "Cabal",
    Empyrean: "Empyrean",
    Mahact: "Mahact",
    NaazRokha: "NaazRokha",
    Nomad: "Nomad",
    Titans: "Titans",
    Keleres: "Keleres",
  };

  root.RacesDisplayNames = {
    Arborec: "Arborec",
    Creuss: "Creuss",
    Hacan: "Hacan",
    JolNar: "Jol-Nar",
    L1Z1X: "L1Z1X",
    Letnev: "Letnev",
    Mentak: "Mentak",
    Muaat: "Muaat",
    Naalu: "Naalu",
    Virus: "Nekro Virus",
    Saar: "Saar",
    Sardakk: "Sardakk N'orr",
    Sol: "Sol",
    Winnu: "Winnu",
    Xxcha: "Xxcha",
    Yin: "Yin",
    Yssaril: "Yssaril",
    Argent: "Argent",
    Cabal: "Cabal",
    Empyrean: "Empyrean",
    Mahact: "Mahact",
    NaazRokha: "Naaz-Rokha",
    Nomad: "Nomad",
    Titans: "Titans",
    Keleres: "Keleres",
  };

  function Option(title, description, limitedTo) {
    this.title = title;
    this.description = description;
    this.limitedTo = limitedTo;
  }

  Option.prototype.availableFor = function (battleSide) {
    return this.limitedTo === undefined || this.limitedTo === battleSide;
  };

  root.ActionCards = {
    moraleBoost: new Option(
      "Morale Boost 1st round",
      "+1 dice modifier to all units during the first battle round"
    ),
    fireTeam: new Option(
      "Fire Team 1st round",
      "Reroll dice after first round of invasion combat"
    ),
    fighterPrototype: new Option(
      "Fighter Prototype",
      "+2 dice modifier to Fighters during the first battle round"
    ),
    bunker: new Option(
      "Bunker",
      "-4 dice modifier to Bombardment rolls",
      "defender"
    ),
    experimentalBattlestation: new Option(
      "Experimental Battlestation",
      "Additional unit with Space Cannon 5(x3)",
      "defender"
    ),
    maneuveringJets: new Option(
      "Maneuvering Jets",
      "Cancel 1 Space Cannon hit"
    ),
    riskDirectHit: new Option(
      "Risk Direct Hit",
      "Damage units vulnerable to Direct Hit before killing off fodder"
    ),
    blitz: new Option(
      "Blitz",
      "Adds BOMBARDMENT 6 to non-fighter ships without BOMBARDMENT",
      "attacker"
    ),
    waylay: new Option(
      "Waylay",
      "Allows AFB hits to be assigned to non-fighter ships"
    ),
  };

  root.Technologies = {
    antimassDeflectors: new Option(
      "Antimass Deflectors",
      "-1 to opponents' Space Cannon rolls"
    ),
    gravitonLaser: new Option(
      "Graviton Laser System",
      "Space Cannon hits should be applied to non-fighters if possible"
    ),
    plasmaScoring: new Option(
      "Plasma Scoring",
      "One additional die for one unit during Space Cannon or Bombardment"
    ),
    magenDefense: new Option(
      "Magen Defense Grid",
      "Opponent doesn't throw dice for one round if you have Planetary Shield",
      "defender"
    ),
    x89Omega: new Option(
      "X-89 Bacterial Weapon Ω",
      "Destroy all by bombardment if at least one destroyed",
      "attacker"
    ),
    magenDefenseOmega: new Option(
      "Magen Defense Grid Ω",
      "1 hit at the start of ground combat when having structures",
      "defender"
    ),
    hasDock: new Option(
      "Has Dock",
      "Defender has a dock for Magen Defence Grid Ω",
      "defender"
    ), // not a technology itself, but it's nice to show it close to Magen Defence Grid Ω
    duraniumArmor: new Option(
      "Duranium Armor",
      "After each round repair 1 unit that wasn't damaged this round"
    ),
    assaultCannon: new Option(
      "Assault Cannon",
      "Opponent destroys 1 non-Fighter ship if you have at least 3 non-Fighters"
    ),
  };

  root.Agendas = {
    publicizeSchematics: new Option(
      "Publicize Weapon Schematics",
      "WarSuns don't sustain damage"
    ),
    conventionsOfWar: new Option(
      "Conventions of War",
      "No bombardment",
      "defender"
    ),
    prophecyOfIxth: new Option("Prophecy of Ixth", "+1 to Fighters rolls"),
    articlesOfWar: new Option(
      "Articles of War",
      "Mechs lose printed abilities other than sustain damage"
    ),
  };

  root.Promissory = {
    letnevMunitionsFunding: new Option(
      "Munitions Reserves / War Funding 1st round",
      "Reroll dice during first space combat round"
    ),
    tekklarLegion: new Option(
      "Tekklar Legion",
      "+1 in invasion combat. -1 to Sardakk if he's the opponent"
    ),
    strikeWingAmbuscade: new Option(
      "Strike Wing Ambuscade",
      "Additional die on unit ability"
    ),
    cavalryI: new Option(
      "The Cavalry (Memoria I)",
      "Adds the Memoria I to the combat (omit replaced unit)"
    ),
    cavalryII: new Option(
      "The Cavalry (Memoria II)",
      "Adds the Memoria II to the combat (omit replaced unit)"
    ),
  };

  root.RaceSpecificTechnologies = {
    Letnev: {
      nonEuclidean: new Option(
        "Non-Euclidean Shielding",
        "Sustain Damage absorbs 2 hits"
      ),
      l4Disruptors: new Option(
        "L4 Disruptors",
        "During an Invasion units cannot use Space Cannon against you",
        "attacker"
      ),
    },
    Sardakk: {
      valkyrieParticleWeave: new Option(
        "Valkyrie Particle Weave",
        "If opponent produces at least one hit in Ground combat, you produce one additional hit"
      ),
    },
    NaazRokha: {
      superCharge: new Option(
        "Supercharge 1st round",
        "+1 dice modifer to all units during the first battle round"
      ),
    },
  };

  root.FactionEffects = {
    Naalu: {
      iconoclast: new Option(
        "Opponent has Relic Fragment",
        "Gives +2 to mech combat rolls"
      ),
    },
    Virus: {
      mordred: new Option(
        "Copied Faction Tech",
        "Gives +2 to mech combat rolls"
      ),
    },
    Mahact: {
      needOpponentToken: new Option(
        "Missing Opponent Token",
        "Gives +2 to flagship combat rolls"
      ),
    },
  };

  root.GameEffects = {
    nebula: new Option(
      "Nebula",
      "+1 to defender's space combat rolls.",
      "defender"
    ),
  };

  root.Leaders = {
    trrakanAunZulok: new Option("Trrakan Aun Zulok", "+1 die to unit ability"),
    evelynDeLouis: new Option(
      "Evelyn DeLouis",
      "+1 die to a ground force during first round of ground combat"
    ),
    viscountUnlenn: new Option(
      "Viscount Unlenn",
      "+1 die to a ship during first round of space combat"
    ),
    taZern: new Option("Ta Zern", "Reroll missed ability roll dice"),
    twoRam: new Option("2Ram", "Ignores Planetary Shield"),
    rickar: new Option("Rickar Rickani", "Adds +2 to combat rolls"),
    geoform: new Option(
      "Geoform PDS",
      "Additional unit with Space Cannon 5(x3)"
    ),
  };

  root.UnitInfo = (function () {
    function UnitInfo(type, stats) {
      this.type = type;
      var shortType = shortUnitType[this.type];
      this.shortType = stats.isDamageGhost
        ? shortType.toLowerCase()
        : shortType;

      this.battleValue = stats.battleValue || NaN;
      this.battleDice = stats.battleDice !== undefined ? stats.battleDice : 1;

      this.bombardmentValue = stats.bombardmentValue || NaN;
      this.bombardmentDice = stats.bombardmentDice || 0;

      this.spaceCannonValue = stats.spaceCannonValue || NaN;
      this.spaceCannonDice = stats.spaceCannonDice || 0;

      this.barrageValue = stats.barrageValue || NaN;
      this.barrageDice = stats.barrageDice || 0;

      this.sustainDamageHits = stats.sustainDamageHits || 0;
      this.isDamageGhost = stats.isDamageGhost || false;

      this.damageCorporeal = undefined;
      this.damaged = false;
      this.damagedThisRound = false;

      this.race = stats.race;
      this.cost = stats.cost;
    }

    UnitInfo.prototype.clone = function () {
      return new UnitInfo(this.type, this);
    };

    /** Create damage ghost for damageable units */
    UnitInfo.prototype.toDamageGhost = function () {
      var result = new UnitInfo(this.type, {
        sustainDamageHits: this.sustainDamageHits,
        battleDice: 0,
        isDamageGhost: true,
      });
      // 'corporeal' as an antonym to 'ghost' =)
      result.damageCorporeal = this;
      this.damaged = false;
      this.damagedThisRound = false;
      return result;
    };

    return UnitInfo;
  })();

  /** These correspond to fields of UnitInfo, like 'battleValue', 'bombardmentValue' etc. */
  root.ThrowType = {
    Battle: "battle",
    Bombardment: "bombardment",
    SpaceCannon: "spaceCannon",
    Barrage: "barrage",
  };
  root.ThrowValues = {
    battle: "battleValue",
    bombardment: "bombardmentValue",
    spaceCannon: "spaceCannonValue",
    barrage: "barrageValue",
  };
  root.ThrowDice = {
    battle: "battleDice",
    bombardment: "bombardmentDice",
    spaceCannon: "spaceCannonDice",
    barrage: "barrageDice",
  };

  root.StandardUnits = {
    WarSun: new root.UnitInfo(UnitType.WarSun, {
      sustainDamageHits: 1,
      battleValue: 3,
      battleDice: 3,
      bombardmentValue: 3,
      bombardmentDice: 3,
      cost: 12,
    }),
    Dreadnought: new root.UnitInfo(UnitType.Dreadnought, {
      sustainDamageHits: 1,
      battleValue: 5,
      bombardmentValue: 5,
      bombardmentDice: 1,
      cost: 4,
    }),
    Cruiser: new root.UnitInfo(UnitType.Cruiser, {
      battleValue: 7,
      cost: 2,
    }),
    Carrier: new root.UnitInfo(UnitType.Carrier, {
      battleValue: 9,
      cost: 3,
    }),
    Destroyer: new root.UnitInfo(UnitType.Destroyer, {
      battleValue: 9,
      barrageValue: 9,
      barrageDice: 2,
      cost: 1,
    }),
    Fighter: new root.UnitInfo(UnitType.Fighter, {
      battleValue: 9,
      cost: 0.5,
    }),
    PDS: new root.UnitInfo(UnitType.PDS, {
      spaceCannonValue: 6,
      spaceCannonDice: 1,
    }),
    Infantry: new root.UnitInfo(UnitType.Infantry, {
      battleValue: 8,
      cost: 0.5,
    }),
    Mech: new root.UnitInfo(UnitType.Mech, {
      sustainDamageHits: 1,
      battleValue: 6,
      cost: 2,
    }),
    ExperimentalBattlestation: new root.UnitInfo("Bloodthirsty Space Dock", {
      spaceCannonValue: 5,
      spaceCannonDice: 3,
    }),
    CavalryI: new root.UnitInfo("Cavalry", {
      sustainDamageHits: 1,
      barrageValue: 8,
      barrageDice: 3,
      battleValue: 7,
      battleDice: 2,
    }),
    CavalryII: new root.UnitInfo("Cavalry", {
      sustainDamageHits: 1,
      barrageValue: 5,
      barrageDice: 3,
      battleValue: 5,
      battleDice: 2,
    }),
  };

  root.RaceSpecificUnits = {
    Sardakk: {
      Flagship: new root.UnitInfo(UnitType.Flagship, {
        sustainDamageHits: 1,
        battleValue: 6,
        battleDice: 2,
        race: root.Race.Sardakk,
        cost: 8,
      }),
      Dreadnought: new root.UnitInfo(UnitType.Dreadnought, {
        sustainDamageHits: 1,
        battleValue: 5,
        bombardmentValue: 4,
        bombardmentDice: 2,
        cost: 4,
      }),
    },
    JolNar: {
      Flagship: new root.UnitInfo(UnitType.Flagship, {
        sustainDamageHits: 1,
        battleValue: 6,
        battleDice: 2,
        race: root.Race.JolNar,
        cost: 8,
      }),
    },
    Winnu: {
      Flagship: new root.UnitInfo(UnitType.Flagship, {
        sustainDamageHits: 1,
        battleValue: 7,
        battleDice: undefined,
        race: root.Race.Winnu,
        cost: 8,
      }),
    },
    Xxcha: {
      Flagship: new root.UnitInfo(UnitType.Flagship, {
        sustainDamageHits: 1,
        battleValue: 7,
        battleDice: 2,
        spaceCannonValue: 5,
        spaceCannonDice: 3,
        race: root.Race.Xxcha,
        cost: 8,
      }),
      Mech: new root.UnitInfo(UnitType.Mech, {
        sustainDamageHits: 1,
        battleValue: 6,
        battleDice: 1,
        spaceCannonValue: 8,
        spaceCannonDice: 1,
        cost: 2,
        race: root.Race.Xxcha,
      }),
    },
    Yin: {
      Flagship: new root.UnitInfo(UnitType.Flagship, {
        sustainDamageHits: 1,
        battleValue: 9,
        battleDice: 2,
        race: root.Race.Yin,
        cost: 8,
      }),
    },
    Yssaril: {
      Flagship: new root.UnitInfo(UnitType.Flagship, {
        sustainDamageHits: 1,
        battleValue: 5,
        battleDice: 2,
        race: root.Race.Yssaril,
        cost: 8,
      }),
    },
    Sol: {
      Flagship: new root.UnitInfo(UnitType.Flagship, {
        sustainDamageHits: 1,
        battleValue: 5,
        battleDice: 2,
        race: root.Race.Sol,
        cost: 8,
      }),
      Infantry: new root.UnitInfo(UnitType.Infantry, {
        battleValue: 7,
        cost: 0.5,
      }),
    },
    Creuss: {
      Flagship: new root.UnitInfo(UnitType.Flagship, {
        sustainDamageHits: 1,
        battleValue: 5,
        battleDice: 1,
        race: root.Race.Creuss,
        cost: 8,
      }),
    },
    L1Z1X: {
      Flagship: new root.UnitInfo(UnitType.Flagship, {
        sustainDamageHits: 1,
        battleValue: 5,
        battleDice: 2,
        race: root.Race.L1Z1X,
        cost: 8,
      }),
      Mech: new root.UnitInfo(UnitType.Mech, {
        sustainDamageHits: 1,
        bombardmentValue: 8,
        bombardmentDice: 1,
        battleValue: 6,
        cost: 2,
      }),
    },
    Mentak: {
      Flagship: new root.UnitInfo(UnitType.Flagship, {
        sustainDamageHits: 1,
        battleValue: 7,
        battleDice: 2,
        race: root.Race.Mentak,
        cost: 8,
      }),
    },
    Naalu: {
      Flagship: new root.UnitInfo(UnitType.Flagship, {
        sustainDamageHits: 1,
        battleValue: 9,
        battleDice: 2,
        race: root.Race.Naalu,
        cost: 8,
      }),
      Fighter: new root.UnitInfo(UnitType.Fighter, {
        battleValue: 8,
        cost: 0.5,
      }),
    },
    Virus: {
      Flagship: new root.UnitInfo(UnitType.Flagship, {
        sustainDamageHits: 1,
        battleValue: 9,
        battleDice: 2,
        race: root.Race.Virus,
        cost: 8,
      }),
    },
    Arborec: {
      Flagship: new root.UnitInfo(UnitType.Flagship, {
        sustainDamageHits: 1,
        battleValue: 7,
        battleDice: 2,
        race: root.Race.Arborec,
        cost: 8,
      }),
    },
    Letnev: {
      Flagship: new root.UnitInfo(UnitType.Flagship, {
        sustainDamageHits: 1,
        battleValue: 5,
        battleDice: 2,
        bombardmentValue: 5,
        bombardmentDice: 3,
        race: root.Race.Letnev,
        cost: 8,
      }),
    },
    Saar: {
      Flagship: new root.UnitInfo(UnitType.Flagship, {
        sustainDamageHits: 1,
        battleValue: 5,
        battleDice: 2,
        barrageValue: 6,
        barrageDice: 4,
        race: root.Race.Saar,
        cost: 8,
      }),
    },
    Muaat: {
      Flagship: new root.UnitInfo(UnitType.Flagship, {
        sustainDamageHits: 1,
        battleValue: 5,
        battleDice: 2,
        race: root.Race.Muaat,
        cost: 8,
      }),
    },
    Hacan: {
      Flagship: new root.UnitInfo(UnitType.Flagship, {
        sustainDamageHits: 1,
        battleValue: 7,
        battleDice: 2,
        race: root.Race.Hacan,
        cost: 8,
      }),
    },
    Argent: {
      Flagship: new root.UnitInfo(UnitType.Flagship, {
        sustainDamageHits: 1,
        battleValue: 7,
        battleDice: 2,
        race: root.Race.Argent,
        cost: 8,
      }),
      Destroyer: new root.UnitInfo(UnitType.Destroyer, {
        battleValue: 8,
        barrageValue: 9,
        barrageDice: 2,
        cost: 1,
      }),
    },
    Cabal: {
      Flagship: new root.UnitInfo(UnitType.Flagship, {
        sustainDamageHits: 1,
        battleValue: 5,
        battleDice: 2,
        race: root.Race.Cabal,
        cost: 8,
      }),
    },
    Empyrean: {
      Flagship: new root.UnitInfo(UnitType.Flagship, {
        sustainDamageHits: 1,
        battleValue: 5,
        battleDice: 2,
        race: root.Race.Empyrean,
        cost: 8,
      }),
    },
    Mahact: {
      Flagship: new root.UnitInfo(UnitType.Flagship, {
        sustainDamageHits: 1,
        battleValue: 5,
        battleDice: 2,
        race: root.Race.Mahact,
        cost: 8,
      }),
    },
    NaazRokha: {
      Flagship: new root.UnitInfo(UnitType.Flagship, {
        sustainDamageHits: 1,
        battleValue: 9,
        battleDice: 2,
        race: root.Race.NaazRokha,
        cost: 8,
      }),
      Mech: new root.UnitInfo(UnitType.Mech, {
        sustainDamageHits: 1,
        battleValue: 6,
        battleDice: 2,
        cost: 2,
        race: root.Race.NaazRokha,
      }),
    },
    Nomad: {
      Flagship: new root.UnitInfo(UnitType.Flagship, {
        sustainDamageHits: 1,
        barrageValue: 8,
        barrageDice: 3,
        battleValue: 7,
        battleDice: 2,
        race: root.Race.Nomad,
        cost: 8,
      }),
    },
    Titans: {
      Flagship: new root.UnitInfo(UnitType.Flagship, {
        sustainDamageHits: 1,
        battleValue: 7,
        battleDice: 2,
        race: root.Race.Titans,
        cost: 8,
      }),
      Cruiser: new root.UnitInfo(UnitType.Cruiser, {
        battleValue: 7,
        cost: 2,
        race: root.Race.Titans,
      }),
      PDS: new root.UnitInfo(UnitType.PDS, {
        sustainDamageHits: 1,
        spaceCannonValue: 6,
        spaceCannonDice: 1,
        battleValue: 7,
        battleDice: 1,
        race: root.Race.Titans,
      }),
    },
    Keleres: {
      Flagship: new root.UnitInfo(UnitType.Flagship, {
        sustainDamageHits: 1,
        battleValue: 7,
        battleDice: 2,
        race: root.Race.Keleres,
        cost: 8,
      }),
    },
  };

  root.StandardUpgrades = {
    // same as the regular Dreadnought, but upgrade affects ordering
    Dreadnought: new root.UnitInfo(UnitType.Dreadnought, {
      sustainDamageHits: 1,
      battleValue: 5,
      bombardmentValue: 5,
      bombardmentDice: 1,
      cost: 4,
    }),
    Cruiser: new root.UnitInfo(UnitType.Cruiser, {
      battleValue: 6,
      cost: 2,
    }),
    Destroyer: new root.UnitInfo(UnitType.Destroyer, {
      battleValue: 8,
      barrageValue: 6,
      barrageDice: 3,
      cost: 1,
    }),
    Fighter: new root.UnitInfo(UnitType.Fighter, {
      battleValue: 8,
      cost: 0.5,
    }),
    PDS: new root.UnitInfo(UnitType.PDS, {
      spaceCannonValue: 5,
      spaceCannonDice: 1,
    }),
    Infantry: new root.UnitInfo(UnitType.Infantry, {
      battleValue: 7,
      cost: 0.5,
    }),
  };

  root.RaceSpecificUpgrades = {
    Sol: {
      Carrier: new root.UnitInfo(UnitType.Carrier, {
        sustainDamageHits: 1,
        battleValue: 9,
        cost: 3,
      }),
      Infantry: new root.UnitInfo(UnitType.Infantry, {
        battleValue: 6,
        cost: 0.5,
      }),
    },
    L1Z1X: {
      Dreadnought: new root.UnitInfo(UnitType.Dreadnought, {
        sustainDamageHits: 1,
        battleValue: 4,
        bombardmentValue: 4,
        bombardmentDice: 1,
        cost: 4,
      }),
    },
    Naalu: {
      Fighter: new root.UnitInfo(UnitType.Fighter, {
        battleValue: 7,
        cost: 0.5,
      }),
    },
    Muaat: {
      WarSun: new root.UnitInfo(UnitType.WarSun, {
        sustainDamageHits: 1,
        battleValue: 3,
        battleDice: 3,
        bombardmentValue: 3,
        bombardmentDice: 3,
        cost: 10,
      }),
    },
    Argent: {
      Destroyer: new root.UnitInfo(UnitType.Destroyer, {
        battleValue: 7,
        barrageValue: 6,
        barrageDice: 3,
        cost: 1,
      }),
    },
    Nomad: {
      Flagship: new root.UnitInfo(UnitType.Flagship, {
        sustainDamageHits: 1,
        barrageValue: 5,
        barrageDice: 3,
        battleValue: 5,
        battleDice: 2,
        race: root.Race.Nomad,
        cost: 8,
      }),
    },
    Titans: {
      Cruiser: new root.UnitInfo(UnitType.Cruiser, {
        sustainDamageHits: 1,
        battleValue: 6,
        cost: 2,
        race: root.Race.Titans,
      }),
      PDS: new root.UnitInfo(UnitType.PDS, {
        sustainDamageHits: 1,
        spaceCannonValue: 5,
        spaceCannonDice: 1,
        battleValue: 6,
        battleDice: 1,
        race: root.Race.Titans,
      }),
    },
  };

  root.MergedUnits = {};
  root.MergedUpgrades = {};
  for (var race in root.Race) {
    root.MergedUnits[race] = Object.assign(
      {},
      root.StandardUnits,
      root.RaceSpecificUnits[race]
    );
    root.MergedUpgrades[race] = Object.assign(
      {},
      root.StandardUpgrades,
      root.RaceSpecificUpgrades[race]
    );
  }

  /** Make an array of units in their reversed order of dying */
  root.expandFleet = function (input, battleSide) {
    var options = input.options || { attacker: {}, defender: {} };
    var battleType = input.battleType;
    var thisSideOptions = options[battleSide];
    var opponentSide = root.BattleSide.opponent(battleSide);
    var opponentSideOptions = options[opponentSide];

    var standardUnits = root.MergedUnits[thisSideOptions.race];
    var upgradedUnits = root.MergedUpgrades[thisSideOptions.race];

    var opponentMentakFlagship =
      battleType === root.BattleType.Space &&
      opponentSideOptions.race === root.Race.Mentak &&
      (input[root.SideUnits[opponentSide]][UnitType.Flagship] || { count: 0 })
        .count !== 0;
    var opponentMentakMech =
      battleType === root.BattleType.Ground &&
      !(options.attacker.articlesOfWar || options.defender.articlesOfWar) &&
      opponentSideOptions.race === root.Race.Mentak &&
      (input[root.SideUnits[opponentSide]][UnitType.Mech] || { count: 0 })
        .count !== 0;
    var NaazRokhaMechsSpace =
      battleType === root.BattleType.Space &&
      thisSideOptions.race === root.Race.NaazRokha;
    var NaazRokhaMechsGround =
      battleType === root.BattleType.Ground &&
      thisSideOptions.race === root.Race.NaazRokha;

    if (NaazRokhaMechsSpace) {
      standardUnits[UnitType.Mech].battleValue = 8;
      standardUnits[UnitType.Mech].sustainDamageHits = 0;
    } else if (NaazRokhaMechsGround) {
      standardUnits[UnitType.Mech].battleValue = 6;
      standardUnits[UnitType.Mech].sustainDamageHits = 1;
    }
    if (
      thisSideOptions.race === root.Race.NaazRokha &&
      (input[root.SideUnits[battleSide]][UnitType.Flagship] || { count: 0 })
        .count !== 0
    ) {
      standardUnits[UnitType.Mech].battleDice = 3;
    } else if (
      thisSideOptions.race === root.Race.NaazRokha &&
      (input[root.SideUnits[battleSide]][UnitType.Flagship] || { count: 0 })
        .count === 0
    ) {
      standardUnits[UnitType.Mech].battleDice = 2;
    }
    if (options.attacker.articlesOfWar || options.defender.articlesOfWar) {
      root.MergedUnits[root.Race.Xxcha].Mech.spaceCannonDice = 0;
      root.MergedUnits[root.Race.L1Z1X].Mech.bombardmentDice = 0;
    } else {
      root.MergedUnits[root.Race.Xxcha].Mech.spaceCannonDice = 1;
      root.MergedUnits[root.Race.L1Z1X].Mech.bombardmentDice = 1;
    }

    var result = [];
    var thisSideCounters = input[root.SideUnits[battleSide]];
    for (var unitType in UnitType) {
      var counter = thisSideCounters[unitType] || { count: 0 };
      for (var i = 0; i < counter.count; i++) {
        var unit = (counter.upgraded ? upgradedUnits : standardUnits)[unitType];
        var addedUnit = unit.clone();
        result.push(addedUnit);
        if (battleType === root.BattleType.Space) {
          if (
            unit.sustainDamageHits > 0 &&
            !opponentMentakFlagship &&
            !(
              unitType === UnitType.WarSun &&
              thisSideOptions.publicizeSchematics
            )
          ) {
            if (i < counter.count - (counter.damaged || 0))
              result.push(addedUnit.toDamageGhost());
            else addedUnit.damaged = true;
          }
        } else {
          if (unit.sustainDamageHits > 0 && !opponentMentakMech) {
            if (i < counter.count - (counter.damaged || 0))
              result.push(addedUnit.toDamageGhost());
            else addedUnit.damaged = true;
          }
        }
      }
    }
    if (thisSideOptions.blitz) {
      for (var unit in result) {
        if (
          !result[unit].bombardmentValue &&
          !result[unit].isDamageGhost &&
          (result[unit].type === UnitType.Flagship ||
            result[unit].type === UnitType.Cruiser ||
            result[unit].type === UnitType.Carrier ||
            result[unit].type === UnitType.Destroyer)
        ) {
          result[unit].bombardmentValue = 6;
          result[unit].bombardmentDice = 1;
        }
      }
    }

    var ships = createShips();
    var groundForces = createGroundForces();
    var virusFlagship =
      battleType === root.BattleType.Space &&
      thisSideOptions.race === root.Race.Virus &&
      (thisSideCounters[UnitType.Flagship] || { count: 0 }).count !== 0;
    var naaluFlagship =
      battleType === root.BattleType.Ground &&
      thisSideOptions.race === root.Race.Naalu &&
      (thisSideCounters[UnitType.Flagship] || { count: 0 }).count !== 0;
    var helTitan =
      battleType === root.BattleType.Ground &&
      thisSideOptions.race === root.Race.Titans &&
      (thisSideCounters[UnitType.PDS] || { count: 0 }).count !== 0;
    if (battleType === root.BattleType.Space && thisSideOptions.cavalryI) {
      result.push(root.StandardUnits.CavalryI);
      if (!opponentMentakFlagship) {
        result.push(root.StandardUnits.CavalryI.toDamageGhost());
      }
    }
    if (battleType === root.BattleType.Space && thisSideOptions.cavalryII) {
      result.push(root.StandardUnits.CavalryII);
      if (!opponentMentakFlagship) {
        result.push(root.StandardUnits.CavalryII.toDamageGhost());
      }
    }

    var unitOrder = createUnitOrder(
      virusFlagship,
      NaazRokhaMechsSpace,
      helTitan
    );
    var naaluGoundUnitOrder = {};
    naaluGoundUnitOrder[UnitType.Infantry] = 1;
    naaluGoundUnitOrder[UnitType.Fighter] = 2;
    naaluGoundUnitOrder[UnitType.Mech] = 0;
    var comparer;
    var vipGround;

    if (naaluFlagship) {
      // in case Fighters are stronger than Ground Forces, I'd like Ground Forces to die first, then sacrifice the
      // Fighters. But, Fighters cannot take control of the planet, so I'd like to save one Ground Force
      if ((thisSideCounters[UnitType.Mech] || { count: 0 }).count !== 0) {
        vipGround = result.find(function (unit) {
          return unit.type === UnitType.Mech;
        });
      } else {
        vipGround =
          (thisSideCounters[UnitType.Fighter] || {}).upgraded &&
          !(thisSideCounters[UnitType.Infantry] || {}).upgraded &&
          result.find(function (unit) {
            return unit.type === UnitType.Infantry;
          });
      }
      comparer = naaluComparer;
    } else if ((thisSideCounters[UnitType.Dreadnought] || {}).upgraded)
      comparer = upgradedDreadnoughtsComparer;
    else comparer = defaultComparer;
    result.sort(comparer);
    if (
      battleType === root.BattleType.Space &&
      thisSideOptions.experimentalBattlestation
    )
      result.push(root.StandardUnits.ExperimentalBattlestation);

    if (thisSideOptions.geoform)
      result.push(root.StandardUnits.ExperimentalBattlestation);
    result.comparer = comparer;
    result.filterForBattle = filterFleet;
    return result;

    function createShips() {
      return [
        UnitType.Flagship,
        UnitType.WarSun,
        UnitType.Dreadnought,
        UnitType.Cruiser,
        UnitType.Destroyer,
        UnitType.Carrier,
        UnitType.Fighter,
        "Cavalry",
      ];
    }

    function createGroundForces() {
      return [UnitType.Mech, UnitType.Infantry];
    }

    function createUnitOrder(virus, NaazRokhaMechsSpace, helTitan) {
      var result = [];
      var i = 0;
      for (var unitType in UnitType) {
        result[unitType] = i++;
      }
      if (virus) {
        var tmp = result[UnitType.Infantry]; // Virus will need Grounds to die after Fighters, as they are stronger
        result[UnitType.Infantry] = result[UnitType.Fighter];
        result[UnitType.Fighter] = tmp;
      }
      if (helTitan) {
        var tmp = result[UnitType.Infantry]; // Sustains Hel-Titans after Mechs and Infantry
        result[UnitType.Infantry] = result[UnitType.PDS];
        result[UnitType.PDS] = tmp;
        var tmp = result[UnitType.PDS]; // Sustains Hel-Titans after Mechs and Infantry
        result[UnitType.PDS] = result[UnitType.Mech];
        result[UnitType.Mech] = tmp;
      }
      if (NaazRokhaMechsSpace) {
        var tmp = result[UnitType.Mech]; // NRA will need Mechs to die after Fighters, as they are stronger
        result[UnitType.Mech] = result[UnitType.Fighter];
        result[UnitType.Fighter] = tmp;
      }
      if (thisSideOptions.cavalryI || thisSideOptions.cavalryII) {
        result["Cavalry"] = 3;
      }
      return result;
    }

    function defaultComparer(unit1, unit2) {
      var typeOrder = unitOrder[unit1.type] - unitOrder[unit2.type];
      // damage ghosts come after corresponding units
      var damageGhostOrder =
        (unit1.isDamageGhost ? 1 : 0) - (unit2.isDamageGhost ? 1 : 0);
      // Damaged units come _before_ undamaged ones (within one type of course), which means they die later,
      // this way more Duranium armor has better chance to be applied.
      var damagedOrder = (unit2.damaged ? 1 : 0) - (unit1.damaged ? 1 : 0);
      if (
        thisSideOptions.riskDirectHit ||
        battleType === root.BattleType.Ground
      ) {
        // means damage ghosts will come last
        var defaultComparison =
          damageGhostOrder * 1000 + typeOrder * 10 + damagedOrder;
        if (thisSideOptions.race !== root.Race.Letnev) {
          return defaultComparison;
        } else {
          // damage ghosts will still come last, but Flagship ghost should be the very very last, as the Flagship can repair itself
          if (unit1.type === UnitType.Flagship && unit1.isDamageGhost) {
            return unit2.type === UnitType.Flagship && unit2.isDamageGhost
              ? 0
              : 1;
          } else if (unit2.type === UnitType.Flagship && unit2.isDamageGhost) {
            return -1;
          } else {
            return defaultComparison;
          }
        }
      } else {
        // means units are grouped with their damage ghosts
        return typeOrder * 1000 + damageGhostOrder * 10 + damagedOrder;
      }
    }

    function upgradedDreadnoughtsComparer(unit1, unit2) {
      if (thisSideOptions.riskDirectHit) {
        return defaultComparer(unit1, unit2);
      } else if (unit1.type === UnitType.Dreadnought && unit1.isDamageGhost) {
        return unit2.type === UnitType.Dreadnought && unit2.isDamageGhost
          ? 0
          : 1;
      } else if (unit2.type === UnitType.Dreadnought && unit2.isDamageGhost) {
        return -1;
      } else {
        return defaultComparer(unit1, unit2);
      }
    }

    function naaluComparer(unit1, unit2) {
      var typeOrder =
        naaluGoundUnitOrder[unit1.type] - naaluGoundUnitOrder[unit2.type];
      var damageGhostOrder =
        (unit1.isDamageGhost ? 1 : 0) - (unit2.isDamageGhost ? 1 : 0);
      // Damaged units come _before_ undamaged ones (within one type of course), which means they die later,
      // this way more Duranium armor has better chance to be applied.
      var damagedOrder = (unit2.damaged ? 1 : 0) - (unit1.damaged ? 1 : 0);
      var defaultComparison =
        damageGhostOrder * 1000 + typeOrder * 10 + damagedOrder;
      // if (unit1.type === UnitType.Flagship && unit1.isDamageGhost) {
      // 			return unit2.type === UnitType.Flagship && unit2.isDamageGhost ? 0 : 1;
      // 		} else if (unit2.type === UnitType.Flagship && unit2.isDamageGhost) {
      // 			return -1;
      // 		} else {
      // 			return defaultComparison;
      // 		}
      if (vipGround) {
        // Fighters are stronger than Ground
        if (unit1 === vipGround) return -1;
        else if (unit2 === vipGround) return 1;
        else return defaultComparison;
      } else {
        return defaultComparison;
      }
    }

    function filterFleet() {
      var result = this.filter(function (unit) {
        if (battleType === root.BattleType.Space)
          return (
            ships.indexOf(unit.type) >= 0 ||
            (virusFlagship && groundForces.indexOf(unit.type) >= 0) ||
            (NaazRokhaMechsSpace && unit.type === root.UnitType.Mech)
          );
        //battleType === root.BattleType.Ground
        else
          return (
            groundForces.indexOf(unit.type) >= 0 ||
            (helTitan && unit.type === root.UnitType.PDS) ||
            (naaluFlagship && unit.type === root.UnitType.Fighter)
          );
      });
      result.comparer = this.comparer;
      return result;
    }
  };

  /** Check whether the race has an upgrade for the unit */
  root.upgradeable = function (race, unitType) {
    return !!(
      root.StandardUpgrades.hasOwnProperty(unitType) ||
      (root.RaceSpecificUpgrades[race] &&
        root.RaceSpecificUpgrades[race].hasOwnProperty(unitType))
    );
  };

  root.damageable = function (race, unitType, upgraded) {
    return (
      (upgraded ? root.MergedUpgrades : root.MergedUnits)[race][unitType]
        .sustainDamageHits > 0
    );
  };
})(typeof exports === "undefined" ? window : exports);
