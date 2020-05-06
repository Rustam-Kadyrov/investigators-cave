import * as fs from "fs";
import * as path from "path";
import * as os from "os";

const homeDir: string = os.homedir();

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
  private dbFolder: string;

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

  connect(): string {
    if (!(this.db)) {
      var dbFolder: string;
      var options: any;
      if (!(this.inMemoryOnly)) {
        dbFolder = this.ensureDatabaseFile(homeDir, this.dbFolderName);
        options = { filename: path.join(dbFolder, this.dbFileName) }
      } else {
        options = { inMemoryOnly: this.inMemoryOnly };
      }
      var Datastore = require('nedb');
      this.db = new Datastore(options);
      this.db.loadDatabase();
      this.dbFolder = dbFolder;
    }
    return this.dbFolder;
  }

  getDb(): any {
    return this.db;
  }

  private ensureDatabaseFile(homeDir: string, dbName: string): string {
    var dbFolder = path.join(homeDir, dbName);
    if (!fs.existsSync(dbFolder)) {
      fs.mkdirSync(dbFolder);
    }
    return dbFolder
  }
}

export interface Connection {

  connect(): string;
  getDb(): any;
}
