export declare class OptionHelper<OptionType> {
    private name;
    private value?;
    constructor(name: string, value?: OptionType);
    option: OptionType;
    buildQueryParam(builder: any): void;
}
export declare type StdOptionValues = 0 | 1 | undefined;
export declare type SafeSearchValues = 1 | -1 | -2;
