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





This is a wrapped for tha default ngCick which allows you to specify custom behavior when an fa-surface is clicked.
the wrapper is also design to be be used on touchscreen devices. It matches all the features supported by ngClick on 
including ngTouch module for all types of fa-surface. 

If ngTouch is requried to add touch click capabilites in non F/A elements. Add ngTouch dependence before adding famous.angular otherwise 
this functionality will be lost.






  
<h2 id="usage">Usage</h2>
  
```html
<ANY fa-click="expression">

</ANY>
```
  
  

  



<h2 id="example">Example</h2><h3 id="ng-click-on-an-fa-surface">ng-click on an fa-surface</h3>
<p><code>ng-click</code> can be used on an <code>fa-surface</code>.  Internally, a Famous Surface has a <code>.on()</code> method that binds a callback function to an event type handled by that Surface.
 The function expression bound to <code>ng-click</code> is bound to that <code>fa-surface</code>&#39;s click eventHandler, and when the <code>fa-surface</code> is clicked, the function expression will be called. </p>
<pre><code class="lang-html">&lt;fa-modifier fa-size=&quot;[100, 100]&quot;&gt;
  &lt;fa-surface ng-click=&quot;myClickHandler($event)&quot; fa-background-color=&quot;&#39;red&#39;&quot;&gt;&lt;/fa-surface&gt;
&lt;/fa-modifier&gt;</code></pre>
<p>```javascript
$scope.myClickHandler = function($event) {
  console.log(&quot;click&quot;);
  console.log($event);
};</p>



