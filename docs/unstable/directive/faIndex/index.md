---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faIndex/"
title: "fa-index"
header_sub_title: "Directive in module famous.angular"
doc: "faIndex"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-index.js#L1'>
    Improve this doc
  </a>
</div>




<h1 class="api-title">

  fa-index



</h1>





This directive is used to specify the rendering order of elements
inside of a ViewSequence-based component, such as @link api/directive/faScrollView faScrollView}
or @link api/directive/faGridLayout faGridLayout}.  As a special case, when elements are added to
these controls using ng-repeat, they are automatically assigned the
$index property exposed by ng-repeat.  When adding elements manually
(e.g. to a faScrollView but not using ng-repeat) or in a case where custom
order is desired, then the index value must be assigned/overridden using the faIndex directive.








  
<h2 id="usage">Usage</h2>
  
```html
<fa-scroll-view>
 <fa-surface fa-index="0">Surface 1</fa-surface>
 <fa-surface fa-index="1">Surface 2</fa-surface>
</fa-scroll-view>
```
  
  

  



<h2 id="example">Example</h2><p>In this example below, a scrollview is created with two nested fa-view&#39;s, both of which have an fa-index of 0 and 1, respectively.
Fa-index determines the order of which the surfaces appear in the sequential view.
If fa-index is declared explicitly, it will override any default order of elements declared in html.
As in the example below, the fa-view with the blue background color appears after the one with the red background because its fa-index is set to 1.
If fa-views are created with an ng-repeat, they are automatically assigned the $index property, unless explicitly set.</p>
<p>The scrollView directive accepts another directive called fa-start-index as an attribute, and this determines which view the scrollView displays by default.
Fa-start-index will not affect the sequential order of the layout; the view with the red background will be layed out first, followed by the view with the blue background.
With this attribute set to 1, the scroll view will display the view with the index of 1, which is the view with the blue background color. </p>
<pre><code class="lang-html"> &lt;fa-scroll-view fa-pipe-from=&quot;eventHandler&quot; fa-options=&quot;options.scrollViewTwo&quot; fa-start-index=&quot;1&quot;&gt;
   &lt;fa-view fa-index=&quot;1&quot;&gt;
     &lt;fa-modifier fa-size=&quot;[320, 320]&quot;&gt;
         &lt;fa-surface fa-background-color=&quot;&#39;blue&#39;&quot; fa-pipe-to=&quot;eventHandler&quot;&gt;&lt;/fa-surface&gt;
       &lt;/fa-modifier&gt;
   &lt;/fa-view&gt;
   &lt;fa-view fa-index=&quot;0&quot;&gt;
     &lt;fa-modifier fa-size=&quot;[320, 320]&quot;&gt;
         &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot; fa-pipe-to=&quot;eventHandler&quot;&gt;&lt;/fa-surface&gt;
       &lt;/fa-modifier&gt;
   &lt;/fa-view&gt;
  &lt;/fa-scroll-view&gt;</code></pre>
<p>```javascript
var EventHandler = $famous[&#39;famous/core/EventHandler&#39;];
$scope.eventHandler = new EventHandler();
$scope.list = [{content: &quot;famous&quot;}, {content: &quot;angular&quot;}, {content: &quot;rocks!&quot;}];</p>
<p>$scope.options = {
  scrollViewTwo: {
    direction: 0
  }
};</p>



