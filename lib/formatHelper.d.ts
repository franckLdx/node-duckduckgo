import { StdOptionValues } from './optionHelper';
export declare type allowedFormat = 'json' | 'xml';
export interface IFormatter {
    buildQueryParam(builder: any): void;
    getFormat(): allowedFormat;
}
export declare function getFormatter(format: allowedFormat): IFormatter;
export declare class JsonFormatter implements IFormatter {
    private readonly format;
    private prettify;
    pretty: StdOptionValues;
    buildQueryParam(builder: any): void;
    getFormat(): allowedFormat;
}
export declare class XmlFormatter implements IFormatter {
    private readonly format;
    buildQueryParam(builder: any): void;
    getFormat(): allowedFormat;
}
