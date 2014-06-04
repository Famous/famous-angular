---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faSurface/"
title: "fa-surface"
header_sub_title: "Directive in module famous.angular"
doc: "faSurface"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-surface.js#L1'>
    Improve this doc
  </a>
</div>




<h1 class="api-title">

  fa-surface



</h1>





This directive is used to create general Famo.us surfaces, which are the
leaf nodes of the scene graph.  The content inside
surfaces is what gets rendered to the screen.
This is where you can create form elements, attach
images, or output raw text content with one-way databinding {{}}.
You can include entire complex HTML snippets inside a faSurface, including
ngIncludes or custom (vanilla Angular) directives.








  
<h2 id="usage">Usage</h2>
  
```html
<fa-surface>
  Here's some data-bound content '{{myScopeVariable}}'
</fa-surface>
```
  
  

  



<h2 id="example">Example</h2><pre><code class="lang-html">&lt;fa-modifier fa-size=&quot;[960, undefined]&quot;&gt;
  &lt;fa-surface fa-size=&quot;[undefined, undefined]&quot;&gt;
    &lt;div ng-include src=&quot; &#39;views/animations.html&#39; &quot;&gt;&lt;/div&gt;
  &lt;/fa-surface&gt;
&lt;/fa-modifier&gt;</code></pre>
<p>A simple ng-repeat of surfaces may look like this:</p>
<pre><code class="lang-html">&lt;fa-modifier ng-repeat=&quot;item in list&quot; fa-size=&quot;[100, 100]&quot; fa-translate=&quot;[0, $index * 75, 0]&quot;&gt;
    &lt;fa-surface fa-size=&quot;[undefined, undefined]&quot;&gt;
      {{item.content}}
    &lt;/fa-surface&gt;
  &lt;/fa-modifier&gt;</code></pre>
<pre><code class="lang-javascript">$scope.list = [{content: &quot;famous&quot;}, {content: &quot;angular&quot;}, {content: &quot;rocks!&quot;}];</code></pre>
<h2 id="common-problems">Common Problems</h2>
<h2 id="properties-on-surfaces-vs-modifiers">Properties on surfaces vs modifiers</h2>
<p>You may expect to animate properties such as size or origin.  However, with Famous, properties related to layout and visibility belong on the modifier, and the surface should be nested below the modifier.
While you can specify fa-size as well as some other layout/visibility properties on surfaces themselves, it is not recommended.</p>
<p>This is not best practice:</p>
<pre><code class="lang-html">&lt;fa-surface fa-size=&quot;[100, 100]&quot;&gt;&lt;/fa-surface&gt;</code></pre>
<p>Whereas this is the preferred approach:</p>
<pre><code class="lang-html">&lt;fa-modifier fa-size=&quot;[100, 100]&quot;&gt;
  &lt;fa-surface fa-size=&quot;[undefined, undefined]&quot;&gt;
  &lt;/fa-surface&gt;
&lt;/fa-modifier&gt;</code></pre>
<p>You may also omit fa-size=&quot;[undefined, undefined]&quot; on the surface and the surface will still fill the size of the modifier, in this case, [100, 100].</p>
<p>In Famous&#39; Render Tree, modifiers modify all the nodes below them.  By setting the fa-surface&#39;s fa-size to [undefined, undefined], it will inherit from the fa-modifier&#39;s fa-size of [100, 100]. </p>
<p>Fa-surfaces also cannot have an fa-size/fa-rotate/etc, assigned to a function, as is in the case of modifiers, which can take number/array or a function, and sometimes a transitionable object.
For example, this will not work:</p>
<pre><code class="lang-html">&lt;fa-surface fa-size=&quot;sizeForBoxFunction&quot;&gt;&lt;/fa-surface&gt;</code></pre>
<pre><code class="lang-javascript">$scope.sizeForBoxFunction = function() {
     return [75, 75];
   }</code></pre>
<p>To reiterate, the best practice to set any layout/visibilty properties of a surface is to do so on a modifier that affects the surface.  Whereas a surface is for containing HTML content, whether rendered from a template, or data-bound with {{}}&#39;s.</p>
<p><fa-modifier fa-size="[100, 100]">
   <fa-surface fa-background-color="'red'"></fa-surface>
 </fa-modifier></p>



