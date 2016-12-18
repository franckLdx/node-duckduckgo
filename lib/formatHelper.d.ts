export declare type allowedFormat = "json" | "xml";
export interface IFormater {
    getFormatQueryParam(): string;
    toAllowedFormat(): allowedFormat;
}
export declare function getFormatter(format: allowedFormat): IFormater;
export declare class JsonFormat implements IFormater {
    private readonly format;
    private prettifyResult;
    getFormatQueryParam(): string;
    pretty: 0 | 1;
    toAllowedFormat(): allowedFormat;
}
export declare class XmlFormat implements IFormater {
    private readonly format;
    getFormatQueryParam(): string;
    toAllowedFormat(): allowedFormat;
}
