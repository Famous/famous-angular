---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/service/$timeline/"
title: "$timeline"
header_sub_title: "Service in module scripts"
doc: "$timeline"
docType: "service"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/services/timeline.js#L1'>
    Improve this doc
  </a>
</div>





<h1 class="api-title">

  $timeline



</h1>





The timeline service provides support for mapping timeline functions to different values.








  

  
  
  




<h2 id="example">Example</h2><pre><code class="lang-html">&lt;fa-modifier
  fa-rotate-y=&quot;yRotation(t.get())&quot;
  fa-translate=&quot;translation(t.get())&quot;
&gt;
  ...
&lt;/fa-modifier&gt;</code></pre>
<pre><code class="lang-javascript">var Transitionable = $famous[&#39;famous/transitions/Transitionable&#39;];
var Easing = $famous[&#39;famous/transitions/Easing&#39;];

$scope.t = new Transitionable(0);

$scope.yRotation = $timeline([
  [0, 0, Easing.inOutQuad],
  [0.8, 1.1 * (Math.PI/2), Easing.inOutQuart],
  [1, Math.PI/2]
]);

$scope.translation = $timeline([
  [0, [100, 100, 0], Easing.inOutQuad],
  [1, [400, 200, 0]]
]);</code></pre>



