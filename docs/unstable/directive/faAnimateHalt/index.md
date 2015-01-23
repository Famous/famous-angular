---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faAnimateHalt/"
title: "fa-animate-halt"
header_sub_title: "Directive in module famous.angular"
doc: "faAnimateHalt"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-animate-halt.js#L2'>
    Improve this doc
  </a>
</div>





<h1 class="api-title">

  fa-animate-halt



</h1>





Will execute the passed function/expression when an ngAnimate event on the given element is halted before finishing.
Useful when you want to manage clean-up (e.g. Transitionable `.halt()`ing).






  
<h2 id="usage">Usage</h2>
  
```html
<fa-view ng-repeat="view in views" fa-animate-halt="cleanupFunction()">
</fa-view>
```
  
  

  





