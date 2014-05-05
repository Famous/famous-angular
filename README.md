# famous-angular

##Running

####Before you start, tools your will need
* Download and install [git](http://git-scm.com/downloads)
* Download and install [nodeJS](http://nodejs.org/download/)

####First time:
`git clone https://github.com/thomasstreet/famous-angular.git`

`npm install`

####Thereafter:
`npm start`

Npm start will use gulp to concatenate files into famous.angular.js, which is built into the app folder. It will also watch for changes inside app and livereload as necessary.

As configured, you should be able to access the application at localhost:4000.

##Overview:
[Slide deck overview](http://thomas-street.s3.amazonaws.com/famous-angular-overview.pdf)

##Goals:

Allow famo.us components to work seamlessly with other components inside existing or future Angular apps.
Maintain the same high standards of code-quality,  developer experience,  and performance as the core Famo.us project.
Allow an Angular developer to write a Famo.us app while separating its view logic from the rest of its logic
Create that view declaratively, using the DOM to represent the tree structure of an app -- bringing the declarative magic of Angular to Famo.us.
Work with the Famo.us team to make sure Famous-Angular supports Famo.us’s long-term goals and vision.

##Approach:
 Creating a Famo.us app inside angular is as simple as adding a <fa-app></fa-app> tag to an existing Angular app. Behind the scenes, our adapter traverses the Angular DOM and determines parent-child relationships, adding the necessary elements with the appropriate hierarchy to the famo.us context.  Developer-defined controllers can be added to any <fa-...> element, allowing the developer to continue to use Angular’s controllers as the atomic unit of component logic. 

##Development Roadmap:

https://app.asana.com/0/11288022110976/11612210261574

If you want to contribute, contact hello@thomasstreet.com for access to Asana.
