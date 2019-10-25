import * as nunjucks from 'nunjucks';
import * as config from './config';
import * as path from 'path';

import { ResourceRenderer, ResourceTemplateContent, ResourceError } from 'resource-decorator';


nunjucks.configure(path.resolve(config.nunjucksBaseTemplatePath), { autoescape: true });

class NunjucksResourceRenderer implements ResourceRenderer {
  contentType: string = 'text/html';

  async ok(model?: ResourceTemplateContent): Promise<string> {
    if (!model) {
      throw Error('Model must be set');
    }

    if (!(model instanceof ResourceTemplateContent)) {
      throw Error(`This model must be an isntance of ResourceTemplateContent. Currently the type is ${typeof model}`);
    }

    const template = nunjucks.render(model.template, model.content as object);
    return template;
  }

  async notFound(): Promise<string> {
    const template = nunjucks.render(config.nunjucksNotFoundTemplate);
    return template;
  }

  async expectedError(err: ResourceError): Promise<string> {
    const template = nunjucks.render(config.nunjucksExpectedErrorTemplate, err);
    return template;
  }

  async unexpectedError(msg: string): Promise<string> {
    const template = nunjucks.render(config.nunjucksUnexpectedErrorTemplate, { msg: msg });
    return template;
  }

  async unauthorized(): Promise<string> {
    const template = nunjucks.render(config.nunjucksUnauthorized);
    return template;
  }

}

const nunjucksResourceRenderer = new NunjucksResourceRenderer();
export { nunjucksResourceRenderer };