---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/service/$famousDecorator/"
title: "$famousDecorator"
header_sub_title: "Service in module famous.angular"
doc: "$famousDecorator"
docType: "service"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/services/famousDecorator.js#L1'>
    Improve this doc
  </a>
</div>




<h1 class="api-title">

  $famousDecorator



</h1>





Manages the creation and handling of isolate scopes.

Isolate scopes are like a namespacing inside plain Angular child scopes, 
with the purpose of storing properties available only to one particular 
scope.  
The scopes are still able to communicate with the parent via events 
($emit, $broadcast), yet still have their own $scope properties that will 
not conflict with the parent or other siblings.










  

  
## Methods

<div id="ensureIsolate"></div>
<h2>
  <code>ensureIsolate(scope)</code>

</h2>

Checks the passed in scope for an existing isolate property.  If
scope.isolate does not already exist, create it.

If the scope is being used in conjunction with an ng-repeat, assign
the default ng-repeat index onto the scope.



<table class="table" style="margin:0;">
  <thead>
    <tr>
      <th>Param</th>
      <th>Type</th>
      <th>Details</th>
    </tr>
  </thead>
  <tbody>
    
    <tr>
      <td>
        scope
        
        
      </td>
      <td>
        
  <code>String</code>
      </td>
      <td>
        <p>the scope to ensure that the isolate property
exists on</p>

        
      </td>
    </tr>
    
  </tbody>
</table>






* Returns: 
  <code>Object</code> the isolated scope object from scope.isolate



  
  






