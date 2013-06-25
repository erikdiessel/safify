(function() {
  var Entry, Generator, LETTERS, List, Login, NUMBERS, Router, SPECIALCHARS, UPPERCASE, check_for_login, getLocalized, get_API_URL, letter, localization, random, router, routes, save_changes, setupRoutes,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.addEventListener('load', function() {
    return new FastClick(document.body);
  }, false);

  document.addEventListener('deviceready', function() {
    return navigator.splashscreen.hide();
  }, false);

  $(document).ready(function() {
    var login;

    ko.bindingHandlers.slider_value = {
      init: function(element, valueAccessor) {
        return setInterval(function() {
          var el, value;

          el = $(document.getElementById(element.id));
          value = valueAccessor()();
          if (value !== parseInt(el.val(), 10)) {
            return valueAccessor()(parseInt(el.val(), 10));
          }
        }, 100);
      },
      update: function(element, valueAccessor) {
        var el, value;

        el = $(element);
        if (el.is('.ui-slider-input')) {
          value = ko.utils.unwrapObservable(valueAccessor()());
          if (value !== el.val()) {
            el.val(value);
            return el.slider("refresh");
          }
        }
      }
    };
    window.model = {
      l: getLocalized(),
      list: new List(),
      login: new Login(),
      generator: new Generator()
    };
    ko.applyBindings(model);
    setupRoutes();
    login = function() {
      $('a[href="#login-server"]').focus();
      return $('a[href="#login-server"]').click();
    };
    $('.login_on_enter').keypress(function(event) {
      if (event.which === 13) {
        return login();
      }
    });
    return $('input[readonly]').parent().addClass('readonly');
  });

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

  getLocalized = function() {
    var locale;

    locale = (navigator.language || navigator.userLanguage).substring(0, 2);
    return localization[locale] || localization['en'];
  };

  localization = {
    en: {
      sign_in: "Sign In",
      register: "Register",
      username: "Username",
      password: "Password",
      master_password: "Master Password",
      username_missing: "Username is missing.",
      password_missing: "Password is missing.",
      username_not_found: "Your entered username does not exist. New users should register first.",
      authentification_failed: "The entered username or password is incorrect.",
      username_already_used: "The username is already used.",
      passwords: "Passwords",
      search: "Search Entry ...",
      new_entry: "New Entry",
      edit: "Edit",
      save: "Save",
      title: "Title",
      'delete': "Delete",
      back: "Back",
      details: "Details",
      share: "Send per Email",
      generator: "Generator",
      length: "Length",
      uppercase: "Uppercase",
      numbers: "Numbers",
      special_characters: "Special Characters",
      generate: "Generate",
      short_description: "Fortress of Keys is a password manager app. It stores your precious passwords securely and accessible from every device. &nbsp; <em>Register now for free.</em>",
      security: "Security and Data Privacy",
      text_security: "      <h3>We keep high standards in security.</h3>      <br>      Your list of passwords is encrypted directly on your device and your master password too. We only get your encrypted data.      <br>      For encryption, military grade algorithms are used: the <a href=\"https://en.wikipedia.org/wiki/Advanced_Encryption_Standard\" target=\"_blank\">Advanced Encryption Standard (AES)</a> and the <a href=\"https://en.wikipedia.org/wiki/PBKDF2\" target=\"_blank\">Password-Based Key Derivation Function 2 (PBKDF2)</a>.      <br>      Nobody can access your data, including the author of the app and security agencies, as long as they can't guess your master password. <em>So make it safe.</em>      <br>      The encrypted data is transmitted over <a href=\"https://en.wikipedia.org/wiki/Transport_Layer_Security\" target=\"_blank\">TLS</a> for additional security.      <br>      We don't store anything except your encrypted data and your registration information.      <br>      For making the app faster and available all the time, our partner <a href=\"https://cloudflare.com\" target=\"_blank\">Cloudflare</a> caches the publically available content of this app and sets a cookie. They never receive any of your private data.       <hr>      Perfect security is not archievable, but Fortress of Keys lets you make a step in this direction.      <br>      <i>Note however, that computer viruses or traditional espionage may comprise the security of your data. You have to protect yourself against this.</i>      ",
      legal_notice: "Legal Notice",
      text_legal_notice: "      <i>Author:</i>       <br>      <b>Erik Diessel</b>      <br>      Bürgermeister-Alexander-Str. 19      <br>      55122 Mainz      <br>      Germany      <br>      <br>      <a href=\"mailto: support@fortressofkeys.tk\">Write an email</a>      <hr>      All content © 2013 Erik Diessel      "
    },
    de: {
      sign_in: "Anmelden",
      register: "Registrieren",
      username: "Benutzername",
      password: "Passwort",
      master_password: "Master-Passwort",
      username_missing: "Benutzername fehlt.",
      password_missing: "Passwort fehlt.",
      username_not_found: "Der angegebene Benutzername existiert nicht. Als neuer Benutzer musst du dich erst registrieren.",
      authentification_failed: "Der angegebene Benutzername oder das Passwort ist falsch.",
      username_already_used: "Der Benutzername ist schon besetzt.",
      passwords: "Passwörter",
      search: "Eintrag suchen ...",
      new_entry: "Neuer Eintrag",
      edit: "Bearbeiten",
      save: "Speichern",
      title: "Titel",
      'delete': "Löschen",
      back: "Zurück",
      details: "Details",
      share: "Per E-Mail versenden",
      generator: "Generator",
      length: "Länge",
      uppercase: "Großbuchstaben",
      numbers: "Zahlen",
      special_characters: "Sonderzeichen",
      generate: "Generieren",
      short_description: "Fortress of Keys ist eine Passwort-Manager-App. Sie speichert deine wertvollen Passwörter sicher und von jedem Gerät erreichbar ab. &nbsp; <em>Registriere dich jetzt kostenlos.</em>",
      security: "Sicherheit und Datenschutz",
      text_security: "      <h3>Wir haben hohe Sicherheitsstandards</h3>      <br>      Deine Passwortliste wird direkt auf deinem Gerät verschlüsselt, genauso wie dein Masterpasswort. Wir bekommen nur deine verschlüsselten Daten.      <br>      Für die Verschlüsselung werden moderne, erprobte Verfahren verwendet: der <a href=\"https://en.wikipedia.org/wiki/Advanced_Encryption_Standard\" target=\"_blank\">Advanced Encryption Standard (AES)</a> und die <a href=\"https://en.wikipedia.org/wiki/PBKDF2\" target=\"_blank\">Password-Based Key Derivation Function 2 (PBKDF2)</a>.      <br>      Niemand gelangt an deine Daten im Klartext, inklusive dem Autor und Sicherheitsbehörden, solange sie nicht dein Masterpasswort erraten. <em>Also verwende ein sicheres.</em>      <br>      Die Daten werden für zusätzliche Sicherheit über <a href=\"https://en.wikipedia.org/wiki/Transport_Layer_Security\" target=\"_blank\">TLS</a> übertragen.      <br>      Wir speichern nichts außer deinen verschlüsselten Daten und deinen Registrierdaten.      <br>      Um die App schneller und immer erreichbar zu halten speichert unser Partner <a href=\"https://cloudflare.com\" target=\"_blank\">Cloudflare</a> die öffentlich zugänglichen Teile dieser App zwischen und setzt einen Cookie. Sie empfangen keinerlei privaten Daten.      <hr>      Perfekte Sicherheit ist nicht erreichbar, aber Fortress of Keys lässt dich einen Schritt in diese Richtung machen.      <br>      <i>Beachte jedoch, dass Computerviren oder klassische Spionage die Sicherheit deiner Daten gefährden können. Du musst dich dagegen schützen.</i>      ",
      legal_notice: "Impressum",
      text_legal_notice: "      <i>Autor:</i>      <br>      <b>Erik Diessel</b>      <br>      Bürgermeister-Alexander-Str. 19      <br>      55122 Mainz      <br>      Deutschland      <br>      <br>      <a href=\"mailto: support@fortressofkeys.tk\">E-Mail schreiben</a>      <hr>      Alle Inhalte © 2013 Erik Diessel      "
    },
    fr: {
      sign_in: "Connexion",
      register: "Enregistrer",
      username: "Nom d'utilisateur",
      password: "Mot de passe",
      master_password: "Mot de passe",
      username_missing: "Le nom d'utilisateur manque.",
      password_missing: "Le mot de passe manque.",
      username_not_found: "Ce nom d'utilisateur n'existe pas. Comme nouveau utilisateur il faut s'enregistrer.",
      authentification_failed: "Le nom d'utilisateur ou le mot de passe est incorrect.",
      username_already_used: "Ce nom d'utilisateur est déjà utilisé.",
      passwords: "Mots de passe",
      search: "Rechercher ...",
      new_entry: "Nouvel article",
      edit: "Modifier",
      save: "Sauver",
      title: "Titre",
      'delete': "Effacer",
      back: "Retour",
      details: "Details",
      share: "Envoyer par e-mail",
      generator: "Génératrice",
      length: "Longueur",
      uppercase: "Majuscules",
      numbers: "Chiffres",
      special_characters: "Charactères spécials",
      generate: "Générer",
      short_description: "",
      security: "Sécurité et protection des données",
      text_security: "",
      legal_notice: "Mentions légales",
      text_legal_notice: "      <i>Auteur:</i>      <br>      <b>Erik Diessel</b>      <br>      Bürgermeister-Alexander-Str. 19      <br>      55122 Mainz      <br>      Allemagne      <br>      <br>      <a href=\"mailto: support@fortressofkeys.tk\">Envoyer un e-mail</a>      <hr>      Tous les contenus © 2013 Erik Diessel      "
    }
  };

  Login = (function() {
    function Login() {
      this.check = __bind(this.check, this);
      this.client_password = __bind(this.client_password, this);
      this.server_password = __bind(this.server_password, this);      this.username = ko.observable("");
      this.password = ko.observable("");
      this.logged_in = ko.observable(false);
      this.username_not_found = ko.observable(false);
      this.authentification_failed = ko.observable(false);
      this.username_already_used = ko.observable(false);
      this.username_missing = ko.observable(false);
      this.password_missing = ko.observable(false);
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

    Login.prototype.check = function() {
      this.username_missing(this.username() === "");
      this.password_missing(this.password() === "");
      return !this.username_missing() && !this.password_missing();
    };

    return Login;

  })();

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
      return this.actualize_indices();
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

    Router.prototype.route = function(path, event_object) {
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
          _results.push(func.apply(event_object, bindings));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return Router;

  })();

  router = new Router();

  routes = routes || {};

  setupRoutes = function() {
    router.set_routes(routes);
    return $(document).bind("pagebeforechange", function(event, data) {
      if (typeof data.toPage === "string") {
        data.options.dataUrl = data.toPage;
        router.route(data.toPage, event);
        return data.toPage = data.toPage.replace(/#([^\~]+)~.+/i, "#$1");
      }
    });
  };

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
      }
    });
  };

  check_for_login = function(context) {
    var logged_in;

    logged_in = model.login.logged_in();
    if (!logged_in) {
      context.preventDefault();
      $.mobile.changePage('#login');
    }
    return logged_in;
  };

  routes = {
    'new': function() {
      if (check_for_login(this)) {
        return model.list.new_current(model.list.entries().length);
      }
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
      if (model.login.check()) {
        return $.ajax({
          url: get_API_URL('passwords'),
          data: {
            username: model.login.username(),
            password: model.login.server_password()
          },
          success: function(data, textStatus, jqXHR) {
            var decrypted, error;

            try {
              decrypted = sjcl.decrypt(model.login.client_password(), data);
              model.list.fromJSON(decrypted);
            } catch (_error) {
              error = _error;
              console.log('password_list is empty; starting with new one');
            }
            model.login.logged_in(true);
            $.mobile.changePage('#passwords');
            return $('[data-role="listview"]').listview('refresh');
          },
          statusCode: {
            404: function() {
              model.login.username_not_found(true);
              return model.login.authentification_failed(false);
            },
            403: function() {
              model.login.authentification_failed(true);
              return model.login.username_not_found(false);
            }
          }
        });
      }
    },
    'register-server': function() {
      return $.ajax({
        type: 'POST',
        url: get_API_URL('register'),
        data: {
          username: model.login.username(),
          password: model.login.server_password()
        },
        statusCode: {
          201: function() {
            model.login.logged_in(true);
            return $.mobile.changePage('#passwords');
          },
          409: function() {
            return model.login.username_already_used(true);
          }
        }
      });
    },
    'generate': function() {
      return model.generator.regenerate();
    },
    'passwords': function() {
      return check_for_login(this);
    }
  };

}).call(this);
