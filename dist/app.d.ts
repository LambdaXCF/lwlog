export declare class Logger {
    private scopes;
    pad: boolean;
    private constructor();
    static scope(...scopes: string[]): Logger;
    log(level: LogLevel, data: string): Logger;
    error(error: Error): Logger;
    info: (data: string) => Logger;
    warn: (data: string) => Logger;
    success: (data: string) => Logger;
    trace: (data: string) => Logger;
}
declare class LogLevel {
    color: string;
    icon: string;
    name: string;
    constructor(name: string, color: string, icon: string);
}
export declare const Levels: {
    INFO: LogLevel;
    WARN: LogLevel;
    SUCCESS: LogLevel;
    ERROR: LogLevel;
    TRACE: LogLevel;
};
export {};
