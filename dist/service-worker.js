if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return i[e]||(r=new Promise((async r=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=r}else importScripts(e),r()}))),r.then((()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]}))},r=(r,i)=>{Promise.all(r.map(e)).then((e=>i(1===e.length?e[0]:e)))},i={require:Promise.resolve(r)};self.define=(r,s,n)=>{i[r]||(i[r]=Promise.resolve().then((()=>{let i={};const c={uri:location.origin+r.slice(1)};return Promise.all(s.map((r=>{switch(r){case"exports":return i;case"module":return c;default:return e(r)}}))).then((e=>{const r=n(...e);return i.default||(i.default=r),i}))})))}}define("./service-worker.js",["./workbox-3b5792f5"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:".gitkeep",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"bundle.78d6b42b21977e5e1b49.js",revision:null},{url:"cross.png",revision:"0cac32b3f85942afece934e9985e4d89"},{url:"icons/maskable_icon.png",revision:"cc04838c54034203f550e759cc61a110"},{url:"icons/maskable_icon_x512.png",revision:"b24343188ea68a20292d267821e5f7b4"},{url:"icons/maskable_icon_x512sq.png",revision:"2c39c7a95611ebd19b94131783ad55a3"},{url:"index.html",revision:"6c28509ce8bf6bb48a7a2e49092fc7d9"},{url:"main.css",revision:"6d09e5ec7bcfa87970b5a91116f03ee9"},{url:"manifest.json",revision:"66bf86c266fd083d0b7b5cfeff51badf"}],{})}));
//# sourceMappingURL=service-worker.js.map
