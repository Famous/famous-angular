# Famo.us/Angular [![Build Status](https://travis-ci.org/Famous/famous-angular.svg?branch=master)](https://travis-ci.org/Famous/famous-angular)

Famo.us/Angular is an AngularJS-driven framework for building Famo.us apps.

###Read More
[Project Site](https://famo.us/angular)

###Download
[Famo.us/Angular Starter Kit](http://code.famo.us/famous-angular/latest/famous-angular-starter-kit.zip?src=github-readme)
  or
`bower install famous-angular`


Using F/A, you can:
* Create Famo.us apps using familiar AngularJS tools like controllers, directives, and services.
* Bring rich Famo.us animations to new or existing AngularJS apps.
* Use HTML to declare Famo.us UIs, complete with Angular's two-way databinding.
* Easily integrate Famo.us and AngularJS apps.


##Project Roadmap

[https://www.pivotaltracker.com/n/projects/1119890](https://www.pivotaltracker.com/n/projects/1119890)
Contact [famous-angular@thomasstreet.com](mailto:famous-angular@thomasstreet.com) if you want to claim tasks or contribute to the roadmap.


##Running (For using F/A in your Angular app)

####Before you start, tools you will need
* Download and install [git](http://git-scm.com/downloads)
* Download and install [nodeJS](http://nodejs.org/download/)
* Install bower `npm install -g bower`

####Inside of your app:
* Run `bower install famous-angular`
* Add the following to your index.html
```html
  <script src="bower_components/famous/famous-global.js"></script>
  <script src="bower_components/famous-angular/dist/famous-angular.js"></script>
```
* Add`<link rel="stylesheet" href="bower_components/famous-angular/dist/famous-angular.css">` to the `<head>` of your index.html
* Add the `famous.angular` module to your Angular module list (e.g. in a main app.js file: `angular.module('yourMainModule',['famous.angular', 'ui.router', 'ngAnimate'])`)
* And add an `<fa-app style="height: 200px"><fa-surface fa-background-color="'red'">Hello world</fa-surface></fa-app>` in one of your templates.  If you see 'Hello world' on a red background, you should be good to go.
**Note: currently, the element that the `<fa-app>` is on must be display: block (like a `<div fa-app>` or a `<p fa-app>`, or just `<fa-app>`) and must have a set height (like `style="height: 200px"` in this example.)  Future versions will not have these requirements.**


####Build off of the starter app
To get started even faster, try the [famous-angular-starter](https://github.com/thomasstreet/famous-angular-starter) seed project, with everything already in place.  The starter app has a powerful gulp-based workflow, which includes live reloading and Jade/HAML support.




##Running (For developing or contributing to the library)

####Before you start, tools you will need
* Download and install [git](http://git-scm.com/downloads)
* Download and install [nodeJS](http://nodejs.org/download/)

####First time:
`git clone https://github.com/thomasstreet/famous-angular.git`

`npm install`

`npm install -g gulp`


####Thereafter:
Clone the submodules and install the frontend dependencies inside of your example folder.

`git submodule update --init --recursive`

`cd famous-angular-examples`

`bower install`

`cd ..`

`npm start`

Npm start will use gulp to concatenate files into famous-angular.js, which is built into the app folder. It will also watch for changes inside app and livereload as necessary.

Then open http://localhost:4000.

####To develop the library using the famous-angular-examples submodule

`gulp dev`

####To build the docs

`gulp docs`

####To run tests
Ensure that you have the [karma](http://karma-runner.github.io/0.12/intro/installation.html) command line interface installed.
'npm install -g karma-cli'

`karma start'


##Support

Please submit issues as Github issues or reach out for support on the Famous IRC channel on Freenode


##Contributing

We would love to have community contributions and support!  A few areas where could use help right now:

* Writing tests
* Elaborating on documentation
* Creating examples for the docs
* Bug reports and/or fixes
* Continuing to wrap Famo.us layouts and views into directives [advanced]

If you want to contribute, please submit a pull request, or contact famous-angular@thomasstreet.com for more information.

Please read the contribution guidelines in [CONTRIBUTING.md](https://github.com/Famous/famous-angular/blob/master/CONTRIBUTING.md)

Famo.us/Angular is being developed by [Thomas Street](http://thomasstreet.com) in partnership with [Famo.us](https://famo.us), along with community support.
