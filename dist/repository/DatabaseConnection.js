"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
function ensureDatabase(homedir, dbName) {
    var dbFolder = path_1.default.join(homedir, dbName);
    if (!fs_1.default.existsSync(dbFolder)) {
        fs_1.default.mkdirSync(dbFolder);
    }
}
var homeDir = require('os').homedir();
var dbName = "db_inv_cave";
ensureDatabase(homeDir, dbName);
var Datastore = require('nedb'), db = new Datastore({ filename: 'path/to/datafile' });
db.loadDatabase(function (err) {
    // Now commands will be executed
});
//# sourceMappingURL=DatabaseConnection.js.map