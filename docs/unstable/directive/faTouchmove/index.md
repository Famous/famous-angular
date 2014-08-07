---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faTouchmove/"
title: "fa-touchmove"
header_sub_title: "Directive in module famous.angular"
doc: "faTouchmove"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-touchmove.js#L1'>
    Improve this doc
  </a>
</div>





<h1 class="api-title">

  fa-touchmove



</h1>





This directive allows you to specify custom behavior when an element is <a href="https://developer.mozilla.org/en-US/docs/Web/Reference/Events/touchmove">moved along a touch surface</a>.






  
<h2 id="usage">Usage</h2>
  
```html
<ANY fa-touchmove="expression">

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
        faTouchmove
        
        
      </td>
      <td>
        
  <code>expression</code>
      </td>
      <td>
        <p>Expression to evaluate upon touchmove. (Event object is available as <code>$event</code>)</p>

        
      </td>
    </tr>
    
  </tbody>
</table>

  

  



<h2 id="example">Example</h2><p>Upon a touchmove event firing, <code>fa-touchmove</code> will evaluate the expression bound to it.</p>
<p>touchmove fires once upon first touch; touchmove fires as the touch point (finger) is moved along a touch surface, until release of the touch point.
The rate of which touchmove events fire is implementation-defined by browser and hardware.
<code>fa-touchmove</code> evaluates the expression bound to it upon each firing of touchmove.</p>
<h3 id="fa-touchmove-on-an-fa-surface">Fa-touchmove on an fa-surface</h3>
<p><code>Fa-touchmove</code>can be used on an <code>fa-surface</code>.  Internally, a Famous Surface has a <code>.on()</code> method that binds a callback function to an event type handled by that Surface.
 The function expression bound to <code>fa-touchmove</code> is bound to that <code>fa-surface</code>&#39;s touchmove eventHandler, and when touchmove fires, the function expression will be called. </p>
<pre><code class="lang-html">&lt;fa-modifier fa-size=&quot;[100, 100]&quot;&gt;
  &lt;fa-surface fa-touchmove=&quot;touchMove($event)&quot; fa-background-color=&quot;&#39;red&#39;&quot;&gt;&lt;/fa-surface&gt;
&lt;/fa-modifier&gt;</code></pre>
<pre><code class="lang-javascript">var touchMoveCounter = 0;
$scope.touchMove = function($event) {
  touchMoveCounter++;
  console.log($event);
  console.log(&quot;touchMove: &quot; + touchMoveCounter);
};</code></pre>
<h3 id="fa-touchmove-on-an-fa-view">Fa-touchmove on an fa-view</h3>
<p><code>Fa-touchmove</code> may be used on an <code>fa-view</code>.  The function expression bound to <code>fa-touchmove</code> will be bound to the <code>fa-view</code>&#39;s internal <code>_eventInput</code>, the aggregation point of all events received by the <code>fa-view</code>.  When it receives a <code>touchmove</code> event, it will call the function expression bound to <code>fa-touchmove</code>.</p>
<p>In the example below, the <code>fa-surface</code> pipes its Surface events to an instantied Famous Event Handler called <code>myEvents</code>.
<code>Fa-view</code> pipes from <code>myEvents</code>, receiving all events piped by the <code>fa-surface</code>.</p>
<p>When a touchmove event occurs on the <code>fa-surface</code>, it is piped to the <code>fa-view</code>.<br><code>fa-touchmove</code> defines a callback function in which to handle touchmove events, and when it receives a touchmove event, it calls <code>touchMove()</code>. </p>
<pre><code class="lang-html">&lt;fa-view fa-touchmove=&quot;touchMove($event)&quot; fa-pipe-from=&quot;myEvents&quot;&gt;
  &lt;fa-modifier fa-size=&quot;[100, 100]&quot;&gt;
    &lt;fa-surface fa-pipe-to=&quot;myEvents&quot;
                fa-background-color=&quot;&#39;orange&#39;&quot;&gt;
    &lt;/fa-surface&gt;
  &lt;/fa-modifier&gt;
&lt;/fa-view&gt;</code></pre>
<pre><code class="lang-javascript">var EventHandler = $famous[&#39;famous/core/EventHandler&#39;];
$scope.myEvents = new EventHandler();

$scope.touchMove = function($event) {
  console.log($event);
  console.log(&quot;fa-view receives the touchmove event from the fa-surface, and calls $scope.touchMove bound to fa-touchmove&quot;);
};</code></pre>



