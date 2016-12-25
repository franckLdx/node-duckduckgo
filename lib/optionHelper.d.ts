export declare type optionType = 0 | 1 | undefined;
export declare class OptionHelper {
    private name;
    private value;
    constructor(name: string);
    option: optionType;
    buildQueryParam(builder: any): void;
}
