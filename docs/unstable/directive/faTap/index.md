---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faTap/"
title: "fa-tap"
header_sub_title: "Directive in module famous.angular"
doc: "faTap"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-tap.js#L1'>
    Improve this doc
  </a>
</div>





<h1 class="api-title">

  fa-tap



</h1>





This directive allows you to specify custom behavior when an element is tapped.






  
<h2 id="usage">Usage</h2>
  
```html
<ANY fa-tap="expression">

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
        faTap
        
        
      </td>
      <td>
        
  <code>expression</code>
      </td>
      <td>
        <p>Expression to evaluate upon tap. (Event object is available as <code>$event</code>)</p>

        
      </td>
    </tr>
    
  </tbody>
</table>

  

  



<h2 id="example">Example</h2><p>Note: For testing purposes during development, enable mobile emulation: <a href="https://developer.chrome.com/devtools/docs/mobile-emulation">https://developer.chrome.com/devtools/docs/mobile-emulation</a></p>
<p><code>Fa-tap</code> checks if a touchmove event fires between a touchstart and tap event.  If the touchmove event fired, (the user &quot;dragged&quot; their finger), a <code>fa-tap</code> event will not fire.  If the user did not &quot;drag&quot; their finger on touch, when releasing their finger, a tap event will fire, and fa-tap will fire.</p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example54')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example54"
      
        module="faTapExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app ng-controller=&quot;TapCtrl&quot;&gt;&#10;  &lt;fa-modifier fa-size=&quot;[100, 100]&quot;&gt;&#10;    &lt;fa-surface fa-tap=&quot;tapHandler($event)&quot;&#10;                fa-background-color=&quot;&#39;red&#39;&quot;&gt;&#10;      Tap count: {{tapCount}}&#10;    &lt;/fa-surface&gt;&#10;  &lt;/fa-modifier&gt;&#10;&lt;/fa-app&gt;&#10;&#10;&lt;script&gt;&#10;  angular.module(&#39;faTapExampleApp&#39;, [&#39;famous.angular&#39;])&#10;    .controller(&#39;TapCtrl&#39;, [&#39;$scope&#39;, &#39;$famous&#39;, function($scope, $famous) {&#10;        &#10;        $scope.tapCount = 0;&#10;&#10;        $scope.tapHandler = function($event) {&#10;          console.log($event);&#10;          $scope.tapCount++;&#10;        };&#10;&#10;    }]);&#10;&lt;/script&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example54/index.html" name="example-example54"></iframe>
  </div>
</div>


</p>
<h3 id="fa-tap-on-an-fa-view">Fa-tap on an fa-view</h3>
<p><code>Fa-tap</code> may be used on an <code>fa-view</code>.  The function expression bound to <code>fa-tap</code> will be bound to the <code>fa-view</code>&#39;s internal <code>_eventInput</code>, the aggregation point of all events received by the <code>fa-view</code>.  When it receives a <code>tap</code> event, it will call the function expression bound to <code>fa-tap</code>.</p>
<p>In the example below, the <code>fa-surface</code> pipes its Surface events to an instantied Famous Event Handler called <code>myEvents</code>.
<code>Fa-view</code> pipes from <code>myEvents</code>, receiving all events piped by the <code>fa-surface</code>.</p>
<p>When a tap event occurs on the <code>fa-surface</code>, it is piped to the <code>fa-view</code>.<br><code>fa-tap</code> defines a callback function in which to handle tap events, and when it receives a tap event, it calls <code>tap()</code>. </p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example55')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example55"
      
        module="faTapExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app ng-controller=&quot;TapCtrl&quot;&gt;&#10;&#10;  &lt;!-- The fa-view receives the tap event from the fa-surface, and calls $scope.tap, which is bound to fa-tap on the fa-view. --&gt;&#10;&#10;  &lt;fa-view fa-tap=&quot;tap($event)&quot; fa-pipe-from=&quot;myEvents&quot;&gt;&#10;    &lt;fa-modifier fa-size=&quot;[100, 100]&quot;&gt;&#10;      &lt;fa-surface fa-pipe-to=&quot;myEvents&quot;&#10;                  fa-background-color=&quot;&#39;orange&#39;&quot;&gt;&#10;        Tap count: {{tapCount}}&#10;      &lt;/fa-surface&gt;&#10;    &lt;/fa-modifier&gt;&#10;  &lt;/fa-view&gt;&#10;&lt;/fa-app&gt;&#10;&#10;&lt;script&gt;&#10;  angular.module(&#39;faTapExampleApp&#39;, [&#39;famous.angular&#39;])&#10;    .controller(&#39;TapCtrl&#39;, [&#39;$scope&#39;, &#39;$famous&#39;, function($scope, $famous) {&#10;        &#10;        var EventHandler = $famous[&#39;famous/core/EventHandler&#39;];&#10;        $scope.myEvents = new EventHandler();&#10;&#10;        $scope.tapCount = 0;&#10;        &#10;        $scope.tap = function($event) {&#10;          console.log($event);&#10;          $scope.tapCount++;&#10;        };&#10;&#10;    }]);&#10;&lt;/script&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example55/index.html" name="example-example55"></iframe>
  </div>
</div>


</p>



