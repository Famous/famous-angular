# Famo.us/Angular

Project page and documentation:  [Famo.us/Angular](http://famo.us/angular)

##Running (For using F/A in your Angular app)

####Before you start, tools you will need
* Download and install [git](http://git-scm.com/downloads)
* Download and install [nodeJS](http://nodejs.org/download/)
* Install bower `npm install bower`

####Inside of your app:
* Run `bower install famous-angular` (may not yet be added to the Bower repo; if not, add `"famous-angular": "git@github.com:Famous/famous-angular.git"` to your bower.json first)
* Add the `famous.angular` module to your Angular module list (e.g. in a main app.js file: `angular.module('yourMainModule',['famous.angular', 'ui.router', 'ngAnimate'])`)
* Add the `famous-angular.css` dependency to your index.html (alternatively, handle container sizing+positioning+styling yourself if you know what you're doing)
* And add an `<fa-app><fa-surface>Hello world</fa-surface></fa-app>` in one of your templates.  You should be good to go.


##Running (For developing or contributing to the library)

####Before you start, tools you will need
* Download and install [git](http://git-scm.com/downloads)
* Download and install [nodeJS](http://nodejs.org/download/)

####First time:
`git clone https://github.com/thomasstreet/famous-angular.git`

`npm install`

`npm install -g gulp`

####Thereafter:
`npm start`

Npm start will use gulp to concatenate files into famous-angular.js, which is built into the app folder. It will also watch for changes inside app and livereload as necessary.

As configured, you should be able to access the application at localhost:4000.

##To develop the library using the famous-angular-examples submodule

`gulp dev`

##To build the docs

`gulp docs`

##To view and build the docs site

`gulp dev-site`

##Support

Please submit issues as Github issues

##Contributing

We would love to have community contributions and support!  A few areas we could really use help right now:

* Writing tests
* Elaborating on documentation
* Creating examples for the docs
* Bug reports and/or fixes
* Continuing to wrap Famo.us layouts and views into directives [advanced]

If you want to contribute, please submit a pull request, or contact hello@thomasstreet.com for more information.
