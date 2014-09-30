---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faEdgeSwapper/"
title: "fa-edge-swapper"
header_sub_title: "Directive in module famous.angular"
doc: "faEdgeSwapper"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-edge-swapper.js#L1'>
    Improve this doc
  </a>
</div>





<h1 class="api-title">

  fa-edge-swapper



</h1>





This directive is used to hook a Famo.us EdgeSwapper into AngularJS ngAnimate events.  For example, you can apply an fa-edge-swapper directive
to a `<ui-view>` or an `<ng-include>` in order to quickly and easily add EdgeSwapper transitions to template changes in those directives.
Supports the `fa-options` directive for setting options.  Does NOT support sitting on the same element as another fa- elemtn






  
<h2 id="usage">Usage</h2>
  
```html
<ui-view fa-edge-swapper></ui-view>
<ng-include src='getSrc()' fa-edge-swapper></ng-include>
```
  
  

  





