import { PartialRecord } from './util-types';
/**
 * Object.keys but keeps type safety
 */
export declare function objectKeys<T extends object>(obj: T): Array<keyof T>;
/**
 * Object.entries but keeps type safety
 */
export declare function objectEntries<K extends string | number | symbol, V>(obj: PartialRecord<K, V>): Array<[K, V]>;
