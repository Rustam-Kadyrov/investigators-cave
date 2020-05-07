import { Connection } from "./Connection"
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
    private connection: Connection
  ) {
    this.connection.connect();
  }

  save(entity: T): Promise<T> {
    return new Promise<T>((resolve: Function, reject: Function) => {
      this.connection.getDb().insert(entity, function(err: any, newDoc: T) {
        if (err) {
          return reject(err);
        }
        resolve(newDoc);
      });
    });
  }

  updateById(id: string, newFields: any, options: any = {}): Promise<number> {
    return this.update({ _id: id }, newFields, options);
  }

  private update(query: any, newFields: any, options: any = {}): Promise<number> {
    return new Promise<number>((resolve: Function, reject: Function) => {
      this.connection.getDb().update(query, newFields, options, function(err: any, numUpdated: number) {
        if (err) {
          return reject(err);
        }
        resolve(numUpdated);
      });
    });
  }

  findById(id: string, options: SortPagination = new SortPagination()): Promise<T[]> {
    return this.findByQuery({ _id: id }, options);
  }

  findAll(options: SortPagination = new SortPagination()): Promise<T[]> {
    return this.findByQuery({}, options);
  }

  findByQuery(query: any, sortPagination: SortPagination = new SortPagination()): Promise<T[]> {
    return this.findByQueryProjection(query, {}, sortPagination);
  }

  //return type any because options has projection property which can define
  //custom fields set to resulting object thus result may differ from T
  findByQueryProjection(query: any, projection: any, sortPagination: SortPagination = new SortPagination()): Promise<any[]> {
    return new Promise<any[]>((resolve: Function, reject: Function) => {
      let queryBuilder = this.connection.getDb()
        .find(query, projection);

      if (sortPagination.sort) {
        queryBuilder.sort(sortPagination.sort);
      }
      if (sortPagination.skip) {
        queryBuilder.skip(sortPagination.skip);
      }
      if (sortPagination.limit) {
        queryBuilder.limit(sortPagination.limit);
      }

      queryBuilder.exec(function(err: any, docs: T[]) {
        if (err) {
          return reject(err);
        }
        resolve(docs);
      });
    });
  }
}

export interface Repository<T extends Id> {

  save(entity: T): Promise<T>;

  updateById(id: string, newFields: any, options?: any): Promise<number>;

  findById(id: string, options?: SortPagination): Promise<T[]>;

  findAll(options?: SortPagination): Promise<T[]>;

  findByQuery(query: any, options?: SortPagination): Promise<T[]>;

  findByQueryProjection(query: any, projection: any, sortPagination?: SortPagination): Promise<any[]>;
}

export class SortPagination {

  constructor(
    public sort: any = null,
    public skip: number = 0,
    public limit: number = 20
  ) { }
}
