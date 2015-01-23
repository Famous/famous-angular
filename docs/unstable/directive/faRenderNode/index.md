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





A directive to insert a <a href="https://famo.us/docs/core/RenderNode">Famo.us RenderNode</a> that is
a wrapper for inserting a renderable component (like a Modifer or Surface) into the render tree.
It allows you to pass a reference to an arbitrary render node from your controller.






  
<h2 id="usage">Usage</h2>
  
```html
<fa-render-node fa-node="arbitrary render node reference">
    <!-- content -->
</fa-render-node>
```
  
  

  



<h2 id="example">Example</h2><p><code>Fa-render-node</code> can wrap a custom-made widget or any renderable component from Famous and allow it to be inserted in the Render Tree.</p>
<p>All Famous widgets, such as a Scroll View, a Sequential Layout, or a Header-footer-layout, are extended Famous Views.
<code>Fa-render-node</code> allows a developer to create &amp; extend their own Famous View, and use it within their own Famous-Angular app.</p>
<p>In the example below, a Famous View is instantiated on the scope; a Modifier is added to it, and then a Surface is added below.
This approach of creating a View and adding renderables to it with the <code>.add()</code> method is more in line with a &quot;vanilla Famous&quot; approach than a declarative approach with Famous-Angular.</p>
<p>In the html view, an <code>fa-render-node</code> is declared, with an <code>fa-node</code> attribute bound to the newly-created View on the scope, resulting in our custom View appearing on the page.</p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example43')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example43"
      
        module="faRenderNodeExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app ng-controller=&quot;RenderCtrl&quot;&gt;&#10;  &lt;fa-render-node fa-node=&quot;masterView&quot; id=&quot;render&quot;&gt;&lt;/fa-render-node&gt;&#10;&lt;/fa-app&gt;&#10;&#10;&lt;script&gt;&#10;  angular.module(&#39;faRenderNodeExampleApp&#39;, [&#39;famous.angular&#39;])&#10;      .controller(&#39;RenderCtrl&#39;, [&#39;$scope&#39;, &#39;$famous&#39;,function($scope, $famous) {&#10;&#10;        var View = $famous[&#39;famous/core/View&#39;];&#10;        var Modifier = $famous[&#39;famous/core/Modifier&#39;];&#10;        var Surface = $famous[&#39;famous/core/Surface&#39;];&#10;        var Transform = $famous[&#39;famous/core/Transform&#39;];&#10;        &#10;        $scope.masterView = new View();&#10;        &#10;        var _surf = new Surface({properties: {backgroundColor: &#39;red&#39;}});&#10;        _surf.setContent(&quot;I&#39;m a surface&quot;);&#10;        &#10;        var _mod = new Modifier();&#10;        &#10;        var _width = 320;&#10;        var _height = 568;&#10;        _mod.transformFrom(function(){&#10;          return Transform.translate(Math.random() * _width, 0, 1);&#10;        });&#10;        &#10;        $scope.masterView.add(_mod).add(_surf);&#10;&#10;    }]);&#10;&lt;/script&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example43/index.html" name="example-example43"></iframe>
  </div>
</div>


</p>



