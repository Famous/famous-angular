# Famo.us/Angular


Famo.us/Angular is a library that brings Famo.us and AngularJS together.  Using F/A, you can:
* Create Famo.us apps using familiar AngularJS tools like controllers, directives, and services.
* Bring rich Famo.us animations to new or existing AngularJS apps.
* Use HTML to declare Famo.us UIs, complete with Angular's two-way databinding.
* Easily embed existing Famo.us apps into AngularJS apps.


###Read more on the project page: [Famo.us/Angular](http://famo.us/angular)


This library is under active development and is currently in alpha.  The library is at a point where you can create powerful apps, and a lot of the core API is reasonably stabilized, but some things are expected to change as the project moves forward.  Contributors welcome! (see below)


##Running (For using F/A in your Angular app)

####Before you start, tools you will need
* Download and install [git](http://git-scm.com/downloads)
* Download and install [nodeJS](http://nodejs.org/download/)
* Install bower `npm install bower`

####Inside of your app:
* Run `bower install famous-angular`
* Add the following to your index.html
```html
  <script src="bower_components/requirejs/require.js"></script>
  <script>
    //set requirejs's base to where the famous lib folder lives
    require.config({baseUrl: 'bower_components'});
  </script>
  <script src="bower_components/famous-angular/dist/famous-angular.js"></script>
```
* Add`<link rel="stylesheet" href="bower_components/famous-angular/dist/famous-angular.css">` to the `<head>` of your index.html
* Add the `famous.angular` module to your Angular module list (e.g. in a main app.js file: `angular.module('yourMainModule',['famous.angular', 'ui.router', 'ngAnimate'])`)
* And add an `<fa-app style="height: 200px"><fa-surface fa-background-color="'red'">Hello world</fa-surface></fa-app>` in one of your templates.  If you see 'Hello world' on a red background, you should be good to go.
**Note: currently, the element that the `<fa-app>` is on must be display: block (like a `<div fa-app>` or a `<p fa-app>`, or just `<fa-app>`) and must have a set height (like `style="height: 200px"` in this example.)  Future versions will not have these requirements.**


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

####To develop the library using the famous-angular-examples submodule

`gulp dev`

####To build the docs

`gulp docs`

####To view and build the docs site

`gulp dev-site`

##Support

Please submit issues as Github issues or reach out for support on the Famous IRC channel on Freenode

##Contributing

We would love to have community contributions and support!  A few areas where could use help right now:

* Writing tests
* Elaborating on documentation
* Creating examples for the docs
* Bug reports and/or fixes
* Continuing to wrap Famo.us layouts and views into directives [advanced]

If you want to contribute, please submit a pull request, or contact hello@thomasstreet.com for more information.

Famo.us/Angular is being developed by [Thomas Street](http://thomasstreet.com) in partnership with [Famo.us](https://famo.us), along with community support.
