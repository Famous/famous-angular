---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/ngMouseleave/"
title: "ng-mouseleave"
header_sub_title: "Directive in module scripts"
doc: "ngMouseleave"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-input.js#L430'>
    Improve this doc
  </a>
</div>





<h1 class="api-title">

  ng-mouseleave



</h1>





Specify custom behavior on mouseleave event on a fa-surface.






  
<h2 id="usage">Usage</h2>
  
```html
<ANY ng-mouseleave="expression">

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
        ngMouseleave
        
        
      </td>
      <td>
        
  <code>expression</code>
      </td>
      <td>
        <p><a href="guide/expression">Expression</a> to evaluate upon
mouseleave. (<a href="guide/expression#-event-">Event object is available as <code>$event</code></a>)</p>

        
      </td>
    </tr>
    
  </tbody>
</table>

  

  



<h2 id="example">Example</h2><p>

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example5')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example5"
      
  >

   
    <div class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>&lt;fa-surface ng-mouseleave=&quot;count = count + 1&quot; ng-init=&quot;count=0&quot; style=&quot;cursor: pointer;&quot;&gt;&#13;&#10;  Increment (when mouse leaves), count: {{count}}&#13;&#10;&lt;/fa-surface&gt;&#13;</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example5/index.html" name="example-example5"></iframe>
  </div>
</div>


</p>



