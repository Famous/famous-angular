---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faIndex/"
title: "fa-index"
header_sub_title: "Directive in module famous.angular"
doc: "faIndex"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/FamousInternal/famous-angular/edit/master/app/scripts/famous.angular.js#L787'>
    Improve this doc
  </a>
</div>




<h1 class="api-title">

  fa-index



</h1>





This directive is used to specify the rendering order of elements
inside of a ViewSequence-based component, such as @link api/directive/faScrollView faScrollView}
or @link api/directive/faGridLayout faGridLayout}.  As a special case, when elements are added to
these controls using ng-repeat, they are automatically assigned the
$index property exposed by ng-repeat.  When adding elements manually
(e.g. to a faScrollView but not using ng-repeat) or in a case where custom
order is desired, then the index value must be assigned/overridden using the faIndex directive.








  
<h2 id="usage">Usage</h2>
  
```html
<fa-scroll-view>
 <fa-surface fa-index="0">Surface 1</fa-surface>
 <fa-surface fa-index="1">Surface 2</fa-surface>
</fa-scroll-view>
```
  
  

  





