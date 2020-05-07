import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import { homedir } from 'os';

/**
 * class ConnectionImpl
 * Incapsulates nedb Datastore using interface.
 * Connection can reference to in-memory database or to a file storage
 * To build connection use static methods
 *      for in-memory mode:   ConnectionImpl.getConnectionInMemory
 *      for file mode:        ConnectionImpl.getConnectionPersisted
 *
 * author: Rustam Kadyrov, 2020
 * github: https://github.com/Rustam-Kadyrov
 *
 */
export class ConnectionImpl implements Connection {

  private db: any;
  private dbFileFilePath: string;

  static getConnectionPersisted(
    dbFolderName: string,
    dbFileName: string): Connection {
    return new ConnectionImpl(dbFolderName, dbFileName);
  }

  static getConnectionInMemory() {
    return new ConnectionImpl("", "", true);
  }

  constructor(
    private dbFolderName: string = "investigators_cave",
    private dbFileName: string = "projects.db",
    private inMemoryOnly: boolean = false
  ) { }

  connect() {
    if (!(this.db)) {
      var filePath: string;
      var options: any;
      if (!(this.inMemoryOnly)) {
        filePath = join(this.ensureDatabaseFile(homedir(), this.dbFolderName), this.dbFileName);
        options = { filename: filePath }
      } else {
        options = { inMemoryOnly: this.inMemoryOnly };
      }
      var Datastore = require('nedb');
      this.db = new Datastore(options);
      this.db.loadDatabase();
      this.dbFileFilePath = filePath;
    }
  }

  getDb(): any {
    return this.db;
  }

  getDbFileFilePath(): string {
    return this.dbFileFilePath;
  }

  private ensureDatabaseFile(homeDir: string, dbName: string): string {
    var dbFolder = join(homeDir, dbName);
    if (!existsSync(dbFolder)) {
      mkdirSync(dbFolder);
    }
    return dbFolder
  }
}

export interface Connection {
  connect(): void;
  getDb(): any;
  getDbFileFilePath(): string;
}
