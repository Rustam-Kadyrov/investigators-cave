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
var Project = /** @class */ (function (_super) {
    __extends(Project, _super);
    function Project(title, description, known, unknown, checkList, tags, freeDrawPlanes) {
        if (known === void 0) { known = []; }
        if (unknown === void 0) { unknown = []; }
        if (checkList === void 0) { checkList = []; }
        if (tags === void 0) { tags = []; }
        if (freeDrawPlanes === void 0) { freeDrawPlanes = []; }
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.description = description;
        _this.known = known;
        _this.unknown = unknown;
        _this.checkList = checkList;
        _this.tags = tags;
        _this.freeDrawPlanes = freeDrawPlanes;
        return _this;
    }
    return Project;
}(Id_1.Id));
exports.Project = Project;
//# sourceMappingURL=Project.js.map