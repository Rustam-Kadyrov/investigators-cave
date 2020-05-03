import { Id } from "./Id";
import { HintRecord } from "./HintRecord";

/**
 * class UnknownRecord
 *
 * author: Rustam Kadyrov, 2020
 * github: https://github.com/Rustam-Kadyrov
 *
 */
export class UnknownRecord extends Id {

  constructor(
    public label: string,
    public hints: HintRecord[] = []
  ) {
    super();
  }
}
