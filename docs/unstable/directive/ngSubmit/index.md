---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/ngSubmit/"
title: "ng-submit"
header_sub_title: "Directive in module scripts"
doc: "ngSubmit"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-input.js#L519'>
    Improve this doc
  </a>
</div>





<h1 class="api-title">

  ng-submit



</h1>





Enables binding angular expressions to onsubmit events on a fa-surface.

Additionally it prevents the default action (which for form means sending the request to the
server and reloading the current page), but only if the form does not contain `action`,
`data-action`, or `x-action` attributes.

<div class="alert alert-warning">
**Warning:** Be careful not to cause "double-submission" by using both the `ngClick` and
`ngSubmit` handlers together. See the
<a href="form#submitting-a-form-and-preventing-the-default-action">TODO:`form` directive documentation</a>
for a detailed discussion of when `ngSubmit` may be triggered.
</div>






  
<h2 id="usage">Usage</h2>
  
    ```html
  <form
    ng-submit="">
  ...
  </form>
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
        ngSubmit
        
        
      </td>
      <td>
        
  <code>expression</code>
      </td>
      <td>
        <p><a href="guide/expression">Expression</a> to eval.
(<a href="guide/expression#-event-">Event object is available as <code>$event</code></a>)</p>

        
      </td>
    </tr>
    
  </tbody>
</table>

  

  



<h2 id="example">Example</h2><example module="submitExample">
   </example>


