---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/ngClick/"
title: "ng-click"
header_sub_title: "Directive in module famous.angular"
doc: "ngClick"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-input.js#L2'>
    Improve this doc
  </a>
</div>





<h1 class="api-title">

  ng-click



</h1>





This is a wrapped for the default ngClick which allows you to specify custom behavior when an fa-surface is clicked.
the wrapper is also designed to be be used on touchscreen devices. It matches all the features supported by ngClick,
including ngTouch module for all types of fa-surface.

If ngTouch is requried to add touch click capabilites in non F/A elements. Add ngTouch dependence before adding famous.angular otherwise
this functionality will be lost.



<h2 id="dependencies">Dependencies</h2>
<ul>
  <li><a href="famous.angular">TODO:famous.angular</a></li>
</ul>




  
<h2 id="usage">Usage</h2>
  
```html
<ANY ng-click="expression">

</ANY>
```
  
  

  



<h2 id="example">Example</h2><p>

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example10')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example10"
      
        module="faInputExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app ng-controller=&quot;ClickCtrl&quot; id=&quot;app&quot;&gt;&#10;  &lt;fa-modifier fa-size=&quot;[300, 100]&quot;&gt;&#10;    &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot; ng-click=&quot;myClickHandler($event)&quot;&gt;Click Me!  This has been clicked {{clicked}} times.&lt;/fa-surface&gt;&#10;  &lt;/fa-modifier&gt;&#10;&lt;/fa-app&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}#app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}&#10;fa-surface {&#10;  cursor: pointer;&#10;}{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="script.js"
      
        language="js"
      
        type="js"
      
    >
      <pre><code>{% raw %}angular.module(&#39;faInputExampleApp&#39;, [&#39;famous.angular&#39;])&#10;  .controller(&#39;ClickCtrl&#39;, [&#39;$scope&#39;, function($scope) {&#10;    $scope.clicked = 0;&#10;    $scope.myClickHandler = function($event) {&#10;      console.log($event);&#10;      $scope.clicked++;&#10;    };&#10;}]);{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example10/index.html" name="example-example10"></iframe>
  </div>
</div>


</p>
<h3 id="ng-click-on-an-fa-surface">ng-click on an fa-surface</h3>
<p><code>ng-click</code> can be used on an <code>fa-surface</code>.  Internally, a Famous Surface has a <code>.on()</code> method that binds a callback function to an event type handled by that Surface.
 The function expression bound to <code>ng-click</code> is bound to that <code>fa-surface</code>&#39;s click eventHandler, and when the <code>fa-surface</code> is clicked, the function expression will be called.</p>



