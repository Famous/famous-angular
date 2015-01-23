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
inside of a ViewSequence-based component, such as @link faScrollView faScrollView}
or @link faGridLayout faGridLayout}.  As a special case, when elements are added to
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
  
  

  



<h2 id="example">Example</h2><p><code>Fa-index</code> determines the order of which the surfaces appear in the sequential view.
In this example below, a Scroll View is created with two nested <code>fa-view</code>&#39;s, both of which have an <code>fa-index</code> of 0 and 1, respectively.</p>
<p>If <code>fa-index</code> is declared explicitly, it will override any default order of <code>fa-view</code>&#39;s declared in html.
If <code>fa-views</code> are created with an ng-repeat, they are automatically assigned the $index property, unless explicitly set.
The <code>fa-view</code> with the blue background color appears after the one with the red background because its <code>fa-index</code> is set to 1.</p>
<p><code>fa-scroll-view</code> accepts another directive called <code>fa-start-index</code> as an attribute, which determines which <code>fa-view</code> the Scroll View displays by default.
<code>Fa-start-index</code> will not affect the sequential order of the layout; the <code>fa-view</code> with the red background will be layed out first, followed by the one with the blue background.
 By setting <code>fa-start-index</code> to 1, the Scroll View will display the View with the index of 1, which is the View with the blue background color. </p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example9')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example9"
      
        module="faIndexExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app ng-controller=&quot;IndexCtrl&quot;&gt; &#10;&#10; &lt;!-- The scroll View will start at the index of 1 --&gt;&#10;  &lt;fa-scroll-view fa-pipe-from=&quot;eventHandler&quot; fa-options=&quot;options.scrollView&quot; fa-start-index=&quot;1&quot;&gt;&#10;&#10;    &lt;!-- Even though this view is declared first in html, it will will be layed out 2nd --&gt;&#10;    &lt;!-- On page load, the scroll View will scroll to this view, and display it.  --&gt;&#10;&#10;     &lt;fa-view fa-index=&quot;1&quot;&gt;&#10;        &lt;fa-modifier fa-size=&quot;[320, 320]&quot;&gt;&#10;           &lt;fa-surface fa-pipe-to=&quot;eventHandler&quot; &#10;                       fa-background-color=&quot;&#39;blue&#39;&quot;&gt;&#10;                       &lt;p&gt;Scroll me back!&lt;/p&gt;&#10;           &lt;/fa-surface&gt;&#10;        &lt;/fa-modifier&gt;&#10;     &lt;/fa-view&gt;&#10;&#10;     &lt;fa-view fa-index=&quot;0&quot;&gt;&#10;        &lt;fa-modifier fa-size=&quot;[320, 320]&quot;&gt;&#10;           &lt;fa-surface fa-pipe-to=&quot;eventHandler&quot; &#10;                       fa-background-color=&quot;&#39;red&#39;&quot;&gt;&#10;                       &lt;p&gt;Scroll me!&lt;/p&gt;&#10;           &lt;/fa-surface&gt;&#10;        &lt;/fa-modifier&gt;&#10;     &lt;/fa-view&gt;&#10;&#10;  &lt;/fa-scroll-view&gt;   &#10;&lt;/fa-app&gt;   {% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="script.js"
      
        language="js"
      
        type="js"
      
    >
      <pre><code>{% raw %}angular.module(&#39;faIndexExampleApp&#39;, [&#39;famous.angular&#39;])&#10;  .controller(&#39;IndexCtrl&#39;, [&#39;$scope&#39;, &#39;$famous&#39;, function($scope, $famous) {&#10;&#10;   var EventHandler = $famous[&#39;famous/core/EventHandler&#39;];&#10;   $scope.eventHandler = new EventHandler();&#10;   $scope.list = [{content: &quot;famous&quot;}, {content: &quot;angular&quot;}, {content: &quot;rocks!&quot;}];&#10;  &#10;   $scope.options = {&#10;     scrollView: {&#10;       direction: 0 // displays the fa-views horizontally&#10;     }&#10;   };&#10;&#10;}]);{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  width: 320px;&#10;  height: 320px;&#10;  overflow: hidden;&#10;}&#10;p {&#10;  padding: 8px 8px;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example9/index.html" name="example-example9"></iframe>
  </div>
</div>


</p>



