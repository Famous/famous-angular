# Famo.us/Angular [![Build Status](https://travis-ci.org/Famous/famous-angular.svg?branch=master)](https://travis-ci.org/Famous/famous-angular)

Add Famo.us interactions and animations to any AngularJS application and build Famo.us applications with AngularJS.

Using F/A, you can:
* Create Famo.us apps using familiar AngularJS tools like controllers, directives, and services.
* Bring rich Famo.us animations to new or existing AngularJS apps.
* Use HTML to declare Famo.us UIs, complete with Angular's two-way databinding.
* Easily integrate Famo.us and AngularJS apps.

###Read More
[Project Site](https://famo.us/angular)


###Download
[Famo.us/Angular Starter Kit](http://code.famo.us/famous-angular/latest/famous-angular-starter-kit.zip?src=github-readme)
  or
`bower install famous-angular`


###Sample projects and generators
* [Famo.us/Angular Starter Project](https://github.com/thomasstreet/famous-angular-starter)
* [Famo.us/Angular CodePen template](http://codepen.io/zackbrown/pen/yyVQje)
* [Famo.us/Angular Yeoman Generator](http://github.com/thaiat/generator-angular-famous-ionic) *(community-maintained)
* [Flickrous](https://github.com/zackbrown) — a simple Flickr example app
* [Famo.us/Angular Homepage Source Code](https://github.com/thomasstreet/famous-angular-docs/tree/master/app)



##Installation

####Before you start, tools you will need:
* Download and install [git](http://git-scm.com/downloads)
* Download and install [nodeJS](http://nodejs.org/download/)
* Install bower `npm install -g bower`

####Inside of your app:
* Run `bower install famous-angular`
* Add the following to your index.html
```html
  <script src="bower_components/famous/dist/famous-global.js"></script>
  <script src="bower_components/famous-angular/dist/famous-angular.js"></script>
```
* Add`<link rel="stylesheet" href="bower_components/famous-angular/dist/famous-angular.css">` to the `<head>` of your index.html
* Add the `famous.angular` module to your Angular module list (e.g. in a main app.js file: `angular.module('yourMainModule', ['famous.angular'])`)
* And add an `<fa-app style="height: 200px"><fa-surface fa-background-color="'red'">Hello world</fa-surface></fa-app>` in one of your templates.  If you see 'Hello world' on a red background, you should be good to go.
**Note: currently, the element that the `<fa-app>` is on must be display: block (like a `<div fa-app>` or a `<p fa-app>`, or just `<fa-app>`) and must have a defined height (like `style="height: 200px"` in this example.)**


##Support

Please submit issues as Github issues or reach out for support on the Famous IRC channel on Freenode.


##Contributing

See [CONTRIBUTING.md](https://github.com/Famous/famous-angular/blob/master/CONTRIBUTING.md) for dev environment instructions and contribution guidelines.


##Get in touch

As mentioned above, please direct support questions to GitHub Issues so that community members can help answer questions as well as benefit from answers.

For anything else, email zack@famo.us or tweet at @befamous and @zackaboo.  