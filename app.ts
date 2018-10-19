const chalk = require('chalk');

let scopePadding: {[key:number]:number} = {};

let namesPadding: number = 0;

export default class Logger {

    private scopes: string[];
    pad: boolean;

    private constructor(scopes: string[], pad = false) {
        this.scopes = scopes;

        for(let i = 0; i < scopes.length; i++) {
            if(!scopePadding[i])
                scopePadding[i] = scopes[i].length;

            if(scopePadding[i] < scopes[i].length)
                scopePadding[i] = scopes[i].length;
        }

        this.pad = pad;
    }

    public static scope(...scopes: string[]): Logger {
        return new Logger(scopes, true);
    }

    public log(level: LogLevel, data: string): Logger {

        if(this.pad)
            for(let i = 0; i < this.scopes.length; i++)
                while(this.scopes[i].length < scopePadding[i])
                    this.scopes[i] += '.';

        let scoped: string = chalk.grey('[' + this.scopes.join('][') + ']');
        let name: string = level.name;
        while(name.length < namesPadding)
            name += ' ';
        process.stdout.write(`${scoped} ${chalk.hex(level.color)(level.icon + ' ' + name)} ${data}\n`);
        return this;
    }

    public error(error: Error): Logger {
        this.log(Levels.ERROR, error.message);
        let trace: string[] = error.stack.replace('at', '').replace(/ {4,}/g, '').split('\n');
        trace.splice(0, 1);
        for(let i = 0; i < trace.length; i++)
            this.log(Levels.TRACE, (i === 0 ? 'at ' : '') + trace[i])
        return this;
    }

    public info:    (data: string) => Logger = (data: string) => this.log(Levels.INFO   , data);
    public warn:    (data: string) => Logger = (data: string) => this.log(Levels.WARN   , data);
    public success: (data: string) => Logger = (data: string) => this.log(Levels.SUCCESS, data);
    public trace:   (data: string) => Logger = (data: string) => this.log(Levels.TRACE  , data);

}


class LogLevel {
    color: string;
    icon: string;
    name: string;


    constructor(name: string, color: string, icon: string) {
        this.color = color;
        this.icon = icon;
        this.name = name;
    }
}

export const Levels = {
    INFO: new LogLevel('Info', '#2196F3', '\u2139'),
    WARN: new LogLevel('Warning', '#FF9800', '\u26A0'),
    SUCCESS: new LogLevel('Success', '#4CAF50', '\u2713'),
    ERROR: new LogLevel('Error', '#F44336', '\u274C'),
    TRACE: new LogLevel('Trace', '#FF3D00', '\u279C'),
};

for(let i of Object.keys(Levels))
    if(Levels[i].name.length > namesPadding)
        namesPadding = Levels[i].name.length;