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
constructor.  See [https://famo.us/docs/0.1.1/views/GridLayout/]








  
<h2 id="usage">Usage</h2>
  
```html
<fa-grid-layout fa-options="scopeOptionsObject">
  <!-- zero or more render nodes -->
</fa-grid-layout>
```
  
  

  



<h2 id="example">Example</h2><p>A Famous Grid Layout divides a context into evenly-sized grid cells.  Pass options such as <code>dimension</code> and <code>cellSize</code> by binding an object with those properties to <code>fa-options</code>.</p>
<p>In the example below, <code>fa-options</code> references <code>myGridLayoutOptions</code> on the scope. </p>
<pre><code class="lang-javascript">$scope.myGridLayoutOptions = {
   dimensions: [2,2], // specifies number of columns and rows
   cellSize: [100, 100] // specifies width and height of each cell
};</code></pre>
<p>In the example below, <code>fa-size</code> is specified as <code>[100, 100]</code>, so each <code>fa-surface</code> will have these dimensions.</p>
<pre><code class="lang-html">&lt;fa-grid-layout fa-options=&quot;myGridLayoutOptions&quot;&gt;
   &lt;fa-modifier ng-repeat=&quot;grid in grids&quot; 
                fa-size=&quot;[100, 100]&quot;&gt;
     &lt;fa-surface fa-background-color=&quot;grid.bgColor&quot;&gt;&lt;/fa-surface&gt;
   &lt;/fa-modifier&gt;
&lt;/fa-grid-layout&gt;</code></pre>
<pre><code class="lang-javascript">$scope.grids = [{bgColor: &quot;orange&quot;}, {bgColor: &quot;red&quot;}, {bgColor: &quot;green&quot;}, {bgColor: &quot;yellow&quot;}];</code></pre>
<p>If <code>fa-size</code> is not specified, as in this example below, the fa-surface&#39;s will collectively fill the height and width of its parent modifier/context.</p>
<pre><code class="lang-html">&lt;fa-grid-layout fa-options=&quot;myGridLayoutOptions&quot;&gt;
   &lt;fa-surface ng-repeat=&quot;grid in grids&quot; fa-background-color=&quot;grid.bgColor&quot;&gt;&lt;/fa-surface&gt;
&lt;/fa-grid-layout&gt;</code></pre>



