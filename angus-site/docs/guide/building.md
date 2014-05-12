---
layout: docs_guide
title: "Building out the Todo App"
chapter: building
---

Previous: <a href="testing.html">Starting our App</a>

# Chapter 5: Building out our App

Now that we know everything there is to know about testing our Ionic apps, and we have a working app shell, let's move on to actually making some bacon!

So, let's take another look at our mockup:

<img src="http://ionicframework.com.s3.amazonaws.com/guide/0.1.0/3-mockup.png" alt="Mockup">

We can see that both the center content and side menus have lists. Lists in Ionic are very powerful, and come with a lot of different features commonly see in native apps. Luckily, adding them is really simple.

Since we are using AngularJS, we are going to use the <a href="http://docs.angularjs.org/api/ng.directive:ngRepeat">`ng-repeat`</a> directive to create a new list item for every single task we have in a given project:

<button type="button" class="btn btn-danger" data-toggle="collapse" data-target="#angular-note">
  AngularJS n00b?
</button>

<div id="angular-note" class="collapse well">
<p>
  Never fear! You can pick up the basics with the ever-growing selection of great tutorials on the web. If you like videos, John Lindquist of <a href="http://egghead.io/">egghead.io</a> has a great selection of short, straight-to-the point AngularJS tutorial videos. You can start with Video #1: <a href="http://egghead.io/lessons/angularjs-binding">AngularJS Binding</a>. Matt Frisbie of <a href="http://www.thinkster.io/">Thinkster.io</a> also has a <a href="http://www.thinkster.io/pick/GtaQ0oMGIl/">great selection</a> of tutorials.
</p>
<p>
  One of the toughest parts about learning Angular is not knowing "the way" to do certain things. We hope that by providing a great selection of examples and guides for Ionic, you'll pick up on how to write Angular in practice. There is no better way to learn Angular than by building something real!
</p>
<p>
  Keep in mind, when you see tags that look new, like <code>&lt;ion-content&gt;</code>, those are custom AngularJS <a href="http://docs.angularjs.org/guide/directive">directives</a> that we have added to Ionic to make it
much easier to use Ionic components. They will get expanded by Angular into more lower-level markup, and also controlled by our lower level
Javscript controllers that give them increased functionality.
</p>
</div>


With the list code and the Angular `ng-repeat`, the center content becomes:

```html
{% raw %}
<!-- Center content -->
<ion-side-menu-content>
  <ion-header-bar class=bar-dark">
    <h1 class="title">Todo</h1>
  </ion-header-bar>
  <ion-content>
    <!-- our list and list items -->
    <ion-list>
      <ion-item ng-repeat="task in tasks">
        {{task.title}}
      </ion-item>
    </ion-list>
  </ion-content>
</ion-side-menu-content>
{% endraw %}

```

But this doesn't do anything yet, because we don't have any tasks or any code to drive our application. To do this, we need to create an Angular controller and add it to the page. We are going to just use one controller for this app, called `TodoCtrl`. We are going to add it directly to the body tag:

```html
<body ng-app="todo" ng-controller="TodoCtrl">
```

Then, we need to define this controller in our `app.js` file, and we can add some testing tasks in:

```javascript
angular.module('todo', ['ionic'])

.controller('TodoCtrl', function($scope) {
  $scope.tasks = [
    { title: 'Collect coins' },
    { title: 'Eat mushrooms' },
    { title: 'Get high enough to grab the flag' },
    { title: 'Find the Princess' }
  ];
});
```

Run the example again, and we should see our list of very important tasks!

<img src="http://ionicframework.com.s3.amazonaws.com/guide/0.1.0/4-list.png" alt="List" style="border: 1px solid #ccc; border-radius: 4px;" alt="Running">

## Creating tasks

Okay, so we have some testing data for tasks, but what about creating them? We need some ways to do that. Working with our test data, let's add a simple Modal window that slides up, letting us put in a new task. Place
the following script tag after the closing `</ion-side-menu>` tag in the `<body>` of the HTML file:

```html
<script id="new-task.html" type="text/ng-template">

  <div class="modal">

    <!-- Modal header bar -->
    <ion-header-bar class="bar-secondary">
      <h1 class="title">New Task</h1>
      <button class="button button-clear button-positive" ng-click="closeNewTask()">Cancel</button>
    </ion-header-bar>

    <!-- Modal content area -->
    <ion-content>

      <form ng-submit="createTask(task)">
        <div class="list">
          <label class="item item-input">
            <input type="text" placeholder="What do you need to do?" ng-model="task.title">
          </label>
        </div>
        <div class="padding">
          <button type="submit" class="button button-block button-positive">Create Task</button>
        </div>
      </form>

    </ion-content>

  </div>

</script>
```

There is a lot of information in the above code. First of all, we are defining this template as an Angular template using `<script id="new-task.html" type="text/ng-template">`. The good thing about Angular templates is they can be loaded from anywhere: locally or remote. The URL of the template is the unique identifier, and if the template is defined locally, it will be fetched locally. Templates are a great way to separate layouts and UIs, so we use them extensively.

We then set a header with a button to close the modal, and then set up our content area. For the form, we are calling `createTask(task)` when the form is submitted. The `task` that is passed to `createTask` is the object corresponding to the entered form data. Since our text input has `ng-model="task.title"`, that text input will set the `title` property of the `task` object.

In order to trigger the Modal to open, we need a button in the main header bar and some code to open the modal, the center content then becomes:

```html
  <!-- Center content -->
  <ion-side-menu-content>
    <ion-header-bar class="bar-dark">
      <h1 class="title">Todo</h1>
      <!-- New Task button-->
      <button class="button button-icon" ng-click="newTask()">
        <i class="icon ion-compose"></i>
      </button>
    </ion-header-bar>
  </ion-side-menu-content>
  <!-- ... -->
```

And in our controller code:

```javascript
angular.module('todo', ['ionic'])

.controller('TodoCtrl', function($scope, $ionicModal) {
  // No need for testing data anymore
  $scope.tasks = [];

  // Create and load the Modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  // Called when the form is submitted
  $scope.createTask = function(task) {
    $scope.tasks.push({
      title: task.title
    });
    $scope.taskModal.hide();
    task.title = "";
  };

  // Open our new task modal
  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  // Close the new task modal
  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };
});
```

Now run the example and try adding a task. It should slide up the modal and then show the new task after submitting it.


## Adding projects

Now we can add support for adding and selecting projects. To do this, we are going to do a lot of the same work we did for the tasks list. We will add a list to display the projects, and a button to add a new project. We are also going to take the chance to abstract away the `Project` model into an angular service that will also handle saving and loading our projects and tasks from localStorage.

We are also going to slip in a few more little things to make the app feel right. Specifically, we've added support for selecting a project (and showing that it's selected), and automatically closing the side menu when creating a new project or selecting an existing one.

Here is the new content area markup:

```html
{% raw %}
<!-- Center content -->
<ion-side-menu-content>
  <ion-header-bar class="bar-dark">
    <button class="button button-icon" ng-click="toggleProjects()">
      <i class="icon ion-navicon"></i>
    </button>
    <h1 class="title">{{activeProject.title}}</h1>
    <!-- New Task button-->
    <button class="button button-icon" ng-click="newTask()">
      <i class="icon ion-compose"></i>
    </button>
  </ion-header-bar>
  <ion-content scroll="false">
    <ion-list>
      <ion-item ng-repeat="task in activeProject.tasks">
        {{task.title}}
      </ion-item>
    </ion-list>
  </ion-content>
</ion-side-menu-content>
{% endraw %}
```

And the new side menu markup:


```html
{% raw %}
  <!-- Left menu -->
  <ion-side-menu side="left">
    <ion-header-bar class="bar-dark">
      <h1 class="title">Projects</h1>
      <button class="button button-icon ion-plus" ng-click="newProject()">
      </button>
    </ion-header-bar>
    <ion-content scroll="false">
      <ion-list>
        <ion-item ng-repeat="project in projects" ng-click="selectProject(project, $index)" ng-class="{active: activeProject == project}">
          {{project.title}}
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-side-menu>
{% endraw %}
```


This adds a side menu of projects, letting us click on each project and also add a new one with a small plus icon button in the header bar. The `ng-class` directive in the `<ion-item>` makes sure to add the `active` class to the currently active project.

To enable adding, saving, and loading projects, we've had to add a bit of code to the controller. Here is the new version of the `app.js` file:

```javascript
{% raw %}
angular.module('todo', ['ionic'])
/**
 * The Projects factory handles saving and loading projects
 * from local storage, and also lets us save and load the
 * last active project index.
 */
.factory('Projects', function() {
  return {
    all: function() {
      var projectString = window.localStorage['projects'];
      if(projectString) {
        return angular.fromJson(projectString);
      }
      return [];
    },
    save: function(projects) {
      window.localStorage['projects'] = angular.toJson(projects);
    },
    newProject: function(projectTitle) {
      // Add a new project
      return {
        title: projectTitle,
        tasks: []
      };
    },
    getLastActiveIndex: function() {
      return parseInt(window.localStorage['lastActiveProject']) || 0;
    },
    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveProject'] = index;
    }
  }
})

.controller('TodoCtrl', function($scope, $timeout, $ionicModal, Projects, $ionicSideMenuDelegate) {

  // A utility function for creating a new project
  // with the given projectTitle
  var createProject = function(projectTitle) {
    var newProject = Projects.newProject(projectTitle);
    $scope.projects.push(newProject);
    Projects.save($scope.projects);
    $scope.selectProject(newProject, $scope.projects.length-1);
  }


  // Load or initialize projects
  $scope.projects = Projects.all();

  // Grab the last active, or the first project
  $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

  // Called to create a new project
  $scope.newProject = function() {
    var projectTitle = prompt('Project name');
    if(projectTitle) {
      createProject(projectTitle);
    }
  };

  // Called to select the given project
  $scope.selectProject = function(project, index) {
    $scope.activeProject = project;
    Projects.setLastActiveIndex(index);
    $ionicSideMenuDelegate.toggleLeft(false);
  };

  // Create our modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope
  });

  $scope.createTask = function(task) {
    if(!$scope.activeProject || !task) {
      return;
    }
    $scope.activeProject.tasks.push({
      title: task.title
    });
    $scope.taskModal.hide();

    // Inefficient, but save all the projects
    Projects.save($scope.projects);

    task.title = "";
  };

  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  }

  $scope.toggleProjects = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };


  // Try to create the first project, make sure to defer
  // this by using $timeout so everything is initialized
  // properly
  $timeout(function() {
    if($scope.projects.length == 0) {
      while(true) {
        var projectTitle = prompt('Your first project title:');
        if(projectTitle) {
          createProject(projectTitle);
          break;
        }
      }
    }
  });

});
{% endraw %}
```

I know, that was a lot of code to jump right to, but it's largely the same concepts from before, just with more details. If you run this version of the app, you should now have a pretty polished and usable multi-project Todo app!


[Chapter 5: Publishing](publishing.html)

