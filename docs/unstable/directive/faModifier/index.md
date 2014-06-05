---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faModifier/"
title: "fa-modifier"
header_sub_title: "Directive in module famous.angular"
doc: "faModifier"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-modifier.js#L1'>
    Improve this doc
  </a>
</div>




<h1 class="api-title">

  fa-modifier



</h1>





This directive creates a Famo.us Modifier that will affect all children render nodes.  Its properties can be bound
to values (e.g. `fa-translate="[15, 20, 1]"`, Famo.us Transitionable objects, or to functions that return numbers.








  
<h2 id="usage">Usage</h2>
  
```html
<fa-modifier fa-opacity=".25" fa-skew="myScopeSkewVariable" fa-translate="[25, 50, 2]" fa-scale="myScopeFunctionThatReturnsAnArray">
  <!-- Child elements of this fa-modifier will be affected by the values above -->
  <fa-surface>I'm translucent, skewed, rotated, and translated</fa-surface>
</fa-modifier>
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
        faRotate
        
        
      </td>
      <td>
        
  <code>Array</code>|<code>function()</code>
      </td>
      <td>
        <p>Array of numbers or function returning an array of numbers to which this Modifier&#39;s rotate should be bound.</p>

        
      </td>
    </tr>
    
    <tr>
      <td>
        faRotateX
        
        
      </td>
      <td>
        
  <code>Number</code>|<code>function()</code>
      </td>
      <td>
        <p>Number or function returning a number to which this Modifier&#39;s rotateX should be bound</p>

        
      </td>
    </tr>
    
    <tr>
      <td>
        faRotateY
        
        
      </td>
      <td>
        
  <code>Number</code>|<code>function()</code>
      </td>
      <td>
        <p>Number or function returning a number to which this Modifier&#39;s rotateY should be bound</p>

        
      </td>
    </tr>
    
    <tr>
      <td>
        faRotateZ
        
        
      </td>
      <td>
        
  <code>Number</code>|<code>function()</code>
      </td>
      <td>
        <p>Number or function returning a number to which this Modifier&#39;s rotateZ should be bound</p>

        
      </td>
    </tr>
    
    <tr>
      <td>
        faScale
        
        
      </td>
      <td>
        
  <code>Array</code>|<code>function()</code>
      </td>
      <td>
        <p>Array of numbers or function returning an array of numbers to which this Modifier&#39;s scale should be bound</p>

        
      </td>
    </tr>
    
    <tr>
      <td>
        faSkew
        
        
      </td>
      <td>
        
  <code>Array</code>|<code>function()</code>
      </td>
      <td>
        <p>Array of numbers or function returning an array of numbers to which this Modifier&#39;s skew should be bound</p>

        
      </td>
    </tr>
    
    <tr>
      <td>
        faAboutOrigin
        
        
      </td>
      <td>
        
  <code>Array</code>|<code>function()</code>
      </td>
      <td>
        <p>Array of arguments (or a function returning an array of arguments) to pass to Transform.aboutOrigin</p>

        
      </td>
    </tr>
    
    <tr>
      <td>
        faPerspective
        
        
      </td>
      <td>
        
  <code>Number</code>|<code>function()</code>
      </td>
      <td>
        <p>Number or array returning a number to which this modifier&#39;s perspective (focusZ) should be bound.</p>

        
      </td>
    </tr>
    
    <tr>
      <td>
        faTransform
        
        
      </td>
      <td>
        
  <code>Transform</code>
      </td>
      <td>
        <p>Manually created Famo.us Transform object (an array) that can be passed to the modifier.  <em>Will override all other transform attributes.</em></p>

        
      </td>
    </tr>
    
    <tr>
      <td>
        faOpacity
        
        
      </td>
      <td>
        
  <code>Number</code>|<code>function()</code>|<code>Transitionable</code>
      </td>
      <td>
        <p>Number or function returning a number to which this Modifier&#39;s opacity should be bound</p>

        
      </td>
    </tr>
    
    <tr>
      <td>
        faSize
        
        
      </td>
      <td>
        
  <code>Array</code>|<code>function()</code>|<code>Transitionable</code>
      </td>
      <td>
        <p>Array of numbers (e.g. [100, 500] for the x- and y-sizes) or function returning an array of numbers to which this Modifier&#39;s size should be bound</p>

        
      </td>
    </tr>
    
    <tr>
      <td>
        faOrigin
        
        
      </td>
      <td>
        
  <code>Array</code>|<code>function()</code>|<code>Transitionable</code>
      </td>
      <td>
        <p>Array of numbers (e.g. [.5, 0] for the x- and y-origins) or function returning an array of numbers to which this Modifier&#39;s origin should be bound</p>

        
      </td>
    </tr>
    
    <tr>
      <td>
        faAlign
        
        
      </td>
      <td>
        
  <code>Array</code>|<code>function()</code>|<code>Transitionable</code>
      </td>
      <td>
        <p>Array of numbers (e.g. [.5, 0] for the x- and y-aligns) or function returning an array of numbers to which this Modifier&#39;s align should be bound</p>

        
      </td>
    </tr>
    
    <tr>
      <td>
        faTransformOrder
        
        
      </td>
      <td>
        
  <code>Array.String</code>
      </td>
      <td>
        <p>Optional array of strings to specify which transforms to apply and in which order. (e.g. <code>fa-transform-order=&quot;[&#39;rotateZ&#39;, &#39;translate&#39;, &#39;scale&#39;]&quot;</code>)  Default behavior is to evaluate all supported transforms and apply them in alphabetical order.</p>

        
      </td>
    </tr>
    
  </tbody>
</table>

  

  



<h2 id="example">Example</h2><h2 id="the-order-of-transforms-matter">The order of transforms matter</h2>
<p>You can specify the order of transforms by nesting modifiers.  For instance, if you translate an element and then rotate it, the result will be different than if you had rotated it and then translated it. </p>
<pre><code class="lang-html">&lt;fa-modifier fa-translate=&quot;[100, 100]&quot;&gt;
   &lt;fa-modifier fa-rotate-z=&quot;.6&quot; fa-size=&quot;[100, 100]&quot;&gt;
     &lt;fa-surface fa-background-color=&quot;red&quot;&gt;translate --&gt; rotate&lt;/fa-surface&gt;
   &lt;/fa-modifier&gt;
&lt;/fa-modifier&gt;

 &lt;fa-modifier fa-rotate-z=&quot;.6&quot;&gt;
   &lt;fa-modifier fa-translate=&quot;[100, 100]&quot; fa-size=&quot;[100, 100]&quot;&gt;
     &lt;fa-surface class=&quot;red&quot;&gt;&lt;/fa-surface&gt;
   &lt;/fa-modifier&gt;
 &lt;/fa-modifier&gt;</code></pre>
<h2 id="values-for-fa-modifier-attributes">Values for fa-modifier attributes</h2>
<p>Fa-modifier properties, (such as faRotate, faScale, etc) can be bound to number/arrays, object properties defined on the scope, or function references.</p>
<h2 id="number-array-values">Number/Array values</h2>
<p>fa-modifier properties can be bound to number/array values.
html:</p>
<pre><code class="lang-html"> &lt;fa-modifier fa-origin=&quot;[.5,.5]&quot; fa-size=&quot;[100, 100]&quot; fa-rotate=&quot;.3&quot;&gt;
   &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot;&gt;&lt;/fa-surface&gt;
 &lt;/fa-modifier&gt;</code></pre>
<h2 id="object-properties-on-the-scope">Object properties on the scope</h2>
<p>fa-modifier properties can be bound to object properties defined on the scope.
html:</p>
<pre><code class="lang-html">&lt;fa-modifier fa-origin=&quot;boxObject.origin&quot; fa-size=&quot;boxObject.size&quot;&gt;
   &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot;&gt;&lt;/fa-surface&gt;
 &lt;/fa-modifier&gt;</code></pre>
<pre><code class="lang-javascript"> $scope.boxObject = {
   origin: [.4, .4],
   size: [50, 50]
 }</code></pre>
<h2 id="functions">Functions</h2>
<p>Fa-modifier properties can be bound to a function on the scope that returns a value.</p>
<pre><code class="lang-html">&lt;fa-modifier fa-origin=&quot;genBoxOrigin&quot;&gt;
  &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot;&gt;&lt;/fa-surface&gt;
&lt;/fa-modifier&gt;</code></pre>
<pre><code class="lang-javascript">$scope.getX = function() {
  return .2;
};
$scope.getY = function() {
  return .3;
}
$scope.genBoxOrigin = function() {
  return [$scope.getX(), $scope.getY()];
};</code></pre>
<h2 id="animating-properties">Animating properties</h2>
<p>Remember that Famous surfaces are styled with position:absolute, and their positions are defined by matrix3d webkit transforms.  Modifiers are to be used to hold onto size, transform, origin, and opacity states, and also to be animated.
As per vanilla Famous, you should animate properties of modifiers, such as transform, align, opacity, etc, rather than on the surface itself, as modifiers are responsible for layout and visibility.  </p>
<pre><code class="lang-html">  &lt;fa-modifier fa-rotate-z=&quot;boxA.rotate.get()&quot;&gt;
    &lt;fa-surface fa-click=&quot;animateBoxA()&quot; fa-background-color=&quot;&#39;red&#39;&quot;&gt;&lt;/fa-surface&gt;
  &lt;/fa-modifier&gt;</code></pre>



