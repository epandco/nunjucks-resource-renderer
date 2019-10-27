import * as nunjucks from 'nunjucks';
import * as path from 'path';

import { ResourceRenderer, ApiResponse, TemplateResponse, ResourceError } from 'resource-decorator';



export class NunjucksResourceRenderer implements ResourceRenderer {
  public contentType: string = 'text/html';

  private context?: object;
  private notFoundTemplate?: string;
  private expectedErrorTemplate?: string;
  private fatalErrorTemplate?: string;
  private unauthorizedTemplate?: string;

  constructor(
    baseTemplatePath: string,
    context?: object, 
    notFoundTemplate?: string,
    expectedErrorTemplate?: string, 
    fatalErrorTemplate?: string,
    unauthorizedTemplate?: string
  ) {
    this.context = context;
    this.notFoundTemplate = notFoundTemplate;
    this.expectedErrorTemplate = expectedErrorTemplate;
    this.fatalErrorTemplate = fatalErrorTemplate;
    this.unauthorizedTemplate = unauthorizedTemplate;

    nunjucks.configure(path.resolve(baseTemplatePath), { autoescape: true });
  }

  async ok(model?: ApiResponse | TemplateResponse): Promise<string> {
    if (!model) {
      throw Error('Model must be set');
    }

    if (!(model instanceof TemplateResponse)) {
      throw Error(`This model must be an isntance of ResourceTemplateContent. Currently the type is ${typeof model}`);
    }

    // In case of collisions the context should win
    const modelPlusContext = { ...model, ...this.context };
    const template = nunjucks.render(model.template, modelPlusContext);
    return template;
  }

  async notFound(): Promise<string> {
    if (!this.notFoundTemplate) {
      throw new Error('No template provided for not found errors.');
    }

    const template = nunjucks.render(this.notFoundTemplate);
    return template;
  }

  async expectedError(err: ResourceError): Promise<string> {
    if (!this.expectedErrorTemplate) {
      throw new Error('No template provided for expected errors.');
    }
    const template = nunjucks.render(this.expectedErrorTemplate, err);
    return template;

  }

  async fatalError(msg: string): Promise<string> {
    if (!this.fatalErrorTemplate) {
      throw new Error('No template provided for fatal errors.');
    }

    const template = nunjucks.render(this.fatalErrorTemplate, { msg: msg });
    return template;
  }

  async unauthorized(): Promise<string> {
    if (!this.unauthorizedTemplate) {
      throw new Error('No template provided unauthorized errors.');
    }

    const template = nunjucks.render(this.unauthorizedTemplate);
    return template;
  }
}