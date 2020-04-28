import { Id } from "./Id";

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
