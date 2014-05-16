# Famo.us/Angular
##Running (For using F/A in your Angular app)

####Before you start, tools you will need
* Download and install [git](http://git-scm.com/downloads)
* Download and install [nodeJS](http://nodejs.org/download/)
* Install bower `npm install bower`

####Inside of your app:
* Run `bower install famous-angular` (may not yet be added to the Bower repo; if not, add `"famous-angular": "git@github.com:Famous/famous-angular.git"` to your bower.json)
* Add the `famous.angular` module to your Angular module list (e.g. in your main app.js file: `angular.module('yourMainModule',['famous.angular', 'ui.router', 'ngAnimate'])`)
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

Npm start will use gulp to concatenate files into famous.angular.js, which is built into the app folder. It will also watch for changes inside app and livereload as necessary.

As configured, you should be able to access the application at localhost:4000.

##Development Roadmap:

https://app.asana.com/0/11288022110976/11612210261574

If you want to contribute, contact hello@thomasstreet.com for access to Asana.
