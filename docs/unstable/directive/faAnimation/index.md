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
Any changes to the Transitionable object on the scope will be reflected in the view immediately via Angular&#39;s two-way data binding.</p>
<pre><code class="lang-javascript">var Transitionable = $famous[&#39;famous/transitions/Transitionable&#39;];
var Easing = require(&#39;famous/transitions/Easing&#39;);

$scope.boxTransitionable = new Transitionable([0, 0, 0]);

$scope.animate = function() {
  $scope.boxTransitionable.set([200, 300, 0], {duration: 2000, curve: Easing.inOutBack});
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
<h2 id="passing-transitionables-values">Passing Transitionables &amp; values</h2>
<p>One may also choose to pass an array, with one or more of its values a function, or a number.</p>
<pre><code class="lang-html">&lt;fa-modifier fa-size=&quot;[100, 100]&quot; fa-translate=&quot;[yTrans.get(), 0, 0]&quot; fa-touchstart=&quot;animate()&quot;&gt;
      &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot; fa-click=&quot;animateY()&quot;&gt;
      &lt;/fa-surface&gt;
    &lt;/fa-modifier&gt;</code></pre>
<pre><code class="lang-javascript">$scope.yTrans = new Transitionable(0);

$scope.animateY = function() {
  $scope.yTrans.set(200, {duration: 2000, curve: &#39;easeInOut&#39;})
};</code></pre>
<p>In this example, fa-translate is passed an array, with the x value as a function that will return 0, and y &amp; z values as 0&#39;s.
When animateY() is called, yTrans begins its transition, and its values are interpolated, updated on the view through Angular&#39;s two-way data binding.</p>
<h2 id="transitionables-get-">Transitionables &amp; .get()</h2>
<p>A point of possible confusion is the fact that some modifier properties (faOpacity, faSize, faOrigin, faAlign) can be bound to a Transitionable object directly, without needing to be passed a .get() function, unlike the example above.
  In the example below, we create transitionable objects that will perform transitions on translate and opacity. </p>
<p>  The value of fa-opacity is bound to a Transitionable directly, box.opacity.
  Whereas fa-translate is bound to a method of a Transitionable, box.translate.get(), that returns an interpolated value.
  Clicking the fa-surface invokes animateBox() on the scope, in turn, executing the .set() methods of each prospective Transitionable from initial state to end state defined by their respective .set() methods.</p>
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
<p>FaTranslate (along with faRotate, faTranslate, faScale, faSkew, &amp; more) pass through a Famous Transform function (Transform.translate()), whereas faOpacity, faSize, faOrigin, and faAlign are passed through a Famous Modifier.
A Famous Transform.translate() function does not accept a Transitionable object, but only an array.
A .get() function of a Transitionable returns an interpolated value of a current transition, therefore in the case of a faTranslate, it can return an array that a Transform.translate() can accept.
Whereas faOpacity is passes through a Famous Modifier, which has an .opacityFrom() method that can accept a Transitionable object directly.  </p>
<p>As a design principle, Famous-Angular attempts to pass values directly to Famous as much as possible, and these differences are due to the core Famous library.</p>
<h2 id="callbacks">Callbacks</h2>
<p>The .set() method of a Transitionable can accept 3 arguments: an endState, a transition, and an optional callback to be called upon observed completion of the transition.
In the example below, when the first transition completes, with the element translated to [200, 300, 0], the callback function is called, and the element begins the transition to [100, 100, 0]. </p>
<pre><code class="lang-javascript">var Transitionable = $famous[&#39;famous/transitions/Transitionable&#39;];

$scope.boxTrans = new Transitionable([0, 0, 0]);

$scope.animateWithCallback = function() {
  $scope.boxTrans.set([200, 300, 0], {duration: 1000, curve: &#39;easeInOut&#39;}, 
    function() {
      $scope.boxTrans.set([100, 100, 0], {duration: 1000, curve: &#39;easeInOut&#39;});
    }
  );
};</code></pre>
<pre><code class="lang-html">&lt;fa-modifier fa-size=&quot;[100, 100]&quot; fa-translate=&quot;boxTrans.get()&quot;&gt;
  &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot; fa-click=&quot;animateWithCallback()&quot;&gt;
  &lt;/fa-surface&gt;
&lt;/fa-modifier&gt;</code></pre>
<h2 id="nesting-modifiers-animations">Nesting modifiers &amp; animations</h2>
<p>Famous Modifiers affect all renderable child nodes (Modifiers &amp; Surfaces) below them on the Render Tree.
In this example, two properties will be animated: the outermost Modifier&#39;s scale property and innermost Modifier&#39;s rotateZ property.
Because Famous Modifiers affect all child nodes nested within them, when the outermost Modifier&#39;s scale property changes, it affects the scale of every modifier and surface below it.
The innermost Modifier with the fa-rotate-Z property affects the innermost surface only.  </p>
<pre><code class="lang-html">&lt;fa-modifier fa-scale=&quot;boxes.outer.scale.get()&quot; fa-size=&quot;[100, 100]&quot;&gt;
  &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot;&gt;
    &lt;fa-modifier fa-size=&quot;[50, 50]&quot; fa-origin=&quot;[.5, .5]&quot; fa-rotate-z=&quot;boxes.inner.rotateZ.get()&quot;&gt;
      &lt;fa-surface fa-background-color=&quot;&#39;blue&#39;&quot; fa-click=&quot;animateBoxes()&quot;&gt;&lt;/fa-surface&gt;
    &lt;/fa-modifier&gt;
  &lt;/fa-surface&gt;
&lt;/fa-modifier&gt;</code></pre>
<pre><code class="lang-javascript">var Transitionable = $famous[&#39;famous/transitions/Transitionable&#39;];
$scope.boxes = {
  outer: {
    scale: new Transitionable([2, 2])
  },
  inner: {
    rotateZ: new Transitionable(0)
  }
};

$scope.animateBoxes = function() {
  $scope.boxes.outer.scale.set([1, 1], {duration: 2000, curve: &#39;easeInOut&#39;});
  $scope.boxes.inner.rotateZ.set(.8, {duration: 1000, curve: &#39;easeInOut&#39;});
};</code></pre>
<h2 id="-famous-find-">$famous.find()</h2>
<p>$famous.find() is a method that can be used to perform a DOM look-up to retrieves the Famous isolate (node) of the appropriate object.
It accepts one argument, a string css selector (e.g. an #id or a .class,) and returns an array of elements matching the query.
It is useful for manipulation of Famous objects after they have been declared in the DOM.
With Angular, it is best to do DOM manipulation (including look-ups) in a directive&#39;s post-link function; famous-angular is no exception.</p>
<pre><code class="lang-html">&lt;fa-modifier id=&quot;myBox&quot;&gt;
  &lt;fa-surface&gt;&lt;/fa-surface&gt;
&lt;/fa-modifier&gt;</code></pre>
<pre><code class="lang-javascript">var myBox = $famous.find(&#39;#myBox&#39;); // [Object]
                                    // myBox[0] is the isolate object belonging to the modifier of id &#39;myBox&#39; in the DOM.
                                    // myBox[0].modifier is a reference to the Famo.us modifier corresponding to that element.</code></pre>
<p>If this is done outside of a directive&#39;s post-link function, there is no guarantee that $famous.find() will return anything, because the element may not have compiled yet.</p>
<p>In the example below, there is a custom directive called fadeIn that accepts an id property, and does DOM manipulation to change the opacity of an element.</p>
<pre><code class="lang-html">  &lt;fa-modifier id=&quot;myModifier&quot; fa-size=&quot;[100, 100]&quot;&gt;
    &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot;&gt;&lt;/fa-surface&gt;
    &lt;fade-in id=&quot;myModifier&quot;&gt;&lt;/fade-in&gt;
  &lt;/fa-modifier&gt;</code></pre>
<pre><code class="lang-javascript">.directive(&#39;fadeIn&#39;, [&#39;$famous&#39;, &#39;$famousDecorator&#39;, function ($famous, $famousDecorator) {
  return {
    restrict: &#39;EA&#39;,
    scope: {
      id: &#39;@&#39;
    },
    compile: function(tElement, tAttrs, transclude) {
      var Transitionable = $famous[&#39;famous/transitions/Transitionable&#39;];
      return {
        pre: function(scope, element, attrs) {
        },
        post: function(scope, element, attrs) {
          var myElement = $famous.find(&#39;#&#39; + scope.id)[0];

          var opacityTransitionable = new Transitionable(0);

          myElement.modifier.setOpacity(function() {
            return opacityTransitionable.get();
          });

          opacityTransitionable.set(1, {duration: 1500, curve: &#39;easeInOut&#39;});
        }
      }
    }
  }
}]);</code></pre>
<p>In the post-link function, pass $famous.find() the id attribute from the html view.  A Transitionable is instantiated with the value of 0.
Then, using DOM manipulation, access the modifier property of the element.  Famous modifiers have a .setOpacity() method that can accept a function.
Pass opacityTransitionable.get(), which returns 0, thereby setting the opacity of myElement to 0.</p>
<p>Then, using the .set() method, pass in the value of 1 as the end state as the first argument, and a transition object as the second argument.</p>



