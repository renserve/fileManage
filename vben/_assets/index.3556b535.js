import{n,D as e,Z as o,H as t,cw as l,bG as r,aA as a,P as c,a as i,Y as s,F as u,I as d,g as f,O as p,cx as m,bN as b,cy as v,ab as y,a7 as x,G as h}from"./index.89b15553.js";function C(n,e,o){return e in n?Object.defineProperty(n,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[e]=o,n}function w(n){return null!=n}var g=function(e){var o,t=e.itemPrefixCls,l=e.component,r=e.span,a=e.bordered,c=e.label,i=e.content,s=e.colon,u=l;return a?n(u,{class:[(o={},C(o,"".concat(t,"-item-label"),w(c)),C(o,"".concat(t,"-item-content"),w(i)),o)],colSpan:r},{default:function(){return[w(c)?c:i]}}):n(u,{class:["".concat(t,"-item")],colSpan:r},{default:function(){return[c&&n("span",{class:["".concat(t,"-item-label"),C({},"".concat(t,"-item-no-colon"),!s)]},[c]),i&&n("span",{class:"".concat(t,"-item-content")},[i])]}})},P=function(c){var i=function(a,c,i){var s=c.colon,u=c.prefixCls,d=c.bordered,f=i.component,p=i.type,m=i.showLabel,b=i.showContent;return a.map((function(a,c){var i=e(a),v=i.prefixCls,y=void 0===v?u:v,x=i.span,h=void 0===x?1:x,C=o(a,"label"),w=t(a),P=l(a),k=r(a),S=a.key;return"string"==typeof f?n(g,{key:"".concat(p,"-").concat(S||c),class:P,style:k,span:h,colon:s,component:f,itemPrefixCls:y,bordered:d,label:m?C:null,content:b?w:null},null):[n(g,{key:"label-".concat(S||c),class:P,style:k,span:1,colon:s,component:f[0],itemPrefixCls:y,bordered:d,label:C},null),n(g,{key:"content-".concat(S||c),class:P,style:k,span:2*h-1,component:f[1],itemPrefixCls:y,bordered:d,content:w},null)]}))},s=c.prefixCls,u=c.vertical,d=c.row,f=c.index,p=c.bordered;return u?n(a,null,[n("tr",{key:"label-".concat(f),class:"".concat(s,"-row")},[i(d,c,{component:"th",type:"label",showLabel:!0})]),n("tr",{key:"content-".concat(f),class:"".concat(s,"-row")},[i(d,c,{component:"td",type:"content",showContent:!0})])]):n("tr",{key:f,class:"".concat(s,"-row")},[i(d,c,{component:p?["th","td"]:"td",type:"item",showLabel:!0,showContent:!0})])};function k(n,e,o){return e in n?Object.defineProperty(n,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[e]=o,n}function S(n){return(S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}c.string,c.any,c.number;var j=i({name:"ADescriptionsItem",props:{prefixCls:c.string,label:c.VNodeChild,span:c.number.def(1)},render:function(){return null}}),D={xxl:3,xl:3,lg:3,md:3,sm:2,xs:1};function O(n,e,o){var t=n;return(void 0===e||e>o)&&(t=x(n,{span:o}),h(void 0===e,"Descriptions","Sum of column `span` in a line not match `column` of Descriptions.")),t}var I={prefixCls:c.string,bordered:c.looseBool,size:c.oneOf(s("default","middle","small")).def("default"),title:c.VNodeChild,extra:c.VNodeChild,column:{type:[Number,Object],default:function(){return D}},layout:c.oneOf(s("horizontal","vertical")),colon:c.looseBool},N=i({name:"ADescriptions",Item:j,setup:function(e,o){var t,l=o.slots,r=u("configProvider",d).getPrefixCls,a=f({});return p((function(){t=m.subscribe((function(n){"object"===S(e.column)&&(a.value=n)}))})),b((function(){m.unsubscribe(t)})),function(){var o,t,c,i,s=e.prefixCls,u=e.column,d=e.size,f=e.bordered,p=void 0!==f&&f,m=e.layout,b=void 0===m?"horizontal":m,x=e.colon,h=void 0===x||x,C=e.title,w=void 0===C?null===(t=l.title)||void 0===t?void 0:t.call(l):C,g=e.extra,j=void 0===g?null===(c=l.extra)||void 0===c?void 0:c.call(l):g,I=r("descriptions",s),N=function(n,e){if("number"==typeof n)return n;if("object"===S(n))for(var o=0;o<v.length;o++){var t=v[o];if(e[t]&&void 0!==n[t])return n[t]||D[t]}return 3}(u,a.value),z=function(n,e){var o=y(n),t=[],l=[],r=e;return o.forEach((function(n,a){var c,i=null===(c=n.props)||void 0===c?void 0:c.span,s=i||1;if(a===o.length-1)return l.push(O(n,i,r)),void t.push(l);s<r?(r-=s,l.push(n)):(l.push(O(n,s,r)),t.push(l),r=e,l=[])})),t}(null===(i=l.default)||void 0===i?void 0:i.call(l),N);return n("div",{class:[I,(o={},k(o,"".concat(I,"-").concat(d),"default"!==d),k(o,"".concat(I,"-bordered"),!!p),o)]},[(w||j)&&n("div",{class:"".concat(I,"-header")},[n("div",{class:"".concat(I,"-title")},[w]),n("div",{class:"".concat(I,"-extra")},[j])]),n("div",{class:"".concat(I,"-view")},[n("table",null,[n("tbody",null,[z.map((function(e,o){return n(P,{key:o,index:o,colon:h,prefixCls:I,vertical:"vertical"===b,bordered:p,row:e},null)}))])])])])}}});N.props=I,N.install=function(n){return n.component(N.name,N),n.component(N.Item.name,N.Item),n};export{N as D};