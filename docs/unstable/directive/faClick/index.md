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

  

  



<h2 id="example">Example</h2><h3 id="fa-click-on-an-fa-surface">Fa-click on an fa-surface</h3>
<p><code>Fa-click</code> can be used on an <code>fa-surface</code>.  Internally, a Famous Surface has a <code>.on()</code> method that binds a callback function to an event type handled by that Surface.
 The function expression bound to <code>fa-click</code> is bound to that <code>fa-surface</code>&#39;s click eventHandler, and when the <code>fa-surface</code> is clicked, the function expression will be called. </p>
<pre><code class="lang-html">&lt;fa-modifier fa-size=&quot;[100, 100]&quot;&gt;
  &lt;fa-surface fa-click=&quot;myClickHandler($event)&quot; fa-background-color=&quot;&#39;red&#39;&quot;&gt;&lt;/fa-surface&gt;
&lt;/fa-modifier&gt;</code></pre>
<pre><code class="lang-javascript">$scope.myClickHandler = function($event) {
  console.log(&quot;click&quot;);
  console.log($event);
};</code></pre>
<h3 id="fa-click-on-an-fa-view">Fa-click on an fa-view</h3>
<p><code>Fa-click</code> may be used on an <code>fa-view</code>.  The function expression bound to <code>fa-click</code> will be bound to the <code>fa-view</code>&#39;s internal <code>_eventInput</code>, the aggregation point of all events received by the <code>fa-view</code>.  When it receives a <code>click</code> event, it will call the function expression bound to <code>fa-click</code>.</p>
<p>In the example below, the <code>fa-surface</code> pipes its Surface events to an instantied Famous Event Handler called <code>myEvents</code>.
<code>Fa-view</code> pipes from <code>myEvents</code>, receiving all events piped by the <code>fa-surface</code>.</p>
<p>When a click event occurs on the <code>fa-surface</code>, it is piped to the <code>fa-view</code>.<br><code>fa-click</code> defines a callback function in which to handle click events, and when it receives a click event, it calls <code>myClickHandler()</code>. </p>
<pre><code class="lang-html">&lt;fa-view fa-click=&quot;myClickHandler($event)&quot; fa-pipe-from=&quot;myEvents&quot;&gt;
  &lt;fa-modifier fa-size=&quot;[100, 100]&quot;&gt;
    &lt;fa-surface fa-pipe-to=&quot;myEvents&quot;
                fa-background-color=&quot;&#39;orange&#39;&quot;&gt;
    &lt;/fa-surface&gt;
  &lt;/fa-modifier&gt;
&lt;/fa-view&gt;</code></pre>
<pre><code class="lang-javascript">var EventHandler = $famous[&#39;famous/core/EventHandler&#39;];
$scope.myEvents = new EventHandler();

$scope.myClickHandler = function($event) {
  console.log($event);
  console.log(&quot;fa-view receives the click event from the fa-surface, and calls myClickHandler defined on fa-click&quot;);
};</code></pre>



