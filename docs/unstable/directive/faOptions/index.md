---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faOptions/"
title: "fa-options"
header_sub_title: "Directive in module famous.angular"
doc: "faOptions"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-options.js#L1'>
    Improve this doc
  </a>
</div>





<h1 class="api-title">

  fa-options



</h1>





This directive is used to specify options for all famous directives






  
<h2 id="usage">Usage</h2>
  
```html
<fa-grid-layout fa-options="gridOptions" fa-pipe-from="eventHandler">
<fa-view>
<fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, 100]"></fa-surface>
</fa-view>
</fa-grid-layout>
```

```javascript
var EventHandler = $famous['famous/core/EventHandler'];
$scope.eventHandler = new EventHandler();
$scope.gridOptions = {dimensions: [2, 2]};
```
  
  

  





