import { allowedFormat } from "./formatHelper";
export declare class Requester {
    private appName;
    private baseUrl;
    private formater;
    constructor(appName?: string);
    serverUrl: string;
    format: allowedFormat;
    request(request: string): void;
}
