var t=function(t,n){return t<n?-1:t>n?1:0},n=function(t){return t.reduce(function(t,n){return t+n},0)},o=/*#__PURE__*/function(){function t(t){this.colors=t}var n=t.prototype;return n.palette=function(){return this.colors},n.map=function(t){return t},t}(),r=function(){function r(t,n,o){return(t<<10)+(n<<5)+o}function e(t){var n=[],o=!1;function r(){n.sort(t),o=!0}return{push:function(t){n.push(t),o=!1},peek:function(t){return o||r(),void 0===t&&(t=n.length-1),n[t]},pop:function(){return o||r(),n.pop()},size:function(){return n.length},map:function(t){return n.map(t)},debug:function(){return o||r(),n}}}function i(t,n,o,r,e,i,u){var a=this;a.r1=t,a.r2=n,a.g1=o,a.g2=r,a.b1=e,a.b2=i,a.histo=u}function u(){this.vboxes=new e(function(n,o){return t(n.vbox.count()*n.vbox.volume(),o.vbox.count()*o.vbox.volume())})}function a(t,n){if(n.count()){var o=n.r2-n.r1+1,e=n.g2-n.g1+1,i=Math.max.apply(null,[o,e,n.b2-n.b1+1]);if(1==n.count())return[n.copy()];var u,a,c,s,f=0,h=[],l=[];if(i==o)for(u=n.r1;u<=n.r2;u++){for(s=0,a=n.g1;a<=n.g2;a++)for(c=n.b1;c<=n.b2;c++)s+=t[r(u,a,c)]||0;h[u]=f+=s}else if(i==e)for(u=n.g1;u<=n.g2;u++){for(s=0,a=n.r1;a<=n.r2;a++)for(c=n.b1;c<=n.b2;c++)s+=t[r(a,u,c)]||0;h[u]=f+=s}else for(u=n.b1;u<=n.b2;u++){for(s=0,a=n.r1;a<=n.r2;a++)for(c=n.g1;c<=n.g2;c++)s+=t[r(a,c,u)]||0;h[u]=f+=s}return h.forEach(function(t,n){l[n]=f-t}),function(t){var o,r,e,i,a,c=t+"1",s=t+"2",g=0;for(u=n[c];u<=n[s];u++)if(h[u]>f/2){for(e=n.copy(),i=n.copy(),a=(o=u-n[c])<=(r=n[s]-u)?Math.min(n[s]-1,~~(u+r/2)):Math.max(n[c],~~(u-1-o/2));!h[a];)a++;for(g=l[a];!g&&h[a-1];)g=l[--a];return e[s]=a,i[c]=e[s]+1,[e,i]}}(i==o?"r":i==e?"g":"b")}}return i.prototype={volume:function(t){var n=this;return n._volume&&!t||(n._volume=(n.r2-n.r1+1)*(n.g2-n.g1+1)*(n.b2-n.b1+1)),n._volume},count:function(t){var n=this,o=n.histo;if(!n._count_set||t){var e,i,u,a=0;for(e=n.r1;e<=n.r2;e++)for(i=n.g1;i<=n.g2;i++)for(u=n.b1;u<=n.b2;u++)a+=o[r(e,i,u)]||0;n._count=a,n._count_set=!0}return n._count},copy:function(){var t=this;return new i(t.r1,t.r2,t.g1,t.g2,t.b1,t.b2,t.histo)},avg:function(t){var n=this,o=n.histo;if(!n._avg||t){var e,i,u,a,c=0,s=0,f=0,h=0;if(n.r1===n.r2&&n.g1===n.g2&&n.b1===n.b2)n._avg=[n.r1<<3,n.g1<<3,n.b1<<3];else{for(i=n.r1;i<=n.r2;i++)for(u=n.g1;u<=n.g2;u++)for(a=n.b1;a<=n.b2;a++)c+=e=o[r(i,u,a)]||0,s+=e*(i+.5)*8,f+=e*(u+.5)*8,h+=e*(a+.5)*8;n._avg=c?[~~(s/c),~~(f/c),~~(h/c)]:[~~(8*(n.r1+n.r2+1)/2),~~(8*(n.g1+n.g2+1)/2),~~(8*(n.b1+n.b2+1)/2)]}}return n._avg},contains:function(t){var n=this,o=t[0]>>3;return gval=t[1]>>3,bval=t[2]>>3,o>=n.r1&&o<=n.r2&&gval>=n.g1&&gval<=n.g2&&bval>=n.b1&&bval<=n.b2}},u.prototype={push:function(t){this.vboxes.push({vbox:t,color:t.avg()})},palette:function(){return this.vboxes.map(function(t){return t.color})},size:function(){return this.vboxes.size()},map:function(t){for(var n=this.vboxes,o=0;o<n.size();o++)if(n.peek(o).vbox.contains(t))return n.peek(o).color;return this.nearest(t)},nearest:function(t){for(var n,o,r,e=this.vboxes,i=0;i<e.size();i++)((o=Math.sqrt(Math.pow(t[0]-e.peek(i).color[0],2)+Math.pow(t[1]-e.peek(i).color[1],2)+Math.pow(t[2]-e.peek(i).color[2],2)))<n||void 0===n)&&(n=o,r=e.peek(i).color);return r},forcebw:function(){var o=this.vboxes;o.sort(function(o,r){return t(n(o.color),n(r.color))});var r=o[0].color;r[0]<5&&r[1]<5&&r[2]<5&&(o[0].color=[0,0,0]);var e=o.length-1,i=o[e].color;i[0]>251&&i[1]>251&&i[2]>251&&(o[e].color=[255,255,255])}},{quantize:function(n,c){if(!Number.isInteger(c)||c<1||c>256)throw new Error("Invalid maximum color count. It must be an integer between 1 and 256.");if(!n.length||c<2||c>256)return!1;if(!n.length||c<2||c>256)return!1;for(var s=[],f=new Set,h=0;h<n.length;h++){var l=n[h],g=l.join(",");f.has(g)||(f.add(g),s.push(l))}if(s.length<=c)return new o(s);var v=function(t){var n,o=new Array(32768);return t.forEach(function(t){n=r(t[0]>>3,t[1]>>3,t[2]>>3),o[n]=(o[n]||0)+1}),o}(n);v.forEach(function(){});var p=function(t,n){var o,r,e,u=1e6,a=0,c=1e6,s=0,f=1e6,h=0;return t.forEach(function(t){(o=t[0]>>3)<u?u=o:o>a&&(a=o),(r=t[1]>>3)<c?c=r:r>s&&(s=r),(e=t[2]>>3)<f?f=e:e>h&&(h=e)}),new i(u,a,c,s,f,h,n)}(n,v),b=new e(function(n,o){return t(n.count(),o.count())});function m(t,n){for(var o,r=t.size(),e=0;e<1e3;){if(r>=n)return;if(e++>1e3)return;if((o=t.pop()).count()){var i=a(v,o),u=i[0],c=i[1];if(!u)return;t.push(u),c&&(t.push(c),r++)}else t.push(o),e++}}b.push(p),m(b,.75*c);for(var d=new e(function(n,o){return t(n.count()*n.volume(),o.count()*o.volume())});b.size();)d.push(b.pop());m(d,c);for(var w=new u;d.size();)w.push(d.pop());return w}}}().quantize;const e=function(t){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.width=this.canvas.width=t.naturalWidth,this.height=this.canvas.height=t.naturalHeight,this.context.drawImage(t,0,0,this.width,this.height)};e.prototype.getImageData=function(){return this.context.getImageData(0,0,this.width,this.height)};var u=function(){};u.prototype.getColor=function(t,n=10){return this.getPalette(t,5,n)[0]},u.prototype.getPalette=function(t,n,o){const i=function(t){let{colorCount:n,quality:o}=t;if(void 0!==n&&Number.isInteger(n)){if(1===n)throw new Error("colorCount should be between 2 and 20. To get one color, call getColor() instead of getPalette()");n=Math.max(n,2),n=Math.min(n,20)}else n=10;return(void 0===o||!Number.isInteger(o)||o<1)&&(o=10),{colorCount:n,quality:o}}({colorCount:n,quality:o}),u=new e(t),a=function(t,n,o){const r=t,e=[];for(let t,i,u,a,c,s=0;s<n;s+=o)t=4*s,i=r[t+0],u=r[t+1],a=r[t+2],c=r[t+3],(void 0===c||c>=125)&&(i>250&&u>250&&a>250||e.push([i,u,a]));return e}(u.getImageData().data,u.width*u.height,i.quality),c=r(a,i.colorCount);return c?c.palette():null},u.prototype.getColorFromUrl=function(t,n,o){const r=document.createElement("img");r.addEventListener("load",()=>{const e=this.getPalette(r,5,o);n(e[0],t)}),r.src=t},u.prototype.getImageData=function(t,n){let o=new XMLHttpRequest;o.open("GET",t,!0),o.responseType="arraybuffer",o.onload=function(){if(200==this.status){let t=new Uint8Array(this.response);i=t.length;let o=new Array(i);for(let n=0;n<t.length;n++)o[n]=String.fromCharCode(t[n]);let r=o.join(""),e=window.btoa(r);n("data:image/png;base64,"+e)}},o.send()},u.prototype.getColorAsync=function(t,n,o){const r=this;this.getImageData(t,function(t){const e=document.createElement("img");e.addEventListener("load",function(){const t=r.getPalette(e,5,o);n(t[0],this)}),e.src=t})};export{u as default};
