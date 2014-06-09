---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faTouchstart/"
title: "fa-touchstart"
header_sub_title: "Directive in module famous.angular"
doc: "faTouchstart"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-touchstart.js#L1'>
    Improve this doc
  </a>
</div>




<h1 class="api-title">

  fa-touchstart



</h1>





This directive allows you to specify custom behavior when an element is <a href="https://developer.mozilla.org/en-US/docs/Web/Reference/Events/touchstart">touched upon a touch surface</a>.








  
<h2 id="usage">Usage</h2>
  
```html
<ANY fa-touchstart="expression">

</ANY>
```

Note:  For testing purposes during development, enable mobile emulation: https://developer.chrome.com/devtools/docs/mobile-emulation

##Example
Upon a touchstart event firing, fa-touchstart will evaluate the expression bound to it.

Touchstart fires once when a touch point (finger) is first placed upon the touch surface.
If the touch point moves or releases touch, it will not fire a touchstart.
If the touch point is placed upon the touch surface again, it will fire another touchstart event.

```html
 <fa-modifier fa-size="[100, 100]">
  <fa-surface fa-background-color="'red'" fa-touchstart="touchStart($event)"></fa-surface>
</fa-modifier>
```
```javascript
  var touchStartCounter = 0;
  $scope.touchStart = function($event) {
    touchStartCounter++;
    console.log($event);
    console.log("touchStart: " + touchStartCounter);
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
        faTouchstart
        
        
      </td>
      <td>
        
  <code>expression</code>
      </td>
      <td>
        <p>Expression to evaluate upon touchstart. (Event object is available as <code>$event</code>)</p>

        
      </td>
    </tr>
    
  </tbody>
</table>

  

  





