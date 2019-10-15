import {LogLevel} from "./Level";

export class PaddingUtil {

    private static namePadding: number = 0;
    private static scopePadding: number[] = [];
    private static padMissingScopes: boolean = false;

    static padMissing(): void {
        this.padMissingScopes = true;
    }

    static reserveScopes(scopes: string[][]): void {
        for(let i = 0; i < scopes.length; i++)
            this.reserveScope(i, scopes[i].map(x=>x.length).sort().reverse()[0])
    }

    static reserveScope(index: number, scope: string | number): void {
        if(!this.scopePadding[index])
            this.scopePadding[index] = 1;

        let length = typeof scope === "string" ? scope.length : scope;

        if(this.scopePadding[index] < length)
            this.scopePadding[index] = length;
    }

    static applyScopePadding(context: string, index: number): string {
        let result = context;

        let i = 0;
        while(result.length < this.scopePadding[index])
            result = i++ % 2 === 0 ? ' ' + result : result + ' ';

        return `[${result}]`;
    }

    static applyScopesPadding(context: string[]): string {
        let result = '';

        for(let i = 0; i < context.length; i++)
            result += this.applyScopePadding(context[i], i);

        if(this.padMissingScopes)
            while(result.length < this.scopePadding.length * 2 + this.scopePadding.reduce((a,b)=>a+b))
                result += ' ';

        return result;
    }

    static reserveName(name: string): void {
        if(PaddingUtil.namePadding < name.length)
            PaddingUtil.namePadding = name.length;
    }

    static applyPaddingToName(level: LogLevel): string {
        let result = level.name;

        while(result.length < this.namePadding)
            result += ' ';

        return ` ${level.icon} ${result} `;
    }

}