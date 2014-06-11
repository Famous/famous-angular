---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faView/"
title: "fa-view"
header_sub_title: "Directive in module famous.angular"
doc: "faView"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-view.js#L1'>
    Improve this doc
  </a>
</div>




<h1 class="api-title">

  fa-view



</h1>





This directive is used to wrap child elements into a View render node.  This is especially useful for grouping.
Use an `<fa-view>` surrounded by a `<fa-modifier>` in order to affect the View's position, scale, etc.








  
<h2 id="usage">Usage</h2>
  
```html
<fa-view>
  <!-- content -->
</fa-view>
```
A Famous View is a Render Node that has its own input EventHandler and output EventHandler.
It may consist of many Modifier & Surfaces a complex set of event handlers.
A View's input eventHandler is the aggregation point of all events coming into the View, and then the View can handle all of those events in ways specified.

For example, a Scroll View is a Famous View that has been extended with certain sets of behavior.
When a surface within a Scroll View receives an event (such as mouse scroll), and these events are piped to the Scroll View, these events go through the Scroll View's input EventHandler and are handled by the Scroll View.

```html
<fa-scroll-view fa-pipe-from="eventHandler">
  <fa-view>
    <fa-modifier fa-size="[320, 320]">
        <fa-surface fa-pipe-to="eventHandler"></fa-surface>
      </fa-modifier>
  </fa-view>
 </fa-scroll-view> 
```

This brings up another important note: in the Famous event model, an fa-view nested within another fa-view does not automatically propagate its events to its parent.
For a longer discussion on Famous-Angular events, go to fa-pipe-from/fa-pipe-to in the docs.
  
  

  





