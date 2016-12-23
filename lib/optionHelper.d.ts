export declare type allowedOptionValue = 0 | 1 | undefined;
export declare class OptionHelper {
    private name;
    private value;
    constructor(name: string);
    option: allowedOptionValue;
    buildQueryParam(builder: any): void;
}
