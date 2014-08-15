---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/service/$animate/"
title: "$animate"
header_sub_title: "Service in module scripts"
doc: "$animate"
docType: "service"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/services/famousAnimate.js#L1'>
    Improve this doc
  </a>
</div>





<h1 class="api-title">

  $animate



</h1>





The Famo.us/Angular implementation of the `$animate` service provides Famo.us animation support for
Angular's core enter, leave, and move structural events.

With the attributes `fa-animate-enter`, `fa-animate-leave`, `fa-animate-move`, you can assign an arbitrary
expression to animation events.

<strong>To notify Famo.us/Angular when your animations are complete, you must do one of two things</strong>:
either pass a `$done` callback in your animation expressions, or design your animation expressions to
evaluate as the numeric duration, in milliseconds, of the animation. If an animation expression
both evaluates as a non-number and fails to invoke the `$done` callback, the animation event pipeline
will not resolve correctly and items will fail to enter, leave, and move correctly.

To inform Famo.us/Angular how to halt any in-progress animation, use the `fa-animate-halt` attribute.

The core Angular animation API is fundamentally CSS class-based. Because only Famo.us Surfaces
support CSS classes, core directives such as `ngClass`, `ngShow`, `ngIf`, and others should be applied
only with directives representing Surfaces (such as <a href="../../../api/directive/faSurface/">faSurface</a> and
<a href="../../../api/directive/faImageSurface/">faImageSurface</a>).

The <a href="https://docs.angularjs.org/api/ngAnimate">ngAnimate</a> module's documentation lists the set of
core directives supporting $animate events. Please note that the `ngAnimate` module is *not* required
(or recommended) to implement $animate events with Famo.us, but it is compatible and technically effective
on Surfaces.







## Usage
```html
<ANY
  fa-animate-enter="expression"
  fa-animate-leave="expression"
  fa-animate-move="expression"
  fa-animate-halt="expression"
  ...
>
</ANY>
```


  

  
  
  




<h2 id="example">Example</h2><pre><code class="lang-html">&lt;fa-modifier
  ng-repeat=&quot;item in items&quot;
  fa-rotate-y=&quot;transitionable.get()&quot;
  fa-animate-enter=&quot;enter()&quot;
  fa-animate-leave=&quot;leave($done)&quot;
  fa-animate-halt=&quot;halt()&quot;
&gt;
  ...
&lt;/fa-modifier&gt;</code></pre>
<pre><code class="lang-javascript">var Transitionable = $famous[&#39;famous/transitions/Transitionable&#39;];
var SnapTransition = $famous[&#39;famous/transitions/SnapTransition&#39;];
var DURATION = 500;

$scope.transitionable = new Transitionable(Math.PI / 4);

// Fold items down to the right when they enter.
$scope.enter = function() {
  scope.transitionable.set(
    0,
    {
      method: SnapTransition,
      duration: DURATION
    }
  );

 // Declare the animation duration by returning it as a number
 return DURATION;
};

// Fold items up to the left when they leave.
$scope.leave = function(done) {
  scope.transitionable.set(
    Math.PI / 2,
    {
      method: SnapTransition,
      duration: DURATION
    },
    // Execute the done callback after the transition is fully applied
    done
  );
};

scope.halt = function() {
  // Halt any active animations
  scope.transitionable.halt();
};</code></pre>



