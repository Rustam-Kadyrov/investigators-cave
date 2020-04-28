import { Id } from "./Id";

export class KnownRecord extends Id {

  constructor(
    public label: string) {
    super();
  }
}
