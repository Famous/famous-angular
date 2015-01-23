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

  

  



<h2 id="example">Example</h2><p>To use <code>fa-image-surface</code>, declare an <code>fa-image-url</code> attribute with a string url.
 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example8')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example8"
      
        module="faImageSurfExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app&gt;&#10;  &lt;fa-image-surface&#10;             fa-image-url=&quot;http://famo.us/integrations/angular/img/famous-angular-logos.png&quot;&#10;             class=&quot;img&quot;&#10;             fa-color=&quot;&#39;blue&#39;&quot;&#10;             fa-background-color=&quot;&#39;#fff&#39;&quot;&#10;             fa-size=&quot;[500, 200]&quot;&gt;&#10;  &lt;/fa-image-surface&gt;&#10;&lt;/fa-app&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="script.js"
      
        language="js"
      
        type="js"
      
    >
      <pre><code>{% raw %}angular.module(&#39;faImageSurfExampleApp&#39;, [&#39;famous.angular&#39;]);{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example8/index.html" name="example-example8"></iframe>
  </div>
</div>


</p>
<p><code>Fa-image-surface</code> accepts two css-style properties: <code>color</code> and <code>background color</code>, which may be assigned values by the <code>fa-color</code> and <code>fa-background-color</code> attributes respectively.</p>
<p><code>Fa-size</code> may also be declared as an attribute.  If void, the <code>fa-image-surface</code> will inherit the size of its parent node.</p>



