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
images, or output raw text content with one-way databinding {{lb}}{{rb}}.
You can include entire complex HTML snippets inside a faSurface, including
ngIncludes or custom (vanilla Angular) directives.








  
<h2 id="usage">Usage</h2>
  
```html
<fa-surface>
  Here's some data-bound content {{lb}}myScopeVariable{{rb}}
</fa-surface>
```
  
  

  



<h2 id="example">Example</h2><p>An <code>fa-surface</code> can use an ng-include to compile an external HTML fragment:</p>
<pre><code class="lang-html">&lt;fa-modifier fa-size=&quot;[960, undefined]&quot;&gt;
   &lt;fa-surface fa-size=&quot;[undefined, undefined]&quot;&gt;
     &lt;div ng-include src=&quot; &#39;views/animations.html&#39; &quot;&gt;&lt;/div&gt;
   &lt;/fa-surface&gt;
 &lt;/fa-modifier&gt;</code></pre>
<p>A simple ng-repeat of surfaces can be implemented like this:</p>
<pre><code class="lang-html">&lt;fa-modifier ng-repeat=&quot;item in list&quot; fa-size=&quot;[100, 100]&quot; fa-translate=&quot;[0, $index * 75, 0]&quot;&gt;
    &lt;fa-surface fa-size=&quot;[undefined, undefined]&quot;&gt;
      {{item.content}}
    &lt;/fa-surface&gt;
&lt;/fa-modifier&gt;</code></pre>
<pre><code class="lang-javascript">$scope.list = [{content: &quot;famous&quot;}, {content: &quot;angular&quot;}, {content: &quot;rocks!&quot;}];</code></pre>
<h2 id="common-confusions">Common Confusions</h2>
<h3 id="a-surface-is-a-leaf-node">A Surface is a leaf node</h3>
<p> An fa-surface is a leaf node; this means that there should not be Famous-Angular elements nested within an fa-surface.</p>
<p> This followin will NOT work correctly:</p>
<pre><code class="lang-html"> &lt;fa-surface&gt;
    &lt;!-- the contents of a Surface must be standard HTML, so Famo.us components will not get rendered correctly. --&gt;
    &lt;fa-modifier&gt;
      &lt;fa-surface&gt;&lt;/fa-surface&gt;
    &lt;/fa-modifier&gt;
 &lt;/fa-surface&gt;</code></pre>
<p> The purpose of an fa-surface is to contain viewable HTML content:</p>
<pre><code class="lang-html"> &lt;fa-surface&gt;
    &lt;!-- content --&gt;
    &lt;!-- databound content with curly braces --&gt;
    &lt;!-- no other Famous renderable nodes allowed inside a Surface--&gt; 
 &lt;/fa-surface&gt;</code></pre>
<h3 id="properties-on-surfaces-vs-modifiers">Properties on surfaces vs modifiers</h3>
<p>With Famous, properties related to layout and visibility belong on a Modifier.  A Surface should be added below a Modifier on the Render Tree, as Modifiers affect everything below them.</p>
<p>You may be tempted to set the <code>fa-origin</code> or another layout property on an fa-surface, and discover that it does not work:</p>
<pre><code class="lang-html">&lt;fa-surface fa-origin=&quot;[.5, 0]&quot;&gt;This will not change the origin.&lt;/fa-surface&gt;</code></pre>
<p>While you can specify <code>fa-size</code> on surfaces themselves, it is not recommended.
This is not best practice:</p>
<pre><code class="lang-html">&lt;fa-surface fa-size=&quot;[100, 100]&quot;&gt;&lt;/fa-surface&gt;</code></pre>
<p>Whereas this is the preferred approach: </p>
<pre><code class="lang-html">&lt;fa-modifier fa-size=&quot;[100, 100]&quot;&gt;
  &lt;fa-surface fa-size=&quot;[undefined, undefined]&quot;&gt;
  &lt;/fa-surface&gt;
&lt;/fa-modifier&gt;</code></pre>
<p>You may also omit <code>fa-size=&quot;[undefined, undefined]&quot;</code> on the surface and the surface will fill to the size of the modifier, in this case, <code>[100, 100]</code>.</p>
<p>In Famous&#39; Render Tree, Modifiers modify all the nodes (other Modifiers and Surfaces) below them.  By setting the <code>fa-surface</code>&#39;s <code>fa-size</code> to <code>[undefined, undefined]</code>, it will inherit from the <code>fa-modifier</code>&#39;s <code>fa-size</code> of <code>[100, 100]</code>. </p>
<p><code>Fa-surfaces</code> also cannot have an <code>fa-size</code>, assigned to a function, as is in the case of modifiers, which can take number/array or a function.
For example, this will not work:</p>
<pre><code class="lang-html">&lt;fa-surface fa-size=&quot;sizeForBoxFunction&quot;&gt;&lt;/fa-surface&gt;</code></pre>
<pre><code class="lang-javascript">$scope.sizeForBoxFunction = function() {
   return [75, 75];
};</code></pre>
<p>To reiterate, the best practice to animate or set any layout/visibilty properties of a surface is to do so on a modifier that affects the Surface.  The purpose of a Surface is to contain HTML content, whether rendered from a template, or data-bound.</p>
<p><fa-modifier fa-size="[100, 100]">
  <fa-surface fa-background-color="'red'"></fa-surface>
</fa-modifier></p>
<h3 id="fa-color-fa-background-color">fa-color &amp; fa-background-color</h3>
<p>The exceptions of not setting layout/visibility properties on an <code>fa-surface</code> are <code>fa-color</code> and <code>fa-background-color</code>: these two properties are passed through the <code>.setProperties()</code> method available on Famous Surfaces.
Take note that they accept a string in the html view.  If you do not enclose them in quotation marks, Angular will evaluate it as an object on the scope, but surrounding it with quotation marks will specify it as a string expression.</p>
<pre><code class="lang-html">&lt;fa-modifier fa-size=&quot;[200, 50]&quot;&gt;
  &lt;fa-surface fa-background-color=&quot;&#39;orange&#39;&quot; fa-color=&quot;&#39;#fff&#39;&quot;&gt;
      This text should be white.
  &lt;/fa-surface&gt;
&lt;/fa-modifier&gt;</code></pre>
<h3 id="ng-class">ng-class</h3>
<p>Ng-Class works on <code>fa-surface</code>s:</p>
<pre><code class="lang-html">&lt;fa-modifier fa-size=&quot;[150, 50]&quot;&gt;
  &lt;fa-surface fa-background-color=&quot;&#39;blue&#39;&quot; ng-class=&quot;{strike: applyStrike}&quot;&gt;
    Strikethrough!
    &lt;input type=&quot;checkbox&quot; ng-model=&quot;applyStrike&quot;&gt;&lt;/input&gt;
  &lt;/fa-surface&gt;
&lt;/fa-modifier&gt;</code></pre>
<pre><code class="lang-css">.strike {
  text-decoration: line-through;
}</code></pre>



