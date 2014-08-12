---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/ngDblclick/"
title: "ng-dblclick"
header_sub_title: "Directive in module scripts"
doc: "ngDblclick"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-input.js#L273'>
    Improve this doc
  </a>
</div>





<h1 class="api-title">

  ng-dblclick



</h1>





This wrapped on `ngDblclick` directive allows you to specify custom behavior on a dblclick event on a fa-surface .






  
<h2 id="usage">Usage</h2>
  
    ```html
  <ANY
    ng-dblclick="">
  ...
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
        ngDblclick
        
        
      </td>
      <td>
        
  <code>expression</code>
      </td>
      <td>
        <p><a href="guide/expression">Expression</a> to evaluate upon
a dblclick. (The Event object is available as <code>$event</code>)</p>

        
      </td>
    </tr>
    
  </tbody>
</table>

  

  



<h2 id="example">Example</h2><example>
     <file name="index.html">
      <fa-surface ng-dblclick="count = count + 1" ng-init="count=0">
        Increment (on double click)
      </fa-surface>
      count: {{count}}
     </file>
   </example>


