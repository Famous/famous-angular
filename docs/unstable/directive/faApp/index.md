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
it is inside of a <a href="api/directive/faSurface">fa-surface</a> directive.








  
<h2 id="usage">Usage</h2>
  
```html
<fa-app ng-controller="MyCtrl">
  <!-- other fa- scene graph components -->
</fa-app>
```
  
  

  



<h2 id="example">Example</h2><p><code>Fa-app</code> creates a Famous Context, the root of the Render Tree.  Renderables (such as <code>fa-modifier</code>&#39;s &amp; <code>fa-surface</code>&#39;s) nested within an <code>fa-app</code> are added to this root context.  </p>
<p>Declaring <code>fa-app</code> appends a div with the class of <code>&quot;famous-angular-container&quot;</code> to the DOM.  It then instantiates a Context via Famous&#39; Engine <code>.createContext()</code> method, passing in a reference to the <code>famous-angular-container</code> div, resulting in a Famous context that renderables can be added to connected to Angular.  <code>Fa-app</code> can be declared as an element or as an attribute within another element.  </p>
<pre><code class="lang-html">&lt;fa-app style=&quot;width: 320px; height: 568px;&quot;&gt;
  &lt;fa-modifier&gt;
    &lt;fa-surface&gt;This will be shown on screen.&lt;/fa-surface&gt;
  &lt;/fa-modifier&gt;
  &lt;div&gt;This will not appear on screen because it is not inside an fa-surface.&lt;/div&gt;
&lt;/fa-app&gt;</code></pre>
<h2 id="common-qustions">Common Qustions</h2>
<h3 id="multiple-fa-app-s">Multiple fa-app&#39;s</h3>
<p>Nesting an <code>fa-app</code> within another <code>fa-app</code> is possible, and the use case of this approach would be for css content overflow.
Declaring multiple fa-app&#39;s within a page is permitted, but each new one incurs a penalty to performance, and <code>fa-app</code>&#39;s should definitely not be declared within an ng-repeat.</p>
<h3 id="fa-app-must-be-declared-with-a-height-width">Fa-app must be declared with a height &amp; width</h3>
<p>The element <code>fa-app</code> is declared within must have a set height and width styling, declared inline or as a css declaration in an external stylesheet.</p>
<pre><code class="lang-html">&lt;fa-app style=&quot;width: 320px; height: 568px;&quot;&gt;
   &lt;!-- other fa- scene graph components --&gt;
&lt;/fa-app&gt;</code></pre>
<p>If <code>fa-app</code> is declared as an attribute of another element, that element must be a <code>display:block</code> element, such as a <code>div</code> or <code>p</code>.</p>
<pre><code class="lang-html">&lt;div fa-app style=&quot;width: 320px; height: 568px;&quot;&gt;
  &lt;!-- other fa- scene graph components --&gt;
&lt;/div&gt;</code></pre>



