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









## Usage
```js
var isolate = $famousDecorator.ensureIsolate($scope);

$famousDecorator.registerChild($element, $scope, isolate);

$famousDecorator.sequenceWith(
  $scope,
  function(data) { ... },
  function(childScopeId) { ... }
);
```


  

  
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




<div id="registerChild"></div>
<h2>
  <code>registerChild(scope, element, isolate, unregisterCallback)</code>

</h2>

Register a child isolate's renderNode to the nearest parent that can sequence
it, and set up an event listener to remove it when the associated element is destroyed
by Angular.

A `registerChild` event is sent upward with `scope.$emit`.



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
        <p>the scope with an isolate to be sequenced</p>

        
      </td>
    </tr>
    
    <tr>
      <td>
        element
        
        
      </td>
      <td>
        
  <code>String</code>
      </td>
      <td>
        <p>the element to listen for destruction on</p>

        
      </td>
    </tr>
    
    <tr>
      <td>
        isolate
        
        
      </td>
      <td>
        
  <code>Object</code>
      </td>
      <td>
        <p>an isolated scope object from $famousDecorator#ensureIsolate</p>

        
      </td>
    </tr>
    
    <tr>
      <td>
        unregisterCallback
        
        
      </td>
      <td>
        
  <code>Function</code>
      </td>
      <td>
        <p>an optional callback to invoke when unregistration is complete</p>

        
      </td>
    </tr>
    
  </tbody>
</table>






* Returns: 
  <code>void</code> 




<div id="sequenceWith"></div>
<h2>
  <code>sequenceWith(scope, addMethod, removeMethod)</code>

</h2>

Attach a listener for `registerChild` events.



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
        <p>the scope to listen on</p>

        
      </td>
    </tr>
    
    <tr>
      <td>
        addMethod
        
        
      </td>
      <td>
        
  <code>Object</code>
      </td>
      <td>
        <p>the method to apply to the incoming isolate&#39;s content to add it
to the sequence</p>

        
      </td>
    </tr>
    
    <tr>
      <td>
        removeMethod
        
        
      </td>
      <td>
        
  <code>Object</code>
      </td>
      <td>
        <p>the method to apply to the incoming isolate&#39;s ID to remove it
from the sequence</p>

        
      </td>
    </tr>
    
  </tbody>
</table>






* Returns: 
  <code>void</code> 



  
  






