"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
function getEnvironmentValue(name) {
    if (process.env[name]) {
        return process.env[name];
    }
    console.log(`Environment variable: ${name} is not set. If using dotenv please check your .env file`);
    return '';
}
exports.nunjucksBaseTemplatePath = getEnvironmentValue('NUNJUCKS_TEMPLATE_BASE_PATH');
exports.nunjucksNotFoundTemplate = getEnvironmentValue('NUNJUCKS_TEMPLATE_NOT_FOUND');
exports.nunjucksExpectedErrorTemplate = getEnvironmentValue('NUNJUCKS_TEMPLATE_ERROR');
exports.nunjucksUnexpectedErrorTemplate = getEnvironmentValue('NUNJUCKS_TEMPLATE_UNEXPECTED_ERROR');
exports.nunjucksUnauthorizedTemplate = getEnvironmentValue('NUNJUCKS_TEMPLATE_UNAUTHORIZED');
//# sourceMappingURL=config.js.map