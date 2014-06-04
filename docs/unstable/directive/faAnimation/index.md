---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faAnimation/"
title: "fa-animation"
header_sub_title: "Directive in module famous.angular"
doc: "faAnimation"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-animation.js#L1'>
    Improve this doc
  </a>
</div>




<h1 class="api-title">

  fa-animation



</h1>





This directive is used to animate an element in conjunction with an <a href="api/directive/animate">animate</a> directive








  
<h2 id="usage">Usage</h2>
  
```html
<fa-animation timeline="functionThatReturnsATimelineValueBetween0And1">
 <animate targetModSelector="#topMod" field="rotateX" startValue="3.1415" endValue="0" curve="inQuad" timelineLowerBound="0" timelineUpperBound=".25" />
</fa-animation>
```
  
  

  



<h2 id="example">Example</h2><h2 id="animating-with-transitionables">Animating with Transitionables</h2>
<p>The most flexible way to animate modifier properties is by creating a Transitionable object on the scope and binding the property in the html.
Any changes to the Transitionable object will be reflected in the view.</p>
<pre><code class="lang-javascript">$scope.boxTransitionable = new Transitionable([0, 0, 0]);

$scope.animate = function() {
  $scope.boxTransitionable.set([200, 300, 0], {duration: 2000, curve: &#39;easeInOut&#39;});
};</code></pre>
<pre><code class="lang-html">&lt;fa-modifier fa-size=&quot;[100, 100]&quot; fa-translate=&quot;boxTransitionable.get()&quot;&gt;
  &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot; fa-click=&quot;animate()&quot;&gt;
  &lt;/fa-surface&gt;
&lt;/fa-modifier&gt;</code></pre>
<p>In the html, fa-translate is passed boxTransitionable.get(), a function that will return a value of [0,0,0] initially.
All transitionables have a .get() method that returns the interpolated state of the transition at the current time of invocation, returning either a number/array or an object.
This means that during this transition, calls to .get() provide the interpolated state along the way, perhaps [100, 150], [150, 185], and so on, until it reaches [200, 300].
When the user clicks the fa-surface, it will trigger the animate() function defined on the scope.  In turn, this executes the .set() method on the boxTransitionable,
which is passed the end state and a transition.</p>
<h2 id="transitionable-objects-get-">Transitionable objects &amp; .get()</h2>
<p>A point of possible confusion is the fact that some modifier properties (faOpacity, faSize, faOrigin, faAlign) can be bound to a Transitionable object directly, without needing to be passed a .get() function, unlike the example above.
  In the example below, we create transitionable objects that will perform transitions on translate and opacity. </p>
<p>  The value of fa-opacity is bound to a Transitionable directly, box.opacity.
  Whereas fa-opacity is bound to a method of a Transitionable, box.translate.get(), that returns an interpolated value.
  Clicking the fa-surface invokes animateBox() on the scope, in turn, executing the .set() methods of each prospective Transitionable from initial state to end state defined by their .set() methods.</p>
<pre><code class="lang-html">&lt;fa-modifier fa-translate=&quot;box.translate.get()&quot; fa-size=&quot;[100, 100]&quot; fa-opacity=&quot;box.opacity&quot;&gt;
    &lt;fa-surface fa-click=&quot;animateBox()&quot; fa-background-color=&quot;&#39;red&#39;&quot;&gt;&lt;/fa-surface&gt;
  &lt;/fa-modifier&gt;</code></pre>
<pre><code class="lang-javascript">var Transitionable = $famous[&#39;famous/transitions/Transitionable&#39;];
$scope.box = {
    translate: new Transitionable([200,200,0]),
    opacity: new Transitionable(.3)
  };
   $scope.animateBox = function() {
    $scope.box.translate.set([0, 100, 0], {duration: 500, curve: &#39;easeInOut&#39;});
    $scope.box.opacity.set(1, {duration: 500, curve: &#39;easeInOut&#39;});
  };</code></pre>
<p>Why the difference?  </p>
<p>Fa-translate (along with rotate, translate, scale, skew, etc) passes through a Famous Transform function (Transform.translate()), while faOpacity, faSize, faOrigin, and faAlign are passed through a Famous Modifier.
Transform.translate() does not accept a Transitionable object, but only an array, which myTransitionable.get() can return.
Whereas a myModifier.opacityFrom() method of a Modifier can accept a Transitionable object directly.</p>



