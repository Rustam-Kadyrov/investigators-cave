import { Id } from "./Id";
import { HintRecord } from "./HintRecord";

export class UnknownRecord extends Id {

  constructor(
    public label: string,
    public hints: HintRecord[] = []
  ) {
    super();
  }
}
