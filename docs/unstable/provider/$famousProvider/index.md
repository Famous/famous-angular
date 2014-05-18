---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/provider/$famousProvider/"
title: "$famousProvider"
header_sub_title: "Provider in module famous.angular"
doc: "$famousProvider"
docType: "provider"
---

<div class="improve-docs">
  <a href='https://github.com/FamousInternal/famous-angular/edit/master/src/scripts/services/famous.js#L52'>
    Improve this doc
  </a>
</div>




<h1 class="api-title">

  $famousProvider



</h1>





This provider is loaded as an AMD module and will keep a reference on the complete Famo.us library.
We use this provider to avoid needing to deal with AMD on any other angular files.









## Usage
You probably won't have to configure this provider

```js
angular.module('mySuperApp', ['famous.angular']).config(
  function($famousProvider) {

      // Register your modules
      $famousProvider.registerModule('moduleKey', module);

  };
});
```


  

  
## Methods

<div id="find"></div>
<h2>
  <code>find(selector)</code>

</h2>

given a selector, retrieves
the isolate on a template-declared scene graph element.  This is useful
for manipulating Famo.us objects directly after they've been declared in the DOM.
As in normal Angular, this DOM look-up should be performed in the postLink function
of a directive.



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
        selector
        
        
      </td>
      <td>
        
  <code>String</code>
      </td>
      <td>
        <p>the selector for the elements to look up</p>

        
      </td>
    </tr>
    
  </tbody>
</table>






* Returns: 
  <code>Array</code> an array of the isolate objects of the selected elements.



  
  






