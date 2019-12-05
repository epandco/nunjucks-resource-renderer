import { ResourceRenderer, ApiResponse, TemplateResponse, ResourceError } from 'resource-decorator';
export declare class NunjucksResourceRenderer implements ResourceRenderer {
    contentType: string;
    private context?;
    private notFoundTemplate?;
    private expectedErrorTemplate?;
    private fatalErrorTemplate?;
    private unauthorizedTemplate?;
    constructor(baseTemplatePath: string, context?: object, notFoundTemplate?: string, expectedErrorTemplate?: string, fatalErrorTemplate?: string, unauthorizedTemplate?: string);
    ok(model?: ApiResponse | TemplateResponse): Promise<string>;
    notFound(): Promise<string>;
    expectedError(err: ResourceError): Promise<string>;
    fatalError(msg: string): Promise<string>;
    unauthorized(): Promise<string>;
}
