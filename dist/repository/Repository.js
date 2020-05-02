"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RepositoryImpl = /** @class */ (function () {
    function RepositoryImpl(connection) {
        this.connection = connection;
    }
    RepositoryImpl.prototype.save = function (entity, succCallback, errCallback) {
        if (succCallback === void 0) { succCallback = function () { }; }
        if (errCallback === void 0) { errCallback = function () { }; }
        this.connection.connect();
        this.connection.getDb().insert(entity, function (err, newDoc) {
            if (err) {
                errCallback(err);
            }
            else {
                succCallback(newDoc);
            }
        });
    };
    RepositoryImpl.prototype.findAll = function (succCallbak) {
        this.connection.connect();
        this.connection.getDb().find({}, function (err, docs) {
            succCallbak(docs);
        });
    };
    return RepositoryImpl;
}());
exports.RepositoryImpl = RepositoryImpl;
//# sourceMappingURL=Repository.js.map