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
#Examples

##ScrollView example

In Famous, events are used to move information between widgets (such as ScrollView) and Views, and to listen to DOM events.
To pass information between two unrelated views, or even between a nested View to its parent, use fa-pipe-to and fa-pipe-from to broadcast and receive events.

In the example below, even though a fa-view, fa-modifier, and fa-surface are all nested within a Scroll View, the events (such as touch or scroll) from its children do not propagate upwards.
Note:  This example will not work.
```html
<fa-scroll-view>
    <fa-view ng-repeat="view in views">
      <fa-modifier fa-size="[320, 320]">
          <fa-surface fa-background-color="'blue'"></fa-surface>
        </fa-modifier>
    </fa-view>
 </fa-scroll-view>
 ```

With piping, all events from the element using fa-piped-from are broadcast downstream to the view piped-to if they share a reference to the same event handler on the controller.

In the example below, events from the fa-surface are piped to fa-scroll-view via fa-pipe-to and fa-pipe-from directives.
'eventHandler' refers to an instantiated EventHandler on the scope.  Fa-pipe-to="eventHandler" pipes the fa-surface's event handler to a source event handler, $scope.eventHandler.
Fa-pipe-from declared on the fa-scroll-view pipes the target event handler, $scope.eventHandler, to this fa-scroll-view's event handler.  

```html
<fa-scroll-view fa-pipe-from="eventHandler">
    <fa-view ng-repeat="view in views">
      <fa-modifier fa-size="[320, 320]">
          <fa-surface fa-background-color="'blue'"
                      fa-pipe-to="eventHandler">
          </fa-surface>
        </fa-modifier>
    </fa-view>
</fa-scroll-view>
```

```javascript
var EventHandler = $famous['famous/core/EventHandler'];
$scope.eventHandler = new EventHandler();
```

##Event Handlers on the Controller

In the example below, there are two views, each with one surface.  In the html, the second view has a fa-pipe-from directive with a reference to "eventHandlerB" on the controller.  

Two event handlers are instantiated on the controller.  EventHandlerA explicitly pipes to eventHandlerB using:  "eventHandlerA.pipe(eventHandlerB)".
If this is not done, eventHandlerB will not receive any events from eventHandlerA.

Via fa-click, if the fa-surface on the first view is clicked, it calls surfaceClick(), which causes eventHandlerA to emit 'myEvent'.
Because evenHandlerA pipes to eventHandlerB, eventHandlerB receives 'myEvent'.  

An event handler for 'myEvent' is declared for eventHandlerB, and when eventHandlerB receives a 'myEvent' event, its handler causes it to translate the fa-surface on the second view.

```html
<fa-view>
  <fa-modifier fa-size="[100, 100]">
      <fa-surface fa-background-color="'blue'" fa-click="surfaceClick()"></fa-surface>
    </fa-modifier>
</fa-view>
<fa-view fa-pipe-from="eventHandlerB">
  <fa-modifier fa-size="[100, 100]" fa-translate="redTrans.get()">
      <fa-surface fa-background-color="'red'"></fa-surface>
  </fa-modifier>
</fa-view>
```

```javascript
var eventHandlerA = new EventHandler();
var eventHandlerB = new EventHandler();
eventHandlerA.pipe(eventHandlerB);

$scope.surfaceClick = function() {
  eventHandlerA.emit('myEvent');
};

eventHandlerB.on('myEvent', function() {
  $scope.redTrans.set([0, 200, 0], {duration: 2000, curve: 'easeInOut'})
});
```

##Changing Pipes based on user interaction

Another feature of fa-pipe-to and fa-pipe-from is the ability to switch pipes.

Using fa-pipe-to & fa-pipe-from involves binding it to a reference of source/target event handler on the controller.
If the event handler that fa-pipe-to/fa-pipe-to is bound to changes, the directives unpipes from that event handler, and can pipe to another event handler.

Below is an example with piping that involves switching pipes based on user interaction.

Touch events from a single directional pad conditionally affect three different Scroll Views on a page.
Based on which checkboxes are checked, the directional pad scroll events will affect either Scroll View #1, Scroll View #2, or Scroll View #3.
The pipes are databound using fa-pipe-to and fa-pipe-from, and they are swapped out using the controller.


This directive pipes a target event handler to an element's event handler.
There are two main fa-views: the directional pad which contains a Scroll View, and the other fa-view that contains 3 Scroll Views.
The Scroll View of the directional pad uses fa-pipe-from to pipe events from mainPipe to the Scroll View's event handler.
The surface within the directional pad uses fa-pipe-to to pipe fa-surface events to mainPipe.

In the second view containing 3 Scroll Views, each Scroll View pipes from $scope.emptyPipe by default, another instantiated EventHandler that has no events piped to it.  

```html
<fa-view>
  <fa-scroll-view fa-pipe-from="mainPipe">
    <fa-modifier fa-translate="[0, 0, 15]" fa-size="[320, 50]">
      <fa-view>
        <fa-modifier>
          <fa-surface fa-background-color="'orange'" fa-pipe-to="mainPipe">
            <div>Directional pad</div>
              <span ng-repeat="input in inputList">
                <label>{{input.letter}}</label>
                <input type="checkbox"
                       ng-model="input.model" 
                       name="scrollPipeTo" 
                       ng-change="checkBoxChange(input.letter, input.model)"
                       ng-true-value="true"
                       ng-false-value="false">
              </span>
          </fa-surface>
        </fa-modifier>
      </fa-view>
    </fa-modifier>
  </fa-scroll-view>
</fa-view>
<fa-view>
  <fa-modifier ng-repeat="sView in scrollViews"
               fa-translate="[100 * $index, 50, 0]">
    <fa-view>
      <fa-scroll-view fa-pipe-from="{{sView.pipe}}" fa-options="options.scrollViewTwo">
        <fa-view ng-repeat="items in list">
          <fa-modifier fa-size="[100, 100]">
              <fa-surface fa-background-color="sView.bgColor">
                Index: {{$index}}
              </fa-surface>
            </fa-modifier>
        </fa-view>
       </fa-scroll-view>   
    </fa-view>
  </fa-modifier>
</fa-view>
```html

The directional pad has a list of input checkboxes created by an ng-repeated list from $scope.inputList.
If a checkbox is checked, it calls checkBoxChange(), passing the letter (such as 'A') and and the model (such as 'checkBox.A') of the respective checkbox.
If the checkbox is checked, the model (checkBox.A) is assigned the value of "true", and if it is unchecked, it is asigned the value of "false".

In the controller, $scope.checkBoxChange() changes the value of the pipe of the respective Scroll View that corresponds to the checkBox model: if the checkbox is checked, it assigns the respective Scroll View to pipe from $scope.mainPipe, and if unchecked, it will continue to pipe from $scope.emptyPipe.

```javascript
// Event Handlers
var EventHandler = $famous['famous/core/EventHandler'];
$scope.mainPipe = new EventHandler();
$scope.emptyPipe = new EventHandler();

// items in ng-repeated list in each of the 3 Scroll Views
$scope.list = [];
for (var i = 0; i < 10; i++) {
  $scope.list.push({});
};

// 3 inputs in the directional pad corresponding to the 3 scroll views
$scope.inputList = [{model: "checkBox.A", letter: "A"},{model: "checkBox.B", letter: "B"}, {model: "checkBox.C", letter: "C"}];

// 3 scrollviews
$scope.scrollViews = [{pipe: "pipes.A", bgColor: "blue"}, {pipe: "pipes.B", bgColor: "red"}, {pipe: "pipes.C", bgColor: "green"}];

// pipes that each of the 3 scroll views is binded to through fa-pipe-from
$scope.pipes = {
  A: $scope.emptyPipe,
  B: $scope.emptyPipe,
  C: $scope.emptyPipe
};

// function that is called whenever a checkbox is checked/unchecked that assigns the fa-pipe-from
$scope.checkBoxChange = function(model, value) {
  if (value !== "false") {
    $scope.pipes[model] = $scope.mainPipe;
  } else {
    $scope.pipes[model] = $scope.emptyPipe;
  };
};
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

  

  





