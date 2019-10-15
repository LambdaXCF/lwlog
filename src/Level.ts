import {PaddingUtil} from "./Padding";

export type LogLevel = {
    name: string,
    color: string,
    icon: string,
}

export class LogLevelUtil {

    static create(name: string, color: string, icon: string): LogLevel {
        PaddingUtil.reserveName(name);

        return { name, color, icon };
    }

    public static register(name: string, color: string = '#669999', icon: string = '\u2139'): void {
        Levels[name] = this.create(name, color, icon);
    }

}

type LevelMapper = {
    Info: LogLevel,
    Trace: LogLevel,
    Error: LogLevel,
    Warn: LogLevel,
    Success: LogLevel,

    [level: string]: LogLevel,
}

export const Levels: LevelMapper = {
    Info:       LogLevelUtil.create('Info', '#2196F3', '\u2139'),
    Trace:      LogLevelUtil.create('Trace', '#FF3D00', '\u279C'),
    Error:      LogLevelUtil.create('Error', '#F44336', '\u2613'),
    Warn:       LogLevelUtil.create('Warning', '#FF9800', '\u26A0'),
    Success:    LogLevelUtil.create('Success', '#4CAF50', '\u2713'),
};