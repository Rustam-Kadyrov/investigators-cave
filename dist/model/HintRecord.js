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
var HintRecord = /** @class */ (function (_super) {
    __extends(HintRecord, _super);
    function HintRecord(type, payload) {
        if (type === void 0) { type = HintType.TEXT; }
        var _this = _super.call(this) || this;
        _this.type = type;
        _this.payload = payload;
        return _this;
    }
    return HintRecord;
}(Id_1.Id));
exports.HintRecord = HintRecord;
var HintType;
(function (HintType) {
    HintType[HintType["TEXT"] = 0] = "TEXT";
    HintType[HintType["URL"] = 1] = "URL";
    HintType[HintType["IMAGE"] = 2] = "IMAGE";
    HintType[HintType["VIDEO"] = 3] = "VIDEO";
})(HintType = exports.HintType || (exports.HintType = {}));
//# sourceMappingURL=HintRecord.js.map