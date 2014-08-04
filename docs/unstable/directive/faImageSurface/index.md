---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faImageSurface/"
title: "fa-image-surface"
header_sub_title: "Directive in module famous.angular"
doc: "faImageSurface"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-image-surface.js#L1'>
    Improve this doc
  </a>
</div>





<h1 class="api-title">

  fa-image-surface



</h1>





This directive creates a Famo.us ImageSurface and loads
the specified ImageUrl.






  
<h2 id="usage">Usage</h2>
  
```html
<fa-image-surface fa-image-url="img/my-image.png">
</fa-image-surface>
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
        faImageUrl
        
        
      </td>
      <td>
        
  <code>String</code>
      </td>
      <td>
        <p>String url pointing to the image that should be loaded into the Famo.us ImageSurface</p>

        
      </td>
    </tr>
    
  </tbody>
</table>

  

  



<h2 id="example">Example</h2><p>To use <code>fa-image-surface</code>, declare an <code>fa-image-url</code> attribute with a string url.</p>
<pre><code class="lang-html">&lt;fa-image-surface
           fa-image-url=&quot;img/my-image.png&quot;
           class=&quot;img&quot;
           fa-color=&quot;&#39;blue&#39;&quot;
           fa-background-color=&quot;&#39;#fff&#39;&quot;
           fa-size=&quot;[200, 300]&quot;&gt;
&lt;/fa-image-surface&gt;</code></pre>
<p><code>Fa-image-surface</code> accepts two css-style properties: <code>color</code> and <code>background color</code>, which may be assigned values by the <code>fa-color</code> and <code>fa-background-color</code> attributes respectively.</p>
<p><code>Fa-size</code> may also be declared as an attribute.  If void, the <code>fa-image-surface</code> will inherit the size of its parent node.</p>



