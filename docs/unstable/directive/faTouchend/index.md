---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faTouchend/"
title: "fa-touchend"
header_sub_title: "Directive in module famous.angular"
doc: "faTouchend"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-touchend.js#L1'>
    Improve this doc
  </a>
</div>




<h1 class="api-title">

  fa-touchend



</h1>





This directive allows you to specify custom behavior after an element that <a href="https://developer.mozilla.org/en-US/docs/Web/Reference/Events/touchend">has been touched</a>.








  
<h2 id="usage">Usage</h2>
  
```html
<ANY fa-touchend="expression">

</ANY>
```

Note:  For testing purposes during development, enable mobile emulation: https://developer.chrome.com/devtools/docs/mobile-emulation
  
  
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
        faTouchend
        
        
      </td>
      <td>
        
  <code>expression</code>
      </td>
      <td>
        <p>Expression to evaluate upon touchend. (Event object is available as <code>$event</code>)</p>

        
      </td>
    </tr>
    
  </tbody>
</table>

  

  



<h2 id="example">Example</h2><p>Upon a touchend event firing, fa-touchend will evaluate the expression bound to it.</p>
<p>Touchstart fires once upon first touch; touchend fires as the touch point is moved along a touch surface; touchend fires upon release of the touch point.</p>
<h3 id="fa-touchend-on-an-fa-surface">Fa-touchend on an fa-surface</h3>
<p><code>Fa-touchend</code> can be used on an <code>fa-surface</code>.  Internally, a Famous Surface has a <code>.on()</code> method that binds a callback function to an event type handled by that Surface.
The function expression bound to <code>fa-touchend</code> is bound to that <code>fa-surface</code>&#39;s touchend eventHandler, and when touchend fires, the function expression will be called. </p>
<pre><code class="lang-html">&lt;fa-modifier fa-size=&quot;[100, 100]&quot;&gt;
  &lt;fa-surface fa-touchend=&quot;touchEnd($event)&quot; fa-background-color=&quot;&#39;red&#39;&quot;&gt;&lt;/fa-surface&gt;
&lt;/fa-modifier&gt;</code></pre>
<pre><code class="lang-javascript">var touchEndCounter = 0;
$scope.touchEnd = function($event) {
  touchEndCounter++;
  console.log($event);
  console.log(&quot;touchEnd: &quot; + touchEndCounter);
};</code></pre>
<h3 id="fa-touchend-on-an-fa-view">Fa-touchend on an fa-view</h3>
<p><code>Fa-touchend</code> may be used on an <code>fa-view</code>.  The function expression bound to <code>fa-touchend</code> will be bound to the <code>fa-view</code>&#39;s internal <code>_eventInput</code>, the aggregation point of all events received by the <code>fa-view</code>.  When it receives a <code>touchend</code> event, it will call the function expression bound to <code>fa-touchend</code>.</p>
<p>In the example below, the <code>fa-surface</code> pipes its Surface events to an instantied Famous Event Handler called <code>myEvents</code>.
<code>Fa-view</code> pipes from <code>myEvents</code>, receiving all events piped by the <code>fa-surface</code>.</p>
<p>When a touchend event occurs on the <code>fa-surface</code>, it is piped to the <code>fa-view</code>.<br><code>fa-touchend</code> defines a callback function in which to handle touchend events, and when it receives a touchend event, it calls <code>touchEnd()</code>. </p>
<pre><code class="lang-html">&lt;fa-view fa-touchend=&quot;touchEnd($event)&quot; fa-pipe-from=&quot;myEvents&quot;&gt;
  &lt;fa-modifier fa-size=&quot;[100, 100]&quot;&gt;
    &lt;fa-surface fa-pipe-to=&quot;myEvents&quot;
                fa-background-color=&quot;&#39;orange&#39;&quot;&gt;
    &lt;/fa-surface&gt;
  &lt;/fa-modifier&gt;
&lt;/fa-view&gt;</code></pre>
<pre><code class="lang-javascript">var EventHandler = $famous[&#39;famous/core/EventHandler&#39;];
$scope.myEvents = new EventHandler();

$scope.touchEnd = function($event) {
  console.log($event);
  console.log(&quot;fa-view receives the touchend event from the fa-surface, and calls $scope.touchEnd bound to fa-touchend&quot;);
};</code></pre>



