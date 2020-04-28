import { Id } from "./Id";

export class CheckRecord extends Id {

  constructor(
    public unknownUuid: string,
    public status: CheckResult = CheckResult.NOT_SET
  ) {
    super();
  }
}

export enum CheckResult {
  NOT_SET,
  LEARNED,
  NO_MATTER,
  TOO_COMPLICATED
}
