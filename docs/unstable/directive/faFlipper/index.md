---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faFlipper/"
title: "fa-flipper"
header_sub_title: "Directive in module famous.angular"
doc: "faFlipper"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-flipper.js#L1'>
    Improve this doc
  </a>
</div>





<h1 class="api-title">

  fa-flipper



</h1>





This directive will create a Famo.us Flipper containing the
specified front and back elements. The provided `options` object
will pass directly through to the Famo.us Flipper's
constructor.  See [https://famo.us/docs/views/Flipper]



<h2 id="dependencies">Dependencies</h2>
<ul>
  <li><a href="famous">TODO:famous</a></li>
</ul>




  
<h2 id="usage">Usage</h2>
  
```html
<fa-flipper fa-options="scopeOptionsObject">
  <!-- two render nodes -->
</fa-flipper>
```
  
  

  



<h2 id="example">Example</h2><p>A Famous Flipper has a <code>.flip()</code> method that toggles a rotation between front and back sides.
In the example below, when an <code>fa-surface</code> is clicked, it calls the function <code>flipIt</code>.</p>
<p>This function attempts a DOM lookup for an isolate of an <code>fa-flipper</code> element, and calls the <code>.flip()</code> function of <code>fa-flipper</code>.</p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example2')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example2"
      
        module="faFlipperExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app ng-controller=&quot;FlipperCtrl&quot;&gt;&#10;  &lt;fa-flipper&gt;&#10;    &lt;fa-modifier fa-size=&quot;[200, 200]&quot;&gt;&#10;      &lt;fa-surface fa-background-color=&quot;&#39;yellow&#39;&quot; fa-click=&quot;flipIt()&quot;&gt;Click me to see me flip!&lt;/fa-surface&gt;&#10;    &lt;/fa-modifier&gt;  &#10;    &lt;fa-modifier fa-size=&quot;[200, 200]&quot;&gt;&#10;      &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot; fa-click=&quot;flipIt()&quot;&gt;Flip me again!&lt;/fa-surface&gt;&#10;    &lt;/fa-modifier&gt;  &#10;  &lt;/fa-flipper&gt;&#10;&lt;/fa-app&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}&#10;div {&#10;  cursor: pointer;&#10;  padding: 8px 8px;&#10;}{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="script.js"
      
        language="js"
      
        type="js"
      
    >
      <pre><code>{% raw %}angular.module(&#39;faFlipperExampleApp&#39;, [&#39;famous.angular&#39;])&#10;  .controller(&#39;FlipperCtrl&#39;, [&#39;$scope&#39;, &#39;$famous&#39;, function($scope, $famous) {&#10;    $scope.flipIt = function() {&#10;       $famous.find(&#39;fa-flipper&#39;)[0].flip();&#10;    };&#10;}]);{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example2/index.html" name="example-example2"></iframe>
  </div>
</div>


</p>



