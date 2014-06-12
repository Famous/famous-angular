---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faTouchstart/"
title: "fa-touchstart"
header_sub_title: "Directive in module famous.angular"
doc: "faTouchstart"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-touchstart.js#L1'>
    Improve this doc
  </a>
</div>




<h1 class="api-title">

  fa-touchstart



</h1>





This directive allows you to specify custom behavior when an element is <a href="https://developer.mozilla.org/en-US/docs/Web/Reference/Events/touchstart">touched upon a touch surface</a>.








  
<h2 id="usage">Usage</h2>
  
```html
<ANY fa-touchstart="expression">

</ANY>
```

Note:  For development purposes, enable mobile emulation: https://developer.chrome.com/devtools/docs/mobile-emulation
  
  
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
        faTouchstart
        
        
      </td>
      <td>
        
  <code>expression</code>
      </td>
      <td>
        <p>Expression to evaluate upon touchstart. (Event object is available as <code>$event</code>)</p>

        
      </td>
    </tr>
    
  </tbody>
</table>

  

  



<h2 id="example">Example</h2><p>Upon a <code>touchstart</code> event firing, <code>fa-touchstart</code> will evaluate the expression bound to it.</p>
<p>Touchstart fires once when a touch point (finger) is first placed upon the touch surface.
If the touch point moves or releases touch, it will not fire another touchstart; touchstart fires once upon the first touch.
If the touch point is placed upon the touch surface again, it will fire another touchstart event.</p>
<h3 id="fa-touchstart-on-an-fa-surface">Fa-touchstart on an fa-surface</h3>
<p><code>Fa-touchstart</code> can be used on an <code>fa-surface</code>.  Internally, a Famous Surface has a <code>.on()</code> method that binds a callback function to an event type handled by that Surface.
 The function expression bound to <code>fa-touchstart</code> is bound to that <code>fa-surface</code>&#39;s touchstart eventHandler, and when touchstart fires, the function expression will be called. </p>
<pre><code class="lang-html">&lt;fa-modifier fa-size=&quot;[100, 100]&quot;&gt;
  &lt;fa-surface fa-touchstart=&quot;touchStart($event)&quot; fa-background-color=&quot;&#39;red&#39;&quot;&gt;&lt;/fa-surface&gt;
&lt;/fa-modifier&gt;</code></pre>
<pre><code class="lang-javascript">  var touchStartCounter = 0;
  $scope.touchStart = function($event) {
    touchStartCounter++;
    console.log($event);
    console.log(&quot;touchStart: &quot; + touchStartCounter);
  };</code></pre>
<h3 id="fa-touchstart-on-an-fa-view">Fa-touchstart on an fa-view</h3>
<p><code>Fa-touchstart</code> may be used on an <code>fa-view</code>.  The function expression bound to <code>fa-touchstart</code> will be bound to the <code>fa-view</code>&#39;s internal <code>_eventInput</code>, the aggregation point of all events received by the <code>fa-view</code>.  When it receives a <code>touchstart</code> event, it will call the function expression bound to <code>fa-touchstart</code>.</p>
<p>In the example below, the <code>fa-surface</code> pipes its Surface events to an instantied Famous Event Handler called <code>myEvents</code>.
<code>Fa-view</code> pipes from <code>myEvents</code>, receiving all events piped by the <code>fa-surface</code>.</p>
<p>When a touchstart event occurs on the <code>fa-surface</code>, it is piped to the <code>fa-view</code>.<br><code>fa-touchstart</code> defines a callback function in which to handle touchstart events, and when it receives a touchstart event, it calls <code>touchStart()</code>. </p>
<pre><code class="lang-html">&lt;fa-view fa-touchstart=&quot;touchStart($event)&quot; fa-pipe-from=&quot;myEvents&quot;&gt;
  &lt;fa-modifier fa-size=&quot;[100, 100]&quot;&gt;
    &lt;fa-surface fa-pipe-to=&quot;myEvents&quot;
                fa-background-color=&quot;&#39;orange&#39;&quot;&gt;
    &lt;/fa-surface&gt;
  &lt;/fa-modifier&gt;
&lt;/fa-view&gt;</code></pre>
<pre><code class="lang-javascript">var EventHandler = $famous[&#39;famous/core/EventHandler&#39;];
$scope.myEvents = new EventHandler();

$scope.touchStart = function($event) {
  console.log($event);
  console.log(&quot;fa-view receives the touchstart event from the fa-surface, and calls $scope.touchStart bound to fa-touchstart&quot;);
};</code></pre>



