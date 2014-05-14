---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faApp/"
title: "fa-app"
header_sub_title: "Directive in module famous.angular"
doc: "faApp"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/FamousInternal/famous-angular/edit/master/app/scripts/famous.angular.js#L521'>
    Improve this doc
  </a>
</div>




<h1 class="api-title">

  fa-app



</h1>





This directive is the container and entry point to Ang.us.  Behind the scenes,
it creates a Famous context and then adds child elements
to that context as they get compiled.  Inside of this directive,
normal HTML content will not get rendered to the screen unless
it is inside of a <a href="/docs/unstable/api/directive/faSurface">fa-surface</a> directive.








  
<h2 id="usage">Usage</h2>
  
```html
<fa-app ng-controller="MyCtrl">
  <!-- other fa- scene graph components -->
</fa-app>
```
  
  

  





