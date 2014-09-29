---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faSequentialLayout/"
title: "fa-sequential-layout"
header_sub_title: "Directive in module famous.angular"
doc: "faSequentialLayout"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-sequential-layout.js#L1'>
    Improve this doc
  </a>
</div>





<h1 class="api-title">

  fa-sequential-layout



</h1>





This directive will create a Famo.us SequentialLayout containing the
specified child elements. The provided `options` object
will pass directly through to the Famo.us faSequentialLayout's
constructor.  See [https://famo.us/docs/views/SequentialLayout]






  
<h2 id="usage">Usage</h2>
  
```html
<fa-sequential-layout fa-options="scopeOptionsObject">
  <!-- zero or more render nodes -->
</fa-sequential-layout>
```
  
  

  



<h2 id="example">Example</h2><p><code>Fa-sequential-layout</code> is a Famous View that arranges a collection of renderables sequentially in a specified direction.  Pass options (such as <code>direction</code>) by binding an object with the property to <code>fa-options</code>.</p>
<p>In the example below, an ng-repeat is used on an <code>fa-view</code> and the elements nested below it.  The size of each <code>fa-surface</code> is <code>[undefined, 100]</code>, specifying that the width will fill the parent container, and the height will be 100 pixels.</p>
<p>There are no positioning properties (such as <code>fa-translate</code>) specified on the <code>fa-modifier</code>, but these <code>fa-surface</code>s will translate automatically in the specified direction as not to overlap each other.</p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example48')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example48"
      
        module="faSequentialExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app ng-controller=&quot;SequentialCtrl&quot;&gt;&#10;  &lt;fa-sequential-layout fa-options=&quot;sequentialOptions&quot;&gt;&#10;   &lt;fa-view ng-repeat=&quot;view in sequence&quot;&gt;&#10;     &lt;fa-modifier fa-size=&quot;[undefined, 100]&quot;&gt;&#10;       &lt;fa-surface fa-background-color=&quot;view.bgColor&quot;&gt;&lt;/fa-surface&gt;&#10;     &lt;/fa-modifier&gt;&#10;   &lt;/fa-view&gt;&#10;  &lt;/fa-sequential-layout&gt;&#10;&lt;/fa-app&gt;&#10;&#10;&lt;script&gt;&#10;  angular.module(&#39;faSequentialExampleApp&#39;, [&#39;famous.angular&#39;])&#10;      .controller(&#39;SequentialCtrl&#39;, [&#39;$scope&#39;, &#39;$famous&#39;, function($scope, $famous) {&#10;        &#10;        $scope.sequentialOptions = {&#10;          direction: 1, // vertical = 1 (default), horizontal = 0&#10;        };&#10;&#10;        $scope.sequence = [{bgColor: &quot;orange&quot;}, {bgColor: &quot;red&quot;}, {bgColor: &quot;green&quot;}, {bgColor: &quot;yellow&quot;}];&#10;&#10;    }]);&#10;&lt;/script&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example48/index.html" name="example-example48"></iframe>
  </div>
</div>


</p>



