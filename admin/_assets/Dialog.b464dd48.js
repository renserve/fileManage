import{a as e,F as s,C as t,r as i,o,b as r,w as a,m as n,n as d}from"./index.c36a6c67.js";import{B as l,u as m}from"./index.fb588b86.js";import{a as c,u as p}from"./index.1878d1f8.js";import"./index.c6464e5c.js";import"./index.9a71361f.js";import"./upload.a1da8850.js";import"./index.da4720b1.js";import"./useWindowSizeFn.49839837.js";var u=e({props:["title"],components:{BasicModal:c,BasicForm:l},setup(e,{emit:i}){const o=s("schemas"),[r,{setFieldsValue:a,getFieldsValue:n,resetFields:d}]=m({labelWidth:100,schemas:o,showActionButtonGroup:!1,actionColOptions:{span:24}}),[l]=p((e=>{t((()=>{a(e)}))}));return{register:l,dialogOk:function(){const e=n();i("rowSave",e)},registerForm:r,resetFields:d}}});u.render=function(e,s,t,l,m,c){const p=i("BasicForm"),u=i("BasicModal");return o(),r(u,n({onOk:e.dialogOk},e.$attrs,{onRegister:e.register,title:e.title}),{default:a((()=>[d(p,{onRegister:e.registerForm},null,8,["onRegister"])])),_:1},16,["onOk","onRegister","title"])};export default u;