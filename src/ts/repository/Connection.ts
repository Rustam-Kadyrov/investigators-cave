import * as fs from "fs";
import * as path from "path";
import * as os from "os";

const homeDir: string = os.homedir();

export class ConnectionImpl implements Connection {

  private db: any;
  private dbFolder: string;

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

interface Connection {

  connect(): string;
  getDb(): any;
}
