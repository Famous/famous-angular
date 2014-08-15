---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/ngMouseover/"
title: "ng-mouseover"
header_sub_title: "Directive in module scripts"
doc: "ngMouseover"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-input.js#L372'>
    Improve this doc
  </a>
</div>





<h1 class="api-title">

  ng-mouseover



</h1>





Specify custom behavior on mouseover event on a fa-surface.






  
<h2 id="usage">Usage</h2>
  
```html
<ANY ng-mouseover="expression">

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
        ngMouseover
        
        
      </td>
      <td>
        
  <code>expression</code>
      </td>
      <td>
        <p><a href="guide/expression">Expression</a> to evaluate upon
mouseover. (<a href="guide/expression#-event-">Event object is available as <code>$event</code></a>)</p>

        
      </td>
    </tr>
    
  </tbody>
</table>

  

  



<h2 id="example">Example</h2><p>

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example3')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example3"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %} &lt;fa-surface ng-mouseover=&quot;count = count + 1&quot; ng-init=&quot;count=0&quot; style=&quot;cursor: pointer;&quot;&gt;&#10;  Increment (when mouse is over), count: {{count}}&#10;&lt;/fa-surface&gt;{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example3/index.html" name="example-example3"></iframe>
  </div>
</div>


</p>



