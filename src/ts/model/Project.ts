import { Id } from "./Id";
import { KnownRecord } from "./KnownRecord";
import { UnknownRecord } from "./UnknownRecord";
import { CheckRecord } from "./CheckRecord";
import { FreeDrawPayload } from "./FreeDrawPayload";
import { TagRecord } from "./TagRecord";

export class Project extends Id {

  constructor(
    public title: string,
    public description: string,
    public known: KnownRecord[] = [],
    public unknown: UnknownRecord[] = [],
    public checkList: CheckRecord[] = [],
    public tags: TagRecord[] = [],
    public freeDrawPlanes: FreeDrawPayload[] = []) {
    super();
  }
}
