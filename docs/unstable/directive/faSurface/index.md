---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faSurface/"
title: "fa-surface"
header_sub_title: "Directive in module famous.angular"
doc: "faSurface"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/FamousInternal/famous-angular/edit/master/app/scripts/famous.angular.js#L1215'>
    Improve this doc
  </a>
</div>




<h1 class="api-title">

  fa-surface



</h1>





This directive is used to create general Famo.us surfaces, which are the
leaf nodes of the scene graph.  The content inside
surfaces is what gets rendered to the screen.
This is where you can create form elements, attach
images, or output raw text content with one-way databinding {{}}.
You can include entire complex HTML snippets inside a faSurface, including
ngIncludes or custom (vanilla Angular) directives.








  
<h2 id="usage">Usage</h2>
  
```html
<fa-surface>
  Here's some data-bound content {{myScopeVariable}}
</fa-surface>
```
  
  

  





