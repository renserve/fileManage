import{bh as n,O as e,C as t,bH as i,aR as s}from"./index.c75a1aa1.js";function o(e){n()&&i(e)}function a(e){const t=n();t&&e.call(null,t)}function r(){if(!n())throw new Error("Please put useForm function in the setup function!")}function u(i,a=150,r){let u=()=>{i()};const[c,f]=s(u,a,r);u=c;const d=()=>{r&&r.immediate&&u(),window.addEventListener("resize",u)},l=()=>{window.removeEventListener("resize",u),f()};return function(i,s=!0){n()?e(i):s?i():t(i)}((()=>{d()})),o((()=>{l()})),[d,l]}export{o as a,r as i,a as t,u};
