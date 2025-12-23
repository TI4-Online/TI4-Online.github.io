import { Participant, Side } from "../core/battle-types";
import { Place } from "../core/enums";
export declare function createQueryParams(attacker: Participant, defender: Participant, place: Place): void;
export declare function applyQueryParams(participant: Participant, query: Record<string, string | string[] | undefined>): void;
export declare function hasSomeQueryParams(query: Record<string, string | string[] | undefined>): boolean;
export declare function hasQueryParamForFaction(query: Record<string, string | string[] | undefined>, side: Side): boolean;
