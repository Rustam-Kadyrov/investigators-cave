import { Id } from "./Id";
export namespace ArraysRoutines {
  export function removeItemFromListByUuid<T extends Id>(from: T[], uuid: string): T[] {
    return from.filter(f => f._id !== uuid);
  }
}
