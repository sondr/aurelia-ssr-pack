"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = void 0;
require("./reflect");
require("./property-descriptor");
const transformers_1 = require("./transformers");
const cleanup_1 = require("./cleanup");
function render(options, initOptions) {
    if (!options.url) {
        throw new Error('url is required when calling render()');
    }
    if (!options.template) {
        throw new Error('template is required when calling render()');
    }
    if (!initOptions.main) {
        throw new Error('main property is required');
    }
    // this allows you to see aurelia logging in cmd/terminal
    // logging a lot of messages isn't good for performance though
    // so we need to set the loglevel in the app to something other than debug
    console.debug = console.log;
    // we'll want new instances of aurelia-pal and aurelia-pal-nodejs
    // because aurelia-pal holds the reference to the DOM
    delete require.cache[require('aurelia-pal')];
    delete require.cache[require('../pal-nodejs')];
    // delete require.cache[require.resolve('aurelia-pal')];
    // delete require.cache[require.resolve('../pal-nodejs')];
    //delete require.cache[require.resolve('aurelia-pal-nodejs')];
    return start(initOptions, options.url.toString(), options.headers)
        .then((ctx) => {
        const document = ctx.pal.DOM.global.document;
        setInputDefaultValues(document.body);
        const html = (0, transformers_1.transform)({ aurelia: ctx.aurelia, document }, options);
        ctx.stop();
        (0, cleanup_1.cleanup)(options);
        return html;
    });
}
exports.render = render;
// <input> .value property does not map to @value attribute, .defaultValue does.
// so we need to copy that value over if we want it to serialize into HTML <input value="">
// without this there isn't a value attribute on any of the input tags
function setInputDefaultValues(body) {
    const inputTags = Array.prototype.slice.call(body.querySelectorAll('input'));
    for (let i = 0; i < inputTags.length; i++) {
        const input = inputTags[i];
        if (input.value != null) {
            input.defaultValue = input.value;
        }
    }
}
function start(options, requestUrl, headers) {
    const { initialize, start } = options.main();
    const { PLATFORM } = initialize();
    // url of jsdom should be equal to the request url
    // this dictates what page aurelia loads on startup
    PLATFORM.jsdom.reconfigure({ url: requestUrl });
    return typeof headers !== 'undefined' ? start(headers) : start();
}
//# sourceMappingURL=aurelia-ssr-engine.js.map