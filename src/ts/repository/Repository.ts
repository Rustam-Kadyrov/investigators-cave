import { ConnectionImpl } from "./Connection"
import { Id } from "../model/Id";

export class RepositoryImpl<T extends Id> implements Repository<T> {
  constructor(
    private connection: ConnectionImpl
  ) { }

  save(entity: T, succCallback: Function = function() { }, errCallback: Function = function() { }) {
    this.connection.connect();
    this.connection.getDb().insert(entity, function(err: any, newDoc: any) {
      if (err) {
        errCallback(err);
      } else {
        succCallback(newDoc);
      }
    });
  }

  findAll(succCallbak: Function): void {
    this.connection.connect();
    this.connection.getDb().find({}, function(err: any, docs: T[]) {
      succCallbak(docs);
    })
  }
}

interface Repository<T extends Id> {

  save(entity: T, succCallback: Function, errCallback: Function): void;

  findAll(succCallbak: Function): void;
}
