---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faPipeFrom/"
title: "fa-pipe-from"
header_sub_title: "Directive in module famous.angular"
doc: "faPipeFrom"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-pipe-from.js#L1'>
    Improve this doc
  </a>
</div>




<h1 class="api-title">

  fa-pipe-from



</h1>





This directive pipes a target event handler to an element's event handler.








  
<h2 id="usage">Usage</h2>
  
```html
<ANY fa-pipe-from="EventHandler">
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
        <p>Event handler target object</p>

        
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
<pre><code class="lang-html">&lt;!-- fa-scroll-view receives all events from $scope.myEventHandler, and decides how to handle them --&gt;
&lt;fa-scroll-view fa-pipe-from=&quot;myEventHandler&quot;&gt;
    &lt;fa-view ng-repeat=&quot;view in views&quot;&gt;
      &lt;fa-modifier fa-size=&quot;[320, 320]&quot;&gt;
      &lt;!-- All events on fa-surfaces (click, mousewheel) are piped to $scope.myEventHandler --&gt;
         &lt;fa-surface fa-background-color=&quot;&#39;blue&#39;&quot;
                      fa-pipe-to=&quot;myEventHandler&quot;&gt;
         &lt;/fa-surface&gt;
        &lt;/fa-modifier&gt;
    &lt;/fa-view&gt;
&lt;/fa-scroll-view&gt;</code></pre>
<pre><code class="lang-javascript">var EventHandler = $famous[&#39;famous/core/EventHandler&#39;];
$scope.myEventHandler = new EventHandler();</code></pre>
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
<pre><code class="lang-html">&lt;!-- directional pad view --&gt;
&lt;fa-view&gt;
  &lt;!-- scroll view used as a directional pad input, receives events from mainPipe--&gt;
  &lt;fa-scroll-view fa-pipe-from=&quot;mainPipe&quot;&gt;
    &lt;fa-modifier fa-translate=&quot;[0, 0, 15]&quot; fa-size=&quot;[320, 50]&quot;&gt;
      &lt;fa-view&gt;
        &lt;fa-modifier&gt;
          &lt;!-- mousewheel events will be piped to mainPipe --&gt;
          &lt;fa-surface fa-background-color=&quot;&#39;orange&#39;&quot; fa-pipe-to=&quot;mainPipe&quot;&gt;
            &lt;div&gt;Directional pad&lt;/div&gt;
              &lt;span ng-repeat=&quot;input in inputList&quot;&gt;
                &lt;label&gt;{{input.letter}}&lt;/label&gt;
                &lt;!-- checkboxes --&gt;
                &lt;input type=&quot;checkbox&quot;
                       ng-model=&quot;input.model&quot; 
                       name=&quot;scrollPipeTo&quot; 
                       ng-change=&quot;checkBoxChange(input.letter, input.model)&quot;
                       ng-true-value=&quot;true&quot;
                       ng-false-value=&quot;false&quot;&gt;
              &lt;/span&gt;
          &lt;/fa-surface&gt;
        &lt;/fa-modifier&gt;
      &lt;/fa-view&gt;
    &lt;/fa-modifier&gt;
  &lt;/fa-scroll-view&gt;
&lt;/fa-view&gt;

&lt;!-- view with 3 Scroll Views --&gt;
&lt;fa-view&gt;
  &lt;!-- ng-repeat creating 3 different scroll Views --&gt;
  &lt;fa-modifier ng-repeat=&quot;view in scrollViews&quot;
               fa-translate=&quot;[100 * $index, 50, 0]&quot;&gt;
    &lt;fa-view&gt;
      &lt;!-- each Scroll View conditionally receives events from mainPipe or emptyPipe, default is emptyPipe --&gt;
      &lt;fa-scroll-view fa-pipe-from=&quot;{{view.pipe}}&quot; fa-options=&quot;options.scrollViewTwo&quot;&gt;
        &lt;fa-view ng-repeat=&quot;items in list&quot;&gt;
          &lt;fa-modifier fa-size=&quot;[100, 100]&quot;&gt;
              &lt;fa-surface fa-background-color=&quot;view.bgColor&quot;&gt;
                Index: {{$index}}
              &lt;/fa-surface&gt;
            &lt;/fa-modifier&gt;
        &lt;/fa-view&gt;
       &lt;/fa-scroll-view&gt;   
    &lt;/fa-view&gt;
  &lt;/fa-modifier&gt;
&lt;/fa-view&gt;</code></pre>
<p>The directional pad has a list of input checkboxes created by an ng-repeated list from <code>$scope.inputList</code>.
If a checkbox is checked, it calls <code>checkBoxChange()</code>, passing the letter (such as <code>&#39;A&#39;</code>) and and the model (such as <code>&#39;checkBox.A&#39;</code>) of the respective checkbox.
If the checkbox is checked, the model (<code>checkBox.A</code>) is assigned the value of &quot;true&quot;, and if it is unchecked, it is asigned the value of &quot;false&quot;.</p>
<p>In the controller, <code>$scope.checkBoxChange()</code> changes the value of the pipe of the respective Scroll View (A, B, or C) that corresponds to the checkBox.
If the checkbox is checked, it assigns the respective Scroll View (A, B, or C) to pipe from <code>$scope.mainPipe</code>, and if unchecked, it will continue to pipe from <code>$scope.emptyPipe</code>.
In short, the checkboxes act as switches to change piping events.</p>
<pre><code class="lang-javascript">// Event Handlers
var EventHandler = $famous[&#39;famous/core/EventHandler&#39;];
$scope.mainPipe = new EventHandler();
$scope.emptyPipe = new EventHandler();

// items in ng-repeated list in each of the 3 Scroll Views
$scope.list = [];
for (var i = 0; i &lt; 10; i++) {
  $scope.list.push({});
};

// 3 inputs in the directional pad corresponding to the 3 scroll views
$scope.inputList = [{model: &quot;checkBox.A&quot;, letter: &quot;A&quot;},{model: &quot;checkBox.B&quot;, letter: &quot;B&quot;}, {model: &quot;checkBox.C&quot;, letter: &quot;C&quot;}];

// 3 scrollviews
$scope.scrollViews = [{pipe: &quot;pipes.A&quot;, bgColor: &quot;blue&quot;}, {pipe: &quot;pipes.B&quot;, bgColor: &quot;red&quot;}, {pipe: &quot;pipes.C&quot;, bgColor: &quot;green&quot;}];

// pipes that each of the 3 scroll views is binded to through fa-pipe-from
$scope.pipes = {
  A: $scope.emptyPipe,
  B: $scope.emptyPipe,
  C: $scope.emptyPipe
};

// function that is called whenever a checkbox is checked/unchecked that assigns the fa-pipe-from
$scope.checkBoxChange = function(model, value) {
  if (value !== &quot;false&quot;) {
    $scope.pipes[model] = $scope.mainPipe;
  } else {
    $scope.pipes[model] = $scope.emptyPipe;
  };
};</code></pre>



