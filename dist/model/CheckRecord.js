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
var CheckRecord = /** @class */ (function (_super) {
    __extends(CheckRecord, _super);
    function CheckRecord(unknownUuid, status) {
        if (status === void 0) { status = CheckResult.NOT_SET; }
        var _this = _super.call(this) || this;
        _this.unknownUuid = unknownUuid;
        _this.status = status;
        return _this;
    }
    return CheckRecord;
}(Id_1.Id));
exports.CheckRecord = CheckRecord;
var CheckResult;
(function (CheckResult) {
    CheckResult[CheckResult["NOT_SET"] = 0] = "NOT_SET";
    CheckResult[CheckResult["LEARNED"] = 1] = "LEARNED";
    CheckResult[CheckResult["NO_MATTER"] = 2] = "NO_MATTER";
    CheckResult[CheckResult["TOO_COMPLICATED"] = 3] = "TOO_COMPLICATED";
})(CheckResult = exports.CheckResult || (exports.CheckResult = {}));
//# sourceMappingURL=CheckRecord.js.map