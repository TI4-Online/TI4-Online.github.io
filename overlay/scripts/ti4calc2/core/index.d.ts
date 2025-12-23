import { PartialRecord } from '../util/util-types';
import { Participant } from './battle-types';
import { Place } from './enums';
export interface BattleReport {
    attacker: number;
    attackerSurvivers: PartialRecord<string, number>;
    draw: number;
    defender: number;
    defenderSurvivers: PartialRecord<string, number>;
    numberOfRolls: number;
}
export declare function getBattleReport(attacker: Participant, defender: Participant, place: Place, times: number, addToBattleReport?: BattleReport): BattleReport;
