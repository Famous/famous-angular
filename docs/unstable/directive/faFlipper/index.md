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
constructor.  See [https://famo.us/docs/0.2.0/views/Flipper/]








  
<h2 id="usage">Usage</h2>
  
```html
<fa-flipper fa-options="scopeOptionsObject">
  <!-- two render nodes -->
</fa-flipper>
```
  
  

  



<h2 id="example">Example</h2><p>A Famous Flipper has a <code>.flip()</code> method that toggles a rotation between front and back sides.
In the example below, when an <code>fa-surface</code> is clicked, it calls the function <code>flipIt</code>.</p>
<p>This function attempts a DOM lookup for an isolate of an <code>fa-flipper</code> element, and calls the <code>.flip()</code> function of <code>fa-flipper</code>. </p>
<pre><code class="lang-html">&lt;fa-flipper&gt;
   &lt;fa-surface fa-background-color=&quot;&#39;yellow&#39;&quot; fa-click=&quot;flipIt()&quot;&gt;&lt;/fa-surface&gt;
   &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot; fa-click=&quot;flipIt()&quot;&gt;&lt;/fa-surface&gt;
&lt;/fa-flipper&gt;</code></pre>
<pre><code class="lang-javascript">$scope.flipHandler.on(&#39;flip&#39;, function() {
  $famous.find(&#39;fa-flipper&#39;)[0].flip();
});</code></pre>



