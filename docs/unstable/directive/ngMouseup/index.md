---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/ngMouseup/"
title: "ng-mouseup"
header_sub_title: "Directive in module scripts"
doc: "ngMouseup"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-input.js#L344'>
    Improve this doc
  </a>
</div>





<h1 class="api-title">

  ng-mouseup



</h1>





Specify custom behavior on mouseup event on a fa-surface.






  
<h2 id="usage">Usage</h2>
  
```html
<ANY ng-mouseup="expression">

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
        ngMouseup
        
        
      </td>
      <td>
        
  <code>expression</code>
      </td>
      <td>
        <p><a href="guide/expression">Expression</a> to evaluate upon
mouseup. (<a href="guide/expression#-event-">Event object is available as <code>$event</code></a>)</p>

        
      </td>
    </tr>
    
  </tbody>
</table>

  

  



<h2 id="example">Example</h2><p>

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example2')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example2"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %} &lt;fa-surface ng-mouseup=&quot;count = count + 1&quot; ng-init=&quot;count=0&quot; style=&quot;cursor: pointer;&quot;&gt;&#10;  Increment (on mouse up), count: {{count}}&#10;&lt;/fa-surface&gt;{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example2/index.html" name="example-example2"></iframe>
  </div>
</div>


</p>



