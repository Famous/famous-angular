---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faPipeTo/"
title: "fa-pipe-to"
header_sub_title: "Directive in module famous.angular"
doc: "faPipeTo"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-pipe-to.js#L1'>
    Improve this doc
  </a>
</div>





<h1 class="api-title">

  fa-pipe-to



</h1>





This directive pipes an element's event handler to a source event handler.






  
<h2 id="usage">Usage</h2>
  
```html
<ANY fa-pipe-to="EventHandler">
  <!-- zero or more render nodes -->
</ANY>
```
  
  
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
        EventHandler
        
        
      </td>
      <td>
        
  <code>Object</code>
      </td>
      <td>
        <p>Event handler source object</p>

        
      </td>
    </tr>
    
  </tbody>
</table>

  

  



<h2 id="example">Example</h2><h2 id="scrollview-example">ScrollView example</h2>
<p>In Famous, events are used to move information between widgets (such as ScrollView) and Views, and to listen to DOM events.
To pass information between two unrelated views, or even between a nested View to its parent, use <code>fa-pipe-to</code> and <code>fa-pipe-from</code> to pipe and receive events.</p>
<p>In the example below, even though <code>fa-view</code>, <code>fa-modifier</code>, and <code>fa-surface</code> are all nested within an <code>fa-scroll-view</code>, all of these elements&#39; events (such as touch or scroll) do not propagate upwards towards their parent.</p>
<p>Note:  This example will not work.</p>
<pre><code class="lang-html">&lt;!-- fa-scroll-view is not receiving any events from its children --&gt;
&lt;fa-scroll-view&gt;
   &lt;fa-view ng-repeat=&quot;view in views&quot;&gt;
      &lt;fa-modifier fa-size=&quot;[320, 320]&quot;&gt;
       &lt;!-- Events on fa-surface are not propagated upwards to its parents automatically --&gt;
          &lt;fa-surface fa-background-color=&quot;&#39;blue&#39;&quot;&gt;&lt;/fa-surface&gt;
        &lt;/fa-modifier&gt;
   &lt;/fa-view&gt;
&lt;/fa-scroll-view&gt;</code></pre>
<p>In the example below, events from the <code>fa-surface</code> are piped to <code>myEventHandler</code>, a source event handler, via <code>fa-pipe-to</code>. <code>Fa-scroll-view</code> receives events from <code>myEventHandler</code>, its target event handler, via <code>fa-pipe-from</code>. 
<code>myEventHandler</code> refers to an instantiated Famous EventHandler declared on the scope.  Using pipes allows events to propagate between <code>fa-surface</code>s and the <code>fa-scroll-view</code>.</p>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example40')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example40"
      
        module="faPipeExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app ng-controller=&quot;PipeCtrl&quot;&gt;&#10;  &lt;!-- fa-scroll-view receives all events from $scope.myEventHandler, and decides how to handle them --&gt;&#10;  &lt;fa-scroll-view fa-pipe-from=&quot;myEventHandler&quot;&gt;&#10;      &lt;fa-view ng-repeat=&quot;view in views&quot;&gt;&#10;        &lt;fa-modifier fa-size=&quot;[undefined, 160]&quot;&gt;&#10;        &lt;!-- All events on fa-surfaces (click, mousewheel) are piped to $scope.myEventHandler --&gt;&#10;           &lt;fa-surface fa-background-color=&quot;view.color&quot;&#10;                        fa-pipe-to=&quot;myEventHandler&quot;&gt;&#10;           &lt;/fa-surface&gt;&#10;          &lt;/fa-modifier&gt;&#10;      &lt;/fa-view&gt;&#10;  &lt;/fa-scroll-view&gt;&#10;&lt;/fa-app&gt;&#10;&#10;&lt;script&gt;&#10;  angular.module(&#39;faPipeExampleApp&#39;, [&#39;famous.angular&#39;])&#10;      .controller(&#39;PipeCtrl&#39;, [&#39;$scope&#39;, &#39;$famous&#39;, function($scope, $famous) {&#10;        &#10;        var EventHandler = $famous[&#39;famous/core/EventHandler&#39;];&#10;&#10;        $scope.views = [{color: &#39;red&#39;}, {color: &#39;blue&#39;}, {color: &#39;green&#39;}, {color: &#39;yellow&#39;}, {color: &#39;orange&#39;}];&#10;&#10;        $scope.myEventHandler = new EventHandler();&#10;&#10;    }]);&#10;&lt;/script&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example40/index.html" name="example-example40"></iframe>
  </div>
</div>


</p>
<h2 id="event-handlers-on-the-controller">Event Handlers on the Controller</h2>
<p>The example below is more in line with a &quot;vanilla&quot; Famous approach to event piping.  There are two Views, each with one Surface.  In the html, the second View has a<code>fa-pipe-from</code> bound to <code>eventHandlerB</code>.  </p>
<p>Two event handlers are instantiated on the controller.  <code>EventHandlerA</code> pipes to <code>eventHandlerB</code>, using: <code>eventHandlerA.pipe(eventHandlerB)</code>.</p>
<p>If the fa-surface on the first View is clicked, it calls <code>surfaceClick()</code> via fa-click, which causes <code>eventHandlerA</code> to emit a custom event called <code>myEvent</code>.
Because <code>evenHandlerA</code> pipes to <code>eventHandlerB</code>, <code>eventHandlerB</code> receives <code>myEvent</code>.  </p>
<p>An event handler for <code>myEvent</code> is declared for <code>eventHandlerB</code> using an <code>.on()</code> method.  When eventHandlerB receives a <code>myEvent</code> event, the event is handled with a callback function that translates the <code>fa-surface</code> on the second view.</p>
<pre><code class="lang-html">&lt;fa-view&gt;
  &lt;fa-modifier fa-size=&quot;[100, 100]&quot;&gt;
      &lt;fa-surface fa-background-color=&quot;&#39;blue&#39;&quot; fa-click=&quot;surfaceClick()&quot;&gt;&lt;/fa-surface&gt;
    &lt;/fa-modifier&gt;
&lt;/fa-view&gt;
&lt;fa-view fa-pipe-from=&quot;eventHandlerB&quot;&gt;
  &lt;fa-modifier fa-size=&quot;[100, 100]&quot; fa-translate=&quot;redTrans.get()&quot;&gt;
      &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot;&gt;&lt;/fa-surface&gt;
  &lt;/fa-modifier&gt;
&lt;/fa-view&gt;</code></pre>
<pre><code class="lang-javascript">var EventHandler = $famous[&#39;famous/core/EventHandler&#39;];
$scope.eventHandlerA = new EventHandler();
$scope.eventHandlerB = new EventHandler();
$scope.eventHandlerA.pipe($scope.eventHandlerB); 
// all events received by eventHandlerA wil be piped to eventHandlerB

var Transitionable = $famous[&#39;famous/transitions/Transitionable&#39;];
$scope.redTrans = new Transitionable([0, 0, 0]);

// eventHandlerA emits &#39;myEvent&#39; on click
$scope.surfaceClick = function() {
  $scope.eventHandlerA.emit(&#39;myEvent&#39;);
};

// eventHandlerA pipes all events it receives to eventHandlerB
// This is an event handler defined on eventHandlerB for handling &#39;myEvent&#39;
$scope.eventHandlerB.on(&#39;myEvent&#39;, function() {
  $scope.redTrans.set([0, 200, 0], {duration: 2000, curve: &#39;easeInOut&#39;})
});</code></pre>
<p> 

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example41')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example41"
      
        module="faPipeExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app ng-controller=&quot;PipeCtrl&quot;&gt;&#10;  &lt;fa-view&gt;&#10;    &lt;fa-modifier fa-size=&quot;[100, 100]&quot;&gt;&#10;        &lt;fa-surface class=&quot;blue-surface&quot; fa-background-color=&quot;&#39;blue&#39;&quot; fa-click=&quot;surfaceClick()&quot;&gt;Click me!&lt;/fa-surface&gt;&#10;      &lt;/fa-modifier&gt;&#10;  &lt;/fa-view&gt;&#10;  &lt;fa-view fa-pipe-from=&quot;eventHandlerB&quot;&gt;&#10;    &lt;fa-modifier fa-size=&quot;[100, 100]&quot; fa-translate=&quot;redTrans.get()&quot;&gt;&#10;        &lt;fa-surface fa-background-color=&quot;&#39;red&#39;&quot;&gt;&lt;/fa-surface&gt;&#10;    &lt;/fa-modifier&gt;&#10;  &lt;/fa-view&gt;&#10;&lt;/fa-app&gt;&#10;&#10;&lt;script&gt;&#10;  angular.module(&#39;faPipeExampleApp&#39;, [&#39;famous.angular&#39;])&#10;      .controller(&#39;PipeCtrl&#39;, [&#39;$scope&#39;, &#39;$famous&#39;, function($scope, $famous) {&#10;        &#10;        var EventHandler = $famous[&#39;famous/core/EventHandler&#39;];&#10;        $scope.eventHandlerA = new EventHandler();&#10;        $scope.eventHandlerB = new EventHandler();&#10;        $scope.eventHandlerA.pipe($scope.eventHandlerB); &#10;        // all events received by eventHandlerA wil be piped to eventHandlerB&#10;        &#10;        var Transitionable = $famous[&#39;famous/transitions/Transitionable&#39;];&#10;        $scope.redTrans = new Transitionable([0, 100, 0]);&#10;        &#10;        // eventHandlerA emits &#39;myEvent&#39; on click&#10;        $scope.surfaceClick = function() {&#10;          $scope.eventHandlerA.emit(&#39;myEvent&#39;);&#10;        };&#10;        &#10;        // eventHandlerA pipes all events it receives to eventHandlerB&#10;        // This is an event handler defined on eventHandlerB for handling &#39;myEvent&#39;&#10;        $scope.eventHandlerB.on(&#39;myEvent&#39;, function() {&#10;          $scope.redTrans.set([0, 200, 0], {duration: 2000, curve: &#39;easeInOut&#39;})&#10;        });&#10;&#10;    }]);&#10;&lt;/script&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}&#10;.blue-surface {&#10;  cursor: pointer;&#10;  color: #fff;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example41/index.html" name="example-example41"></iframe>
  </div>
</div>


 </p>
<h2 id="switching-pipes">Switching Pipes</h2>
<p>Another feature of <code>fa-pipe-to</code> and <code>fa-pipe-from</code> is the ability to switch pipes.</p>
<p>Using fa-pipe-to &amp; fa-pipe-from involves binding it to a reference of an event handler on the scope.
If the event handler bound to <code>fa-pipe-to/fa-pipe-from</code> changes, the directives unpipes from that event handler, and can pipe to another event handler.</p>
<p>The Famous approach to events allows more flexibility than DOM events which are hierarchical.  The example below shows a case in which eventing to non-hierarchical eventing &amp; switching pipes dynamically can allow more expressiveness with events than a hierarchical DOM event propagation model.</p>
<h3 id="example-explanation">Example &amp; Explanation</h3>
<p>Touch events from a directional pad conditionally affect three different Scroll Views on a page.
Based on which checkboxes are checked, the scroll events on the directional pad will affect either Scroll View A, Scroll View B, or Scroll View C.
The pipes are databound using <code>fa-pipe-to</code> and <code>fa-pipe-from</code>, and they are swapped out using the controller.</p>
<p>There are two main <code>fa-view</code>s: the directional pad which contains a Scroll View (for input) &amp; 3 checkboxes, and the other <code>fa-view</code> that contains 3 Scroll Views.
The Scroll View of the directional pad uses <code>fa-pipe-from</code> to pipe events from <code>mainPipe</code> to its Scroll View&#39;s event handler.
The surface within the directional pad uses <code>fa-pipe-to</code> to pipe <code>fa-surface</code> events to <code>mainPipe</code>.</p>
<p>In the second view containing 3 Scroll Views, each Scroll View pipes from <code>emptyPipe</code> by default, another instantiated EventHandler that has no events piped to it.  </p>
<p>The directional pad has a list of input checkboxes created by an ng-repeated list from <code>$scope.inputList</code>.
If a checkbox is checked, it calls <code>checkBoxChange()</code>, passing the index of the object within the ng-repeat, the letter (such as <code>&#39;A&#39;</code>), and the model (such as <code>&#39;checkBox.A&#39;</code>) of the respective checkbox.
If the checkbox is checked, the model (<code>checkBox.A</code>) is assigned the value of &quot;true&quot;, and if it is unchecked, it is assigned the value of &quot;false&quot;.</p>
<p>In the controller, <code>$scope.checkBoxChange()</code> changes the value of the pipe of the respective Scroll View (A, B, or C) that corresponds to the checkBox.
If the checkbox is checked, it assigns the respective Scroll View (A, B, or C) to pipe from <code>$scope.mainPipe</code>, and if unchecked, it will continue to pipe from <code>$scope.emptyPipe</code>.
In short, the checkboxes act as switches to change piping events.</p>
<p>

{% assign lvl = page.url | append:'X' | split:'/' | size %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<div>
  <a ng-click="openPlunkr('{{ relative }}examples/example-example42')" class="btn pull-right">
    <i class="glyphicon glyphicon-edit">&nbsp;</i>
    Edit in Plunker</a>
  <div class="runnable-example" path="examples/example-example42"
      
        module="faPipeExampleApp"
      
  >

   
    <div ng-non-bindable class="runnable-example-file"
      
        name="index.html"
      
        language="html"
      
        type="html"
      
    >
      <pre><code>{% raw %}&lt;fa-app ng-controller=&quot;PipeCtrl&quot;&gt;&#10;  &lt;!-- directional pad view --&gt;&#10;  &lt;fa-view&gt;&#10;    &lt;!-- scroll view used as a directional pad input, receives events from mainPipe--&gt;&#10;    &lt;fa-scroll-view fa-pipe-from=&quot;mainPipe&quot;&gt;&#10;      &lt;fa-modifier fa-translate=&quot;[0, 0, 15]&quot; fa-size=&quot;[300, 50]&quot;&gt;&#10;        &lt;fa-view&gt;&#10;          &lt;fa-modifier&gt;&#10;            &lt;!-- mousewheel events will be piped to mainPipe --&gt;&#10;            &lt;fa-surface fa-background-color=&quot;&#39;orange&#39;&quot; fa-pipe-to=&quot;mainPipe&quot;&gt;&#10;              &lt;div&gt;Directional pad&lt;/div&gt;&#10;                &lt;span ng-repeat=&quot;input in inputList&quot;&gt;&#10;                  &lt;label&gt;{{input.letter}}&lt;/label&gt;&#10;                  &lt;!-- checkboxes --&gt;&#10;                  &lt;input type=&quot;checkbox&quot;&#10;                         ng-model=&quot;input.model&quot; &#10;                         name=&quot;scrollPipeTo&quot; &#10;                         ng-change=&quot;checkBoxChange($index, input.letter, input.model)&quot;&#10;                         ng-true-value=&quot;true&quot;&#10;                         ng-false-value=&quot;false&quot;&gt;&#10;                &lt;/span&gt;&#10;            &lt;/fa-surface&gt;&#10;          &lt;/fa-modifier&gt;&#10;        &lt;/fa-view&gt;&#10;      &lt;/fa-modifier&gt;&#10;    &lt;/fa-scroll-view&gt;&#10;  &lt;/fa-view&gt;&#10;  &#10;  &lt;!-- view with 3 Scroll Views --&gt;&#10;  &lt;fa-view&gt;&#10;    &lt;!-- ng-repeat creating 3 different scroll Views --&gt;&#10;    &lt;fa-modifier ng-repeat=&quot;view in scrollViews&quot;&#10;                 fa-translate=&quot;[100 * $index, 50, 0]&quot;&gt;&#10;      &lt;fa-view&gt;&#10;        &lt;!-- each Scroll View conditionally receives events from mainPipe or emptyPipe, default is emptyPipe --&gt;&#10;        &lt;fa-scroll-view fa-pipe-from=&quot;view.pipe&quot; fa-options=&quot;options.scrollViewTwo&quot;&gt;&#10;          &lt;fa-view ng-repeat=&quot;items in list&quot;&gt;&#10;            &lt;fa-modifier fa-size=&quot;[100, 100]&quot;&gt;&#10;                &lt;fa-surface fa-background-color=&quot;view.bgColor&quot;&gt;&#10;                  Index: {{$index}}&#10;                &lt;/fa-surface&gt;&#10;              &lt;/fa-modifier&gt;&#10;          &lt;/fa-view&gt;&#10;         &lt;/fa-scroll-view&gt;   &#10;      &lt;/fa-view&gt;&#10;    &lt;/fa-modifier&gt;&#10;  &lt;/fa-view&gt;&#10;&lt;/fa-app&gt;{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="script.js"
      
        language="js"
      
        type="js"
      
    >
      <pre><code>{% raw %}angular.module(&#39;faPipeExampleApp&#39;, [&#39;famous.angular&#39;])&#10;  .controller(&#39;PipeCtrl&#39;, [&#39;$scope&#39;, &#39;$famous&#39;, function($scope, $famous) {&#10;&#10;    // Event Handlers&#10;    var EventHandler = $famous[&#39;famous/core/EventHandler&#39;];&#10;    &#10;    $scope.mainPipe = new EventHandler();&#10;    $scope.emptyPipe = new EventHandler();&#10;    &#10;    // items in ng-repeated list in each of the 3 Scroll Views&#10;    $scope.list = [];&#10;    for (var i = 0; i &lt; 10; i++) {&#10;      $scope.list.push({});&#10;    };&#10;    &#10;    // 3 inputs in the directional pad corresponding to the 3 scroll views&#10;    $scope.inputList = [{model: &quot;checkBox.A&quot;, letter: &quot;A&quot;},{model: &quot;checkBox.B&quot;, letter: &quot;B&quot;}, {model: &quot;checkBox.C&quot;, letter: &quot;C&quot;}];&#10;    &#10;    // pipes that each of the 3 scroll views is binded to through fa-pipe-from&#10;    $scope.pipes = {&#10;      A: $scope.emptyPipe,&#10;      B: $scope.emptyPipe,&#10;      C: $scope.emptyPipe&#10;    };&#10;&#10;    // 3 scrollviews&#10;    $scope.scrollViews = [{pipe: $scope.pipes.A, bgColor: &quot;blue&quot;}, {pipe: $scope.pipes.B, bgColor: &quot;red&quot;}, {pipe: $scope.pipes.C, bgColor: &quot;green&quot;}];&#10;    &#10;    // function that is called whenever a checkbox is checked/unchecked that assigns the fa-pipe-from&#10;    $scope.checkBoxChange = function(index, model, value) {&#10;      if (value == &#39;true&#39;) {&#10;        console.log($scope.pipes[model], + &quot; is now pointing to mainPipe&quot;);&#10;        $scope.scrollViews[index].pipe = $scope.mainPipe;&#10;      &#10;      } else {&#10;        console.log($scope.pipes[model] + &quot; is now pointing to emptyPipe&quot;);&#10;        $scope.scrollViews[index].pipe = $scope.emptyPipe;&#10;      }&#10;    };&#10;}]);{% endraw %}</code></pre>
    </div>
  
    <div ng-non-bindable class="runnable-example-file"
      
        name="style.css"
      
        language="css"
      
        type="css"
      
    >
      <pre><code>{% raw %}fa-app {&#10;  position: fixed;&#10;  top: 0;&#10;  right: 0;&#10;  bottom: 0;&#10;  left: 0;&#10;}{% endraw %}</code></pre>
    </div>
  

    <iframe class="runnable-example-frame" src="{{ relative }}examples/example-example42/index.html" name="example-example42"></iframe>
  </div>
</div>


</p>



