import * as dotenv from 'dotenv';

dotenv.config();

function getEnvironmentValue(name: string): string {
  if (process.env[name]) {
    return process.env[name] as string;
  }

  console.log(`Environment variable: ${name} is not set. If using dotenv please check your .env file`);
  return '';
}

export const nunjucksBaseTemplatePath = getEnvironmentValue('NUNJUCKS_TEMPLATE_BASE_PATH');
export const nunjucksNotFoundTemplate = getEnvironmentValue('NUNJUCKS_TEMPLATE_NOT_FOUND');
export const nunjucksExpectedErrorTemplate = getEnvironmentValue('NUNJUCKS_TEMPLATE_ERROR');
export const nunjucksUnexpectedErrorTemplate = getEnvironmentValue('NUNJUCKS_TEMPLATE_UNEXPECTED_ERROR');
export const nunjucksUnauthorizedTemplate = getEnvironmentValue('NUNJUCKS_TEMPLATE_UNAUTHORIZED');
