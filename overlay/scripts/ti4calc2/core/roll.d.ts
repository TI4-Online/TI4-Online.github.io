import { Roll } from "./unit";
export interface HitInfo {
    hits: number;
    rollInfoList: RollInfo[];
}
export interface RollInfo {
    hitOn: number;
    roll: number;
}
export declare function getHits(roll: Roll): HitInfo;
