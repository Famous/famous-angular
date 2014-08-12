---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/ngMouseenter/"
title: "ng-mouseenter"
header_sub_title: "Directive in module scripts"
doc: "ngMouseenter"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-input.js#L374'>
    Improve this doc
  </a>
</div>





<h1 class="api-title">

  ng-mouseenter



</h1>





Specify custom behavior on mouseenter event on a fa-surface.






  
<h2 id="usage">Usage</h2>
  
    ```html
  <ANY
    ng-mouseenter="">
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
        ngMouseenter
        
        
      </td>
      <td>
        
  <code>expression</code>
      </td>
      <td>
        <p><a href="guide/expression">Expression</a> to evaluate upon
mouseenter. (<a href="guide/expression#-event-">Event object is available as <code>$event</code></a>)</p>

        
      </td>
    </tr>
    
  </tbody>
</table>

  

  



<h2 id="example">Example</h2><example>
     <file name="index.html">
      <fa-surface ng-mouseenter="count = count + 1" ng-init="count=0">
        Increment (when mouse enters)
      </fa-surface>
      <fa-surface>
        count: {{count}}
      </fa-surface>
     </file>
   </example>


