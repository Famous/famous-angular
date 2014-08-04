---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faCanvasSurface/"
title: "fa-canvas-surface"
header_sub_title: "Directive in module famous.angular"
doc: "faCanvasSurface"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-canvas-surface.js#L1'>
    Improve this doc
  </a>
</div>




<h1 class="api-title">

  fa-canvas-surface



</h1>





This directive creates a Famo.us CanvasSurface.








  
<h2 id="usage">Usage</h2>
  
```html
<fa-canvas-surface fa-size="[400,400]">
</fa-canvas-surface>
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
        faSize
        
        
      </td>
      <td>
        
  <code>String</code>
      </td>
      <td>
        <p>Array that passes width and height to the canvas</p>

        
      </td>
    </tr>
    
  </tbody>
</table>

  

  



<h2 id="example">Example</h2><p>To use <code>fa-canvas-surface</code>, declare an <code>fa-size</code> attribute with an array containing width and height.</p>
<pre><code class="lang-html">&lt;fa-canvas-surface
           fa-size=&quot;[400,400]&quot;
           class=&quot;main-canvas&quot;
           &gt;
&lt;/fa-canvas-surface&gt;</code></pre>
<p><code>Fa-canvas-surface</code> accepts classes and faSize, the only two attributes HTML5 canvas requires is width and height.</p>



