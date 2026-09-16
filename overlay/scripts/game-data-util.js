"use strict";

const COLOR_NAME_TO_HEX = {
  white: "#FFFFFF",
  blue: "#00a8cc", //"#6EC1E4",
  purple: "#c147e9", //"#9161a8",
  yellow: "#ffde17",
  red: "#e94f64", //"#e46d72",
  green: "#00a14b",
  orange: "#FF781F",
  pink: "#FF69B4",
  "-": "unset",
};
// const ALT_COLOR_NAME_TO_HEX = {
//   white: "#BBBBBB",
//   blue: "#07B2FF",
//   purple: "#7400B7",
//   yellow: "#D6B700",
//   red: "#CB0000",
//   green: "#007306",
//   orange: "#F3631C",
//   pink: "#F46FCD",
// };
const UNKNOWN_COLOR_NAME = "-";
const UNKNOWN_COLOR_HEX = "#ffffff";

const FACTION_WHITELIST = new Set([
  "arborec",
  "argent",
  "bastion",
  "bobert",
  "creuss",
  "deepwrought",
  "empyrean",
  "firmament",
  "hacan",
  "jolnar",
  "keleres",
  "l1z1x",
  "letnev",
  "mahact",
  "mentak",
  "muaat",
  "naalu",
  "naazrokha",
  "nekro",
  "nomad",
  "norr",
  "obsidian",
  "ralnel",
  "rebellion",
  "saar",
  "sol",
  "ul",
  "vuilraith",
  "winnu",
  "xxcha",
  "yin",
  "yssaril",
  "aur",
  "janovet",
  "lurch",
  "monarch",
  "rex",
  "swords",
  "thorns",
  "viroset",
]);
const UNKNOWN_FACTION = "bobert";

const TF_FACTION_WHITELIST = new Set([
  "aur",
  "janovet",
  "lurch",
  "monarch",
  "red",
  "swords",
  "thorns",
  "viroset"
]);

const OBJECTIVE_NAME_ABBREVIATIONS = {
  // Public
  "Diversify Research": "2 TECH 2 COLORS",
  "Develop Weaponry": "2 UNIT UPGRADES",
  "Sway the Council": "8 INFLUENCE",
  "Erect a Monument": "8 RESOURCES",
  "Negotiate Trade Routes": "5 TRADE GOODS",
  "Lead From the Front": "3 COMMAND TOKENS",
  "Intimidate Council": "2 SYS ADJ TO MR",
  "Corner the Market": "4 PLANET SAME TRAIT",
  "Found Research Outposts": "3 TECH SPECIALTY",
  "Expand Borders": "6 NON-HOME PLANET",
  "Amass Wealth": "3 INF 3 RES 3 TG",
  "Build Defenses": "4 STRUCTURES",
  "Discover Lost Outposts": "2 ATTACHMENTS",
  "Engineer a Marvel": "FLAG/WAR SUN",
  "Explore Deep Space": "3 EMPTY SYS",
  "Improve Infrastructure": "3 STRUCT NOT HOME",
  "Make History": "2 LGND/MR/ANOM",
  "Populate the Outer Rim": "3 EDGE SYS",
  "Push Boundaries": "> 2 NGHBRS",
  "Raise a Fleet": "5 NON-FGTR SHIPS",
  "Master the Sciences": "2 TECH 4 COLORS",
  "Revolutionize Warfare": "3 UNIT UPGRADES",
  "Manipulate Galactic Law": "16 INFLUENCE",
  "Found a Golden Age": "16 RESOURCES",
  "Centralize Galactic Trade": "10 TRADE GOODS",
  "Galvanize the People": "6 COMMAND TOKENS",
  "Conquer the Weak": "1 OPPONENT HOME",
  "Unify the Colonies": "6 PLANET SAME TRAIT",
  "Form Galactic Brain Trust": "5 TECH SPECIALTY",
  "Subdue the Galaxy": "11 NON-HOME PLANET",
  "Achieve Supremacy": "FLAG/WS ON MR/HS",
  "Become a Legend": "4 LGND/MR/ANOM",
  "Command an Armada": "8 NON-FGTR SHIPS",
  "Construct Massive Cities": "7 STRUCTURES",
  "Control the Borderlands": "5 EDGE SYS",
  "Hold Vast Reserves": "6 INF 6 RES 6 TG",
  "Patrol Vast Territories": "5 EMPTY SYS",
  "Protect the Border": "5 STRUCT NOT HOME",
  "Reclaim Ancient Monuments": "3 ATTACHMENTS",
  "Rule Distant Lands": "2 IN/ADJ OTHER HS",

  // Secrets
  "Become the Gatekeeper": "ALPHA AND BETA",
  "Mine Rare Minerals": "4 HAZARDOUS",
  "Forge an Alliance": "4 CULTURAL",
  "Monopolize Production": "4 INDUSTRIAL",
  "Cut Supply Lines": "BLOCKADE SD",
  "Occupy the Seat of the Empire": "MR W/ 3 SHIPS",
  "Learn the Secrets of the Cosmos": "3 ADJ TO ANOMALY",
  "Control the Region": "6 SYSTEMS",
  "Threaten Enemies": "SYS ADJ TO HOME",
  "Adapt New Strategies": "2 FACTION TECH",
  "Master the Laws of Physics": "4 TECH 1 COLOR",
  "Gather a Mighty Fleet": "5 DREADNOUGHTS",
  "Form a Spy Network": "5 ACTION CARDS",
  "Fuel the War Machine": "3 SPACE DOCKS",
  "Establish a Perimeter": "4 PDS",
  "Make an Example of Their World": "BOMBARD LAST GF",
  "Turn Their Fleets to Dust": "SPC LAST SHIP",
  "Destroy Their Greatest Ship": "DESTORY WS/FLAG",
  "Unveil Flagship": "WIN W/ FLAGSHIP",
  "Spark a Rebellion": "WIN VS LEADER",
  "Become a Martyr": "LOSE IN HOME",
  "Betray a Friend": "WIN VS PROM NOTE",
  "Brave the Void": "WIN IN ANOMALY",
  "Darken the Skies": "WIN IN HOME",
  "Defy Space and Time": "WORMHOLE NEXUS",
  "Demonstrate Your Power": "3 SHIPS SURVIVE",
  "Destroy Heretical Works": "PURGE 2 FRAGMENTS",
  "Dictate Policy": "3 LAWS IN PLAY",
  "Drive the Debate": "ELECTED AGENDA",
  "Establish Hegemony": "12 INFLUENCE",
  "Fight with Precision": "AFB LAST FIGHTER",
  "Foster Cohesion": "NEIGHBOR W / ALL",
  "Hoard Raw Materials": "12 RESOURCES",
  "Mechanize the Military": "4 PLANETS W/ MECH",
  "Occupy the Fringe": "9 GROUND FORCES",
  "Produce en Masse": "8 PROD VALUE",
  "Prove Endurance": "PASS LAST",
  "Seize an Icon": "LEGENDARY PLANET",
  "Stake Your Claim": "SHARE SYSTEM",
  "Strengthen Bonds": "PROM NOTE",
};

const LAW_ABBREVIATIONS = {
  "Anti-Intellectual Revolution": "Anti-Int Revolution",
  "Classified Document Leaks": "Classified Doc Leaks",
  "Committee Formation": "Committee Formation",
  "Conventions of War": "Conv's of War",
  "Core Mining": "Core Mining",
  "Demilitarized Zone": "Demil'zd Zone",
  "Enforced Travel Ban": "Enforced Travel Ban",
  "Executive Sanctions": "Exec Sanctions",
  "Fleet Regulations": "Fleet Regs",
  "Holy Planet of Ixth": "Holy Planet of Ixth",
  "Homeland Defense Act": "Homeland Def Act",
  "Imperial Arbiter": "Imperial Arbiter",
  "Minister of Commerce": "Min of Commerce",
  "Minister of Exploration": "Min of Exploration",
  "Minister of Industry": "Min of Industry",
  "Minister of Peace": "Min of Peace",
  "Minister of Policy": "Min of Policy",
  "Minister of Sciences": "Min of Sciences",
  "Minister of War": "Min of War",
  "Prophecy of Ixth": "Proph of Ixth",
  "Publicize Weapon Schematics": "Pub Weapon Schematics",
  "Regulated Conscription": "Reg Conscription",
  "Representative Government": "Rep Gov't",
  "Research Team: Biotic": "Res Team: Biotic",
  "Research Team: Cybernetic": "Res Team: Cybernetic",
  "Research Team: Propulsion": "Res Team: Propulsion",
  "Research Team: Warfare": "Res Team: Warfare",
  "Senate Sanctuary": "Senate Sanct'y",
  "Shard of the Throne": "Shard of the Throne",
  "Shared Research": "Shared Research",
  "Terraforming Initiative": "Terrafor Initiative",
  "The Crown of Emphidia": "Crown of Emphidia",
  "The Crown of Thalnos": "Crown of Thalnos",
  "Wormhole Reconstruction": "Wormhole Reconstruct",
  "Articles of War": "Articles of War",
  "Checks and Balances": "Checks and Bal's",
  "Nexus Sovereignty": "Nexus Sovereignty",
  "Political Censure": "Pol Censure",
  "Search Warrant": "Search Warrant",
};

const TECHNOLOGY_COLOR = {
  "4X41C Helios V2": "white",
  "Agency Supply Network": "yellow",
  "AI Development Algorithm": "red",
  "Advanced Carrier II": "white",
  "Aerie Hololattice": "yellow",
  "Aetherstream": "blue",
  "Antimass Deflectors": "blue",
  "Assault Cannon": "red",
  "Bio Stims": "green",
  "Bioplasmosis": "green",
  "Carrier II": "white",
  "Chaos Mapping": "blue",
  "Crimson Legionnaire II": "white",
  "Cruiser II": "white",
  "Dacxive Animators": "green",
  "Dark Energy Tap": "blue",
  "Destroyer II": "white",
  "Dimensional Splicer": "red",
  "Dimensional Tear II": "white",
  "Dreadnought II": "white",
  "Duranium Armor": "red",
  "E-res Siphons": "yellow",
  "Executive Order": "yellow",
  "Exile II": "white",
  "Exotrireme II": "white",
  "Fighter II": "white",
  "Fleet Logistics": "blue",
  "Floating Factory II": "white",
  "Genetic Recombination": "green",
  "Graviton Laser System": "yellow",
  "Gravity Drive": "blue",
  "Hegemonic Trade Policy": "yellow",
  "Hel-Titan II": "white",
  "Hybrid Crystal Fighter II": "white",
  "Hydrothermal Mining": "green",
  "Hyper Metabolism": "green",
  "Impulse Core": "yellow",
  "Infantry II": "white",
  "Inheritance Systems": "yellow",
  "Instinct Training": "green",
  "Integrated Economy": "yellow",
  "L4 Disruptors": "yellow",
  "Lazax Gate Folding": "blue",
  "Letani Warrior II": "white",
  "Light-Wave Deflector": "blue",
  "Linkship II": "white",
  "Magen Defense Grid": "red",
  "Mageon Implants": "green",
  "Magmus Reactor": "red",
  "Memoria II": "white",
  "Mirror Computing": "yellow",
  "Nanomachines": "red",
  "Neural Motivator": "green",
  "Neural Parasite": "green",
  "Neuroglaive": "green",
  "Non-Euclidean Shielding": "red",
  "Nullification Field": "yellow",
  "PDS II": "white",
  "Planesplitter": "yellow",
  "Plasma Scoring": "red",
  "Pre-Fab Arcologies": "green",
  "Predictive Intelligence": "yellow",
  "Production Biomes": "green",
  "Prototype War Sun II": "white",
  "Proxima Targeting VI": "red",
  "Psychoarchaeology": "green",
  "Quantum Datahub Node": "yellow",
  "Radical Advancement": "white",
  "Salvage Operations": "yellow",
  "Sarween Tools": "yellow",
  "Saturn Engine II": "white",
  "Scanlink Drone Network": "yellow",
  "Self Assembly Routines": "red",
  "Sling Relay": "blue",
  "Space Dock II": "white",
  "Spacial Conduit Cylinder": "blue",
  "Spec Ops II": "white",
  "Strike Wing Alpha II": "white",
  "Subatomic Splicer": "yellow",
  "Super-Dreadnought II": "white",
  "Supercharge": "red",
  "Temporal Command Suite": "yellow",
  "Transit Diodes": "yellow",
  "Transparasteel Plating": "green",
  "Valefar Assimilator X": "white",
  "Valefar Assimilator Y": "white",
  "Valkyrie Particle Weave": "red",
  "Voidwatch": "green",
  "Vortex": "red",
  "Wormhole Generator": "blue",
  "X-89 Bacterial Weapon": "green",
  "Yin Spinner": "green",
  "War Sun": "white",
};

const UNIT_UPGRADE_TYPES = {
  "4X41C Helios V2": "space_dock",
  "Advanced Carrier II": "carrier",
  "Carrier II": "carrier",
  "Crimson Legionnaire II": "infantry",
  "Cruiser II": "cruiser",
  "Destroyer II": "destroyer",
  "Dimensional Tear II": "space_dock",
  "Dreadnought II": "dreadnought",
  "Exile II": "destroyer",
  "Exotrireme II": "dreadnought",
  "Fighter II": "fighter",
  "Floating Factory II": "space_dock",
  "Hel-Titan II": "pds",
  "Hybrid Crystal Fighter II": "fighter",
  "Infantry II": "infantry",
  "Letani Warrior II": "infantry",
  "Linkship II": "destroyer",
  "Memoria II": "flagship",
  "PDS II": "pds",
  "Prototype War Sun II": "war_sun",
  "Saturn Engine II": "cruiser",
  "Space Dock II": "space_dock",
  "Spec Ops II": "infantry",
  "Strike Wing Alpha II": "destroyer",
  "Super-Dreadnought II": "dreadnought",
  "War Sun": "war_sun",
}

const TF_ABILITY_COLOR = {
  "Abundance": "yellow",
  "Aerie Hololattice": "yellow",
  "Aetherstream": "blue",
  "Agency Supply Network": "yellow",
  "Amalgamation": "red",
  "Ambush": "red",
  "Armada": "red",
  "Assimilate": "yellow",
  "Awaken": "blue",
  "Bio-Synthetic Synergy": "green",
  "Bioplasmosis": "green",
  "Chaos Mapping": "yellow",
  "Courier Transport": "blue",
  "Crafty": "green",
  "Crucible": "blue",
  "Devotion": "blue",
  "Dimensional Splicer": "red",
  "Dimensional Tear": "blue",
  "Distant Suns": "blue",
  "E-Res Siphons": "yellow",
  "Entropic Harvest": "yellow",
  "Fabrication": "yellow",
  "Fleet Logistics": "blue",
  "Foresight": "blue",
  "Future Path": "blue",
  "Genetic Research": "green",
  "Guild Ships": "blue",
  "Harrow": "red",
  "Hegemonic Trade Policy": "yellow",
  "Indoctrination": "green",
  "Inheritance Systems": "yellow",
  "Instinct Training": "green",
  "Lazax Gate Folding": "blue",
  "Liberate": "red",
  "Magmus Reactor": "blue",
  "Mirror Computing": "yellow",
  "Mitosis": "green",
  "Munitions Reserves": "red",
  "Nanomachines": "red",
  "Neural Parasite": "green",
  "Neuroglaive": "red",
  "Nomadic": "blue",
  "Non-Euclidean Shielding": "red",
  "Nullification Field": "yellow",
  "Orbital Drop": "green",
  "Overwatch": "red",
  "Pacifist": "green",
  "Peace Accords": "yellow",
  "Pillage": "yellow",
  "Planesplitter": "red",
  "Proxima Targeting VI": "red",
  "Puppet Council": "green",
  "Quantum Datahub Node": "yellow",
  "Quantum Drive": "blue",
  "Quantum Entanglement": "blue",
  "Radical Advancement": "green",
  "Raid Formation": "red",
  "Reclamation": "yellow",
  "Scavenge": "yellow",
  "Scheming": "green",
  "Singularity X": "green",
  "Singularity Y": "green",
  "Singularity Z": "green",
  "Sled Factories": "yellow",
  "Slipstream": "blue",
  "Smothering Presence": "green",
  "Spatial Conduit Cylinder": "blue",
  "Spec Ops Training": "green",
  "Stall Tactics": "blue",
  "Star Forge": "yellow",
  "Stellar Genesis": "yellow",
  "Stymie": "green",
  "Subatomic Splicer": "yellow",
  "Supercharge": "red",
  "Survival Instinct": "red",
  "Tactical Brilliance": "red",
  "Telepathic": "green",
  "Temporal Command Suite": "yellow",
  "Terraform": "blue",
  "The Burning Eye": "red",
  "Unrelenting": "red",
  "Valkyrie Particle Weave": "red",
  "Valkyrie Vanguard": "blue",
  "Versatile": "green",
  "Voidborn": "blue",
  "Yin Ascendant": "green",
  "Zealous": "red",
};

const TF_ABILITY_ORIGIN = {
  "Abundance": "ul",
  "Aerie Hololattice": "argent",
  "Aetherstream": "empyrean",
  "Agency Supply Network": "keleres",
  "Amalgamation": "vuilraith",
  "Ambush": "mentak",
  "Armada": "letnev",
  "Assimilate": "l1z1x",
  "Awaken": "ul",
  "Bio-Synthetic Synergy": "bastion",
  "Bioplasmosis": "arborec",
  "Chaos Mapping": "saar",
  "Courier Transport": "ralnel",
  "Crafty": "yssaril",
  "Crucible": "vuilraith",
  "Devotion": "yin",
  "Dimensional Splicer": "creuss",
  "Dimensional Tear": "vuilraith",
  "Distant Suns": "naazrokha",
  "E-Res Siphons": "jolnar",
  "Entropic Harvest": "rebellion",
  "Fabrication": "naazrokha",
  "Fleet Logistics": "keleres",
  "Foresight": "naalu",
  "Future Path": "nomad",
  "Genetic Research": "deepwrought",
  "Guild Ships": "hacan",
  "Harrow": "l1z1x",
  "Hegemonic Trade Policy": "winnu",
  "Indoctrination": "yin",
  "Inheritance Systems": "l1z1x",
  "Instinct Training": "xxcha",
  "Lazax Gate Folding": "winnu",
  "Liberate": "bastion",
  "Magmus Reactor": "muaat",
  "Mirror Computing": "mentak",
  "Mitosis": "arborec",
  "Munitions Reserves": "letnev",
  "Nanomachines": "ralnel",
  "Neural Parasite": "obsidian",
  "Neuroglaive": "naalu",
  "Nomadic": "saar",
  "Non-Euclidean Shielding": "letnev",
  "Nullification Field": "xxcha",
  "Orbital Drop": "sol",
  "Overwatch": "empyrean",
  "Pacifist": "deepwrought",
  "Peace Accords": "xxcha",
  "Pillage": "mentak",
  "Planesplitter": "obsidian",
  "Proxima Targeting VI": "bastion",
  "Puppet Council": "keleres",
  "Quantum Datahub Node": "hacan",
  "Quantum Drive": "nomad",
  "Quantum Entanglement": "creuss",
  "Radical Advancement": "deepwrought",
  "Raid Formation": "argent",
  "Reclamation": "winnu",
  "Scavenge": "saar",
  "Scheming": "yssaril",
  "Singularity X": "nekro",
  "Singularity Y": "nekro",
  "Singularity Z": "nekro",
  "Sled Factories": "hacan",
  "Slipstream": "creuss",
  "Smothering Presence": "rebellion",
  "Spatial Conduit Cylinder": "jolnar",
  "Spec Ops Training": "sol",
  "Stall Tactics": "yssaril",
  "Star Forge": "muaat",
  "Stellar Genesis": "muaat",
  "Stymie": "arborec",
  "Subatomic Splicer": "rebellion",
  "Supercharge": "naazrokha",
  "Survival Instinct": "ralnel",
  "Tactical Brilliance": "jolnar",
  "Telepathic": "naalu",
  "Temporal Command Suite": "nomad",
  "Terraform": "ul",
  "The Burning Eye": "obsidian",
  "Unrelenting": "norr",
  "Valkyrie Particle Weave": "norr",
  "Valkyrie Vanguard": "norr",
  "Versatile": "sol",
  "Voidborn": "empyrean",
  "Yin Ascendant": "yin",
  "Zealous": "argent",
};

const TF_GENOME_ORIGIN = {
  "Action Genome": "keleres",
  "Altruistic Genome": "ul",
  "Aristocratic Genome": "letnev",
  "Breach Genome": "rebellion",
  "Brutal Genome": "l1z1x",
  "Captain's Genome": "saar",
  "Clever Genome": "yssaril",
  "Cosmic Genome": "empyrean",
  "Courier Genome": "ralnel",
  "Curious Genome": "naazrokha",
  "Deployment Genome": "nomad",
  "Diplomatic Genome": "xxcha",
  "Divine Genome": "winnu",
  "Enigmatic Genome": "creuss",
  "Experimental Genome": "jolnar",
  "Human Genome": "sol",
  "Hyper Genome": "mentak",
  "Investment Genome": "nomad",
  "Limit Genome": "naalu",
  "Mirror Genome": "obsidian",
  "Molten Genome": "muaat",
  "Pacific Genome": "arborec",
  "Ravenous Genome": "vuilraith",
  "Recursive Genome": "nekro",
  "Research Genome": "deepwrought",
  "Scornful Genome": "argent",
  "Silver Genome": "hacan",
  "Splitting Genome": "yin",
  "Swarm Genome": "norr",
  "Temporal Genome": "nomad",
  "Valiant Genome": "bastion",
}

const TF_PARADIGM_ORIGIN = {
  "Artemiris Ascendant": "keleres",
  "Awakening": "ul",
  "Blessing of the Yin": "yin",
  "Brilliance of the Hylar": "jolnar",
  "Brood Swarm": "norr",
  "Changing the Ways": "creuss",
  "Devour World": "nekro",
  "Diaspora": "l1z1x",
  "Dimensional Reflection": "rebellion",
  "Eternity's End": "obsidian",
  "Event Horizon": "vuilraith",
  "Extortion": "yssaril",
  "Flock Migration": "argent",
  "Forge Legend": "naazrokha",
  "Gravitational Collapse": "muaat",
  "Insurrection": "mentak",
  "Intelligence Unshackled": "bastion",
  "Limit Break": "ralnel",
  "Opening the Eye": "empyrean",
  "Overgrowth": "arborec",
  "Poison of the Nefishh": "naalu",
  "Sanction of the Quieron": "hacan",
  "Sins of the Father": "winnu",
  "The Laws Unwritten": "deepwrought",
  "The Lay of Lisis": "saar",
  "The Winds of Change": "keleres",
  "Time Warp": "nomad",
  "Twilight Directive": "sol",
  "Voice of the Council": "xxcha",
  "Void Transference": "letnev",
  "Witching Hour": "keleres",
}

const TF_UNIT_UPGRADE_TYPE = {
  "Echo of Ascension": "flagship",
  "Prototype War Sun": "war_sun",
  "University War Sun": "war_sun",
  "The Dragon, Freed": "war_sun",
  "Dawncrusher": "dreadnought",
  "Exotrireme": "dreadnought",
  "Super-Dreadnought": "dreadnought",
  "Advanced Carrier": "carrier",
  "Ambassador": "carrier",
  "Vortexer": "carrier",
  "Corsair": "cruiser",
  "Ahk Syl Fier": "cruiser",
  "Saggitaria": "cruiser",
  "Strike Wing Alpha": "destroyer",
  "Exile": "destroyer",
  "Linkship": "destroyer",
  "Hybrid Crystal Fighter": "fighter",
  "Triune": "fighter",
  "Morphwing": "fighter",
  "Valefar Prime": "mech",
  "Eidolon Terminus": "mech",
  "Eidolon Landwaster": "mech",
  "Yin Clone": "infantry",
  "Guild Agents": "infantry",
  "Letani Warrior": "infantry",
  "Hel-Titan": "pds",
  "Keeper Matrix": "pds",
  "Justicier Rail": "pds",
  "Production Biomes": "space_dock",
  "Floating Factories": "space_dock",
  "Helios Entity": "space_dock",
}

const TF_UNIT_UPGRADE_ORIGIN = {
  "Echo of Ascension": "nomad",
  "Prototype War Sun": "muaat",
  "University War Sun": "jolnar",
  "The Dragon, Freed": "obsidian",
  "Dawncrusher": "letnev",
  "Exotrireme": "norr",
  "Super-Dreadnought": "l1z1x",
  "Advanced Carrier": "sol",
  "Ambassador": "deepwrought",
  "Vortexer": "vuilraith",
  "Corsair": "mentak",
  "Ahk Syl Fier": "creuss",
  "Saggitaria": "keleres",
  "Strike Wing Alpha": "argent",
  "Exile": "rebellion",
  "Linkship": "ralnel",
  "Hybrid Crystal Fighter": "naalu",
  "Triune": "empyrean",
  "Morphwing": "naazrokha",
  "Valefar Prime": "nekro",
  "Eidolon Terminus": "vuilraith",
  "Eidolon Landwaster": "naazrokha",
  "Yin Clone": "yin",
  "Guild Agents": "yssaril",
  "Letani Warrior": "arborec",
  "Hel-Titan": "ul",
  "Keeper Matrix": "xxcha",
  "Justicier Rail": "winnu",
  "Production Biomes": "hacan",
  "Floating Factories": "saar",
  "Helios Entity": "bastion",
}

/**
 * This class parses data from the game-provided json.  It validates against
 * whitelists when possible, and escapes strings when not (e.g. player name).
 */
class GameDataUtil {
  static colorNameToHex(colorName) {
    console.assert(typeof colorName === "string");
    const result = COLOR_NAME_TO_HEX[colorName];
    if (!result) {
      throw new Error(`colorNameToHex: bad colorName "${colorName}"`);
    }
    return result;
  }

  /**
   * Escape any characters for a "in-HTML friendly" string.
   *
   * @param {string} string
   * @returns {string}
   */
  static _escapeForHTML(string) {
    console.assert(typeof string === "string");
    if (!GameDataUtil.__escapeDiv) {
      GameDataUtil.__escapeDiv = document.createElement("div");
    }
    GameDataUtil.__escapeDiv.innerText = string;
    return GameDataUtil.__escapeDiv.innerHTML;
  }

  static parseActiveSystem(gameData) {
    console.assert(typeof gameData === "object");

    const tile = gameData?.activeSystem?.tile || 0;
    const planets = gameData?.activeSystem?.planets || [];
    console.assert(typeof tile === "number");

    return {
      tile,
      planets: planets.map((s) => GameDataUtil._escapeForHTML(s)),
    };
  }

  /**
   * Parse current benediction color name from overall game data.
   *
   * @param {Object.{speaker:string}} gameData
   * @returns {string}
   */
  static parseBenedictionColorName(gameData) {
    console.assert(typeof gameData === "object");

    const benediction = gameData?.benediction?.toLowerCase() || "none";
    console.assert(typeof benediction === "string");

    return benediction;
  }

  /**
   * Parse current turn color name from overall game data.
   *
   * @param {Object.{turn:string}} gameData
   * @returns {string}
   */
  static parseCurrentTurnColorName(gameData) {
    console.assert(typeof gameData === "object");

    const currentTurn = gameData?.turn?.toLowerCase() || "none";
    console.assert(typeof currentTurn === "string");

    return COLOR_NAME_TO_HEX[currentTurn] ? currentTurn : UNKNOWN_COLOR_NAME;
  }

  /**
   * Parse galactic events.
   *
   * @param {Object.{galacticEvents:Array.{string}}} gameData
   * @returns {Array.{string}}
   */
  static parseGalacticEvents(gameData) {
    console.assert(typeof gameData === "object");

    let galacticEvents = gameData?.galacticEvents || [];
    console.assert(Array.isArray(galacticEvents));
    galacticEvents = galacticEvents.map((name) => GameDataUtil._escapeForHTML(name));

    return galacticEvents;
  }

  /**
   * Parse encoded hex summary.  Never used directly no need to escape.
   *
   * @param {Object.{hexSummary:string}} gameData
   * @returns {Array}
   */
  static parseHexSummary(gameData) {
    console.assert(typeof gameData === "object");

    let hexSummary = gameData?.hexSummary || "";

    if (hexSummary === "foo") {
      hexSummary = "";
    }

    const colorCodeToColorName = {
      W: "white",
      B: "blue",
      P: "purple",
      Y: "yellow",
      R: "red",
      G: "green",
      E: "orange",
      K: "pink",
    };
    const unitCodeToUnitName = {
      c: "carrier",
      d: "dreadnought",
      f: "fighter",
      h: "flagship",
      i: "infantry",
      m: "mech",
      o: "control_token",
      p: "pds",
      r: "cruiser",
      s: "space_dock",
      t: "command_token",
      w: "war_sun",
      y: "destroyer",
    };
    const attachmentCodeToName = {
      C: "cybernetic_research_facility_face",
      I: "biotic_research_facility_face",
      O: "propulsion_research_facility_face",
      W: "warfare_research_facility_face",
      a: "alpha_wormhole",
      b: "beta_wormhole",
      c: "cybernetic_Research_Facility_back",
      d: "dyson_sphere",
      e: "frontier",
      f: "nano_forge",
      g: "gamma_wormhole",
      h: "grav_tear",
      i: "biotic_research_facility_back",
      j: "tomb_of_emphidia",
      k: "mirage",
      l: "stellar_converter",
      m: "mining_world",
      n: "ion_storm",
      o: "propulsion_research_facility_back",
      p: "paradise_world",
      q: "ul_sleeper",
      r: "rich_world",
      t: "ul_terraform",
      u: "ul_geoform",
      w: "warfare_research_facility_back",
      x: "lazax_survivors",
      z: "dmz",
    };

    // TILE +-X +-Y SPACE ; PLANET1 ; PLANET2 ; ...
    const firstRegionPattern = new RegExp(
      /^([0-9AB]+)([-+][0-9]+)([-+][0-9]+)(.*)?$/
    );
    const rotPattern = new RegExp(/^(\d+)([AB])(\d)$/);
    const regionAttachmentsPattern = new RegExp(/^(.*)\*(.*)$/);

    const entries = hexSummary.split(",").filter((s) => s.length > 0);
    return entries.map((entryEncoded) => {
      const regions = entryEncoded.split(";");
      let m = regions[0].match(firstRegionPattern);
      if (!m) {
        throw new Error(
          `mismatch first region "${regions[0]}" ("${entryEncoded}")`
        );
      }
      console.assert(m);

      // Extract the tile number and location, preserve remaining first region.
      const entry = {
        tile: m[1],
        x: Number.parseInt(m[2]),
        y: Number.parseInt(m[3]),
      };
      regions[0] = m[4] || ""; // strip off tile, etc, preserve space region

      // Tile may have hyperlane info, add if present.
      m = entry.tile.match(rotPattern);
      if (m) {
        entry.tile = m[1];
        entry.ab = m[2];
        entry.rot = Number.parseInt(m[3]);
      }

      // Now fully parsed, tile is a number.
      entry.tile = Number.parseInt(entry.tile);

      // Parse per-region encoding.
      let stickyColor = undefined; // reset for each SYSTEM

      const isNumber = (c) => {
        if (c === undefined) {
          return false;
        }
        return "0" <= c && c <= "9";
      };

      entry.regions = regions.map((region) => {
        // Split off attachments, if any.
        m = region.match(regionAttachmentsPattern);
        let attachments = "";
        if (m) {
          region = m[1];
          attachments = m[2];
        }

        let stickyCount = 1; // reset for each REGION
        const colorToUnitNameToCount = {};

        for (let i = 0; i < region.length; i++) {
          const c = region[i];
          const prevC = region[i - 1];

          // Uppercase characters are player colors.
          const colorName = colorCodeToColorName[c];
          if (colorName) {
            stickyColor = colorName;
            stickyCount = 1; // reset count with new color
            continue;
          }

          // Numbers are unit counts.
          if (isNumber(c)) {
            if (isNumber(prevC)) {
              stickyCount = stickyCount * 10 + Number.parseInt(c);
            } else {
              stickyCount = Number.parseInt(c);
            }
            continue;
          }

          // Units get encoded after their quantiy value.
          const unit = unitCodeToUnitName[c];
          if (unit) {
            let unitToCount = colorToUnitNameToCount[stickyColor];
            if (!unitToCount) {
              unitToCount = {};
              colorToUnitNameToCount[stickyColor] = unitToCount;
            }
            unitToCount[unit] = (unitToCount[unit] || 0) + stickyCount;
          }
        }

        attachments = [...attachments]
          .map((c) => {
            return attachmentCodeToName[c];
          })
          .filter((v) => v);

        return {
          colorToUnitNameToCount,
          attachments,
        };
      });

      return entry;
    });
  }

  /**
   * Parse laws.
   *
   * @param {Object} gameData
   * @returns {Array.{{name:string,colors:Array.{string}}}
   */
  static parseLaws(gameData) {
    console.assert(typeof gameData === "object");

    const laws = gameData?.laws || [];

    const lawToColorNames = {};
    for (const law of laws) {
      lawToColorNames[law] = [];
    }

    const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
    for (const playerData of playerDataArray) {
      const colorNameAndHex = GameDataUtil.parsePlayerColor(playerData);
      const playerLaws = playerData?.laws || [];
      for (const playerLaw of playerLaws) {
        const entry = lawToColorNames[playerLaw];
        if (!entry) {
          continue; // law not registered at top?
        }
        entry.push(colorNameAndHex.colorName);
      }
    }

    return laws.map((law) => {
      const colorNames = lawToColorNames[law] || [];
      const name = GameDataUtil._escapeForHTML(law);
      let abbr = LAW_ABBREVIATIONS[name];
      if (!abbr) {
        abbr = name;
      }
      return { name, abbr, colorNames };
    });
  }

  /**
   * Parse objectives by type and who scored.
   *
   * @param {Object} gameData
   * @returns {Object} objectives
   */
  static parseObjectives(gameData) {
    console.assert(typeof gameData === "object");

    const objectives = {
      stage1: [],
      stage2: [],
      secret: [],
      custodians: [],
      sftt: [],
      other: [], // shard, etc
    };

    // Fill in the above objectives, and keep a map from name to entry.
    const nameToEntry = {};
    const addEntry = (name, addToList) => {
      console.assert(typeof name === "string");
      console.assert(Array.isArray(addToList));
      if (nameToEntry[name]) {
        return; // already added!
      }
      let prefix = "";
      if (name.startsWith("*")) {
        name = name.substring(1);
        prefix = "*";
      }
      const entry = {
        name: prefix + GameDataUtil._escapeForHTML(name),
        abbr:
          prefix +
          (OBJECTIVE_NAME_ABBREVIATIONS[name] ||
            GameDataUtil._escapeForHTML(name)),
        scoredBy: [],
      };
      nameToEntry[name] = entry;
      addToList.push(entry);
      return entry;
    };
    const addEntries = (names, addToList) => {
      console.assert(Array.isArray(names));
      console.assert(Array.isArray(addToList));
      for (const name of names) {
        addEntry(name, addToList);
      }
    };

    // Group objectives into categories.  Split out support from other.
    const gameDataObjectives = gameData?.objectives || [];
    for (const [key, names] of Object.entries(gameDataObjectives)) {
      if (key === "Secret Objectives") {
        addEntries(names, objectives.secret);
      } else if (key === "Public Objectives I") {
        addEntries(names, objectives.stage1);
      } else if (key === "Public Objectives II") {
        addEntries(names, objectives.stage2);
      } else {
        for (const name of names) {
          if (name.startsWith("Support for the Throne")) {
            addEntry(name, objectives.sftt);
          } else {
            addEntry(name, objectives.other);
          }
        }
      }
    }

    // Who scored?
    const gameDataPlayers = gameData?.players || [];
    for (const playerData of gameDataPlayers) {
      const colorName = GameDataUtil.parsePlayerColor(playerData).colorName;
      const playerObjectives = playerData?.objectives || [];
      for (const name of playerObjectives) {
        const entry = nameToEntry[name];
        if (!entry) {
          throw new Error(`missing entry for "${name}"`);
        }
        console.assert(entry);
        entry.scoredBy.push(colorName);
      }
    }

    // Add custodians, a player can score more than once.
    const custodiansEntry = addEntry("custodians", objectives.custodians);
    for (const playerData of gameDataPlayers) {
      const colorName = GameDataUtil.parsePlayerColor(playerData).colorName;
      const custodiansPoints = playerData?.custodiansPoints || 0;
      for (let i = 0; i < custodiansPoints; i++) {
        custodiansEntry.scoredBy.push(colorName);
      }
    }

    return objectives;
  }

  /**
   * Parse objectives progress.
   *
   * @param {Object} gameData
   * @returns {Array.{abbr:string,stage:number,header:string,values:{Array.{value:string|number,success:boolean},scoredBy:{Array.{number}|undefined}}}}
   */
  static parseObjectivesProgress(gameData) {
    console.assert(typeof gameData === "object");

    const objectivesProgress = gameData?.objectivesProgress || [];
    return objectivesProgress.map((objectiveProgress) => {
      const { name, abbr, stage, progress, scoredBy } = objectiveProgress;
      const { header, values } = progress || { header: "-", values: [] };
      return { name, abbr, stage, header, values, scoredBy };
    });
  }

  /**
   * Parse active (not passed).
   *
   * @param {Object.{active:boolean}} playerData
   * @returns {boolean}
   */
  static parsePlayerActive(playerData) {
    console.assert(typeof playerData === "object");

    let active = playerData?.active;
    if (active === undefined) {
      active = true;
    }
    console.assert(typeof active === "boolean");
    return active;
  }

  /**
   * Parse color as hex value.
   *
   * @param {Object.{colorActual:string}} playerData
   * @returns {Object.{colorName:string,colorHex:string}}
   */
  static parsePlayerColor(playerData) {
    console.assert(typeof playerData === "object");

    let colorName = playerData?.colorActual?.toLowerCase();
    if (!colorName) {
      colorName = playerData?.color.toLowerCase();
    }
    let colorHex = COLOR_NAME_TO_HEX[colorName];
    if (!colorHex) {
      colorName = UNKNOWN_COLOR_NAME;
      colorHex = UNKNOWN_COLOR_HEX;
    }
    return { colorName, colorHex };
  }

  /**
   * Extract the player data array, in clockwise player order from lower right.
   *
   * @param {Object.{players:Array.{Object}}} gameData
   * @returns {Array.{Object}}
   */
  static parsePlayerDataArray(gameData) {
    console.assert(typeof gameData === "object");

    let playerDataArray = gameData?.players;

    // If called without gamedata, provide the default 6-player minimal array.
    if (!playerDataArray) {
      playerDataArray = [
        "white",
        "blue",
        "purple",
        "yellow",
        "red",
        "green",
      ].map((color) => {
        return { colorActual: color };
      });
    }

    console.assert(Array.isArray(playerDataArray));
    return playerDataArray;
  }

  /**
   * Parse faction name.
   *
   * @param {Object.{factionShort:string}} playerData
   * @returns {string}
   */
  static parsePlayerFaction(playerData) {
    console.assert(typeof playerData === "object");

    let faction = playerData?.factionShort?.toLowerCase() || "-";
    console.assert(typeof faction === "string");

    faction = faction.replace("-", ""); // naaz-rokha
    faction = faction.replace("'", ""); // vuil'raith, n'orr

    if (faction.startsWith("keleres")) {
      faction = "keleres"; // strip off flavor
    }

    return FACTION_WHITELIST.has(faction) ? faction : UNKNOWN_FACTION;
  }

  /**
   * Parse player name.
   *
   * @param {Object.{steamName:string}} playerData
   * @returns {string}
   */
  static parsePlayerName(playerData) {
    console.assert(typeof playerData === "object");

    const playerName = playerData?.steamName || "-";
    console.assert(typeof playerName === "string");

    return GameDataUtil._escapeForHTML(playerName);
  }

  /**
   * Parse player relics.
   *
   * @param {Object.{relics:Array.{string}}} playerData
   * @returns {Array.{string}}
   */
  static parsePlayerRelics(playerData) {
    console.assert(typeof playerData === "object");

    let relics = playerData?.relics || [];
    console.assert(Array.isArray(relics));
    relics = relics.map((name) => GameDataUtil._escapeForHTML(name));

    return relics;
  }

  /**
   * Parse player resources.
   *
   * @param {Object} playerData
   * @returns {Object}
   */
  static parsePlayerResources(playerData) {
    console.assert(typeof playerData === "object");

    const bonusCommodities = (playerData?.relics || []).includes(
      "Dynamis Core"
    )
      ? 2
      : 0;

    return {
      isTfFaction: TF_FACTION_WHITELIST.has(GameDataUtil.parsePlayerFaction(playerData)),
      influence: {
        avail: playerData?.planetTotals?.influence?.avail || 0,
        total: playerData?.planetTotals?.influence?.total || 0,
      },
      resources: {
        avail: playerData?.planetTotals?.resources?.avail || 0,
        total: playerData?.planetTotals?.resources?.total || 0,
      },
      tradegoods: playerData?.tradeGoods || 0,
      commodities: playerData?.commodities || 0,
      maxCommidities: (playerData?.maxCommodities || 0) + bonusCommodities,
      techSkips: {
        blue: playerData?.planetTotals?.techs?.blue || 0,
        green: playerData?.planetTotals?.techs?.green || 0,
        red: playerData?.planetTotals?.techs?.red || 0,
        yellow: playerData?.planetTotals?.techs?.yellow || 0,
      },
      traits: {
        cultural: playerData?.planetTotals?.traits?.cultural || 0,
        hazardous: playerData?.planetTotals?.traits?.hazardous || 0,
        industrial: playerData?.planetTotals?.traits?.industrial || 0,
      },
      tokens: {
        fleet: playerData?.commandTokens?.fleet || 0,
        strategy: playerData?.commandTokens?.strategy || 0,
        tactics: playerData?.commandTokens?.tactics || 0,
      },
      alliances: (playerData?.alliances || []).map((x) =>
        GameDataUtil._escapeForHTML(x).toLowerCase()
      ),
      leaders: {
        // "locked|unlocked|purged"
        agent: GameDataUtil._escapeForHTML(
          playerData?.leaders?.agent || "purged"
        ),
        commander: GameDataUtil._escapeForHTML(
          playerData?.leaders?.commander || "purged"
        ),
        hero: GameDataUtil._escapeForHTML(
          playerData?.leaders?.hero || "purged"
        ),
      },
      hand: {
        action: playerData?.handSummary?.Actions || 0,
        promissory: playerData?.handSummary?.Promissory || 0,
        secret: (playerData?.handSummary || {})["Secret Objectives"] || 0,
      },
    };
  }

  /**
   * Parse score.
   *
   * @param {Object.{score:number}} playerData
   * @returns {number}
   */
  static parsePlayerScore(playerData) {
    console.assert(typeof playerData === "object");

    let score = playerData?.score || 0;
    console.assert(typeof score === "number");

    return score;
  }

  /**
   * Parse strategy cards with face-up/down status.
   *
   * @param {Object.{strategyCards:Array.{string},strategyCardsFaceDown:Array.{string}}} playerData
   * @returns {Array.{Object.{name:string,faceDown:boolean}}}
   */
  static parsePlayerStrategyCards(playerData) {
    console.assert(typeof playerData === "object");

    let strategyCards = playerData?.strategyCards || [];
    console.assert(Array.isArray(strategyCards));
    strategyCards = strategyCards.map((name) =>
      GameDataUtil._escapeForHTML(name)
    );

    let faceDown = playerData?.strategyCardsFaceDown || [];
    console.assert(Array.isArray(faceDown));
    faceDown = faceDown.map((name) => GameDataUtil._escapeForHTML(name));

    return strategyCards.map((name) => {
      return { name, faceDown: faceDown.includes(name) };
    });
  }

  /**
   * Parse technologies.
   *
   * @param {Object.{technologies:Array.{string}}} playerData
   * @returns {Array.{Object.{name:string,colorName:string}}}
   */
  static parsePlayerTechnologies(playerData) {
    console.assert(typeof playerData === "object");

    const technologies = playerData?.technologies || [];
    return technologies.map((name) => {
      const colorName = TECHNOLOGY_COLOR[name] || "white";
      return {
        name: GameDataUtil._escapeForHTML(name),
        colorName,
      };
    });
  }

  /**
   * Parse Twilight's Fall abilities.
   *
   * @param {Object.{tfAbilities:Array.{string}}} playerData
   * @returns {Array.{Object.{name:string,colorName:string,originName:string}}}
   */
  static parsePlayerTFAbilities(playerData) {
    console.assert(typeof playerData === "object");

    const tfAbilities = playerData?.tfAbilities || [];
    return tfAbilities.map((name) => {
      const colorName = TF_ABILITY_COLOR[name] || "white";
      const originName = TF_ABILITY_ORIGIN[name] || "";
      return {
        name: GameDataUtil._escapeForHTML(name),
        colorName,
        originName,
      };
    });
  }

  /**
   * Parse Twilight's Fall genomes.
   *
   * @param {Object.{tfGenomes:Array.{string}}} playerData
   * @returns {Array.{Object.{name:string,originName:string}}}
   */
  static parsePlayerTFGenomes(playerData) {
    console.assert(typeof playerData === "object");

    const tfGenomes = playerData?.tfGenomes || [];
    return tfGenomes.map((name) => {
      const originName = TF_GENOME_ORIGIN[name] || "";
      return {
        name: GameDataUtil._escapeForHTML(name),
        originName,
      };
    });
  }

  /**
   * Parse Twilight's Fall paradigms.
   *
   * @param {Object.{tfParadigms:Array.{string}}} playerData
   * @returns {Array.{Object.{name:string,originName:string}}}
   */
  static parsePlayerTFParadigms(playerData) {
    console.assert(typeof playerData === "object");

    const tfParadigms = playerData?.tfParadigms || [];
    return tfParadigms.map((name) => {
      const originName = TF_PARADIGM_ORIGIN[name] || "";
      return {
        name: GameDataUtil._escapeForHTML(name),
        originName,
      };
    });
  }

  /**
   * Parse Twilight's Fall unit upgrades.
   *
   * @param {Object.{tfUnitUpgrades:Array.{string}}} playerData
   * @returns {Array.{Object.{name:string,type:string,originName:string}}}
   */
  static parsePlayerTFUnitUpgrades(playerData) {
    console.assert(typeof playerData === "object");

    const tfUnitUpgrades = playerData?.tfUnitUpgrades || [];
    return tfUnitUpgrades.map((name) => {
      const type = TF_UNIT_UPGRADE_TYPE[name] || "";
      const originName = TF_UNIT_UPGRADE_ORIGIN[name] || "";
      return {
        name: GameDataUtil._escapeForHTML(name),
        type: GameDataUtil._escapeForHTML(type),
        originName: GameDataUtil._escapeForHTML(originName),
      };
    });
  }

  static parsePlayerUnitModifiers(playerData) {
    console.assert(typeof playerData === "object");

    const unitModifiers = playerData?.unitModifiers || [];
    return unitModifiers.map((m) => {
      return {
        name: GameDataUtil._escapeForHTML(m.name),
        localeName: GameDataUtil._escapeForHTML(m.localeName),
      };
    });
  }

  /**
   * Parse unit upgrades - returns "nsid" style unit types, e.g. "war_sun".
   *
   * @param {Object.{unitUpgrades:Array.{string},tfUnitUpgrades:Array.{string}}} playerData
   * @returns {Array.{string}}
   */
  static parsePlayerUnitUpgrades(playerData) {
    console.assert(typeof playerData === "object");

    const technology = playerData?.technology || [];
    const tf_unit_upgrades = playerData?.tfUnitUpgrades || [];
    const unitUpgrades = [...technology, ...tf_unit_upgrades];
    const result = new Set();
    unitUpgrades.forEach((item) => {
      const name = typeof item === "string" ? item : item.name;
      const type = UNIT_UPGRADE_TYPES[name] || TF_UNIT_UPGRADE_TYPE[name];
      if (type) {
        result.add(type);
      }
    });
    return Array.from(result).map(name => GameDataUtil._escapeForHTML(name));
  }

  /**
   * Parse game round.
   *
   * @param {Object.{round:number}} gameData
   * @returns {number}
   */
  static parseRound(gameData) {
    console.assert(typeof gameData === "object");

    const round = gameData?.round || 1;
    console.assert(typeof round === "number");

    return round;
  }

  /**
   * Given the main game data, get per-round partial game data entries.
   *
   * @param {Object} gameData
   * @returns {Object}
   */
  static parseRoundToStartOfRoundGameData(gameData) {
    console.assert(typeof gameData === "object");

    const history = gameData?.history || [];

    const result = {};
    for (const entry of history) {
      const round = entry.round;
      if (round === undefined) {
        continue;
      }
      result[round] = entry;
    }
    return result;
  }

  static parseScoreboard(gameData) {
    console.assert(typeof gameData === "object");

    const scoreboard = gameData?.scoreboard || 10;
    console.assert(typeof scoreboard === "number");
    return scoreboard;
  }

  /**
   * Parse current speaker color name from overall game data.
   *
   * @param {Object.{speaker:string}} gameData
   * @returns {string}
   */
  static parseSpeakerColorName(gameData) {
    console.assert(typeof gameData === "object");

    const speaker = gameData?.speaker?.toLowerCase() || "none";
    console.assert(typeof speaker === "string");

    return speaker;
  }

  /**
   * Parse current timer from overall game data.
   *
   * @param {Object.{timer:Object.{seconds:number,directin:number}} gameData
   * @returns Object.{seconds:number,directin:number}
   */

  static parseTimer(gameData) {
    console.assert(typeof gameData === "object");

    const seconds = gameData?.timer?.seconds || 0;
    const anchorTimestamp = gameData?.timer?.anchorTimestamp || 0;
    const anchorSeconds = gameData?.timer?.anchorSeconds || 0;
    const direction = gameData?.timer?.direction || 0;
    const countDown = gameData?.timer?.countDown || 0;
    console.assert(typeof seconds === "number");
    console.assert(typeof anchorTimestamp === "number");
    console.assert(typeof anchorSeconds === "number");
    console.assert(typeof direction === "number");
    console.assert(typeof countDown === "number");

    return { seconds, anchorTimestamp, anchorSeconds, direction, countDown };
  }

  static parseTurnTimer(gameData) {
    console.assert(typeof gameData === "object");

    const display = gameData?.extra?.turnTimer?.display || 0;
    const anchorTimestamp = gameData?.extra?.turnTimer?.anchorTimestamp || 0;
    const anchorValue = gameData?.extra?.turnTimer?.anchorValue || 0;
    const timerValue = gameData?.extra?.turnTimer?.timerValue || 0;
    const active = gameData?.extra?.turnTimer?.active || false;

    console.assert(typeof display === "number");
    console.assert(typeof anchorTimestamp === "number");
    console.assert(typeof anchorValue === "number");
    console.assert(typeof timerValue === "number");
    console.assert(typeof active === "boolean");

    return { display, anchorTimestamp, anchorValue, timerValue, active };
  }

  /**
   * Parse turn order.
   *
   * @param {Object.{players:Array.{Object}}} gameData
   * @returns {Array.{string}} turn order color names
   */
  static parseTurnOrder(gameData) {
    console.assert(typeof gameData === "object");

    const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
    const colorNames = new Array(playerDataArray.length).fill("-");
    for (const playerData of playerDataArray) {
      const turnOrder = playerData?.turnOrder || 0;
      const colorName = GameDataUtil.parsePlayerColor(playerData).colorName;
      console.assert(typeof turnOrder === "number");
      colorNames[turnOrder] = GameDataUtil._escapeForHTML(colorName);
    }
    return colorNames;
  }

  /**
   * Parse recent whispers.
   *
   * @param {Object.{whispers:Array}} gameData
   * @returns {Array.{Object}}
   */
  static parseWhispers(gameData) {
    console.assert(typeof gameData === "object");

    const sanitizeWhisper = (s) => {
      return [...s]
        .map((c) => {
          if (c === " ") {
            return "&nbsp;";
          }
          if (c === "<") {
            return "&lt;";
          }
          if (c === ">") {
            return "&gt;";
          }
          return "";
        })
        .join("");
    };

    const whispers = gameData?.whispers || [];
    return whispers.map((entry) => {
      return {
        colorNameA: GameDataUtil._escapeForHTML(entry.colorNameA),
        colorNameB: GameDataUtil._escapeForHTML(entry.colorNameB),
        forwardStr: sanitizeWhisper(entry.forwardStr),
        backwardStr: sanitizeWhisper(entry.backwardStr),
      };
    });
  }
}

// Export for jest test framework.
if (typeof module !== "undefined") {
  module.exports = { GameDataUtil };
}
