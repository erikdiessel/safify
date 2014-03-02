var webdriver = require('selenium-webdriver');

var browser = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.phantomjs()).
    usingServer('http://localhost:4444').
    build();

jasmine.getEnv().defaultTimeoutInterval = 10000;

describe("The starting page", function() {
    beforeEach(function() {
        browser.get("http://localhost:8080");
    });
    it("Has the title 'Safify'", function(done) {
        browser.getTitle().then(function(title) {
            expect(title).toEqual("Safify");
            done();
        });
    });
});