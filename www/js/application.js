(function() {
  var Deletion, Entry, Generator, LETTERS, List, Login, NUMBERS, Registration, Router, SPECIALCHARS, UPPERCASE, check_for_login, get_API_URL, get_current_locale, letter, manifest_url, random, router, routes, save_changes, setupRoutes, toggle_loading,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.addEventListener('load', function() {
    return new FastClick(document.body);
  }, false);

  document.addEventListener('deviceready', function() {
    return navigator.splashscreen.hide();
  }, false);

  get_current_locale = function(locales) {
    var locale;

    locale = (navigator.language || navigator.userLanguage).substring(0, 2);
    return locales[locale] || locales['en'];
  };

  manifest_url = location.origin + '/manifest.webapp';

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
    window.login = new Login();
    window.registration = new Registration();
    window.password_list = new List();
    window.current_entry = new Entry();
    window.deletion = new Deletion();
    window.generator = new Generator();
    ko.applyBindings(window.login, document.querySelector('#login'));
    ko.applyBindings(window.registration, document.querySelector('#registration'));
    ko.applyBindings(window.password_list, document.querySelector('#passwords'));
    ko.applyBindings(window.current_entry, document.querySelector('#new'));
    ko.applyBindings(window.current_entry, document.querySelector('#edit'));
    ko.applyBindings(window.deletion, document.querySelector('#deletion'));
    ko.applyBindings(window.current_entry, document.querySelector('#details'));
    ko.applyBindings(window.generator, document.querySelector('#generator'));
    setupRoutes();
    login = function() {
      $('a[href="#login-server"]').focus();
      return $('a[href="#login-server"]').click();
    };
    return $('.login_on_enter').keypress(function(event) {
      if (event.which === 13) {
        return login();
      }
    });
  });

  Deletion = (function() {
    function Deletion() {
      this.entry_title = ko.observable("");
      this.l = get_current_locale(this.locales);
    }

    Deletion.prototype.locales = {
      en: {
        title: "Delete ?",
        question: "Do you really want to delete the following entry ?",
        "delete": "Delete",
        cancel: "Cancel"
      },
      de: {
        title: "Löschen ?",
        question: "Den folgenden Eintrag wirklich löschen ?",
        "delete": "Löschen",
        cancel: "Abbrechen"
      },
      fr: {
        title: "Effacer ?",
        question: "Tu veux vraiment effacer l'article suivante ?",
        "delete": "Effacer",
        cancel: "Annuller"
      }
    };

    return Deletion;

  })();

  Entry = (function() {
    function Entry(index, title, username, password, notes) {
      this.set_index = __bind(this.set_index, this);
      this.get_index = __bind(this.get_index, this);
      this.actualize_to = __bind(this.actualize_to, this);
      this.to_mail = __bind(this.to_mail, this);
      this.toObject = __bind(this.toObject, this);
      var _this = this;

      this.index = ko.observable(index || 0);
      this.title = ko.observable(title || "");
      this.username = ko.observable(username || "");
      this.password = ko.observable(password || "");
      this.notes = ko.observable(notes || "");
      this.notes_to_html = ko.computed(function() {
        return _this.notes().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
      });
      this.l = get_current_locale(this.locales);
    }

    Entry.prototype.toObject = function() {
      return {
        index: this.index(),
        title: this.title(),
        username: this.username(),
        password: this.password(),
        notes: this.notes()
      };
    };

    Entry.prototype.to_mail = function() {
      return "mailto:?to=&body=" + encodeURIComponent('\r\n' + this.title() + '\r\n') + encodeURIComponent(this.l.username + ': ' + this.username() + '\r\n') + encodeURIComponent(this.l.password + ': ' + this.password() + '\r\n') + (this.notes() !== "" ? encodeURIComponent(this.l.notes + ':' + this.notes() + '\r\n') : "");
    };

    Entry.prototype.actualize_to = function(entry) {
      this.index(entry.index());
      this.title(entry.title());
      this.username(entry.username());
      this.password(entry.password());
      return this.notes(entry.notes());
    };

    Entry.prototype.get_index = function() {
      return this.index();
    };

    Entry.prototype.set_index = function(index) {
      return this.index(index);
    };

    Entry.prototype.locales = {
      en: {
        title: "Title",
        username: "Username",
        password: "Password",
        notes: "Additional information",
        details: "Details",
        share: "Send per Email",
        edit: "Edit",
        save: "Save",
        'delete': "Delete",
        back: "Back",
        close: "Close",
        new_entry: "New Entry",
        create: "Create"
      },
      de: {
        title: "Titel",
        username: "Benutzername",
        password: "Passwort",
        notes: "Notizen",
        details: "Details",
        share: "Per E-Mail versenden",
        edit: "Bearbeiten",
        save: "Speichern",
        'delete': "Löschen",
        back: "Zurück",
        close: "Schließen",
        new_entry: "Neuer Eintrag",
        create: "Erstellen"
      },
      fr: {
        title: "Titre",
        username: "Nom d'utilisateur",
        password: "Mot de passe",
        notes: "Notes",
        details: "Details",
        share: "Envoyer par e-mail",
        edit: "Modifier",
        save: "Sauvegarder",
        'delete': "Effacer",
        back: "Retour",
        close: "Fermer",
        new_entry: "Nouvel article",
        create: "Créer"
      }
    };

    return Entry;

  })();

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
      this.l = get_current_locale(this.locales);
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

    Generator.prototype.locales = {
      en: {
        generator: "Generator",
        length: "Length",
        uppercase: "Uppercase",
        numbers: "Numbers",
        special_characters: "Special Characters",
        generate: "Generate",
        back: "Back",
        passwords: "Passwords",
        generator: "Generator"
      },
      de: {
        generator: "Generator",
        length: "Länge",
        uppercase: "Großbuchstaben",
        numbers: "Zahlen",
        special_characters: "Sonderzeichen",
        generate: "Generieren",
        back: "Zurück",
        passwords: "Passwörter",
        generator: "Generator"
      },
      fr: {
        generator: "Génératrice",
        length: "Longueur",
        uppercase: "Majuscules",
        numbers: "Chiffres",
        special_characters: "Charactères spécials",
        generate: "Générer",
        back: "Retour",
        passwords: "Mots de passe",
        generator: "Génératrice"
      }
    };

    return Generator;

  })();

  Login = (function() {
    function Login() {
      this.reset_error_messages = __bind(this.reset_error_messages, this);
      this.sanitized_username = __bind(this.sanitized_username, this);
      this.check = __bind(this.check, this);
      this.client_password = __bind(this.client_password, this);
      this.server_password = __bind(this.server_password, this);
      var request,
        _this = this;

      this.username = ko.observable("");
      this.password = ko.observable("");
      this.logged_in = ko.observable(false);
      this.username_not_found = ko.observable(false);
      this.authentification_failed = ko.observable(false);
      this.username_already_used = ko.observable(false);
      this.username_missing = ko.observable(false);
      this.password_missing = ko.observable(false);
      this.no_connection = ko.observable(false);
      this.firefox_webapp_installable = ko.observable(false);
      if ('mozApps' in navigator) {
        request = navigator.mozApps.checkInstalled(manifest_url);
        request.onerror = function() {
          return console.log('Error with mozApps.checkInstalled');
        };
        request.onsuccess = function() {
          if (request.result) {
            return console.log('App installed');
          } else {
            return _this.firefox_webapp_installable(true);
          }
        };
      }
      this.l = get_current_locale(this.locales);
    }

    Login.prototype.server_password = function() {
      var iterations, salt;

      salt = [184, 83, 26, 133, 22, 40, 115, 123, 141, 115, 39, 53, 168, 172, 49, 165, 106, 215, 114, 180].concat(sjcl.hash.sha256.hash(this.username()));
      iterations = 2347;
      return JSON.stringify(sjcl.misc.pbkdf2(this.password(), salt, iterations));
    };

    Login.prototype.client_password = function() {
      var iterations, salt;

      salt = [71, 52, 235, 209, 156, 43, 102, 198, 190, 98, 3, 221, 187, 29, 74, 138, 50, 179, 179, 16].concat(sjcl.hash.sha256.hash(this.username()));
      iterations = 3497;
      return JSON.stringify(sjcl.misc.pbkdf2(this.password(), salt, iterations));
    };

    Login.prototype.check = function() {
      this.username_missing(this.username() === "");
      this.password_missing(this.password() === "");
      return !this.username_missing() && !this.password_missing();
    };

    Login.prototype.sanitized_username = function() {
      return encodeURIComponent(this.username());
    };

    Login.prototype.reset_error_messages = function() {
      this.username_not_found(false);
      this.authentification_failed(false);
      this.username_already_used(false);
      this.username_missing(false);
      this.password_missing(false);
      return this.no_connection(false);
    };

    Login.prototype.locales = {
      en: {
        sign_in: "Open Passwords",
        sign_in_short: "Open",
        register: "Register",
        username: "Username",
        master_password: "Master Password",
        username_missing: "Username is missing.",
        password_missing: "Password is missing.",
        username_not_found: "Your entered username does not exist. New users should register first.",
        authentification_failed: "The entered username or password is incorrect.",
        username_already_used: "The username is already used. Choose another one.",
        no_connection: "You have currently no connection to the Internet. Try again later.",
        short_description: "Safify is a password manager app. Save your precious passwords securely and accessible from every device.          <br>          <em>Register now for free.</em>",
        install: "Install",
        security: "Security and Data Privacy",
        text_security: "         <h3>We keep high standards in security.</h3>         <p>         Your list of passwords is encrypted directly on your device and your master password too. We only get your encrypted data.         </p>         <p>         For encryption, military grade algorithms are used: the <a href=\"https://en.wikipedia.org/wiki/Advanced_Encryption_Standard\" target=\"_blank\">Advanced Encryption Standard (AES)</a> and the <a href=\"https://en.wikipedia.org/wiki/PBKDF2\" target=\"_blank\">Password-Based Key Derivation Function 2 (PBKDF2)</a>.         </p>         <p>         Nobody can access your data, including the author of the app and security agencies, as long as they can't guess your master password.          <br>         <em>So make it safe.</em>         </p>         <p>         The encrypted data is transmitted over <a href=\"https://en.wikipedia.org/wiki/Transport_Layer_Security\" target=\"_blank\">TLS</a> for additional security.         </p>         <p>         We don't store anything except your encrypted data and your registration information.         </p>         <p>         For making the app faster and available all the time, our partner <a href=\"https://cloudflare.com\" target=\"_blank\">Cloudflare</a> caches the publically available content of this app and sets a cookie. They never receive any of your private data.          </p>         <hr>         <p>         Perfect security is not archievable, but Fortress of Keys lets you make a step in this direction.         </p>         <p>         <i>Note however, that computer viruses or traditional espionage may comprise the security of your data. You have to protect yourself against this.</i>         </p>         ",
        legal_notice: "Legal Notice",
        text_legal_notice: "         <i>Author:</i>          <br>         <b>Erik Diessel</b>         <br>         Bürgermeister-Alexander-Str. 19         <br>         55122 Mainz         <br>         Germany         <br>         <br>         French localization: Arthur Nichanian         <br>         <br>         <a href=\"mailto: support@fortressofkeys.tk\">Write an email</a>         <br>         <br>         We use the following licensed works:         <ul>           <li> <a href=\"fonts/DejaVu_Sans_Mono/license.txt\" target=\"_blank\">The DejaVu Sans Mono Bold</a> font </li>           <li> <a href=\"fonts/Bitstream_Vera/license.txt\"   target=\"_blank\">The Bitstream Vera</a> font </li>         </ul>         <hr>         All content © 2013 Erik Diessel         ",
        passwords: "Passwords",
        generator: "Generator"
      },
      de: {
        sign_in: "Passwörter öffnen",
        sign_in_short: "Öffnen",
        register: "Registrieren",
        username: "Benutzername",
        master_password: "Master-Passwort",
        username_missing: "Benutzername fehlt.",
        password_missing: "Passwort fehlt.",
        username_not_found: "Der angegebene Benutzername existiert nicht. Als neuer Benutzer musst du dich erst registrieren.",
        authentification_failed: "Der angegebene Benutzername oder das Passwort ist falsch.",
        username_already_used: "Der Benutzername ist schon besetzt. Verwende einen anderen.",
        no_connection: "Momentan hast du keine Verbindung zum Internet. Probiere es später erneut",
        short_description: "Safify ist eine Passwort-Manager-App. Speichere deine wertvollen Passwörter sicher und von jedem Gerät erreichbar ab.          <br>         <em>Registriere dich jetzt kostenlos.</em>",
        install: "Installieren",
        security: "Sicherheit und Datenschutz",
        text_security: "         <h3>Wir haben hohe Sicherheitsstandards</h3>         <p>         Deine Passwortliste wird direkt auf deinem Gerät verschlüsselt, genauso wie dein Masterpasswort. Wir bekommen nur deine verschlüsselten Daten.         </p>         <p>         Für die Verschlüsselung werden moderne, erprobte Verfahren verwendet: der <a href=\"https://de.wikipedia.org/wiki/Advanced_Encryption_Standard\" target=\"_blank\">Advanced Encryption Standard (AES)</a> und die <a href=\"https://de.wikipedia.org/wiki/PBKDF2\" target=\"_blank\">Password-Based Key Derivation Function 2 (PBKDF2)</a>.         </p>         <p>         Niemand gelangt an deine Daten im Klartext, inklusive dem Autor und Sicherheitsbehörden, solange sie nicht dein Masterpasswort erraten.          <br>         <em>Also verwende ein sicheres.</em>         </p>         <p>         Die Daten werden für zusätzliche Sicherheit über <a href=\"https://en.wikipedia.org/wiki/Transport_Layer_Security\" target=\"_blank\">TLS</a> übertragen.         </p>         <p>         Wir speichern nichts außer deinen verschlüsselten Daten und deinen Registrierdaten.         </p>         <p>         Um die App flüssig und immer erreichbar zu halten speichert unser Partner <a href=\"https://cloudflare.com\" target=\"_blank\">Cloudflare</a> die öffentlich zugänglichen Teile dieser App zwischen und setzt einen Cookie. Cloudflare empfängt keinerlei private Daten.         </p>         <hr>         <p>         Perfekte Sicherheit ist nicht erreichbar, aber Fortress of Keys lässt dich einen Schritt in diese Richtung machen.         </p>         <p>         <i>Beachte jedoch, dass Computerviren oder klassische Spionage die Sicherheit deiner Daten gefährden können. Du musst dich dagegen schützen.</i>         </p>         ",
        legal_notice: "Impressum",
        text_legal_notice: "         <i>Autor:</i>         <br>         <b>Erik Diessel</b>         <br>         Bürgermeister-Alexander-Str. 19         <br>         55122 Mainz         <br>         Deutschland         <br>         <br>         Französische Lokalisation: Arthur Nichanian         <br>         <br>         <a href=\"mailto: support@fortressofkeys.tk\">E-Mail schreiben</a>         <br>         <br>         Wir verwenden die folgenden lizensierten Werke:         <ul>           <li> <a href=\"fonts/DejaVu_Sans_Mono/license.txt\" target=\"_blank\">Die DejaVu Sans Mono Bold</a> Schriftart </li>           <li> <a href=\"fonts/Bitstream_Vera/license.txt\"   target=\"_blank\">Die Bitstream Vera</a> Schriftart </li>         </ul>         <hr>         Alle Inhalte © 2013 Erik Diessel         ",
        passwords: "Passwörter",
        generator: "Generator"
      },
      fr: {
        sign_in: "Ouvrir mots de passe",
        sign_in_short: "Ouvrir",
        register: "Enregistrer",
        username: "Nom d'utilisateur",
        master_password: "Mot de passe principal",
        username_missing: "Le nom d'utilisateur manque.",
        password_missing: "Le mot de passe manque.",
        username_not_found: "Ce nom d'utilisateur n'existe pas. Comme nouveau utilisateur il faut s'enregistrer.",
        authentification_failed: "Le nom d'utilisateur ou le mot de passe est incorrect.",
        username_already_used: "Ce nom d'utilisateur est déjà utilisé. Choisis un autre.",
        no_connection: "Maintenant, tu n'as pas de connection à l'Internet. Essaies une autre fois dans une minute.",
        short_description: "Safify est une application pour administrer tes mots de passe. Sauvegardes tes mots de passe en sécurité et consultable sur tous les appareils.         <br>         <em>Enregistre-toi maintenant gratuitement.",
        install: "Installer",
        security: "Sécurité et protection des données",
        text_security: "         <h3>Nous avons des standards de sécurité élevés.</h3>         <p>         Ta liste de mots de passe ainsi que ton mot de passe principal est directement sécurisée sur ton appareil. Nous recevons que tes données sécurisées.         </p>         <p>         Afin que tes mots de passe soient bien sécurisés, nous utilisons des techniques modernes et performants : <a href=\"https://fr.wikipedia.org/wiki/Advanced_Encryption_Standard\" target=\"_blank\">l'Advanced Encryption Standart (AES)</a>, ainsi que la <a href=\"https://en.wikipedia.org/wiki/PBKDF2\" target=\"_blank\">Password-Based Key Derivation Function 2 (PBKDF2)</a>.         </p>         <p>         Personne n'accèdera à tes données, y compris l'auteur de l'application, et les autres personnes qui voudraient y accéder, à condition qu'ils ne trouvent pas ton mot de passe principal.          <br>         <em>Ton mot de passe principal doit donc être sûr.</em>         </p>         <p>         Les données sont transférés sur TLS afin de garantir plus de sécurité.         </p>         <p>         Nous ne sauvegardons rien sauf tes données sécurisées ainsi que tes données inscrites lors de ton inscription.         </p>         <p>         Afin que l'application soit rapide et toujours accessible, les données autres sont sauvegardées par notre partenaire Cloudfare, qui ajoute sur l'appareil un cookie. Cloudflare ne récupère dans aucun cas des données privées.         </p>         <hr>         <p>         La sécurité parfaite n'est jamais possible, mais Fortress of Keys te permet de faire un pas dans cette direction.         </p>         <p>         <i>Attention, les virus, ou l'espionnage de ton appareil risquent d'accéder à tes données. Tu dois te protéger contre eux.</i>         </p>         ",
        legal_notice: "Mentions légales",
        text_legal_notice: "         <i>Auteur:</i>         <br>         <b>Erik Diessel</b>         <br>         Bürgermeister-Alexander-Str. 19         <br>         55122 Mainz         <br>         Allemagne         <br>         <br>         Localisation française: Arthur Nichanian         <br>         <br>         <a href=\"mailto: support@fortressofkeys.tk\">Envoyer un e-mail</a>         <br>         <br>         Nous utilisons les œuvres licensées suivantes:         <ul>           <li> La police de charactères <a href=\"fonts/DejaVu_Sans_Mono/license.txt\" target=\"_blank\">DejaVu Sans Mono Bold</a></li>           <li> La police de charactères <a href=\"fonts/Bitstream_Vera/license.txt\"   target=\"_blank\">Bitstream Vera</a> </li>         </ul>         <hr>         Tous les contenus © 2013 Erik Diessel         ",
        passwords: "Mots de passe",
        generator: "Génératrice"
      }
    };

    return Login;

  })();

  List = (function() {
    function List() {
      this.length = __bind(this.length, this);
      this.get_entry = __bind(this.get_entry, this);
      this.new_entry = __bind(this.new_entry, this);
      this.fromJSON = __bind(this.fromJSON, this);
      this.toJSON = __bind(this.toJSON, this);
      this.actualize_indices = __bind(this.actualize_indices, this);
      this["delete"] = __bind(this["delete"], this);
      this.save = __bind(this.save, this);      this.entries = ko.observableArray([]);
      this.l = get_current_locale(this.locales);
    }

    List.prototype.save = function(entry) {
      var actualizing_entry;

      actualizing_entry = this.get_entry(entry.get_index()) || this.new_entry();
      return actualizing_entry.actualize_to(entry);
    };

    List.prototype["delete"] = function(entry) {
      this.entries.splice(entry.get_index(), 1);
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
          _results.push(new Entry(entry.index, entry.title, entry.username, entry.password, entry.notes));
        }
        return _results;
      })());
    };

    List.prototype.new_entry = function() {
      var entry;

      entry = new Entry(this.entries().length);
      this.entries.push(entry);
      return entry;
    };

    List.prototype.get_entry = function(index) {
      return this.entries()[index];
    };

    List.prototype.length = function() {
      return this.entries().length;
    };

    List.prototype.locales = {
      en: {
        username: "Username",
        password: "Password",
        passwords: "Passwords",
        search: "Search Entry ...",
        new_entry: "New Entry",
        passwords: "Passwords",
        generator: "Generator"
      },
      de: {
        username: "Benutzername",
        password: "Passwort",
        passwords: "Passwörter",
        search: "Eintrag suchen ...",
        new_entry: "Neuer Eintrag",
        passwords: "Passwörter",
        generator: "Generator"
      },
      fr: {
        username: "Nom d'utilisateur",
        password: "Mot de passe",
        passwords: "Mots de passe",
        search: "Rechercher ...",
        new_entry: "Nouvel article",
        passwords: "Mots de passe",
        generator: "Génératrice"
      }
    };

    return List;

  })();

  Registration = (function() {
    function Registration() {
      this.check = __bind(this.check, this);      this.username = ko.observable("");
      this.password_repetition = ko.observable("");
      this.repetition_wrong = ko.observable(false);
      this.l = get_current_locale(this.locales);
    }

    Registration.prototype.check = function(first_password) {
      if (first_password === this.password_repetition()) {
        return true;
      } else {
        this.repetition_wrong(true);
        return false;
      }
    };

    Registration.prototype.locales = {
      en: {
        registration_title: "Registration",
        username: "Username",
        password_repetition: "Password Repetition",
        register: "Register",
        cancel: "Cancel",
        wrong_repetition: "Your repetition of the password is different from the password you entered before. Check if you made an error."
      },
      de: {
        registration_title: "Registrierung",
        username: "Benutzername",
        register: "Registrieren",
        password_repetition: "Passwort-Wiederholung",
        cancel: "Abbrechen",
        wrong_repetition: "Deine Wiederholung des Passwortes unterscheidet sich vom vorher eingegebenen Passwort. Prüfe nach, ob du dich vertippt hast."
      },
      fr: {
        registration_title: "Enregistration",
        username: "Nom d'utilisateur",
        register: "Enregistrer",
        password_repetition: "Mot de passe - confirmation",
        cancel: "Annuler",
        wrong_repetition: "Ton répétition du mot de passe est different du mot de passe que tu as utilisé avant. Fais voir si tu as fais une faute."
      }
    };

    return Registration;

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

    baseURL = 'https://safify-api.herokuapp.com/';
    return baseURL + path;
  };

  save_changes = function() {
    return $.ajax({
      url: get_API_URL('passwords'),
      type: 'PUT',
      data: {
        password_list: sjcl.encrypt(login.client_password(), password_list.toJSON()),
        username: login.sanitized_username(),
        password: login.server_password()
      }
    });
  };

  check_for_login = function(context) {
    var logged_in;

    logged_in = login.logged_in();
    if (!logged_in) {
      context.preventDefault();
      $.mobile.changePage('#login');
    }
    return logged_in;
  };

  toggle_loading = function() {
    $('[href="#login-server"]').toggleClass('loading');
    return $('[href="#registration"]').toggleClass('loading');
  };

  routes = {
    'new': function() {
      if (check_for_login(this)) {
        return current_entry.actualize_to(new Entry(password_list.length));
      }
    },
    'save-current': function() {
      password_list.save(current_entry);
      save_changes();
      $.mobile.changePage("#passwords");
      return $('[data-role="listview"]').listview('refresh');
    },
    'edit~:index': function(index) {
      return current_entry.actualize_to(password_list.get_entry(index));
    },
    'deletion': function() {
      return deletion.entry_title(current_entry.title());
    },
    'delete-current': function() {
      password_list["delete"](current_entry);
      save_changes();
      return $.mobile.changePage("#passwords");
    },
    'details~:index': function(index) {
      return current_entry.actualize_to(password_list.get_entry(index));
    },
    'login-server': function() {
      if (login.check()) {
        toggle_loading();
        return $.ajax({
          type: 'GET',
          url: get_API_URL('passwords'),
          data: {
            username: login.sanitized_username(),
            password: login.server_password()
          },
          success: function(data, textStatus, jqXHR) {
            var decrypted;

            decrypted = sjcl.decrypt(login.client_password(), data);
            password_list.fromJSON(decrypted);
            login.logged_in(true);
            $.mobile.changePage('#passwords', {
              transition: "none"
            });
            $('[data-role="listview"]').listview('refresh');
            return toggle_loading();
          },
          statusCode: {
            403: function() {
              toggle_loading();
              login.reset_error_messages();
              return login.username_not_found(true);
            },
            401: function() {
              toggle_loading();
              login.reset_error_messages();
              return login.authentification_failed(true);
            },
            404: function() {
              toggle_loading();
              login.reset_error_messages();
              return login.no_connection(true);
            }
          }
        });
      }
    },
    'register-server': function() {
      if (registration.check(login.password())) {
        $.ajax({
          type: 'POST',
          url: get_API_URL('register'),
          data: {
            username: login.sanitized_username(),
            password: login.server_password()
          }
        });
        login.logged_in(true);
        return $.mobile.changePage('#passwords', {
          transition: "none"
        });
      }
    },
    'generate': function() {
      return generator.regenerate();
    },
    'passwords': function() {
      return check_for_login(this);
    },
    'check_for_username': function() {
      if (login.check()) {
        toggle_loading();
        $.ajax({
          type: 'GET',
          url: get_API_URL('username_not_used'),
          data: {
            username: login.sanitized_username()
          },
          statusCode: {
            200: function() {
              toggle_loading();
              login.reset_error_messages();
              return $.mobile.changePage('#registration', {
                transition: "none"
              });
            },
            409: function() {
              login.reset_error_messages();
              login.username_already_used(true);
              return toggle_loading();
            }
          }
        });
        registration.username(login.username());
        registration.repetition_wrong(false);
        return registration.password_repetition("");
      }
    },
    'install_in_firefox': function() {
      var request;

      request = navigator.mozApps.install(manifest_url);
      request.onerror = function() {
        return console.log('Error during install');
      };
      return request.onsuccess = function() {
        return console.log('Successfully installed');
      };
    }
  };

}).call(this);
