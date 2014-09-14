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
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example46')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example46"
      
        module="faSurfaceExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app&gt;&#10;  &lt;fa-modifier fa-size=&quot;[960, undefined]&quot;&gt;&#10;     &lt;fa-surface fa-size=&quot;[undefined, undefined]&quot;&gt;&#10;       &lt;div ng-include src=&quot; &#39;helloWorld.html&#39; &quot;&gt;&lt;/div&gt;&#10;     &lt;/fa-surface&gt;&#10;   &lt;/fa-modifier&gt;&#10;&lt;/fa-app&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="helloWorld.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;p&gt;This is compiled from an external HTML fragment in helloWorld.html!&lt;/p&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="script.js"
      
        language="js"
      
        type="js"
      
    >
      <pre><code>{% raw %}angular.module(&#39;faSurfaceExampleApp&#39;, [&#39;famous.angular&#39;]);{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example46/index.html" name="example-example46"></iframe>
  </div>
</div>


</p>
<h2 id="common-confusions">Common Confusions</h2>
<h3 id="a-surface-is-a-leaf-node">A Surface is a leaf node</h3>
<p> An fa-surface is a leaf node; this means that there should not be Famous-Angular elements nested within an fa-surface.</p>
<p> This following example will NOT work correctly:</p>
<pre><code class="lang-html"> &lt;fa-surface&gt;
    &lt;!-- the contents of a Surface must be standard HTML. --&gt;
    &lt;!-- If a Famo.us component is on a surface, it will not get rendered correctly. --&gt;
    &lt;fa-modifier&gt;
      &lt;fa-surface&gt;This will not work correctly.&lt;/fa-surface&gt;
    &lt;/fa-modifier&gt;
 &lt;/fa-surface&gt;</code></pre>
<p> It will throw this error: &quot;Error: Surfaces are leaf nodes of the Famo.us render tree and cannot accept rendernode children.  To include additional Famo.us content inside of a fa-surface, that content must be enclosed in an additional fa-app.&quot;</p>
<p> The purpose of an fa-surface is to contain viewable HTML content:</p>
<pre><code class="lang-html"> &lt;fa-surface&gt;
    &lt;!-- content --&gt;
    &lt;!-- databound content with curly braces --&gt;
    &lt;!-- no other Famous renderable nodes allowed inside a Surface--&gt;
 &lt;/fa-surface&gt;</code></pre>
<h3 id="properties-on-surfaces-vs-modifiers">Properties on surfaces vs modifiers</h3>
<p>With Famous, properties related to layout and visibility belong on a Modifier.  A Surface should be added below a Modifier on the Render Tree, as Modifiers affect everything below them.</p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example47')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example47"
      
        module="faSurfaceExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app&gt;&#10;  &lt;fa-surface fa-origin=&quot;[.5, 0]&quot;&gt;This will not change the origin.&lt;/fa-surface&gt;&#10;&lt;/fa-app&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="script.js"
      
        language="js"
      
        type="js"
      
    >
      <pre><code>{% raw %}angular.module(&#39;faSurfaceExampleApp&#39;, [&#39;famous.angular&#39;]);{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example47/index.html" name="example-example47"></iframe>
  </div>
</div>


</p>
<p>While you can specify <code>fa-size</code> on surfaces themselves, it is not recommended.
This is not best practice:</p>
<pre><code class="lang-html">&lt;fa-surface fa-size=&quot;[100, 100]&quot;&gt;&lt;/fa-surface&gt;</code></pre>
<p>Whereas this is the preferred approach:</p>
<pre><code class="lang-html">&lt;fa-modifier fa-size=&quot;[100, 100]&quot;&gt;
  &lt;fa-surface fa-size=&quot;[undefined, undefined]&quot;&gt;
  &lt;/fa-surface&gt;
&lt;/fa-modifier&gt;</code></pre>
<p>You may also omit <code>fa-size=&quot;[undefined, undefined]&quot;</code> on the surface and the surface will fill to the size of the modifier, in this case, <code>[100, 100]</code>.</p>
<p>In Famous&#39; Render Tree, Modifiers modify all the nodes (other Modifiers and Surfaces) below them.  By setting the <code>fa-surface</code>&#39;s <code>fa-size</code> to <code>[undefined, undefined]</code>, it will inherit from the <code>fa-modifier</code>&#39;s <code>fa-size</code> of <code>[100, 100]</code>.</p>
<p><code>Fa-surfaces</code> also cannot have an <code>fa-size</code>, assigned to a function, as is in the case of modifiers, which can take number/array or a function.
For example, this will not work:</p>
<pre><code class="lang-html">&lt;fa-surface fa-size=&quot;sizeForBoxFunction&quot;&gt;&lt;/fa-surface&gt;</code></pre>
<pre><code class="lang-javascript">$scope.sizeForBoxFunction = function() {
   return [75, 75];
};</code></pre>
<p>To reiterate, the best practice to animate or set any layout/visibilty properties of a surface is to do so on a modifier that affects the Surface.  The purpose of a Surface is to contain HTML content, whether rendered from a template, or data-bound.</p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example48')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example48"
      
        module="faSurfaceExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app ng-controller=&quot;SurfaceCtrl&quot;&gt;&#10;  &lt;fa-modifier fa-size=&quot;sizeForBoxFunction&quot;&gt;&#10;    &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot;&gt;&lt;/fa-surface&gt;&#10;  &lt;/fa-modifier&gt;&#10;&lt;/fa-app&gt;&#10;&#10;&lt;script&gt;&#10;  angular.module(&#39;faSurfaceExampleApp&#39;, [&#39;famous.angular&#39;])&#10;    .controller(&#39;SurfaceCtrl&#39;, [&#39;$scope&#39;, &#39;$famous&#39;, function($scope, $famous) {&#10;        &#10;        $scope.sizeForBoxFunction = function() {&#10;           return [75, 75];&#10;        };&#10;&#10;    }]);&#10;&lt;/script&gt;{% endraw %}</code></pre>
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
<h3 id="fa-color-fa-background-color">fa-color &amp; fa-background-color</h3>
<p>The exceptions of not setting layout/visibility properties on an <code>fa-surface</code> are <code>fa-color</code> and <code>fa-background-color</code>: these two properties are passed through the <code>.setProperties()</code> method available on Famous Surfaces.
Take note that they accept a string in the html view.  If you do not enclose them in quotation marks, Angular will evaluate it as an object on the scope, but surrounding it with quotation marks will specify it as a string expression.</p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example49')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example49"
      
        module="faSurfaceExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app&gt;&#10;  &lt;fa-modifier fa-size=&quot;[200, 50]&quot;&gt;&#10;    &lt;fa-surface fa-background-color=&quot;&#39;orange&#39;&quot; fa-color=&quot;&#39;#fff&#39;&quot;&gt;&#10;        This text should be white on an orange background.&#10;    &lt;/fa-surface&gt;&#10;  &lt;/fa-modifier&gt;&#10;&lt;/fa-app&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="script.js"
      
        language="js"
      
        type="js"
      
    >
      <pre><code>{% raw %}angular.module(&#39;faSurfaceExampleApp&#39;, [&#39;famous.angular&#39;]);{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example49/index.html" name="example-example49"></iframe>
  </div>
</div>


</p>
<h3 id="ng-class">ng-class</h3>
<p>Ng-Class works on <code>fa-surface</code>s:</p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example50')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example50"
      
        module="faSurfaceExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app ng-controller=&quot;SurfaceCtrl&quot;&gt;&#10;  &lt;fa-modifier fa-size=&quot;[300, 50]&quot;&gt;&#10;    &lt;fa-surface ng-class=&quot;{strike: applyStrike}&quot;&gt;&#10;      Check box to apply strikethrough!&#10;      &lt;input type=&quot;checkbox&quot; ng-model=&quot;applyStrike&quot;&gt;&lt;/input&gt;&#10;    &lt;/fa-surface&gt;&#10;  &lt;/fa-modifier&gt;&#10;&lt;/fa-app&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}&#10;.strike {&#10;  text-decoration: line-through;&#10;}{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="script.js"
      
        language="js"
      
        type="js"
      
    >
      <pre><code>{% raw %}angular.module(&#39;faSurfaceExampleApp&#39;, [&#39;famous.angular&#39;])&#10;  .controller(&#39;SurfaceCtrl&#39;, [&#39;$scope&#39;, &#39;$famous&#39;, function($scope, $famous) {&#10;}]);{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example50/index.html" name="example-example50"></iframe>
  </div>
</div>


</p>



