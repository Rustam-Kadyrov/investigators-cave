import { ConnectionImpl } from "./Connection"
import { Id } from "../model/Id";

/**
 * class RepositoryImpl
 * Incapsulates nedb routines to work with Id or it`s ancestors
 *
 * author: Rustam Kadyrov, 2020
 * github: https://github.com/Rustam-Kadyrov
 *
 */
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
    this.findByQueryWithOptions(query, new QueryOptions(), successCallback, errorCallback);
  }

  findByQueryWithOptions(query: any, options: QueryOptions, successCallback: Function, errorCallback: Function = function() { }) {
    this.connection.connect();
    var func = function(err: any, docs: T[]) {
      if (err) {
        errorCallback(err);
      } else {
        successCallback(docs);
      }
    };

    let queryBuilder = this.connection.getDb()
      .find(query, options.projection);

    if (options.sort) {
      queryBuilder.sort(options.sort);
    }
    if (options.skip) {
      queryBuilder.skip(options.skip);
    }
    if (options.limit) {
      queryBuilder.limit(options.limit);
    }

    queryBuilder.exec(func);
  }
}

interface Repository<T extends Id> {

  save(entity: T, successCallback: Function, errorCallback: Function): void;

  findById(id: string, successCallback: Function, errorCallback: Function): void;

  findAll(succCallbak: Function): void;

  findByQuery(query: any, successCallback: Function, errorCallback: Function): void;

  findByQueryWithOptions(query: any, options: QueryOptions, successCallback: Function, errorCallback: Function): void;
}

export class QueryOptions {

  static byProjection(projection: any): QueryOptions {
    return new QueryOptions(projection);
  }

  constructor(
    public projection: any = null,
    public sort: any = null,
    public skip: number = 0,
    public limit: number = 20
  ) { }
}
