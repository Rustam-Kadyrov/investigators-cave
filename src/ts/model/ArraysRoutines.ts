import { Id } from "./Id";

/**
 * Working with arrays
 *
 * author: Rustam Kadyrov, 2020
 * github: https://github.com/Rustam-Kadyrov
 *
 */
export namespace ArraysRoutines {
  export function removeItemFromListByUuid<T extends Id>(from: T[], uuid: string): T[] {
    return from.filter(f => f._id !== uuid);
  }
}
