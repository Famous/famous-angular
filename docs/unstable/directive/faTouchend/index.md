---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faTouchend/"
title: "fa-touchend"
header_sub_title: "Directive in module famous.angular"
doc: "faTouchend"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-touchend.js#L1'>
    Improve this doc
  </a>
</div>




<h1 class="api-title">

  fa-touchend



</h1>





This directive allows you to specify custom behavior after an element that <a href="https://developer.mozilla.org/en-US/docs/Web/Reference/Events/touchend">has been touched</a>.








  
<h2 id="usage">Usage</h2>
  
```html
<ANY fa-touchend="expression">

</ANY>
```

Note:  For testing purposes during development, enable mobile emulation: https://developer.chrome.com/devtools/docs/mobile-emulation

##Example
Upon a touchend event firing, fa-touchend will evaluate the expression bound to it.

Touchstart fires once upon first touch; touchmove fires as the touch point is moved along a touch surface; touchend fires upon release of the touch point.

```html
<fa-modifier fa-size="[100, 100]">
  <fa-surface fa-background-color="'red'" fa-touchend="touchEnd($event)"></fa-surface>
</fa-modifier>
```

```javascript
var touchEndCounter = 0;
$scope.touchEnd = function($event) {
  touchEndCounter++;
  console.log($event);
  console.log("touchEnd: " + touchEndCounter);
};
qqq
  
  
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
        faTouchend
        
        
      </td>
      <td>
        
  <code>expression</code>
      </td>
      <td>
        <p>Expression to evaluate upon touchend. (Event object is available as <code>$event</code>)</p>

        
      </td>
    </tr>
    
  </tbody>
</table>

  

  





