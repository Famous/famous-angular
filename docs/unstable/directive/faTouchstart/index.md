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
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example60')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example60"
      
        module="faTouchStartExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app ng-controller=&quot;TouchStartCtrl&quot;&gt;&#10;  &lt;fa-modifier fa-size=&quot;[200, 100]&quot;&gt;&#10;    &lt;fa-surface fa-touchstart=&quot;touchStart($event)&quot;&#10;                fa-background-color=&quot;&#39;red&#39;&quot;&gt;&#10;      Touch start count: {{touchStartCount}}&#10;    &lt;/fa-surface&gt;&#10;  &lt;/fa-modifier&gt;&#10;&lt;/fa-app&gt;&#10;&#10;&lt;script&gt;&#10;  angular.module(&#39;faTouchStartExampleApp&#39;, [&#39;famous.angular&#39;])&#10;    .controller(&#39;TouchStartCtrl&#39;, [&#39;$scope&#39;, &#39;$famous&#39;, function($scope, $famous) {&#10;        &#10;        $scope.touchStartCount = 0;&#10;&#10;        $scope.touchStart = function($event) {&#10;          console.log($event);&#10;          $scope.touchStartCount++;&#10;        };&#10;&#10;    }]);&#10;&lt;/script&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example60/index.html" name="example-example60"></iframe>
  </div>
</div>


</p>
<h3 id="fa-touchstart-on-an-fa-view">Fa-touchstart on an fa-view</h3>
<p><code>Fa-touchstart</code> may be used on an <code>fa-view</code>.  The function expression bound to <code>fa-touchstart</code> will be bound to the <code>fa-view</code>&#39;s internal <code>_eventInput</code>, the aggregation point of all events received by the <code>fa-view</code>.  When it receives a <code>touchstart</code> event, it will call the function expression bound to <code>fa-touchstart</code>.</p>
<p>In the example below, the <code>fa-surface</code> pipes its Surface events to an instantied Famous Event Handler called <code>myEvents</code>.
<code>Fa-view</code> pipes from <code>myEvents</code>, receiving all events piped by the <code>fa-surface</code>.</p>
<p>When a touchstart event occurs on the <code>fa-surface</code>, it is piped to the <code>fa-view</code>.<br><code>fa-touchstart</code> defines a callback function in which to handle touchstart events, and when it receives a touchstart event, it calls <code>touchStart()</code>. </p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example61')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example61"
      
        module="faTouchStartExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app ng-controller=&quot;TouchStartCtrl&quot;&gt;&#10;&#10;  &lt;!-- The fa-view receives the touchstart event from the fa-surface, and calls $scope.touchStart, bound to fa-touchstart on the fa-view. --&gt;&#10;&#10;  &lt;fa-view fa-touchstart=&quot;touchStart($event)&quot; fa-pipe-from=&quot;myEvents&quot;&gt;&#10;    &lt;fa-modifier fa-size=&quot;[200, 100]&quot;&gt;&#10;      &lt;fa-surface fa-pipe-to=&quot;myEvents&quot;&#10;                  fa-background-color=&quot;&#39;orange&#39;&quot;&gt;&#10;        Touch start count: {{touchStartCount}}&#10;      &lt;/fa-surface&gt;&#10;    &lt;/fa-modifier&gt;&#10;  &lt;/fa-view&gt;&#10;&lt;/fa-app&gt;&#10;&#10;&lt;script&gt;&#10;  angular.module(&#39;faTouchStartExampleApp&#39;, [&#39;famous.angular&#39;])&#10;    .controller(&#39;TouchStartCtrl&#39;, [&#39;$scope&#39;, &#39;$famous&#39;, function($scope, $famous) {&#10;        &#10;        var EventHandler = $famous[&#39;famous/core/EventHandler&#39;];&#10;        $scope.myEvents = new EventHandler();&#10;&#10;        $scope.touchStartCount = 0;&#10;        &#10;        $scope.touchStart = function($event) {&#10;          console.log($event);&#10;          $scope.touchStartCount++;&#10;        };&#10;&#10;    }]);&#10;&lt;/script&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example61/index.html" name="example-example61"></iframe>
  </div>
</div>


</p>



