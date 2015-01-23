---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faGridLayout/"
title: "fa-grid-layout"
header_sub_title: "Directive in module famous.angular"
doc: "faGridLayout"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-grid-layout.js#L1'>
    Improve this doc
  </a>
</div>





<h1 class="api-title">

  fa-grid-layout



</h1>





This directive will create a Famo.us GridLayout containing the
specified child elements. The provided `options` object
will pass directly through to the Famo.us GridLayout's
constructor.  See [https://famo.us/docs/views/GridLayout]






  
<h2 id="usage">Usage</h2>
  
```html
<fa-grid-layout fa-options="scopeOptionsObject">
  <!-- zero or more render nodes -->
</fa-grid-layout>
```
  
  

  



<h2 id="example">Example</h2><p>A Famous Grid Layout divides a context into evenly-sized grid cells.  Pass an option such as <code>dimension</code> by binding an object with the property to <code>fa-options</code>.</p>
<p>In the example below, <code>fa-options</code> references <code>myGridLayoutOptions</code> on the scope.  The dimensions property has a value of <code>[2,2]</code> which specifies the columns and rows.  <code>fa-size</code> is specified as <code>[100, 100]</code> on the fa-modifier, so each <code>fa-surface</code> will have these dimensions.</p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example3')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example3"
      
        module="faGridExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app ng-controller=&quot;GridCtrl&quot;&gt;&#10;&lt;fa-grid-layout fa-options=&quot;myGridLayoutOptions&quot;&gt;&#10;   &lt;fa-modifier ng-repeat=&quot;grid in grids&quot;&#10;                fa-size=&quot;[100, 100]&quot;&gt;&#10;     &lt;fa-surface fa-background-color=&quot;grid.bgColor&quot;&gt;&lt;/fa-surface&gt;&#10;   &lt;/fa-modifier&gt;&#10;&lt;/fa-grid-layout&gt;&#10;&lt;/fa-app&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="script.js"
      
        language="js"
      
        type="js"
      
    >
      <pre><code>{% raw %}angular.module(&#39;faGridExampleApp&#39;, [&#39;famous.angular&#39;])&#10;  .controller(&#39;GridCtrl&#39;, [&#39;$scope&#39;, function($scope) {&#10;&#10;    $scope.myGridLayoutOptions = {&#10;       dimensions: [2,2], // specifies number of columns and rows&#10;    };&#10;&#10;    $scope.grids = [{bgColor: &quot;orange&quot;}, {bgColor: &quot;red&quot;}, {bgColor: &quot;green&quot;}, {bgColor: &quot;yellow&quot;}];&#10;&#10;}]);{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example3/index.html" name="example-example3"></iframe>
  </div>
</div>


</p>
<p>If <code>fa-size</code> is not specified, as in this example below, the fa-surface&#39;s will collectively fill the height and width of its parent modifier/context.</p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example4')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example4"
      
        module="faGridExampleAppA"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app ng-controller=&quot;GridCtrlA&quot;&gt;&#10;  &lt;fa-grid-layout fa-options=&quot;myGridLayoutOptions&quot;&gt;&#10;     &lt;fa-surface ng-repeat=&quot;grid in grids&quot; fa-background-color=&quot;grid.bgColor&quot;&gt;&lt;/fa-surface&gt;&#10;  &lt;/fa-grid-layout&gt;&#10;&lt;/fa-app&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="script.js"
      
        language="js"
      
        type="js"
      
    >
      <pre><code>{% raw %}angular.module(&#39;faGridExampleAppA&#39;, [&#39;famous.angular&#39;])&#10;  .controller(&#39;GridCtrlA&#39;, [&#39;$scope&#39;, function($scope) {&#10;&#10;    $scope.myGridLayoutOptions = {&#10;       dimensions: [2,2], // specifies number of columns and rows&#10;    };&#10;&#10;    $scope.grids = [{bgColor: &quot;orange&quot;}, {bgColor: &quot;red&quot;}, {bgColor: &quot;green&quot;}, {bgColor: &quot;yellow&quot;}];&#10;&#10;}]);{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example4/index.html" name="example-example4"></iframe>
  </div>
</div>


</p>



