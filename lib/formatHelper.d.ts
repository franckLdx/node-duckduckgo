import { optionType } from "./optionHelper";
export declare type allowedFormat = "json" | "xml";
export interface IFormater {
    buildQueryParam(builder: any): void;
}
export declare function getFormatter(format: allowedFormat): IFormater;
export declare class JsonFormat implements IFormater {
    private readonly format;
    private prettify;
    pretty: optionType;
    buildQueryParam(builder: any): void;
}
export declare class XmlFormat implements IFormater {
    private readonly format;
    buildQueryParam(builder: any): void;
}
