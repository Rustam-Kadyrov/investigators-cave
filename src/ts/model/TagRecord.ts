import { Id } from "./Id";

/**
 * class TagRecord
 *
 * author: Rustam Kadyrov, 2020
 * github: https://github.com/Rustam-Kadyrov
 *
 */
export class TagRecord extends Id {

  constructor(
    public label: string) {
    super();
  }
}
