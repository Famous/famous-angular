---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faTouchmove/"
title: "fa-touchmove"
header_sub_title: "Directive in module famous.angular"
doc: "faTouchmove"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-touchmove.js#L1'>
    Improve this doc
  </a>
</div>




<h1 class="api-title">

  fa-touchmove



</h1>





This directive allows you to specify custom behavior when an element is <a href="https://developer.mozilla.org/en-US/docs/Web/Reference/Events/touchmove">moved along a touch surface</a>.








  
<h2 id="usage">Usage</h2>
  
```html
<ANY fa-touchmove="expression">

</ANY>
```

Note:  For testing purposes during development, enable mobile emulation: https://developer.chrome.com/devtools/docs/mobile-emulation

##Example
Upon a touchmove event firing, fa-touchmove will evaluate the expression bound to it.

Touchstart fires once upon first touch; touchmove fires as the touch point is moved along a touch surface, until release of the touch point.
The rate of which touchmove events fire is implementation-defined by browser and hardware.
Upon each firing, fa-touchmove evaluates the expression bound to it.

```html
<fa-modifier fa-size="[100, 100]">
  <fa-surface fa-background-color="'red'" fa-touchmove="touchMove($event)"></fa-surface>
</fa-modifier>
```

```javascript
var touchMoveCounter = 0;
$scope.touchMove = function($event) {
  touchMoveCounter++;
  console.log($event);
  console.log("touchMove: " + touchMoveCounter);
};
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
        faTouchmove
        
        
      </td>
      <td>
        
  <code>expression</code>
      </td>
      <td>
        <p>Expression to evaluate upon touchmove. (Event object is available as <code>$event</code>)</p>

        
      </td>
    </tr>
    
  </tbody>
</table>

  

  





