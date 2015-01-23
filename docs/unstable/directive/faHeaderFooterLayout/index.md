---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faHeaderFooterLayout/"
title: "fa-header-footer-layout"
header_sub_title: "Directive in module famous.angular"
doc: "faHeaderFooterLayout"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-header-footer-layout.js#L1'>
    Improve this doc
  </a>
</div>





<h1 class="api-title">

  fa-header-footer-layout



</h1>





This directive will create a Famo.us HeaderFooterLayout containing
a Header, Content, and Footer based on the order of its child elements.
 See [https://famo.us/docs/views/HeaderFooterLayout]






  
<h2 id="usage">Usage</h2>
  
```html
<fa-header-footer-layout>
  <!-- header rendernode -->
  <!-- content rendernode -->
  <!-- footer rendernode -->
</fa-header-footer-layout>
```
  
  

  



<h2 id="example">Example</h2><p><code>fa-header-footer</code> is a View that arranges three renderables into a header and footer area with defined sizes, and a content area that fills up the remaining space.</p>
<p>To use it, declare it in the html and nest 3 renderables inside.  In the example below, there are three direct children elements: a Modifier (with an <code>fa-surface</code> nested inside), a Surface, and another Modifier (with an <code>fa-surface</code> nested inside).  The order that they are declared in the html determines whether each corresponds to a header, content, and footer.</p>
<p>Since the header and footer Modifiers have fixed heights of <code>[undefined, 75]</code> (fill the parent container horizontally, 75 pixels vertically), the content will fill the remaining height of the parent modifier or context.</p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example5')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example5"
      
        module="faHeaderFooterExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app&gt;&#10;&#10;  &lt;fa-header-footer-layout fa-options=&quot;{headerSize: 75, footerSize: 75}&quot;&gt;&#10;&#10;    &lt;!-- header --&gt;&#10;    &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot;&gt;Header&lt;/fa-surface&gt;&#10;  &#10;    &lt;!-- content --&gt;&#10;    &lt;fa-surface fa-background-color=&quot;&#39;blue&#39;&quot;&gt;Content&lt;/fa-surface&gt;&#10;  &#10;    &lt;!-- footer --&gt;&#10;    &lt;fa-surface fa-background-color=&quot;&#39;green&#39;&quot;&gt;Footer&lt;/fa-surface&gt;&#10;&#10;  &lt;/fa-header-footer-layout&gt;&#10;&#10;&lt;/fa-app&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="script.js"
      
        language="js"
      
        type="js"
      
    >
      <pre><code>{% raw %}angular.module(&#39;faHeaderFooterExampleApp&#39;, [&#39;famous.angular&#39;]){% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example5/index.html" name="example-example5"></iframe>
  </div>
</div>


</p>
<p>Famo.us&#39; <code>HeaderFooterLayout</code> defaults to a vertical orientation.
Specify a direction in the fa-options object to obtain a horizontal orientation.</p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example6')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example6"
      
        module="faHeaderFooterExampleAppA"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app&gt;&#10;&#10;  &lt;fa-header-footer-layout fa-options=&quot;{direction: 0, headerSize: 75, footerSize: 75}&quot;&gt;&#10;&#10;    &lt;!-- header --&gt;&#10;    &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot;&gt;Header&lt;/fa-surface&gt;&#10;  &#10;    &lt;!-- content --&gt;&#10;    &lt;fa-surface fa-background-color=&quot;&#39;blue&#39;&quot;&gt;Content&lt;/fa-surface&gt;&#10;  &#10;    &lt;!-- footer --&gt;&#10;    &lt;fa-surface fa-background-color=&quot;&#39;green&#39;&quot;&gt;Footer&lt;/fa-surface&gt;&#10;&#10;  &lt;/fa-header-footer-layout&gt;&#10;&#10;&lt;/fa-app&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="script.js"
      
        language="js"
      
        type="js"
      
    >
      <pre><code>{% raw %}angular.module(&#39;faHeaderFooterExampleAppA&#39;, [&#39;famous.angular&#39;]){% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example6/index.html" name="example-example6"></iframe>
  </div>
</div>


</p>
<h2 id="ng-repeat-inside-a-fa-header-footer">ng-repeat inside a fa-header-footer</h2>
<p><code>Fa-header-footer</code> works with ng-repeat&#39;ed renderables:</p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example7')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example7"
      
        module="faHeaderFooterExampleAppB"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app ng-controller=&quot;HeaderFooterCtrlB&quot;&gt;&#10;  &lt;fa-header-footer-layout&gt;&#10;    &lt;fa-modifier ng-repeat=&quot;view in views&quot; fa-size=&quot;view.size&quot;&gt;&#10;      &lt;fa-surface fa-background-color=&quot;view.bgColor&quot;&gt;&#10;        {{view.text}}&#10;      &lt;/fa-surface&gt;&#10;    &lt;/fa-modifier&gt;&#10;  &lt;/fa-header-footer-layout&gt;&#10;&lt;/fa-app&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="script.js"
      
        language="js"
      
        type="js"
      
    >
      <pre><code>{% raw %}angular.module(&#39;faHeaderFooterExampleAppB&#39;, [&#39;famous.angular&#39;])&#10;  .controller(&#39;HeaderFooterCtrlB&#39;, [&#39;$scope&#39;, function($scope) {&#10;    $scope.views = [&#10;      {bgColor: &quot;red&quot;, text: &quot;header&quot;, size: [undefined, 100]},&#10;      {bgColor: &quot;green&quot;, text: &quot;content&quot;, size: [undefined, undefined]},&#10;      {bgColor: &quot;blue&quot;, text: &quot;footer&quot;, size: [undefined, 100]}&#10;    ];&#10;}]);{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example7/index.html" name="example-example7"></iframe>
  </div>
</div>


</p>
<p>In the example above, 3 renderables are generated through an ng-repeat.  The header and footer <code>Modifier</code>s generated by the ng-repeat have defined sizes of <code>[undefined, 100]</code> (they will fill their parent container horizontally, and be 100 pixels vertically).  The content has a size of <code>[undefined, undefined]</code>, and it will fill the remaining heght and width of its container.</p>
<p>Note:</p>
<ul>
<li>If more than 3 renderables are nested inside an <code>fa-header-footer-layout</code>, it will throw an error: <code>fa-header-footer-layout can accept no more than 3 children.</code></li>
<li>Furthermore, in the basic example we used the <code>fa-options</code> attribute to specify the size of the header and footer. Here we do not use modifiers on the surfaces within the header fotter layout to achieve a similar effect. Note that this approach does not work as well with vertical orientations.</li>
</ul>



