---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/animate/"
title: "animate"
header_sub_title: "Directive in module famous.angular"
doc: "animate"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/FamousInternal/famous-angular/edit/master/dist/scripts/famous.angular.js#L82'>
    Improve this doc
  </a>
</div>




<h1 class="api-title">

  animate



</h1>





This directive is used to specify the animation of an element in a <a href="/docs/unstable/api/directive/faAnimation">faAnimation</a> directive








  
<h2 id="usage">Usage</h2>
  
```html
<fa-animation timeline="functionThatReturnsATimelineValueBetween0And1">
 <animate targetModSelector="#topMod" field="rotateX" startValue="3.1415" endValue="0" curve="inQuad" timelineLowerBound="0" timelineUpperBound=".25" />
</fa-animation>
```
  
  

  





