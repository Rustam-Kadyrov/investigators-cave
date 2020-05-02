"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var os = __importStar(require("os"));
var homeDir = os.homedir();
var Connection = /** @class */ (function () {
    function Connection(dbFolderName, dbFileName, inMemoryOnly) {
        if (dbFolderName === void 0) { dbFolderName = "investigators_cave"; }
        if (dbFileName === void 0) { dbFileName = "projects.db"; }
        if (inMemoryOnly === void 0) { inMemoryOnly = false; }
        this.dbFolderName = dbFolderName;
        this.dbFileName = dbFileName;
        this.inMemoryOnly = inMemoryOnly;
    }
    Connection.prototype.connect = function () {
        if (!(this.db)) {
            var dbFolder;
            var options;
            if (!(this.inMemoryOnly)) {
                dbFolder = this.ensureDatabaseFile(homeDir, this.dbFolderName);
                options = { filename: path.join(dbFolder, this.dbFileName) };
            }
            else {
                options = { inMemoryOnly: this.inMemoryOnly };
            }
            var Datastore = require('nedb');
            this.db = new Datastore(options);
            this.db.loadDatabase();
            this.dbFolder = dbFolder;
        }
        return this.dbFolder;
    };
    Connection.prototype.getDb = function () {
        return this.db;
    };
    Connection.prototype.ensureDatabaseFile = function (homeDir, dbName) {
        var dbFolder = path.join(homeDir, dbName);
        if (!fs.existsSync(dbFolder)) {
            fs.mkdirSync(dbFolder);
        }
        return dbFolder;
    };
    return Connection;
}());
exports.Connection = Connection;
//# sourceMappingURL=Connection.js.map