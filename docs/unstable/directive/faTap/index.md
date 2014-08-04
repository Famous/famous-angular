---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faTap/"
title: "fa-tap"
header_sub_title: "Directive in module famous.angular"
doc: "faTap"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-tap.js#L1'>
    Improve this doc
  </a>
</div>





<h1 class="api-title">

  fa-tap



</h1>





This directive allows you to specify custom behavior when an element is tapped.






  
<h2 id="usage">Usage</h2>
  
```html
<ANY fa-tap="expression">

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
        faTap
        
        
      </td>
      <td>
        
  <code>expression</code>
      </td>
      <td>
        <p>Expression to evaluate upon tap. (Event object is available as <code>$event</code>)</p>

        
      </td>
    </tr>
    
  </tbody>
</table>

  

  



<h2 id="example">Example</h2><p>Note: For testing purposes during development, enable mobile emulation: <a href="https://developer.chrome.com/devtools/docs/mobile-emulation">https://developer.chrome.com/devtools/docs/mobile-emulation</a></p>
<p><code>Fa-tap</code> checks if a touchmove event fires between a touchstart and touchend event.  If the touchmove event fired, (the user &quot;dragged&quot; their finger), a <code>fa-tap</code> event will not fire.  If the user did not &quot;drag&quot; their finger on touch, when releasing their finger, a touchend event will fire, and fa-tap will fire.</p>
<pre><code class="lang-html">&lt;fa-modifier fa-size=&quot;[100, 100]&quot;&gt;
&lt;fa-surface fa-tap=&quot;tapHandler($event)&quot; fa-background-color=&quot;&#39;red&#39;&quot;&gt;&lt;/fa-surface&gt;
&lt;/fa-modifier&gt;</code></pre>
<pre><code class="lang-javascript">$scope.tapHandler = function($event) {
  console.log($event);
  console.log(&quot;tap&quot;);
};</code></pre>



