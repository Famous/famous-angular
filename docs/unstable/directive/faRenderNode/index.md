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
  
  

  



<h2 id="example">Example</h2><p><code>Fa-render-node</code> can wrap a custom-made widget or any renderable component from Famous and allow it to be inserted in the Render Tree.  </p>
<p>All Famous widgets, such as a Scroll View, a Sequential Layout, or a Header-footer-layout, are extended Famous Views.
<code>Fa-render-node</code> allows a developer to create &amp; extend their own Famous View, and use it within their own Famous-Angular app. </p>
<p>In the example below, a Famous View is instantiated on the scope; a Modifier is added to it, and then a Surface is added below.
This approach of creating a View and adding renderables to it with the <code>.add()</code> method is more in line with a &quot;vanilla Famous&quot; approach than a declarative approach with Famous-Angular.  </p>
<p>In the html view, an <code>fa-render-node</code> is declared, with an <code>fa-node</code> attribute bound to the newly-created View on the scope, resulting in our custom View appearing on the page.</p>
<pre><code class="lang-javascript">var View = $famous[&#39;famous/core/View&#39;];
var Modifier = $famous[&#39;famous/core/Modifier&#39;];
var Surface = $famous[&#39;famous/core/Surface&#39;];
var Transform = $famous[&#39;famous/core/Transform&#39;];

$scope.masterView = new View();

var _surf = new Surface({properties: {backgroundColor: &#39;red&#39;}});
_surf.setContent(&quot;I&#39;m a surface&quot;);

var _mod = new Modifier();

var _width = 320;
var _height = 568;
_mod.transformFrom(function(){
  return Transform.translate(Math.random() * _width, 0, 1);
});

$scope.masterView.add(_mod).add(_surf);</code></pre>
<pre><code class="lang-html">&lt;fa-render-node fa-node=&quot;masterView&quot; id=&quot;render&quot;&gt;&lt;/fa-render-node&gt;</code></pre>



