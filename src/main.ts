import chalk from 'chalk';
import {Levels, LogLevel} from "./Level";
import {PaddingUtil} from "./Padding";

interface NestLoggerService {
    log(message: any, context?: string);
    error(message: any, trace?: string, context?: string);
    warn(message: any, context?: string);
    debug?(message: any, context?: string);
    verbose?(message: any, context?: string);
}

export class Logger implements NestLoggerService {

    private context: string[];

    constructor(context?: string | string[], private isTimestampEnabled = false) {
        context = context || "App";

        if(Array.isArray(context)) {
            for (let i = 0; i < context.length; i++)
                PaddingUtil.reserveScope(i, context[i]);

            this.context = context;
        } else {
            PaddingUtil.reserveScope(0, context);
            this.context = [context];
        }
    }

    trace(error: Error, context?: string | string[]) {
        this.error(`Error: ${error.message}`, undefined, context || this.context);

        let stack = error.stack.replace(/\s{2}at\s/g, '').split('\n');

        stack.shift();

        stack.forEach(x => this.print(Levels.Trace, x, context || this.context));
    }

    error(message: any, trace?: string, context?: string | string[]) {
        return this.print(Levels.Error, message, context || this.context);
    }

    log(message: any, context?: string | string[]) {
        return this.print(Levels.Info, message, context || this.context);
    }

    warn(message: any, context?: string | string[]) {
        return this.print(Levels.Warn, message, context || this.context);
    }

    success(message: any, context?: string | string[]) {
        return this.print(Levels.Success, message, context || this.context);
    }

    print(level: LogLevel, message: any, context: string | string[]): void {
        let ctx: string[] = Array.isArray(context) ? context : [context];

        let result = chalk.gray(PaddingUtil.applyScopesPadding(ctx)) + chalk.hex(level.color)(PaddingUtil.applyPaddingToName(level)) + chalk.reset(message);

        process.stdout.write(result + '\n');
    }

}