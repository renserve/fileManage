import{ck as e,d6 as r,d7 as t,d8 as n,d9 as i,ci as o,cP as a,d3 as c,k as l}from"./index.c36a6c67.js";import{i as u}from"./useFullScreen.224b34a5.js";import{q as s}from"./index.fb588b86.js";import{b as d}from"./index.1878d1f8.js";import{u as f}from"./useTable.48a7e287.js";function p(e,t){if(e!==t){var n=void 0!==e,i=null===e,o=e==e,a=r(e),c=void 0!==t,l=null===t,u=t==t,s=r(t);if(!l&&!s&&!a&&e>t||a&&c&&u&&!l&&!s||i&&c&&u||!n&&u||!o)return 1;if(!i&&!a&&!s&&e<t||s&&n&&o&&!i&&!a||l&&n&&o||!c&&o||!u)return-1}return 0}function m(r,a,c){var l=-1;return a=t(a.length?a:[n],i(o)),function(e,r){var t=e.length;for(e.sort(r);t--;)e[t]=e[t].value;return e}(function(r,t){var n=-1,i=e(r)?Array(r.length):[];return s(r,(function(e,r,o){i[++n]=t(e,r,o)})),i}(r,(function(e,r,n){return{criteria:t(a,(function(r){return r(e)})),index:++l,value:e}})),(function(e,r){return function(e,r,t){for(var n=-1,i=e.criteria,o=r.criteria,a=i.length,c=t.length;++n<a;){var l=p(i[n],o[n]);if(l)return n>=c?l:l*("desc"==t[n]?-1:1)}return e.index-r.index}(e,r,c)}))}var b=a((function(e,r){if(null==e)return[];var t=r.length;return t>1&&u(e,r[0],r[1])?r=[]:t>2&&u(r[0],r[1],r[2])&&(r=[r[0]]),m(e,c(r,1),[])}));const{createConfirm:g}=l();function j(e){return e.filter((e=>!e.hide))}function v(e){return b(e.filter((e=>!1!==e.display)).map((e=>(!e.component&&(e.component="Input"),!e.order&&(e.order=0),e))),"order")}function y(e){const[r,{reload:t,getDataSource:n,isInit:i}]=f(e),[o,{openModal:a,transferModalData:c,closeModal:l}]=d();return[{registerTable:r,reload:t,getDataSource:n,isInit:i},{registerDialog:o,openModal:a,transferModalData:c,closeModal:l},{rowDelete:function(r,n){(function(e){return new Promise((r=>{g({iconType:"warning",title:e||"确认执行？",onOk(){r(!0)}})}))})(n).then((n=>{e.rowDeleteApi(r).then((e=>{t({page:1})}))}))},rowSave:function(r){e.relyObject.id?(r.id=e.relyObject.id,e.rowEditApi(r).then((e=>{l(),t({page:1})}))):e.rowSaveApi(r).then((e=>{l(),t({page:1})}))},rowEdit:function(r,t,n){e.relyObject.id=t.id,e.relyObject.title=n||"编辑"+(e.relyObject.append||""),a(),setTimeout((()=>{r.resetFields(),t=Object.assign({},t),c(t)}),0)},rowAdd:function(r,t={},n){e.relyObject.id=null,e.relyObject.title=n||"新增"+(e.relyObject.append||""),a(),setTimeout((()=>{r.resetFields();const n={...e.relyObject.initForm||{},...t};e.relyObject.initForm&&c(Object.assign({},n))}),0)}}]}export{j as a,v as g,y as u};