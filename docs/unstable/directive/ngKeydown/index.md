---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/ngKeydown/"
title: "ng-keydown"
header_sub_title: "Directive in module scripts"
doc: "ngKeydown"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-input.js#L488'>
    Improve this doc
  </a>
</div>





<h1 class="api-title">

  ng-keydown



</h1>





Specify custom behavior on keydown event on a fa-surface.






  
<h2 id="usage">Usage</h2>
  
```html
<ANY ng-keydown="expression">

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
        ngKeydown
        
        
      </td>
      <td>
        
  <code>expression</code>
      </td>
      <td>
        <p><a href="guide/expression">Expression</a> to evaluate upon
keydown. (Event object is available as <code>$event</code> and can be interrogated for keyCode, altKey, etc.)</p>

        
      </td>
    </tr>
    
  </tbody>
</table>

  

  



<h2 id="example">Example</h2><p>

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example7')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example7"
      
  >

   
    <div class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>&lt;fa-surface ng-keydown=&quot;count = count + 1&quot; ng-init=&quot;count=0&quot;&gt;&#13;&#10;  key down count: {{count}}&#13;&#10;&lt;/fa-surface&gt;&#13;</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example7/index.html" name="example-example7"></iframe>
  </div>
</div>


</p>



