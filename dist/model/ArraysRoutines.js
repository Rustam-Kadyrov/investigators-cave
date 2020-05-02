"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArraysRoutines;
(function (ArraysRoutines) {
    function removeItemFromListByUuid(from, uuid) {
        return from.filter(function (f) { return f.uuid !== uuid; });
    }
    ArraysRoutines.removeItemFromListByUuid = removeItemFromListByUuid;
})(ArraysRoutines = exports.ArraysRoutines || (exports.ArraysRoutines = {}));
//# sourceMappingURL=ArraysRoutines.js.map