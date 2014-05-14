---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faModifier/"
title: "fa-modifier"
header_sub_title: "Directive in module famous.angular"
doc: "faModifier"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/FamousInternal/famous-angular/edit/master/dist/scripts/famous.angular.js#L630'>
    Improve this doc
  </a>
</div>




<h1 class="api-title">

  fa-modifier



</h1>





This directive creates a Famo.us Modifier that will affect all children render nodes.  Its properties can be bound
to numbers (including using Angular's data-binding, though this is discouraged for performance reasons)
or to functions that return numbers.  The latter is  preferred, because the reference to the function is passed
directly on to Famo.us, where only the reference to that function needs to be
watched by Angular instead of needing to $watch the values returned by the function.








  
<h2 id="usage">Usage</h2>
  
```html
<fa-modifier fa-opacity=".25" fa-skew="myScopeSkewVariable" fa-translate="[25, 50, 2]" fa-scale="myScopeFunctionThatReturnsAnArray">
  <!-- Child elements of this fa-modifier will be affected by the values above -->
  <fa-surface>I'm translucent, skewed, rotated, and translated</fa-surface>
</fa-modifier>
```
  
  

  





