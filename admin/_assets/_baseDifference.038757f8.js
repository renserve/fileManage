import{d8 as a,da as e,cd as n,ce as r,cf as s,cg as t}from"./index.953c91ca.js";function c(c,f,i,o){var u=-1,l=r,h=!0,d=c.length,g=[],p=f.length;if(!d)return g;i&&(f=a(f,e(i))),o?(l=s,h=!1):f.length>=200&&(l=t,h=!1,f=new n(f));a:for(;++u<d;){var v=c[u],m=null==i?v:i(v);if(v=o||0!==v?v:0,h&&m==m){for(var x=p;x--;)if(f[x]===m)continue a;g.push(v)}else l(f,m,o)||g.push(v)}return g}export{c as b};
