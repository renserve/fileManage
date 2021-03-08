import{Y as e,a as n,P as o,F as c,I as l,E as a,n as i,g as t,af as s,aA as r,cb as u,am as d}from"./index.76adf8cd.js";var v=e("success","processing","error","default","warning"),p=e("pink","red","yellow","orange","cyan","green","blue","purple","geekblue","magenta","volcano","gold","lime");function f(e,n,o){return n in e?Object.defineProperty(e,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[n]=o,e}var g=n({name:"ACheckableTag",props:{prefixCls:o.string,checked:o.looseBool,onChange:{type:Function},onClick:{type:Function}},emits:["update:checked","change","click"],setup:function(e,n){var o=n.slots,t=n.emit,s=c("configProvider",l).getPrefixCls,r=function(n){var o=e.checked;t("update:checked",!o),t("change",!o),t("click",n)};return function(){var n,c,l=e.checked,t=e.prefixCls,u=s("tag",t),d=a(u,(f(n={},"".concat(u,"-checkable"),!0),f(n,"".concat(u,"-checkable-checked"),l),n));return i("span",{class:d,onClick:r},[null===(c=o.default)||void 0===c?void 0:c.call(o)])}}});function b(e,n,o){return n in e?Object.defineProperty(e,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[n]=o,e}var k=new RegExp("^(".concat(p.join("|"),")(-inverse)?$")),C=new RegExp("^(".concat(v.join("|"),")$")),h={prefixCls:o.string,color:{type:String},closable:o.looseBool.def(!1),closeIcon:o.VNodeChild,visible:o.looseBool,onClose:{type:Function},icon:o.VNodeChild},m=n({name:"ATag",emits:["update:visible","close"],setup:function(e,n){var o=n.slots,v=n.emit,p=n.attrs,f=c("configProvider",l).getPrefixCls,g=t(!0);s((function(){void 0!==e.visible&&(g.value=e.visible)}));var h=function(n){n.stopPropagation(),v("update:visible",!1),v("close",n),n.defaultPrevented||void 0===e.visible&&(g.value=!1)},m=function(){var n=e.color;return!!n&&(k.test(n)||C.test(n))};return function(){var n,c,l,t,s=e.prefixCls,v=e.icon,k=void 0===v?null===(c=o.icon)||void 0===c?void 0:c.call(o):v,C=e.color,x=e.closeIcon,P=void 0===x?null===(l=o.closeIcon)||void 0===l?void 0:l.call(o):x,y=e.closable,w=void 0!==y&&y,j=m(),F=f("tag",s),I={backgroundColor:C&&!m()?C:void 0},T=a(F,(b(n={},"".concat(F,"-").concat(C),j),b(n,"".concat(F,"-has-color"),C&&!j),b(n,"".concat(F,"-hidden"),!g.value),n)),A=k||null,B=null===(t=o.default)||void 0===t?void 0:t.call(o),E=A?i(r,null,[A,i("span",null,[B])]):B,N="onClick"in p,O=i("span",{class:T,style:I},[E,w?P?i("div",{class:"".concat(F,"-close-icon"),onClick:h},[P]):i(d,{class:"".concat(F,"-close-icon"),onClick:h},null):null]);return N?i(u,null,{default:function(){return[O]}}):O}}});m.props=h,m.CheckableTag=g,m.install=function(e){return e.component(m.name,m),e.component(g.name,g),e};export{p as P,m as T};