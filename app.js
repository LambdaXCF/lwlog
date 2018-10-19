"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stream = require("stream");
var chalk = require('chalk');
var writer = new stream.Readable({ read: function () { } });
var scopePadding = {};
var namesPadding = 0;
var Logger = /** @class */ (function () {
    function Logger(scopes, pad) {
        if (pad === void 0) { pad = false; }
        this.scopes = scopes;
        for (var i = 0; i < scopes.length; i++) {
            if (!scopePadding[i])
                scopePadding[i] = scopes[i].length;
            if (scopePadding[i] < scopes[i].length)
                scopePadding[i] = scopes[i].length;
        }
        this.pad = pad;
        /*for(let s of scopes)
            if(s.length > scopePadding)
                scopePadding = s.length;*/
    }
    Logger.scope = function () {
        var scopes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            scopes[_i] = arguments[_i];
        }
        return new Logger(scopes, true);
    };
    Logger.prototype.log = function (level, data) {
        if (this.pad)
            for (var i = 0; i < this.scopes.length; i++)
                while (this.scopes[i].length < scopePadding[i])
                    this.scopes[i] += '.';
        var scoped = chalk.grey('[' + this.scopes.join('][') + ']');
        var name = level.name;
        while (name.length < namesPadding)
            name += ' ';
        process.stdout.write(scoped + " " + chalk.hex(level.color)(level.icon + ' ' + name) + " " + data + "\n");
        return this;
    };
    Logger.prototype.error = function (error) {
        this.log(exports.Levels.ERROR, error.message);
        var trace = error.stack.replace('at', '').replace(/ {4,}/g, '').split('\n');
        trace.splice(0, 1);
        for (var i = 0; i < trace.length; i++)
            this.log(exports.Levels.TRACE, (i === 0 ? 'at ' : '') + trace[i]);
        return this;
    };
    return Logger;
}());
exports.default = Logger;
var LogLevel = /** @class */ (function () {
    function LogLevel(name, color, icon) {
        this.color = color;
        this.icon = icon;
        this.name = name;
    }
    return LogLevel;
}());
exports.Levels = {
    INFO: new LogLevel('Info', '#2196F3', '\u2139'),
    WARN: new LogLevel('Warning', '#FF9800', '\u26A0'),
    SUCCESS: new LogLevel('Success', '#4CAF50', '\u2713'),
    ERROR: new LogLevel('Error', '#F44336', '\u274C'),
    TRACE: new LogLevel('Trace', '#FF3D00', '\u279C'),
};
for (var _i = 0, _a = Object.keys(exports.Levels); _i < _a.length; _i++) {
    var i = _a[_i];
    if (exports.Levels[i].name.length > namesPadding)
        namesPadding = exports.Levels[i].name.length;
}
var logger1 = Logger.scope("Database", "Web");
var logger2 = Logger.scope('Webserver', "Test");
logger1
    .log(exports.Levels.INFO, "Test")
    .log(exports.Levels.WARN, "Connection to database failed")
    .error(new Error('ENOENT, no such file or directory \'log\''));
logger2
    .log(exports.Levels.SUCCESS, "Successfully reconnected to database")
    .log(exports.Levels.ERROR, "ENOENT");
//# sourceMappingURL=app.js.map