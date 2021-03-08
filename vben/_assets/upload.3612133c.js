import{n as e,m as t,aL as n,a as r,h as o,g as i,c as s,af as a,Q as c,bb as l,i as u,cU as m,cV as d,cW as g}from"./index.89b15553.js";import{C as p,R as f}from"./index.8bcfaa1f.js";var v={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"}}]},name:"left",theme:"outlined"};function w(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var h=function(r,o){var i=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?Object(arguments[t]):{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){w(e,t,n[t])}))}return e}({},r,o.attrs);return e(n,t(i,{icon:v}),null)};h.displayName="LeftOutlined",h.inheritAttrs=!1;const b={show:{type:Boolean,default:!1},imageList:{type:[Array],default:null},index:{type:Number,default:0}};var _,L;(L=_||(_={}))[L.LOADING=0]="LOADING",L[L.DONE=1]="DONE",L[L.FAIL=2]="FAIL";const O="img-preview";var y=r({name:"ImagePreview",props:b,setup(e){const t=o({currentUrl:"",imgScale:1,imgRotate:0,imgTop:0,imgLeft:0,status:0,currentIndex:0,moveX:0,moveY:0,show:e.show}),n=i(null),r=i(null);function m(){!function(){const e=u(n);if(!e)return;e.onmousewheel=g,document.body.addEventListener("DOMMouseScroll",g),document.body.onkeyup=y,document.ondragstart=function(){return!1}}();const{index:r,imageList:o}=e;if(!o||!o.length)throw new Error("imageList is undefined");t.currentIndex=r,_(o[r])}function d(){t.imgScale=1,t.imgRotate=0,t.imgTop=0,t.imgLeft=0}function g(e){(e=e||window.event).delta=e.wheelDelta||-e.detail,e.preventDefault(),e.delta>0&&v(.015),e.delta<0&&v(-.015)}function v(e){t.imgScale<=.2&&e<0||(t.imgScale+=e)}function w(e){t.imgRotate+=e}function b(){const e=u(r);e&&(e.onmousemove=null)}function _(e){t.status=0;const n=new Image;n.src=e,n.onload=()=>{t.currentUrl=e,t.status=1},n.onerror=()=>{t.status=2}}function L(e){e&&e.stopPropagation(),t.show=!1,document.body.removeEventListener("DOMMouseScroll",g),document.ondragstart=null}function y(e){let n;n=(e=e||event).keyCode||e.which||e.charCode,27==n&&(t.show=!1)}function x(){d()}function I(e){e=e||window.event,t.moveX=e.clientX,t.moveY=e.clientY;const n=u(r);n&&(n.onmousemove=G)}function G(e){(e=e||window.event).preventDefault();const n=e.clientX-t.moveX,r=e.clientY-t.moveY;t.imgLeft+=n,t.imgTop+=r,t.moveX=e.clientX,t.moveY=e.clientY}const F=s((()=>{const{imgScale:e,imgRotate:n,imgTop:r,imgLeft:o}=t;return{transform:`scale(${e}) rotate(${n}deg)`,marginTop:`${r}px`,marginLeft:`${o}px`}})),T=s((()=>{const{imageList:t}=e;return t.length>1}));a((()=>{e.show&&m(),e.imageList&&d()}));const E=n=>u(T)?c("div",{class:["img-preview__arrow",n],onClick:()=>function(n){const{currentIndex:r}=t,{imageList:o}=e;"left"===n&&(t.currentIndex--,r<=0&&(t.currentIndex=o.length-1)),"right"===n&&(t.currentIndex++,r>=o.length-1&&(t.currentIndex=0)),_(o[t.currentIndex])}(n)},c("left"===n?h:f,null)):null;return()=>t.show&&c("div",{class:O,ref:n,onMouseup:b},c("div",{class:"img-preview-content"},c("img",{width:"32",src:l,class:["img-preview-image",0===t.status?"":"hidden"]}),c("img",{style:u(F),class:["img-preview-image",1===t.status?"":"hidden"],ref:r,src:t.currentUrl,onMousedown:I}),c("div",{class:"img-preview__close",onClick:L},c(p,{class:"img-preview__close-icon"})),(()=>{if(!u(T))return null;const{currentIndex:n}=t,{imageList:r}=e;return c("div",{class:"img-preview__index"},n+1," / ",r.length)})(),c("div",{class:"img-preview__controller"},c("div",{class:"img-preview__controller-item",onClick:()=>v(-.15)},c("img",{src:"/vben/_assets/unscale.50a147e7.svg"})),c("div",{class:"img-preview__controller-item",onClick:()=>v(.15)},c("img",{src:"/vben/_assets/scale.5b254733.svg"})),c("div",{class:"img-preview__controller-item",onClick:x},c("img",{src:"/vben/_assets/resume.7a838909.svg"})),c("div",{class:"img-preview__controller-item",onClick:()=>w(-90)},c("img",{src:"/vben/_assets/unrotate.a3dc2050.svg"})),c("div",{class:"img-preview__controller-item",onClick:()=>w(90)},c("img",{src:"/vben/_assets/p-rotate.54a3ac67.svg"}))),E("left"),E("right")))}});let x=null;function I(t){if(!m)return;const{imageList:n,show:r=!0,index:o=0}=t,i={},s=document.createElement("div");i.imageList=n,i.show=r,i.index=o,x=e(y,i),d(x,s),document.body.appendChild(s)}var G,F;function T(e,t){return g.request({url:G.FileGroupOperate,method:"GET",params:{type:e,...t}},{isTransformRequestResult:!1})}function E(e,t){return g.request({url:G.FileGroupOperate,method:"POST",params:{type:e,...t}})}function P(e,t){return g.request({url:G.RecoverFileGroupOperate,method:"PUT",params:{type:e,...t}})}function q(e,t){return g.request({url:G.FileGroupOperate,method:"DELETE",params:{type:e,...t}})}function C(e){return g.request({url:G.FileGroupOperate,method:"PUT",params:e})}function D(e){return g.request({url:G.FileGroup,method:"GET",params:e},{isTransformRequestResult:!1})}function R(e){return g.request({url:G.FileGroup,method:"POST",params:e})}function S(e){return g.request({url:G.FileGroup+"/"+e.id,method:"PUT",params:e})}function k(e,t){return g.request({url:G.FileGroup+"/"+e,method:"delete"})}function j(e,t){return g.uploadFile({url:G.uploadImg,onUploadProgress:t},e)}(F=G||(G={})).uploadImg="/cms/file",F.FileGroup="/cms/file_group",F.FileGroupOperate="/cms/file_group/file",F.RecoverFileGroupOperate="/cms/file_group/recover/file";export{h as L,E as a,D as b,I as c,q as d,S as e,k as f,T as g,C as h,P as r,R as s,j as u};
