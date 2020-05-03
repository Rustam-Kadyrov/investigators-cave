import { Id } from "./Id";

/**
 * class HintRecord
 *
 * author: Rustam Kadyrov, 2020
 * github: https://github.com/Rustam-Kadyrov
 *
 */
export class HintRecord extends Id {

  constructor(
    public type: HintType = HintType.TEXT,
    public payload: string) {
    super();
  }
}

export enum HintType {
  TEXT,
  URL,
  IMAGE,
  VIDEO
}
