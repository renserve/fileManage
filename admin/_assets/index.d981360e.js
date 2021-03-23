import{cW as r,a as e,g as o,U as a,N as t,C as i,cq as s,b9 as n,r as l,o as c,b as d,aA as f,b8 as u,a9 as m,aa as p,n as b,w as g,v as j,q as E}from"./index.7ca95812.js";import"./useFullScreen.f60bfff3.js";import{r as y}from"./index.820c583e.js";import{b as x}from"./index.d6dca0ee.js";import"./index.d101ee26.js";import"./index.3e791ece.js";import"./zh_CN.0242bd16.js";import"./index.c5ca15aa.js";import"./index.aecbdd82.js";import"./CheckOutlined.da4747b4.js";import{s as R,u as C}from"./useTable.a18bfa4b.js";import"./upload.a2665367.js";import"./index.6d254475.js";import"./useWindowSizeFn.f7593b16.js";import"./domUtils.a209b89e.js";import{getColumns as h}from"./data.0be70d1f.js";import k from"./DetailModal.f6a3950e.js";var w;(w||(w={})).Error="/error";var T=e({name:"ErrorHandler",components:{DetailModal:k,BasicTable:R,TableAction:y},setup(){const e=o(),l=o([]),{t:c}=a("sys.errorLog"),[d,{setTableData:f}]=C({title:c("sys.errorLog.tableTitle"),columns:h(),actionColumn:{width:80,title:"Action",dataIndex:"action",slots:{customRender:"action"}}}),[u,{openModal:m}]=x();return t((()=>n.getErrorInfoState),(r=>{i((()=>{f(s(r))}))}),{immediate:!0}),{register:d,registerModal:u,handleDetail:function(r){e.value=r,m(!0)},fireVueError:function(){throw new Error("fire vue error!")},fireResourceError:function(){l.value.push(`${(new Date).getTime()}.png`)},fireAjaxError:async function(){await r.request({url:w.Error,method:"GET"})},imgListRef:l,rowInfoRef:e,t:c}}});const A={class:"p-4"};T.render=function(r,e,o,a,t,i){const s=l("DetailModal"),n=l("a-button"),y=l("TableAction"),x=l("BasicTable");return c(),d("div",A,[(c(!0),d(f,null,u(r.imgListRef,(r=>m((c(),d("img",{key:r,src:r},null,8,["src"])),[[p,!1]]))),128)),b(s,{info:r.rowInfoRef,onRegister:r.registerModal},null,8,["info","onRegister"]),b(x,{onRegister:r.register,class:"error-handle-table"},{toolbar:g((()=>[b(n,{onClick:r.fireVueError,type:"primary"},{default:g((()=>[j(E(r.t("sys.errorLog.fireVueError")),1)])),_:1},8,["onClick"]),b(n,{onClick:r.fireResourceError,type:"primary"},{default:g((()=>[j(E(r.t("sys.errorLog.fireResourceError")),1)])),_:1},8,["onClick"]),b(n,{onClick:r.fireAjaxError,type:"primary"},{default:g((()=>[j(E(r.t("sys.errorLog.fireAjaxError")),1)])),_:1},8,["onClick"])])),action:g((({record:e})=>[b(y,{actions:[{label:r.t("sys.errorLog.tableActionDesc"),onClick:r.handleDetail.bind(null,e)}]},null,8,["actions"])])),_:1},8,["onRegister"])])};export default T;