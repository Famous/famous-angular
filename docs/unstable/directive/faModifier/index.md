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
  


{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example25')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example25"
      
        module="faModifierExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app ng-controller=&quot;ModifierCtrl&quot;&gt;&#10;  &lt;fa-modifier fa-opacity=&quot;.25&quot; fa-skew=&quot;myScopeSkewVariable&quot;&#10;               fa-translate=&quot;[25, 50, 2]&quot;&#10;               fa-scale=&quot;myScopeFunctionThatReturnsAnArray&quot;&gt;&#10;    &lt;!-- Child elements of this fa-modifier will be affected by the values above --&gt;&#10;    &lt;fa-surface&gt;I&#39;m translucent, skewed, and translated&lt;/fa-surface&gt;&#10;  &lt;/fa-modifier&gt;&#10;&lt;/fa-app&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="script.js"
      
        language="js"
      
        type="js"
      
    >
      <pre><code>{% raw %}angular.module(&#39;faModifierExampleApp&#39;, [&#39;famous.angular&#39;])&#10;  .controller(&#39;ModifierCtrl&#39;, [&#39;$scope&#39;, function($scope) {&#10;&#10;    $scope.myScopeSkewVariable = [0,0,.3];&#10;&#10;    $scope.myScopeFunctionThatReturnsAnArray = function() {&#10;      return [1.5, 1.5];&#10;    };&#10;}]);{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example25/index.html" name="example-example25"></iframe>
  </div>
</div>



  
  
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
        
  <code>Array</code>|<code>function()</code>|<code>Particle</code>
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
        
  <code>Number</code>|<code>function()</code>|<code>Particle</code>
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
        
  <code>Number</code>|<code>function()</code>|<code>Particle</code>
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
        
  <code>Number</code>|<code>function()</code>|<code>Particle</code>
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
        
  <code>Array</code>|<code>function()</code>|<code>Particle</code>
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
        
  <code>Array</code>|<code>function()</code>|<code>Particle</code>
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
        
  <code>Array</code>|<code>function()</code>|<code>Particle</code>
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
        
  <code>Number</code>|<code>function()</code>|<code>Particle</code>
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
        
  <code>Number</code>|<code>function()</code>|<code>Transitionable</code>|<code>Particle</code>
      </td>
      <td>
        <p>Number or function returning a number to which this Modifier&#39;s opacity should be bound</p>

        
      </td>
    </tr>
    
    <tr>
      <td>
        faProportions
        
        
      </td>
      <td>
        
  <code>Array</code>|<code>function()</code>|<code>Transitionable</code>|<code>Particle</code>
      </td>
      <td>
        <p>Two element array of [percent of width, percent of height] or function returning an array of numbers to which this Modifier&#39;s proportions should be bound</p>

        
      </td>
    </tr>
    
    <tr>
      <td>
        faSize
        
        
      </td>
      <td>
        
  <code>Array</code>|<code>function()</code>|<code>Transitionable</code>|<code>Particle</code>
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
        
  <code>Array</code>|<code>function()</code>|<code>Transitionable</code>|<code>Particle</code>
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
        
  <code>Array</code>|<code>function()</code>|<code>Transitionable</code>|<code>Particle</code>
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

  

  



<h2 id="example">Example</h2><h2 id="values-that-fa-modifier-attributes-accept">Values that fa-modifier attributes accept</h2>
<p><code>Fa-modifier</code> properties, (such as <code>faRotate</code>, <code>faScale</code>, etc) can be bound to number/arrays, object properties defined on the scope, function references, or function expressions.
Some properties (<code>faOpacity</code>, <code>faSize</code>, <code>faOrigin</code>, <code>faAlign</code>) can be bound to a Transitionable object directly.</p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example26')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example26"
      
        module="faModifierExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app&gt;&#10;  &lt;fa-modifier fa-origin=&quot;[.5,.5]&quot; fa-size=&quot;[100, 100]&quot; fa-rotate=&quot;.3&quot;&gt;&#10;    &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot;&gt;&lt;/fa-surface&gt;&#10;  &lt;/fa-modifier&gt;&#10;&lt;/fa-app&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="script.js"
      
        language="js"
      
        type="js"
      
    >
      <pre><code>{% raw %}angular.module(&#39;faModifierExampleApp&#39;, [&#39;famous.angular&#39;]);{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example26/index.html" name="example-example26"></iframe>
  </div>
</div>


</p>
<h3 id="object-properties-on-the-scope">Object properties on the scope</h3>
<p><code>Fa-modifier</code> properties can be bound to object properties defined on the scope.</p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example27')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example27"
      
        module="faModifierExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app ng-controller=&quot;ModifierCtrl&quot;&gt;&#10;  &lt;!-- These properties are bound to properties of $scope.boxObject in the contorller --&gt;&#10;  &lt;fa-modifier fa-origin=&quot;boxObject.origin&quot; fa-size=&quot;boxObject.size&quot;&gt;&#10;      &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot;&gt;&lt;/fa-surface&gt;&#10;  &lt;/fa-modifier&gt;&#10;&lt;/fa-app&gt;&#10;&#10;&lt;script&gt;&#10;  angular.module(&#39;faModifierExampleApp&#39;, [&#39;famous.angular&#39;])&#10;      .controller(&#39;ModifierCtrl&#39;, [&#39;$scope&#39;, function($scope) {&#10;&#10;        $scope.boxObject = {&#10;           origin: [.4, .4],&#10;           size: [50, 50]&#10;        };&#10;&#10;    }]);&#10;&lt;/script&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example27/index.html" name="example-example27"></iframe>
  </div>
</div>


</p>
<h3 id="function-references">Function references</h3>
<p><code>Fa-modifier</code> properties can be bound to a function reference that returns a value.</p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example28')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example28"
      
        module="faModifierExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app ng-controller=&quot;ModifierCtrl&quot;&gt;&#10;  &lt;fa-modifier fa-origin=&quot;genBoxOrigin&quot; fa-size=&quot;[200, 200]&quot;&gt;&#10;    &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot;&gt;&lt;/fa-surface&gt;&#10;  &lt;/fa-modifier&gt;&#10;&lt;/fa-app&gt;&#10;&#10;&lt;script&gt;&#10;  angular.module(&#39;faModifierExampleApp&#39;, [&#39;famous.angular&#39;])&#10;      .controller(&#39;ModifierCtrl&#39;, [&#39;$scope&#39;, function($scope) {&#10;&#10;        $scope.getX = function() {&#10;          return .2;&#10;        };&#10;        $scope.getY = function() {&#10;          return .3;&#10;        }&#10;        $scope.genBoxOrigin = function() {&#10;          return [$scope.getX(), $scope.getY()];&#10;        };&#10;&#10;    }]);&#10;&lt;/script&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example28/index.html" name="example-example28"></iframe>
  </div>
</div>


</p>
<h3 id="function-expressions">Function expressions</h3>
<p><code>Fa-modifier</code> properties can be bound to a function expression.  <code>boxTransitionable</code> is an instantiated <code>Transitionable</code> object with the value of <code>[0,0,0]</code>.
The <code>.get()</code> method is available to all <code>Transitionable</code> objects, and it returns an interpolated value of a transition at calltime.
When <code>fa-translate</code> calls <code>boxTransitionable.get()</code>, it returns <code>[100,50,0]</code>.</p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example29')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example29"
      
        module="faModifierExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app ng-controller=&quot;ModifierCtrl&quot;&gt;&#10;  &lt;fa-modifier fa-size=&quot;[100, 100]&quot; fa-translate=&quot;boxTransitionable.get()&quot;&gt;&#10;    &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot; fa-click=&quot;animate()&quot;&gt;&lt;/fa-surface&gt;&#10;  &lt;/fa-modifier&gt;&#10;&lt;/fa-app&gt;&#10;&#10;&lt;script&gt;&#10;  angular.module(&#39;faModifierExampleApp&#39;, [&#39;famous.angular&#39;])&#10;      .controller(&#39;ModifierCtrl&#39;, [&#39;$scope&#39;, &#39;$famous&#39;, function($scope, $famous) {&#10;&#10;        var Transitionable = $famous[&#39;famous/transitions/Transitionable&#39;];&#10;&#10;        $scope.boxTransitionable = new Transitionable([100, 50, 0]);&#10;&#10;    }]);&#10;&lt;/script&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example29/index.html" name="example-example29"></iframe>
  </div>
</div>


</p>
<h3 id="transitionables">Transitionables</h3>
<p>Some properties (<code>faOpacity</code>, <code>faSize</code>, <code>faOrigin</code>, <code>faAlign</code>) can be bound to a <code>Transitionable</code> object directly.</p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example30')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example30"
      
        module="faModifierExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app ng-controller=&quot;ModifierCtrl&quot;&gt;&#10;  &lt;fa-modifier fa-size=&quot;[100, 100]&quot; fa-opacity=&quot;opacityTrans&quot;&gt;&#10;    &lt;fa-surface fa-background-color=&quot;&#39;orange&#39;&quot;&gt;&lt;/fa-surface&gt;&#10;  &lt;/fa-modifier&gt;&#10;&lt;/fa-app&gt;&#10;&#10;&lt;script&gt;&#10;  angular.module(&#39;faModifierExampleApp&#39;, [&#39;famous.angular&#39;])&#10;      .controller(&#39;ModifierCtrl&#39;, [&#39;$scope&#39;, &#39;$famous&#39;, function($scope, $famous) {&#10;&#10;        var Transitionable = $famous[&#39;famous/transitions/Transitionable&#39;];&#10;&#10;        $scope.opacityTrans = new Transitionable(.25);&#10;&#10;    }]);&#10;&lt;/script&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example30/index.html" name="example-example30"></iframe>
  </div>
</div>


</p>
<h3 id="transitionable-get-vs-transitionable">Transitionable.get() vs Transitionable</h3>
<p><code>FaTranslate</code> (along with <code>faRotate</code>, <code>faTranslate</code>, <code>faScale</code>, <code>faSkew</code>, &amp; more) pass through a Famous Transform function (<code>Transform.translate()</code>), whereas <code>faOpacity</code>, <code>faSize</code>, <code>faOrigin</code>, and <code>faAlign</code> are passed through a Famous Modifier.</p>
<p>A Famous <code>Transform.translate()</code> function does not accept a Transitionable object, but only an array.
A <code>.get()</code> function of a Transitionable returns an interpolated value of a current transition, therefore in the case of a <code>faTranslate</code>, it can return an array that a <code>Transform.translate()</code> can accept.</p>
<p><code>faOpacity</code> passes through a Famous Modifier, which has an <code>.opacityFrom()</code> method that can accept a Transitionable object directly, therefore a <code>.get()</code> method is not required.</p>
<p>As a design principle, Famous-Angular attempts to pass values directly to Famous as much as possible, and these differences are due to the core Famous library.</p>
<h2 id="fa-transform">Fa-transform</h2>
<p>Whenever a &quot;transform&quot; <a href="https://famo.us/docs/0.2.0/core/Transform">https://famo.us/docs/0.2.0/core/Transform</a> property is used on a <code>fa-modifier</code>, such as <code>fa-translate</code>, <code>fa-scale</code>, <code>fa-origin</code>, etc, their values are passed through a <code>Transform function</code> which returns a 16 element transform array.
<code>Fa-transform</code> can be used to directly pass a 16-element transform matrix to a <code>fa-modifier</code>.</p>
<h3 id="values-that-fa-transform-accepts">Values that fa-transform accepts</h3>
<p>Passed as an array:</p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example31')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example31"
      
        module="faModifierExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app&gt;&#10;  &lt;fa-modifier&#10;      fa-transform=&quot;[1, .3, 0, 0, -.3, 1, 0, 0, 0, 0, 1, 0, 20, 110, 0, 1]&quot;&#10;      fa-size=&quot;[100, 100]&quot;&gt;&#10;    &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot;&gt;&lt;/fa-surface&gt;&#10;  &lt;/fa-modifier&gt;&#10;&lt;/fa-app&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="script.js"
      
        language="js"
      
        type="js"
      
    >
      <pre><code>{% raw %}angular.module(&#39;faModifierExampleApp&#39;, [&#39;famous.angular&#39;]);{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example31/index.html" name="example-example31"></iframe>
  </div>
</div>


</p>
<p>Passed as an object on the scope:</p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example32')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example32"
      
        module="faModifierExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app ng-controller=&quot;ModifierCtrl&quot;&gt;&#10;  &lt;fa-modifier fa-transform=&quot;matrix&quot; fa-size=&quot;[50, 50]&quot;&gt;&#10;    &lt;fa-surface fa-background-color=&quot;&#39;green&#39;&quot;&gt;&lt;/fa-surface&gt;&#10;  &lt;/fa-modifier&gt;&#10;&lt;/fa-app&gt;&#10;&#10;&lt;script&gt;&#10;  angular.module(&#39;faModifierExampleApp&#39;, [&#39;famous.angular&#39;])&#10;      .controller(&#39;ModifierCtrl&#39;, [&#39;$scope&#39;, function($scope) {&#10;&#10;        $scope.matrix = [1, .3, 0, 0, -.3, 1, 0, 0, 0, 0, 1, 0, 20, 110, 0, 1];&#10;&#10;    }]);&#10;&lt;/script&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example32/index.html" name="example-example32"></iframe>
  </div>
</div>


</p>
<p>Passed as a function reference that returns a 16-element matrix3d webkit array:</p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example33')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example33"
      
        module="faModifierExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app ng-controller=&quot;ModifierCtrl&quot;&gt;&#10;  &lt;fa-modifier fa-transform=&quot;variousTransforms&quot; fa-size=&quot;[100, 100]&quot;&gt;&#10;    &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot;&gt;&lt;/fa-surface&gt;&#10;  &lt;/fa-modifier&gt;&#10;&lt;/fa-app&gt;&#10;&#10;&lt;script&gt;&#10;  angular.module(&#39;faModifierExampleApp&#39;, [&#39;famous.angular&#39;])&#10;      .controller(&#39;ModifierCtrl&#39;, [&#39;$scope&#39;, &#39;$famous&#39;, function($scope, $famous) {&#10;&#10;        var Transform = $famous[&#39;famous/core/Transform&#39;];&#10;&#10;        $scope.variousTransforms = function() {&#10;          var translate = Transform.translate(100, 100, 0);&#10;          var skew = Transform.skew(0, 0, 0.3);&#10;          return Transform.multiply(translate, skew);&#10;        };&#10;&#10;    }]);&#10;&lt;/script&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example33/index.html" name="example-example33"></iframe>
  </div>
</div>


</p>
<p><code>Transform</code> is a Famo.us math object used to calculate transforms.  It has various methods, such as <code>translate</code>, <code>rotate</code>, and <code>skew</code> that returns a 16-element matrix array.  <code>Transform.multiply</code> multiplies two or more Transform matrix types to return a final Transform 16-element matrix array, and this is what is passed into <code>fa-transform</code>.</p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example34')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example34"
      
        module="faModifierExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app ng-controller=&quot;ModifierCtrl&quot;&gt;&#10;  &lt;fa-modifier fa-transform=&quot;skewFunc&quot;&#10;               fa-translate=&quot;[100, 100, 0]&quot;&#10;               fa-size=&quot;[100, 100]&quot;&gt;&#10;    &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot;&gt;&lt;/fa-surface&gt;&#10;  &lt;/fa-modifier&gt;&#10;&lt;/fa-app&gt;&#10;&#10;&lt;script&gt;&#10;  angular.module(&#39;faModifierExampleApp&#39;, [&#39;famous.angular&#39;])&#10;      .controller(&#39;ModifierCtrl&#39;, [&#39;$scope&#39;, &#39;$famous&#39;, function($scope, $famous) {&#10;&#10;        var Transform = $famous[&#39;famous/core/Transform&#39;];&#10;&#10;        $scope.skewFunc = function() {&#10;          return Transform.skew(0, 0, 0.3);&#10;        };&#10;&#10;    }]);&#10;&lt;/script&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example34/index.html" name="example-example34"></iframe>
  </div>
</div>


</p>
<p>The fa-surface will only be skewed; fa-translate will be overriden, and not translated 100 pixels right and down.</p>
<h2 id="animate-modifier-properties-and-not-surfaces">Animate modifier properties and not surfaces</h2>
<p>Famous surfaces are styled with position:absolute, and their positions are defined by matrix3d webkit transforms.
The role of Modifiers is to to hold onto size, transform, origin, and opacity states, and applying those layout and styling properties to its child nodes.
As in vanilla Famous, you should animate properties of modifiers, such as transform, opacity, etc, rather than animate properties on the surface itself, as modifiers are responsible for layout and visibility.</p>
<pre><code class="lang-html">  &lt;fa-modifier fa-rotate-z=&quot;boxA.rotate.get()&quot;&gt;
    &lt;fa-surface fa-click=&quot;animateBoxA()&quot; fa-background-color=&quot;&#39;red&#39;&quot;&gt;&lt;/fa-surface&gt;
  &lt;/fa-modifier&gt;</code></pre>
<h2 id="the-order-of-transforms-matter">The order of transforms matter</h2>
<h3 id="fa-transform-order">Fa-Transform-order</h3>
<p><code>Fa-transform-order</code> can be used to specify the order of transforms on a modifier.  In the first example below, the translate is applied first, translating the box over to the right, and then it is rotated around its origin.
In the second example, the rotation happens first, and then the translation is calculated in relation to the origin that has been rotated.</p>
<p>If fa-transform-order is not specified and there are multiple transforms on a Modifier, they will be be transformed in alphabetical order of their properties (e.g. &quot;r&quot; in rotate comes before &quot;t&quot; in translate).</p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example35')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example35"
      
        module="faModifierExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app&gt;&#10;  &lt;fa-modifier fa-transform-order=&quot;[&#39;translate&#39;, &#39;rotateZ&#39;]&quot;&#10;               fa-rotate-z=&quot;0.3&quot;&#10;               fa-translate=&quot;[100, 0, 0]&quot;&#10;               fa-size=&quot;[100, 100]&quot;&gt;&#10;    &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot;&gt;&lt;/fa-surface&gt;&#10;  &lt;/fa-modifier&gt;&#10;&#10;  &lt;fa-modifier fa-transform-order=&quot;[&#39;rotateZ&#39;, &#39;translate&#39;]&quot;&#10;               fa-rotate-z=&quot;0.3&quot;&#10;               fa-translate=&quot;[100, 0, 0]&quot;&#10;               fa-size=&quot;[100, 100]&quot;&gt;&#10;    &lt;fa-surface fa-background-color=&quot;&#39;blue&#39;&quot;&gt;&lt;/fa-surface&gt;&#10;  &lt;/fa-modifier&gt;&#10;&lt;/fa-app&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="script.js"
      
        language="js"
      
        type="js"
      
    >
      <pre><code>{% raw %}angular.module(&#39;faModifierExampleApp&#39;, [&#39;famous.angular&#39;]);{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example35/index.html" name="example-example35"></iframe>
  </div>
</div>


</p>
<h3 id="nesting-modifiers">Nesting Modifiers</h3>
<p>You can also specify the order of transforms by nesting Modifiers.  In the example below, each Modifier has one Transform property (e.g. translate, rotate, skew, scale, etc).  Each Famous modifier affects all child nodes below it on the Render Tree.</p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example36')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example36"
      
        module="faModifierExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app&gt;&#10;  &lt;fa-modifier fa-translate=&quot;[100, 100]&quot;&gt;&#10;     &lt;fa-modifier fa-rotate-z=&quot;.6&quot; fa-size=&quot;[100, 100]&quot;&gt;&#10;       &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot;&gt;&lt;/fa-surface&gt;&#10;     &lt;/fa-modifier&gt;&#10;  &lt;/fa-modifier&gt;&#10;&#10;   &lt;fa-modifier fa-rotate-z=&quot;.6&quot;&gt;&#10;     &lt;fa-modifier fa-translate=&quot;[100, 100]&quot; fa-size=&quot;[100, 100]&quot;&gt;&#10;       &lt;fa-surface fa-background-color=&quot;&#39;blue&#39;&quot;&gt;&lt;/fa-surface&gt;&#10;     &lt;/fa-modifier&gt;&#10;   &lt;/fa-modifier&gt;&#10;&lt;/fa-app&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="script.js"
      
        language="js"
      
        type="js"
      
    >
      <pre><code>{% raw %}angular.module(&#39;faModifierExampleApp&#39;, [&#39;famous.angular&#39;]);{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example36/index.html" name="example-example36"></iframe>
  </div>
</div>


</p>



