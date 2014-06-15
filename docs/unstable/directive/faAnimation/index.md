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
  
  

  



<h2 id="example">Example</h2><h3 id="animating-with-transitionables">Animating with Transitionables</h3>
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
<p>In the html, <code>fa-translate</code> is passed <code>boxTransitionable.get()</code>, a function expression that will return a value of [0,0,0] initially.
All transitionables have a <code>.get()</code> method that returns the interpolated state of the transition at the current time of invocation, returning either a number/array or an object.</p>
<p>This means that during this transition, calls to <code>.get()</code> provide the interpolated state along the way, perhaps [100, 150], [150, 185], and so on, until it reaches [200, 300].</p>
<p>When the user clicks the <code>fa-surface</code>, it will trigger the <code>animate()</code> function defined on the scope.  In turn, this calls the <code>.set()</code> method on the <code>boxTransitionable</code>,
which is passed the end state and a transition.</p>
<h3 id="passing-transitionables-values">Passing Transitionables &amp; values</h3>
<p>One may also choose to pass an array, with one or more of its values a function expression or a number.</p>
<pre><code class="lang-html">&lt;fa-modifier fa-size=&quot;[100, 100]&quot; fa-translate=&quot;[yTrans.get(), 0, 0]&quot; fa-touchstart=&quot;animate()&quot;&gt;
      &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot; fa-click=&quot;animateY()&quot;&gt;
      &lt;/fa-surface&gt;
    &lt;/fa-modifier&gt;</code></pre>
<pre><code class="lang-javascript">$scope.yTrans = new Transitionable(0);

$scope.animateY = function() {
  $scope.yTrans.set(200, {duration: 2000, curve: &#39;easeInOut&#39;})
};</code></pre>
<p>In this example, <code>fa-translate</code> is passed an array, with the x value bound to a function expression that will return 0, and y &amp; z values as 0&#39;s.
When <code>animateY()</code> is called, <code>yTrans</code> begins its transition, and its values are interpolated, updated on the view through Angular&#39;s two-way data binding.</p>
<h3 id="transitionables-get-">Transitionables &amp; .get()</h3>
<p>  A point of possible confusion is the fact that some modifier properties (<code>faOpacity</code>, <code>faSize</code>, <code>faOrigin</code>, <code>faAlign</code>) can be bound to a Transitionable object directly, without needing to be passed a <code>.get()</code> function expression, unlike the example above.
  In the example below, we create transitionable objects that will perform transitions on opacity (which accepts a Transitionable object directly) and translate (which does not accept a transitionable object directly). </p>
<p>  The value of <code>fa-opacity</code> is bound to a Transitionable directly, <code>box.opacity</code>.
  Whereas <code>fa-translate</code> is bound to a method of a Transitionable, <code>box.translate.get()</code>, that returns an interpolated value.</p>
<p>  Clicking the fa-surface invokes <code>animateBox()</code> on the scope, in turn, executing the <code>.set()</code> methods of each prospective Transitionable from initial state to end state.</p>
<pre><code class="lang-html">&lt;fa-modifier fa-translate=&quot;box.translate.get()&quot; fa-opacity=&quot;box.opacity&quot; fa-size=&quot;[100, 100]&quot;&gt;
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
<h4 id="why-the-difference-">Why the difference?</h4>
<p><code>FaTranslate</code> (along with <code>faRotate</code>, <code>faTranslate</code>, <code>faScale</code>, <code>faSkew</code>, &amp; more) pass through a Famous Transform function (<code>Transform.translate()</code>), whereas <code>faOpacity</code>, <code>faSize</code>, <code>faOrigin</code>, and <code>faAlign</code> are passed through a Famous Modifier.</p>
<p>A Famous <code>Transform.translate()</code> function does not accept a Transitionable object, but only an array.
A <code>.get()</code> function of a Transitionable returns an interpolated value of a current transition, therefore in the case of a <code>faTranslate</code>, it can return an array that a <code>Transform.translate()</code> can accept.</p>
<p><code>faOpacity</code> passes through a Famous Modifier, which has an <code>.opacityFrom()</code> method that can accept a Transitionable object directly.  </p>
<p>As a design principle, Famous-Angular attempts to pass values directly to Famous as much as possible, and these differences are due to the core Famous library.</p>
<h3 id="callbacks-at-transition-completion">Callbacks at Transition completion</h3>
<p>The <code>.set()</code> method of a Transitionable can accept 3 arguments: an endState, a transition, and an optional callback to be called upon observed completion of the transition.
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
<h3 id="nesting-modifiers-animations">Nesting modifiers &amp; animations</h3>
<p>Famous Modifiers affect all renderable child nodes (Modifiers &amp; Surfaces) below them on the Render Tree.
In this example, two properties will be animated: the outermost Modifier&#39;s <code>fa-scale</code> property and innermost Modifier&#39;s <code>fa-rotate-Z</code> property.</p>
<p>Because Famous Modifiers affect all child nodes nested within them, when the outermost Modifier&#39;s scale property changes, it affects the scale of every modifier and surface below it.
The innermost Modifier with the <code>fa-rotate-Z</code> property affects the innermost surface only.  </p>
<pre><code class="lang-html">&lt;fa-modifier fa-scale=&quot;boxes.outer.scale.get()&quot;&gt;
  &lt;fa-modifier fa-size=&quot;[100, 100]&quot;&gt;
    &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot;&gt;&lt;/fa-surface&gt;
    &lt;fa-modifier fa-size=&quot;[50, 50]&quot; fa-origin=&quot;[.5, .5]&quot; fa-rotate-z=&quot;boxes.inner.rotateZ.get()&quot;&gt;
      &lt;fa-surface fa-background-color=&quot;&#39;blue&#39;&quot; fa-click=&quot;animateBoxes()&quot;&gt;&lt;/fa-surface&gt;
    &lt;/fa-modifier&gt;
  &lt;/fa-modifier&gt; 
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
<h3 id="-famous-find-">$famous.find()</h3>
<p><code>$famous.find()</code> is a method that can be used to perform a DOM look-up to retrieve the Famous isolate (node) of the appropriate object.
It accepts one argument, a string css selector (e.g. an #id or a .class,) and returns an array of elements matching the query.</p>
<p>It is useful for manipulation of Famous objects after they have been declared in the DOM.
With Angular, it is best to do DOM manipulation (including look-ups) in a directive&#39;s post-link function; Famous-Angular is no exception.</p>
<pre><code class="lang-html">&lt;fa-modifier id=&quot;myBox&quot;&gt;
  &lt;fa-surface&gt;&lt;/fa-surface&gt;
&lt;/fa-modifier&gt;</code></pre>
<pre><code class="lang-javascript">var myBox = $famous.find(&#39;#myBox&#39;); // [Object]
// myBox[0] is the isolate object belonging to the modifier of id &#39;myBox&#39; in the DOM.
// myBox[0].modifier is a reference to the Famo.us modifier corresponding to that element.</code></pre>
<p>If this is done outside of a directive&#39;s post-link function, there is no guarantee that <code>$famous.find()</code> will return anything, because the element may not have compiled yet.</p>
<h2 id="animating-with-directives">Animating with directives</h2>
<p>Below is an example of a custom directive called <code>fade-in</code> used to animate an element by transitioning its opacity from the values of <code>fa-opacity</code> to <code>opacity-end</code>, with the duration of <code>duration</code>.  Note: <code>opacity-end</code> and <code>duration</code> are NOT Famous-Angular attributes; they are custom to this particular example.</p>
<pre><code class="lang-html">&lt;fa-modifier fade-in fa-opacity=&quot;0.2&quot; opacity-end=&quot;1&quot; duration=&quot;500&quot;&gt;
  &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot;&gt;&lt;/fa-surface&gt;
&lt;/fa-modifier&gt;</code></pre>
<pre><code class="lang-javascript">.directive(&#39;fadeIn&#39;, 
  [&#39;$famous&#39;, &#39;$famousDecorator&#39;, &#39;$timeout&#39;, 
  function ($famous, $famousDecorator, $timeout) {
  return {
    restrict: &#39;A&#39;,
    scope: false,
    priority: 16,
    compile: function(tElement, tAttrs, transclude) {
      var Transitionable = $famous[&#39;famous/transitions/Transitionable&#39;];
      return {
        pre: function(scope, element, attrs) {
        },
        post: function(scope, element, attrs) {
          $famousDecorator.ensureIsolate(scope)

          $timeout(function() {
            var opacityStartValue = attrs.faOpacity;
            var opacityEndValue = attrs.opacityEnd;
            var duration = attrs.duration;

            var opacityTransitionable = new Transitionable(opacityStartValue);

            scope.isolate[scope.$id].modifier.opacityFrom(function() {
              return opacityTransitionable.get();
            });

            opacityTransitionable.set(opacityEndValue, {duration: duration, curve: &#39;easeInOut&#39;});
          });

        }
      }
    }
  }
}]);</code></pre>
<p>In the compile function, load up the AMD module for a Famous Transitionable, which will be used for the animation.  </p>
<p>The <code>fade-in</code> directive&#39;s priority is 16, higher than the priority of an <code>fa-modifier</code> (4) to ensure that the <code>fa-modifier</code> will be compiled first.  Therefore the post-link function of <code>fade-in</code> allows access to the <code>scope</code> of <code>fa-modifier</code>.  </p>
<p><code>$famousDecorator.ensureIsolate(scope)</code> checks the passed in scope for an existing isolate;  if <code>scope.isolate</code> does not exist, it creates one.</p>
<p>Below, the rest of the directive is wrapped in a $timeout function to ensure that the animation will call on the next Famous engine tick.</p>
<p><code>opacityStartValue</code>, <code>opacityEndValue</code>, and <code>duration</code> are convenience variables that access the <code>fa-opacity</code>, <code>opacity-end</code>, and <code>duration</code> attributes from the html.</p>
<p>A transitionable called <code>OpacityTransitionable</code> is instantiated with <code>startOpacity</code> (value of 0.2 in this example).</p>
<p><code>scope.isolate</code> is a reference to the Famous-Angular <code>isolate</code> object that stores properties available to each particular Famous-Angular element.  The <code>isolate</code> object may look like this: {004: {Context Object} 005: {Modifier Object} 006: {Surface Object}}.</p>
<p>A particular element&#39;s &quot;isolate&quot; is accessed from the isolate object by key, with the unique $id property of the element, like so: <code>scope.isolate[scope.$id]</code>.  (The <code>fa-modifier</code>&#39;s unique <code>$id</code> property might be 005, for example)  </p>
<p>Accessing the reference of the Famous Modifier that corresponds to the element, (<code>scope.isolate[scope.$id].modifier</code>), use the <code>.opacityFrom()</code> method (available to Famous Modifiers), and pass it a callback function that will return <code>opacityTransitionable.get()</code>.  In this particular example, we passed the value of <code>opacityStartValue (0.2)</code> into the constructor of opacityTransitionable earlier.  Therefore, at this point, <code>opacityTransitionable.get()</code> will return <code>0.2</code>.</p>
<p>The transition begins when <code>opacityTransitionable.set()</code> is called, which passes in the <code>opacityEndValue</code> and a transition object.</p>



