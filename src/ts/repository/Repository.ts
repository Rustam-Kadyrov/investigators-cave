import { ConnectionImpl } from "./Connection"
import { Id } from "../model/Id";

export class RepositoryImpl<T extends Id> implements Repository<T> {
  constructor(
    private connection: ConnectionImpl
  ) { }

  save(entity: T, successCallback: Function, errorCallback: Function = function() { }) {
    this.connection.connect();
    this.connection.getDb().insert(entity, function(err: any, newDoc: any) {
      if (err) {
        errorCallback(err);
      } else {
        successCallback(newDoc);
      }
    });
  }

  findById(id: string, successCallback: Function, errorCallback: Function = function() { }) {
    this.findByQuery({ _id: id }, successCallback, errorCallback);
  }

  findAll(successCallback: Function, errorCallback: Function = function() { }): void {
    this.findByQuery({}, successCallback, errorCallback);
  }

  findByQuery(query: any, successCallback: Function, errorCallback: Function = function() { }) {
    this.connection.connect();
    this.connection.getDb().find(query, function(err: any, docs: T[]) {
      if (err) {
        errorCallback(err);
      } else {
        successCallback(docs);
      }
    });
  }
}

interface Repository<T extends Id> {

  save(entity: T, successCallback: Function, errorCallback: Function): void;

  findById(id: string, successCallback: Function, errorCallback: Function): void;

  findAll(succCallbak: Function): void;

  findByQuery(query: any, successCallback: Function, errorCallback: Function): void;
}
