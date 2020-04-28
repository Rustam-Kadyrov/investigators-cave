import { Id } from "./Id";

export class TagRecord extends Id {

  constructor(
    public label: string) {
    super();
  }
}
