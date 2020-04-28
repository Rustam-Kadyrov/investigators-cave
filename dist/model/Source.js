"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Source = /** @class */ (function () {
    function Source(_type, _payload) {
        this._type = _type;
        this._payload = _payload;
    }
    Object.defineProperty(Source.prototype, "type", {
        get: function () {
            return this._type.toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Source.prototype, "payload", {
        get: function () {
            return this._payload;
        },
        enumerable: true,
        configurable: true
    });
    Source.prototype.createLink = function (url) {
        return new Source(SourceType.LINK, url);
    };
    Source.prototype.createText = function (text) {
        return new Source(SourceType.TEXT, text);
    };
    Source.prototype.createVideo = function (url) {
        return new Source(SourceType.VIDEO, url);
    };
    return Source;
}());
exports.Source = Source;
var SourceType;
(function (SourceType) {
    SourceType[SourceType["LINK"] = 0] = "LINK";
    SourceType[SourceType["TEXT"] = 1] = "TEXT";
    SourceType[SourceType["VIDEO"] = 2] = "VIDEO";
})(SourceType || (SourceType = {}));
//# sourceMappingURL=Source.js.map