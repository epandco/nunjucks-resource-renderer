"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nunjucks = require("nunjucks");
const path = require("path");
const resource_decorator_1 = require("resource-decorator");
class NunjucksResourceRenderer {
    constructor(baseTemplatePath, context, notFoundTemplate, expectedErrorTemplate, fatalErrorTemplate, unauthorizedTemplate) {
        this.contentType = 'text/html';
        this.context = context;
        this.notFoundTemplate = notFoundTemplate;
        this.expectedErrorTemplate = expectedErrorTemplate;
        this.fatalErrorTemplate = fatalErrorTemplate;
        this.unauthorizedTemplate = unauthorizedTemplate;
        nunjucks.configure(path.resolve(baseTemplatePath), { autoescape: true });
    }
    async ok(model) {
        if (!model) {
            throw Error('Model must be set');
        }
        if (!(model instanceof resource_decorator_1.TemplateResponse)) {
            throw Error(`This model must be an isntance of ResourceTemplateContent. Currently the type is ${typeof model}`);
        }
        // In case of collisions the context should win
        const modelPlusContext = { ...model, ...this.context };
        const template = nunjucks.render(model.template, modelPlusContext);
        return template;
    }
    async notFound() {
        if (!this.notFoundTemplate) {
            throw new Error('No template provided for not found errors.');
        }
        const template = nunjucks.render(this.notFoundTemplate);
        return template;
    }
    async expectedError(err) {
        if (!this.expectedErrorTemplate) {
            throw new Error('No template provided for expected errors.');
        }
        const template = nunjucks.render(this.expectedErrorTemplate, err);
        return template;
    }
    async fatalError(msg) {
        if (!this.fatalErrorTemplate) {
            throw new Error('No template provided for fatal errors.');
        }
        const template = nunjucks.render(this.fatalErrorTemplate, { msg: msg });
        return template;
    }
    async unauthorized() {
        if (!this.unauthorizedTemplate) {
            throw new Error('No template provided unauthorized errors.');
        }
        const template = nunjucks.render(this.unauthorizedTemplate);
        return template;
    }
}
exports.NunjucksResourceRenderer = NunjucksResourceRenderer;
//# sourceMappingURL=nunjucks-resource-renderer.js.map