---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faView/"
title: "fa-view"
header_sub_title: "Directive in module famous.angular"
doc: "faView"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-view.js#L1'>
    Improve this doc
  </a>
</div>




<h1 class="api-title">

  fa-view



</h1>





This directive is used to wrap child elements into a View render node.  This is especially useful for grouping.
Use an `<fa-view>` surrounded by a `<fa-modifier>` in order to affect the View's position, scale, etc.








  
<h2 id="usage">Usage</h2>
  
```html
<fa-view>
  <!-- content -->
</fa-view>
```
  
  

  



<h2 id="example">Example</h2><p>A Famous View is used for encapsulating many Modifiers and Surfaces together.  Internally, it is a Render Node that has its own input EventHandler (<code>_eventInput</code>) and output EventHandler (<code>_eventOutput</code>). 
It does not map to DOM elements, but rather, it is an empty Render Node that can be extended by a developer.
A View&#39;s input eventHandler is the aggregation point of all events coming into the View, and from there, the View can listen for specific events and handle them.</p>
<p>A more concrete example is a Scroll View: it is a Famous View that has been extended with certain sets of behavior to handle events such as a mouse scroll.
In the example below, when an <code>fa-surface</code> within an <code>fa-scroll-view</code> propagates an event (such as mouse scroll), these events are piped to the Scroll View (through <code>fa-pipe-to</code>). These events go through the Scroll View&#39;s <code>_eventInput</code> (using <code>fa-pipe-from</code>).  From there, the Scroll View has pre-defined event handlers to handle these events.  </p>
<p>Famous Views are a way to encapsulate large event systems with renderables (Surfaces &amp; Modifiers).</p>
<pre><code class="lang-html">&lt;fa-scroll-view fa-pipe-from=&quot;myEventHandler&quot;&gt;
  &lt;fa-view&gt;
    &lt;fa-modifier fa-size=&quot;[320, 320]&quot;&gt;
        &lt;fa-surface fa-pipe-to=&quot;myEventHandler&quot;&gt;&lt;/fa-surface&gt;
      &lt;/fa-modifier&gt;
  &lt;/fa-view&gt;
&lt;/fa-scroll-view&gt;</code></pre>
<pre><code class="lang-javascript">var EventHandler = $famous[&#39;famous/core/EventHandler&#39;];
$scope.myEventHandler = new EventHandler();</code></pre>
<h3 id="event-propagation-within-between-views">Event propagation within &amp; between Views</h3>
<p>In the Famous event model, an <code>fa-view</code> nested within another <code>fa-view</code> does not automatically propagate its events to its parent.
Not even an <code>fa-surface</code> nested inside an <code>fa-view</code> propagates its events to the <code>fa-view</code>.  All events to an <code>fa-view</code> must be piped explicitly.  </p>
<p>For a more thorough discussion on Famous-Angular events, go to fa-pipe-from/fa-pipe-to in the docs.</p>



