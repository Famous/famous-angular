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
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-animation.js#L321'>
    Improve this doc
  </a>
</div>

  <br>
  <strong>This directive is deprecated.</strong>





<h1 class="api-title">

  animate



</h1>





This directive is deprecated.  Prefer using the $timeline service.  This element is used to specify the animation of an element in a <a href="../../../api/directive/faAnimation/">faAnimation</a> directive






  
<h2 id="usage">Usage</h2>
  
```html
<fa-animation timeline="functionThatReturnsATimelineValueBetween0And1">
 <animate targetModSelector="#topMod" field="rotateX" startValue="3.1415" endValue="0" curve="inQuad" timelineLowerBound="0" timelineUpperBound=".25" />
</fa-animation>
```
  
  

  





