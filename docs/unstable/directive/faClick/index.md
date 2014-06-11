---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faClick/"
title: "fa-click"
header_sub_title: "Directive in module famous.angular"
doc: "faClick"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-click.js#L1'>
    Improve this doc
  </a>
</div>




<h1 class="api-title">

  fa-click



</h1>





This directive allows you to specify custom behavior when an element is clicked.








  
<h2 id="usage">Usage</h2>
  
```html
<ANY fa-click="expression">

</ANY>
```
  
  
<h2 id="api" style="clear:both;">API</h2>

<table class="table" style="margin:0;">
  <thead>
    <tr>
      <th>Attr</th>
      <th>Type</th>
      <th>Details</th>
    </tr>
  </thead>
  <tbody>
    
    <tr>
      <td>
        faClick
        
        
      </td>
      <td>
        
  <code>expression</code>
      </td>
      <td>
        <p><a href="<a">TODO:href="https://docs.angularjs.org/guide/expression">https://docs.angularjs.org/guide/expression</a> Expression</a> to evaluate upon
click. (<a href="<a">TODO:href="https://docs.angularjs.org/guide/expression#-event-">https://docs.angularjs.org/guide/expression#-event-</a> Event object is available as <code>$event</code></a>)</p>

        
      </td>
    </tr>
    
  </tbody>
</table>

  

  



<h2 id="example">Example</h2><p><code>Fa-click</code> is most commonly used on a <code>fa-surface</code>&#39;.  Internally, a Famous Surface has a <code>&quot;.on()&quot;</code> method that binds a callback function to an event type handled by that Surface.
 The function expression bound to <code>fa-click</code> is bound to that <code>fa-surface</code>&#39;s click eventHandler, and when the <code>fa-surface</code> is clicked, the function expression will be called. </p>
<pre><code class="lang-html">&lt;fa-modifier fa-size=&quot;[100, 100]&quot;&gt;
  &lt;fa-surface fa-click=&quot;myClickHandler($event)&quot; fa-background-color=&quot;&#39;red&#39;&quot;&gt;&lt;/fa-surface&gt;
&lt;/fa-modifier&gt;</code></pre>
<pre><code class="lang-javascript">$scope.myClickHandler = function($event) {
  console.log(&quot;click&quot;);
  console.log($event);
};</code></pre>



