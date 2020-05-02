"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var Project_1 = require("../model/Project");
function ensureDatabase(homeDir, dbName) {
    var dbFolder = path_1.default.join(homeDir, dbName);
    if (!fs_1.default.existsSync(dbFolder)) {
        fs_1.default.mkdirSync(dbFolder);
    }
    return dbFolder;
}
var homeDir = require('os').homedir();
var dbName = "investigators_cave";
var dbFolder = ensureDatabase(homeDir, dbName);
var Datastore = require('nedb');
var db = new Datastore({ filename: path_1.default.join(dbFolder, 'projects.db'), autoload: true });
var p = new Project_1.Project("Some", "Descr");
db.insert(p, function (err, newDoc) {
    console.error(err);
});
//# sourceMappingURL=DataBaseConnection.js.map