---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faSequentialLayout/"
title: "fa-sequential-layout"
header_sub_title: "Directive in module famous.angular"
doc: "faSequentialLayout"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-sequential-layout.js#L1'>
    Improve this doc
  </a>
</div>




<h1 class="api-title">

  fa-sequential-layout



</h1>





This directive will create a Famo.us SequentialLayout containing the
specified child elements. The provided `options` object
will pass directly through to the Famo.us faSequentialLayout's
constructor.  See [https://famo.us/docs/views/SequentialLayout]








  
<h2 id="usage">Usage</h2>
  
```html
<fa-sequential-layout fa-options="scopeOptionsObject">
  <!-- zero or more render nodes -->
</fa-sequential-layout>
```
  
  

  



<h2 id="example">Example</h2><p><code>Fa-sequential-layout</code> is a Famous View that arranges a collection of renderables sequentially in a specified direction.  Pass options (such as <code>direction</code>) by binding an object with the property to <code>fa-options</code>.</p>
<p>In the example below, an ng-repeat is used on an <code>fa-view</code> and the elements nested below it.  The size of each <code>fa-surface</code> is <code>[undefined, 100]</code>, specifying that the width will fill the parent container, and the height will be 100 pixels.</p>
<p>There are no positioning properties (such as <code>fa-translate</code>) specified on the <code>fa-modifier</code>, but these <code>fa-surface</code>s will translate automatically in the specified direction as not to overlap each other.</p>
<pre><code class="lang-html">&lt;fa-sequential-layout fa-options=&quot;seqOptions&quot;&gt;
 &lt;fa-view ng-repeat=&quot;view in seq&quot;&gt;
   &lt;fa-modifier fa-size=&quot;[undefined, 100]&quot;&gt;
     &lt;fa-surface fa-background-color=&quot;view.bgColor&quot;&gt;&lt;/fa-surface&gt;
   &lt;/fa-modifier&gt;
 &lt;/fa-view&gt;
&lt;/fa-sequential-layout&gt;</code></pre>
<pre><code class="lang-javascript">$scope.seqOptions = {
  direction: 1, // vertical = 1 (default), horizontal = 0
};
$scope.seq = [{bgColor: &quot;orange&quot;}, {bgColor: &quot;red&quot;}, {bgColor: &quot;green&quot;}, {bgColor: &quot;yellow&quot;}];</code></pre>



