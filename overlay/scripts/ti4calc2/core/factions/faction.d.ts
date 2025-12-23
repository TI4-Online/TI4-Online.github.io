import { Participant } from '../battle-types';
import { BattleEffect } from '../battleeffect/battleEffects';
import { Faction } from '../enums';
export declare function getFactionBattleEffects(p: Participant | Faction): BattleEffect[];
export declare function getFactionStuffNonUnit(): BattleEffect[];
export declare function getPromissary(): BattleEffect[];
export declare function getAgent(): BattleEffect[];
export declare function getCommanders(): BattleEffect[];
export declare function getGeneralEffectFromFactions(): BattleEffect[];
