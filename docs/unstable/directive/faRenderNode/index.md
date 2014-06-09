---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faRenderNode/"
title: "fa-render-node"
header_sub_title: "Directive in module famous.angular"
doc: "faRenderNode"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-render-node.js#L1'>
    Improve this doc
  </a>
</div>




<h1 class="api-title">

  fa-render-node



</h1>





A directive to insert a <a href="https://famo.us/docs/0.1.1/core/RenderNode/">Famo.us RenderNode</a> that is
a wrapper for inserting a renderable component (like a Modifer or Surface) into the render tree.
It allows you to pass a reference to an arbitrary render node from your controller.








  
<h2 id="usage">Usage</h2>
  
```html
<fa-render-node fa-node="arbitrary render node reference">
    <!-- content -->
</fa-render-node>
```
  
Fa-render-node can wrap a custom-made widget or any renderable component from Famous and allow it to be inserted in the Render Tree.  

In the example below, we instantiate a Famous View, add a Modifier to it, and add a surface to it - more in line with a "vanilla Famous" approach than the declarative approach with Famous-Angular.  

In the html view, we declare an fa-render-node with the name of our View on the scope, and it will appear on the page.

```html
<fa-render-node fa-node="masterView" id="render"></fa-render-node>
```

```javascript
var View = $famous['famous/core/View'];
var Modifier = $famous['famous/core/Modifier'];
var Surface = $famous['famous/core/Surface'];
var Transform = $famous['famous/core/Transform'];

$scope.masterView = new View();

var _surf = new Surface({properties: {backgroundColor: 'red'}});
_surf.setContent("I'm a surface");

var _mod = new Modifier();

var _width = 320;
var _height = 568;
_mod.transformFrom(function(){
  return Transform.translate(Math.random() * _width, 0, 1);
});

$scope.masterView.add(_mod).add(_surf);
```javascript
  
  

  





