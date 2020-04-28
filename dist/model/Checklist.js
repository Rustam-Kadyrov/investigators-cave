"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Checklist = /** @class */ (function () {
    function Checklist(_checked, _label, _results, _updated) {
        if (_updated === void 0) { _updated = new Date(); }
        this._checked = _checked;
        this._label = _label;
        this._results = _results;
        this._updated = _updated;
    }
    Object.defineProperty(Checklist.prototype, "checked", {
        get: function () {
            return this._checked;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Checklist.prototype, "label", {
        get: function () {
            return this._label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Checklist.prototype, "results", {
        get: function () {
            return this._results;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Checklist.prototype, "updated", {
        get: function () {
            return this._updated;
        },
        enumerable: true,
        configurable: true
    });
    return Checklist;
}());
exports.Checklist = Checklist;
//# sourceMappingURL=Checklist.js.map