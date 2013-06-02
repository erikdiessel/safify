// Generated by CoffeeScript 1.6.2
(function() {
  var Entry, Generator, LETTERS, List, Login, NUMBERS, Router, SPECIALCHARS, UPPERCASE, getLocalized, get_API_URL, letter, localization, random, router, routes, save_changes, setupRoutes,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  get_API_URL = function(path) {
    var baseURL;

    baseURL = 'https://fortressofkeys-api.herokuapp.com/';
    return baseURL + path;
  };

  save_changes = function() {
    return $.ajax({
      url: get_API_URL('passwords'),
      type: 'PUT',
      data: {
        password_list: sjcl.encrypt(model.login.client_password(), model.list.toJSON()),
        username: model.login.username(),
        password: model.login.server_password()
      },
      success: function(data, textStatus, jqXHR) {
        return console.log('successfully saved');
      }
    });
  };

  routes = {
    'new': function() {
      return model.list.new_current(model.list.entries().length);
    },
    'save-current': function() {
      model.list.save_current();
      save_changes();
      $.mobile.changePage("#passwords");
      return $('[data-role="listview"]').listview('refresh');
    },
    'edit~:index': function(index) {
      return model.list.new_current(index);
    },
    'delete-current': function() {
      model.list.delete_current();
      save_changes();
      return $.mobile.changePage("#passwords");
    },
    'details~:index': function(index) {
      return model.list.new_current(index);
    },
    'login-server': function() {
      return $.ajax({
        url: get_API_URL('passwords'),
        data: {
          username: model.login.username(),
          password: model.login.server_password()
        },
        success: function(data, textStatus, jqXHR) {
          var decrypted;

          decrypted = sjcl.decrypt(model.login.client_password(), data);
          model.list.fromJSON(decrypted);
          $.mobile.changePage('#passwords');
          return $('[data-role="listview"]').listview('refresh');
        }
      });
    },
    'register-server': function() {
      $.ajax({
        type: 'POST',
        url: get_API_URL('register'),
        data: {
          username: model.login.username(),
          password: model.login.server_password()
        }
      });
      return $.mobile.changePage('#passwords');
    },
    'generate': function() {
      return model.generator.regenerate();
    }
  };

  window.addEventListener('load', function() {
    return new FastClick(document.body);
  }, false);

  document.addEventListener('deviceready', function() {
    return navigator.splashscreen.hide();
  }, false);

  $(document).ready(function() {
    window.model = {
      l: getLocalized(),
      list: new List(),
      login: new Login(),
      generator: new Generator()
    };
    ko.applyBindings(model);
    setupRoutes();
    return $('.login_on_enter').keypress(function(event) {
      if (event.which === 13) {
        $('a[href="#login-server"]').focus();
        return $('a[href="#login-server"]').click();
      }
    });
  });

  Entry = (function() {
    function Entry(index, title, username, password) {
      this.to_mail = __bind(this.to_mail, this);
      this.toObject = __bind(this.toObject, this);
      this.reset = __bind(this.reset, this);      this.index = ko.observable(index || 0);
      this.title = ko.observable(title || "");
      this.username = ko.observable(username || "");
      this.password = ko.observable(password || "");
    }

    Entry.prototype.reset = function() {
      this.title("");
      this.username("");
      return this.password("");
    };

    Entry.prototype.toObject = function() {
      return {
        index: this.index(),
        title: this.title(),
        username: this.username(),
        password: this.password()
      };
    };

    Entry.prototype.to_mail = function() {
      return "mailto:?to=&body=" + encodeURIComponent('\r\n' + this.title() + '\r\n') + encodeURIComponent(model.l.username + ': ' + this.username() + '\r\n') + encodeURIComponent(model.l.password + ': ' + this.password() + '\r\n');
    };

    return Entry;

  })();

  List = (function() {
    function List() {
      this.fromJSON = __bind(this.fromJSON, this);
      this.toJSON = __bind(this.toJSON, this);
      this.new_current = __bind(this.new_current, this);
      this.actualize_indices = __bind(this.actualize_indices, this);
      this.delete_current = __bind(this.delete_current, this);
      this.save_current = __bind(this.save_current, this);      this.entries = ko.observableArray([]);
      this.current_entry = new Entry();
    }

    List.prototype.save_current = function() {
      var entry;

      entry = this.entries()[this.current_entry.index()];
      if (entry == null) {
        entry = new Entry(this.entries().length);
        this.entries.push(entry);
      }
      entry.title(this.current_entry.title());
      entry.username(this.current_entry.username());
      return entry.password(this.current_entry.password());
    };

    List.prototype.delete_current = function() {
      this.entries.splice(this.current_entry.index(), 1);
      return actualize_indices();
    };

    List.prototype.actualize_indices = function() {
      var entry, i, _i, _len, _ref, _results;

      _ref = this.entries();
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        entry = _ref[i];
        if (entry) {
          _results.push(entry.index(i));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    List.prototype.new_current = function(index) {
      var old_entry;

      old_entry = this.entries()[index] || new Entry(index);
      this.current_entry.index(old_entry.index());
      this.current_entry.title(old_entry.title());
      this.current_entry.username(old_entry.username());
      return this.current_entry.password(old_entry.password());
    };

    List.prototype.toJSON = function() {
      var entry;

      return JSON.stringify((function() {
        var _i, _len, _ref, _results;

        _ref = this.entries();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          entry = _ref[_i];
          _results.push(entry.toObject());
        }
        return _results;
      }).call(this));
    };

    List.prototype.fromJSON = function(data) {
      var entries, entry;

      entries = JSON.parse(data);
      return this.entries((function() {
        var _i, _len, _results;

        _results = [];
        for (_i = 0, _len = entries.length; _i < _len; _i++) {
          entry = entries[_i];
          _results.push(new Entry(entry.index, entry.title, entry.username, entry.password));
        }
        return _results;
      })());
    };

    return List;

  })();

  Router = (function() {
    function Router() {
      this.route = __bind(this.route, this);
      this.set_routes = __bind(this.set_routes, this);
    }

    Router.prototype.set_routes = function(routes) {
      return this.routes = routes;
    };

    Router.prototype.route = function(path) {
      var bindings, func, matchings, pattern, _ref, _results;

      matchings = function(pattern, path) {
        var parsed_pattern, result;

        parsed_pattern = new RegExp("" + (pattern.replace(/:([a-z]|[0-9])+/g, '([a-z]|[0-9])+')) + "\/?$", 'i');
        result = parsed_pattern.exec(path);
        if (result != null) {
          return result.splice(1, result.length - 1);
        } else {
          return null;
        }
      };
      _ref = this.routes;
      _results = [];
      for (pattern in _ref) {
        func = _ref[pattern];
        bindings = matchings(pattern, path);
        if (bindings != null) {
          _results.push(func.apply(this, bindings));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return Router;

  })();

  router = new Router();

  routes || (routes = {});

  setupRoutes = function() {
    router.set_routes(routes);
    return $(document).bind("pagebeforechange", function(e, data) {
      if (typeof data.toPage === "string") {
        data.options.dataUrl = data.toPage;
        router.route(data.toPage);
        return data.toPage = data.toPage.replace(/#([^\~]+)~.+/i, "#$1");
      }
    });
  };

  Login = (function() {
    function Login() {
      this.client_password = __bind(this.client_password, this);
      this.server_password = __bind(this.server_password, this);      this.username = ko.observable("");
      this.password = ko.observable("");
    }

    Login.prototype.server_password = function() {
      var iterations, salt;

      salt = [184, 83, 26, 133, 22, 40, 115, 123, 141, 115, 39, 53, 168, 172, 49, 165, 106, 215, 114, 180];
      iterations = 2347;
      return JSON.stringify(sjcl.misc.pbkdf2(this.password(), salt.concat(sjcl.hash.sha256.hash(this.username())), iterations));
    };

    Login.prototype.client_password = function() {
      var iterations, salt;

      salt = [71, 52, 235, 209, 156, 43, 102, 198, 190, 98, 3, 221, 187, 29, 74, 138, 50, 179, 179, 16];
      iterations = 3497;
      return JSON.stringify(sjcl.misc.pbkdf2(this.password(), salt.concat(sjcl.hash.sha256.hash(this.username())), iterations));
    };

    return Login;

  })();

  getLocalized = function() {
    var locale;

    locale = (navigator.language || navigator.userLanguage).substring(0, 2);
    return localization[locale];
  };

  localization = {
    en: {
      username: "Username",
      password: "Password",
      new_entry: "New Entry",
      save: "Save",
      cancel: "Cancel",
      title: "Title",
      edit: "Edit",
      'delete': "Delete",
      login: "Login",
      register: "Register",
      back: "Back",
      passwords: "Passwords",
      search: "Search entries",
      uppercase: "Uppercase",
      details: "Details",
      generator: "Generator",
      numbers: "Numbers",
      special_characters: "Special Characters",
      length: "Length",
      generate: "Generate",
      generator: "Generator",
      passwords: "Passwords",
      share: "Send per Email"
    },
    de: {
      username: "Benutzername",
      password: "Passwort",
      new_entry: "Neuer Eintrag",
      save: "Speichern",
      cancel: "Abbrechen",
      title: "Titel",
      edit: "Bearbeiten",
      'delete': "Löschen",
      login: "Login",
      register: "Registrieren",
      back: "Zurück",
      passwords: "Passwörter",
      search: "Einträge durchsuchen",
      uppercase: "Großbuchstaben",
      details: "Details",
      generator: "Generator",
      numbers: "Zahlen",
      special_characters: "Sonderzeichen",
      length: "Länge",
      generate: "Generieren",
      generator: "Generator",
      passwords: "Passwörter",
      share: "Per E-Mail versenden"
    }
  };

  LETTERS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

  UPPERCASE = (function() {
    var _i, _len, _results;

    _results = [];
    for (_i = 0, _len = LETTERS.length; _i < _len; _i++) {
      letter = LETTERS[_i];
      _results.push(letter.toUpperCase());
    }
    return _results;
  })();

  NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  SPECIALCHARS = ["!", "$", "%", "&", "/", "(", ")", "=", "?", "+", "-", "*", "{", "}", "[", "]"];

  random = function(max) {
    return Math.floor(Math.random() * max);
  };

  Generator = (function() {
    function Generator() {
      this.regenerate = __bind(this.regenerate, this);
      this.generate = __bind(this.generate, this);
      var _this = this;

      this.length = ko.observable(8);
      this.uppercase = ko.observable(true);
      this.numbers = ko.observable(true);
      this.special_characters = ko.observable(false);
      this.password = ko.computed(function() {
        return _this.generate();
      });
    }

    Generator.prototype.generate = function() {
      var allowed_characters, i, password, _i, _ref;

      allowed_characters = LETTERS.concat(this.uppercase() ? UPPERCASE : []).concat(this.numbers() ? NUMBERS : []).concat(this.special_characters() ? SPECIALCHARS : []);
      password = "";
      for (i = _i = 0, _ref = this.length() - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        password += allowed_characters[random(allowed_characters.length)];
      }
      return password;
    };

    Generator.prototype.regenerate = function() {
      return this.length.valueHasMutated();
    };

    return Generator;

  })();

}).call(this);
