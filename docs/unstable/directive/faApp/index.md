---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faApp/"
title: "fa-app"
header_sub_title: "Directive in module famous.angular"
doc: "faApp"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-app.js#L1'>
    Improve this doc
  </a>
</div>





<h1 class="api-title">

  fa-app



</h1>





This directive is the container and entry point to Famo.us/Angular.  Behind the scenes,
it creates a Famous context and then adds child elements
to that context as they get compiled.  Inside of this directive,
normal HTML content will not get rendered to the screen unless
it is inside of a <a href="../../../api/directive/faSurface/">fa-surface</a> directive.






  
<h2 id="usage">Usage</h2>
  
```html
<fa-app ng-controller="MyCtrl">
  <!-- other fa- scene graph components -->
</fa-app>
```
  
  

  



<h2 id="example">Example</h2><p><code>Fa-app</code> creates a Famous Context, the root of the Render Tree.  Renderables (such as <code>fa-modifier</code>&#39;s &amp; <code>fa-surface</code>&#39;s) nested within an <code>fa-app</code> are added to this root context.  </p>
<p>Declaring <code>fa-app</code> appends a div with the class of <code>&quot;famous-angular-container&quot;</code> to the DOM.  It then instantiates a Context via Famous&#39; Engine <code>.createContext()</code> method, passing in a reference to the <code>famous-angular-container</code> div, resulting in a Famous context that renderables can be added to connected to Angular.  <code>Fa-app</code> can be declared as an element or as an attribute within another element.  </p>
<p>

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example"
      
        module="faAppExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %} &lt;fa-app&gt;&#10;  &lt;fa-modifier&gt;&#10;    &lt;fa-surface&gt;This will be shown on screen.&lt;/fa-surface&gt;&#10;  &lt;/fa-modifier&gt;&#10;  &lt;div&gt;This will not appear on screen because it is not inside an fa-surface.&lt;/div&gt;&#10;&lt;/fa-app&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="script.js"
      
        language="js"
      
        type="js"
      
    >
      <pre><code>{% raw %}angular.module(&#39;faAppExampleApp&#39;, [&#39;famous.angular&#39;]);{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example/index.html" name="example-example"></iframe>
  </div>
</div>


</p>
<h2 id="common-qustions">Common Qustions</h2>
<h3 id="multiple-fa-app-s">Multiple fa-app&#39;s</h3>
<p>Nesting an <code>fa-app</code> within another <code>fa-app</code> is possible, and the use case of this approach would be for css content overflow.</p>
<p>In the example below, there is an <code>fa-surface</code> with an <code>fa-app</code> nested inside.  Normally, an <code>fa-surface</code> should not nest another Famous element within it because it is a leaf node that has the purpose of being a container for html content.  The exception is nesting an <code>fa-app</code> within an <code>fa-surface</code>, which creates another Famous context, in which Famous elements can be nested inside.</p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example1')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example1"
      
        module="faAppExampleAppA"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app style=&quot;width: 500px; height: 500px;&quot;&gt;&#10;  &lt;fa-surface&gt;&#10;    &lt;fa-app style=&quot;width: 200px; height: 200px; overflow: hidden;&quot;&gt;&#10;      &lt;fa-image-surface &#10;         fa-image-url=&quot;https://famo.us/assets/images/famous_logo_white.svg&quot; &#10;         fa-size=&quot;[400, 400]&quot;&gt;&#10;      &lt;/fa-image-surface&gt;&#10;    &lt;/fa-app&gt;&#10;  &lt;/fa-surface&gt;&#10;&lt;/fa-app&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  background-color: #000;  &#10;}{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="script.js"
      
        language="js"
      
        type="js"
      
    >
      <pre><code>{% raw %}angular.module(&#39;faAppExampleAppA&#39;, [&#39;famous.angular&#39;]);{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example1/index.html" name="example-example1"></iframe>
  </div>
</div>



The outer <code>fa-app</code> is sized 500x500, and it contains all of the content.  The use case of this <code>fa-app</code> within another <code>fa-app</code> is to clip content using the css overflow:hidden property.  The <code>fa-image-surface</code> links to a 400x400 sized image of the Famous logo.  Its parent is the nested <code>fa-app</code>, whose size is only 200x200.  </p>
<p>The larger image content (400x400) will overflow the boundaries of its parent, the the nested <code>fa-app</code> (200x200).  Because <code>fa-app</code> has a css overflow:hidden property, it will clip the content of any of its children that is outside the 200x200 region.  Any part of the 400x400 image that reaches outside of these boundaries are ignored.  This may be useful for complex animations.  </p>
<p>Take note: declaring multiple <code>fa-app</code>s within a page is permitted, but each new one incurs a penalty for performance.  <code>fa-app</code> is similar to a Famo.us ContainerSurface, in that it creates an additional Context that the Famo.us Engine must manage.  </p>
<h3 id="fa-app-must-be-declared-with-a-height-width">Fa-app must be declared with a height &amp; width</h3>
<p>The element <code>fa-app</code> is declared within must have a set height and width styling, declared inline or as a css declaration in an external stylesheet.</p>
<pre><code class="lang-html">&lt;fa-app style=&quot;width: 320px; height: 568px;&quot;&gt;
   &lt;!-- other fa- scene graph components --&gt;
&lt;/fa-app&gt;</code></pre>
<p>If <code>fa-app</code> is declared as an attribute of another element, that element must be a <code>display:block</code> element, such as a <code>div</code> or <code>p</code>.</p>
<pre><code class="lang-html">&lt;div fa-app style=&quot;width: 320px; height: 568px;&quot;&gt;
  &lt;!-- other fa- scene graph components --&gt;
&lt;/div&gt;</code></pre>



