var webdriver = require('selenium-webdriver');
require('./specHelper')

var browser = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.phantomjs()).
    usingServer('http://localhost:4444').
    build();

browser.manage().timeouts().implicitlyWait(2000);

jasmine.getEnv().defaultTimeoutInterval = 3000;

var element_finder = function(locator) {
    return function() {
        return browser.findElement(locator);
    };
};

var el = {
    username_field:    element_finder({id: 'login_username'}),
    password_field:    element_finder({id: 'login_password'}),
    login_button:      element_finder({linkText: 'Open Passwords'}),
    error:             element_finder({css: 'span.error'}),
    link_to_generator: element_finder({partialLinkText: 'Generator'}),
    description:       element_finder({tagName: 'h4'}),
    security_description_button: element_finder({css: 'a.ui-icon-info'}),
    security_heading:  element_finder({css: '.text > h3'}),
    generate_button:   element_finder({linkText: 'Generate'}),
    back_button:       element_finder({linkText: 'Back'}),
    generator_password_field: element_finder({css:'span[data-bind="text: password"]'}),
    new_entry_button:  element_finder({linkText: 'New Entry'})
};


var login = function(username, password) {
    el.username_field().sendKeys(username);
    el.password_field().sendKeys(password);
    el.login_button().click();
    return browser.sleep(400);
};

var login_correctly = function() {
    return login("integration_tester", "abcd");
}

var login_with_wrong_password = function() {
    return login("integration_tester", "wrong_password");
}

var login_without_password = function() {
    return login("integration_tester", "");
}

var shows_an_error = function(error_msg) {
    return el.error().getText().then(function(text) {
        expect(text).toMatch(error_msg);
    });
};


describe("The starting page", function() {
    beforeEach(function() {
        browser.get("http://localhost:8080");
        this.generator_button = el.link_to_generator();
        this.description = el.description();
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
        var security_description_button = el.security_description_button();
        var heading = el.security_heading();
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
    
    it("shows an error, when the password is wrong", function(done) {
        login_with_wrong_password().then(function() {
            shows_an_error(/password is incorrect/).then(function() {
                done();
            });
        });
    });
    
    it("shows an error, when no password is entered", function(done) {
        login_without_password().then(function() {
            shows_an_error(/Password is missing./).then(function() {
                done();
            });
        });
    });
});

describe("The Generator page", function() {
    beforeEach(function() {
        browser.get("http://localhost:8080/#generator")
        this.generate_button = el.generate_button();
        this.back_button = el.back_button();
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
            this.button = el.generate_button();       
            this.passwordField = el.generator_password_field();
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

describe("The Password page", function() {
    beforeEach(function() {
       browser.get("http://localhost:8080");
       login_correctly();
    });

    it("has the title 'Passwords'", function(done) {
        browser.getTitle().then(function(title) {
            expect(title).toEqual("Passwords");
            done();
        });
    });
    
   describe("The 'New Entry' page", function() {
       beforeEach(function() {
           el.new_entry_button().click();
       });
       
       it("has the title 'New Entry'", function(done) {
           browser.getTitle().then(function(title) {
               expect(title).toEqual('New Entry');
               done();
           })
       });
   });
});