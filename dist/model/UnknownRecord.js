"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Id_1 = require("./Id");
var UnknownRecord = /** @class */ (function (_super) {
    __extends(UnknownRecord, _super);
    function UnknownRecord(label, hints) {
        if (hints === void 0) { hints = []; }
        var _this = _super.call(this) || this;
        _this.label = label;
        _this.hints = hints;
        return _this;
    }
    return UnknownRecord;
}(Id_1.Id));
exports.UnknownRecord = UnknownRecord;
//# sourceMappingURL=UnknownRecord.js.map