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
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-app.js#L1'>
    Improve this doc
  </a>
</div>




<h1 class="api-title">

  fa-app



</h1>





This directive is the container and entry point to Famo.us/Angular.  Behind the scenes,
it creates a Famous context and then adds child elements
to that context as they get compiled.  Inside of this directive,
normal HTML content will not get rendered to the screen unless
it is inside of a <a href="api/directive/faSurface">fa-surface</a> directive.








  
<h2 id="usage">Usage</h2>
  
```html
<fa-app ng-controller="MyCtrl">
  <!-- other fa- scene graph components -->
</fa-app>
```

Fa-app creates a Famous context, the root of the Render Tree.  In the html, it appears as a div with the css class "famous-container". 
Elements (such as fa-modifier's & fa-surface's) nested within an <fa-app> are added to this root context. 
  
Declaring fa-app appends a div with the class of "famous-angular-container" to the DOM.  It then instantiates a Context via Famous' Engine createContext method, passing in the famous-angular-container div, resulting in a Famous context that renderables can be added to.

Nesting an fa-app within another fa-app is possible, and the use case of this approach would be for content overflow.
Declaring multiple fa-app's within a page is permitted, but each extra results in a penalty to performance, and fa-app's should definitely not be declared within an ng-repeat.

Fa-app can be declared on its own or within another element.  

Note:  Right now, the element fa-app is declared within must have a height and width styling, declared inline or as a css declaration in an external stylesheet.

```html
<fa-app style="width: 320px; height: 568px;">
</fa-app>
```
  
  

  





