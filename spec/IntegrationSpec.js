var webdriver = require('selenium-webdriver');

var browser = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.phantomjs()).
    usingServer('http://localhost:4444').
    build();

jasmine.getEnv().defaultTimeoutInterval = 3000;

describe("The starting page", function() {
    beforeEach(function() {
        browser.get("http://localhost:8080");
    });
    it("has the title 'Safify'", function(done) {
        browser.getTitle().then(function(title) {
            expect(title).toEqual("Safify");
            done();
        });
    });
    it("has a link to the Generator", function(done) {
        el = browser.findElement(webdriver.By.partialLinkText('Generator'));
        el.getAttribute("href").then(function(href) {
            expect(href).toMatch(/.+\/#generator/);
            done();
        });
    });
});