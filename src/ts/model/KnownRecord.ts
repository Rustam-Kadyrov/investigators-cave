import { Id } from "./Id";

/**
 * class KnownRecord
 *
 * author: Rustam Kadyrov, 2020
 * github: https://github.com/Rustam-Kadyrov
 *
 */
export class KnownRecord extends Id {

  constructor(
    public label: string) {
    super();
  }
}
