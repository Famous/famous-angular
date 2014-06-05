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

  

  



<h2 id="example">Example</h2><p>Example:</p>
<pre><code class="lang-javascript">$scope.myClickHandler = function(){
  console.log(&#39;clicked&#39;) // clicked
}</code></pre>
<pre><code class="lang-html">&lt;fa-surface fa-click=&quot;myClickHandler()&quot;&gt;Click me&lt;/fa-surface&gt;</code></pre>



