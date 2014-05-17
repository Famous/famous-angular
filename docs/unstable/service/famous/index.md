---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/service/famous/"
title: "famous"
header_sub_title: "Service in module famous.angular"
doc: "famous"
docType: "service"
---

<div class="improve-docs">
  <a href='https://github.com/FamousInternal/famous-angular/edit/master/src/scripts/services/famous.js#L133'>
    Improve this doc
  </a>
</div>




<h1 class="api-title">

  famous



</h1>





This service gives you access to the complete Famo.us library.









## Usage
Use this service to access the registered Famo.us modules as an object.

```js
angular.module('mySuperApp', ['famous.angular']).controller(
  function($scope, famous) {

      // Access any registered module
      var EventHandler = famous['famous/core/EventHandler'];
      $scope.eventHandler = new EventHandler();

  };
});
```


  

  
  
  






