var webdriver = require('selenium-webdriver');

var browser = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.phantomjs()).
    usingServer('http://localhost:4444').
    build();

browser.manage().timeouts().implicitlyWait(2000);

jasmine.getEnv().defaultTimeoutInterval = 3000;

describe("The starting page", function() {
    beforeEach(function() {
        browser.get("http://localhost:8080");
        this.generator_button = browser.findElement({partialLinkText: 'Generator'});
        this.description = browser.findElement({tagName: 'h4'});
    });
    it("has the title 'Safify'", function(done) {
        browser.getTitle().then(function(title) {
            expect(title).toEqual("Safify");
            done();
        });
    });
    it("has a link to the Generator", function(done) {
        this.generator_button.getAttribute("href").then(function(href) {
            expect(href).toMatch(/.+\/#generator/);
            done();
        });
    });
    it("has a description", function(done) {
       this.description.getText().then(function(text) {
           expect(text).toMatch(/Safify is a password manager app./);
           done();
       });
    });
    
    it("has security and data privacy information", function(done) {
        var security_description_button = browser.findElement({css: 'a.ui-icon-info'});
        var heading = browser.findElement({css: '.text > h3'});
        heading.isDisplayed().then(function(displayed) {
            expect(displayed).toBe(false);
        });
        security_description_button.getText().then(function(text) {
            expect(text).toMatch(/Security and Data Privacy/);    
        });
        security_description_button.click();
        browser.sleep(100);
        heading.getText().then(function(text) {
            expect(text).toEqual("We keep high standards in security.");    
        });
        heading.isDisplayed().then(function(displayed) {
            expect(displayed).toBe(true);
            done();
        });

    });
    
});

describe("The Generator page", function() {
    beforeEach(function() {
        browser.get("http://localhost:8080/#generator")
        this.generate_button = browser.findElement({partialLinkText: 'Generate'});
        this.back_button = browser.findElement({partialLinkText: 'Back'});
    });
    
    it("has the title 'Generator'", function(done) {
        browser.getTitle().then(function(title) {
            expect(title).toEqual("Generator");
            done();
        });    
    });
    
    it("has a 'Generate' button", function(done) {
        this.generate_button.getAttribute("href").then(function(href) {
            expect(href).toMatch(/.+\/#generate/);
            done();
        });
    });
    
    it("has a 'Back'-button", function(done) {
        this.back_button.getAttribute("href").then(function(href) {
            expect(href).toMatch(/.+\/#passwords/);
            done();
        });
    });
    
    describe("The Generator Button", function() {
        beforeEach(function() {
            this.button = browser.findElement(webdriver.By.partialLinkText('Generate'));        
            this.passwordField = browser.findElement({css:'span[data-bind="text: password"]'});
        });
        
        it("generates a new password when clicking on it", function(done) {
            var context = this;
            expect(context.button).toBeDefined();
            
            context.passwordField.getText().then(function(oldText) {
                expect(oldText).toMatch(/.+/);
                context.button.click();
                browser.sleep(100);
                context.passwordField.getText().then(function(newText) {
                    expect(newText).not.toEqual(oldText);
                    done();
                });
            });
        });    
    });
});