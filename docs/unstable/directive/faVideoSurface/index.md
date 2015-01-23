---
layout: "docs_api"
version: "unstable"
versionHref: "/docs/unstable"
path: "api/directive/faVideoSurface/"
title: "fa-video-surface"
header_sub_title: "Directive in module famous.angular"
doc: "faVideoSurface"
docType: "directive"
---

<div class="improve-docs">
  <a href='https://github.com/Famous/famous-angular/edit/master/src/scripts/directives/fa-video-surface.js#L1'>
    Improve this doc
  </a>
</div>





<h1 class="api-title">

  fa-video-surface



</h1>





This directive creates a Famo.us VideoSurface and loads the specified VideoUrl.






  
<h2 id="usage">Usage</h2>
  
```html
<fa-video-surface fa-video-url="vid/my-video.mp4">
</fa-video-surface>
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
        faVideoUrl
        
        
      </td>
      <td>
        
  <code>String</code>
      </td>
      <td>
        <p>String url pointing to the video that should be loaded into the Famo.us VideoSurface</p>

        
      </td>
    </tr>
    
    <tr>
      <td>
        faOptions
        
        
      </td>
      <td>
        
  <code>Object</code>
      </td>
      <td>
        <p>Object that sets options for the Famo.us VideoSurface</p>

        
      </td>
    </tr>
    
  </tbody>
</table>

  

  



<h2 id="example">Example</h2><p>To use <code>fa-video-surface</code>, declare an <code>fa-video-url</code> attribute with a string url.</p>
<pre><code class="lang-html">&lt;fa-video-surface
           fa-video-url=&quot;vid/my-video.mp4&quot;
           class=&quot;video&quot;
           fa-options=&quot;{autoplay:true}&quot;&gt;
&lt;/fa-video-surface&gt;</code></pre>
<p><code>Fa-video-surface</code> accepts options via the fa-options attribute. Currently the only option supported by Famo.us is autoplay, so you will have to target other attributes for the video element like controls and loop on the renderNode after the surface deploy event fires. </p>
<p> var video = $famous.find(&#39;.video&#39;)[0].renderNode;
 video.on(&#39;deploy&#39;, function(){
    var player = video._currTarget;
    player.controls = true;
    player.loop = true;
    player.onprogress = console.log(&#39;video is downloading&#39;);
 });  </p>
<p><code>Fa-video-surface</code> can be modified via fa-modifier just like any Surface.</p>



