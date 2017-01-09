import { optionType } from "./optionHelper";
export declare type allowedFormat = "json" | "xml";
export interface IFormatter {
    buildQueryParam(builder: any): void;
    getFormat(): allowedFormat;
}
export declare function getFormatter(format: allowedFormat): IFormatter;
export declare class JsonFormat implements IFormatter {
    private readonly format;
    private prettify;
    pretty: optionType;
    buildQueryParam(builder: any): void;
    getFormat(): allowedFormat;
}
export declare class XmlFormat implements IFormatter {
    private readonly format;
    buildQueryParam(builder: any): void;
    getFormat(): allowedFormat;
}
