import{d8 as a,da as e,cd as n,ce as r,cf as s,cg as f}from"./index.d2fc36ca.js";function t(t,c,i,o){var u=-1,l=r,d=!0,h=t.length,g=[],p=c.length;if(!h)return g;i&&(c=a(c,e(i))),o?(l=s,d=!1):c.length>=200&&(l=f,d=!1,c=new n(c));a:for(;++u<h;){var v=t[u],m=null==i?v:i(v);if(v=o||0!==v?v:0,d&&m==m){for(var x=p;x--;)if(c[x]===m)continue a;g.push(v)}else l(c,m,o)||g.push(v)}return g}export{t as b};
