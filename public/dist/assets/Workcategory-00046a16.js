import{_ as b,D as C,o as n,c as d,F as y,p as G,s as f,w as p,l as o,m as _,h as g,u as N,j as R,i as M,y as m,t as $,b as v,a as k,g as x,E as T,G as B,k as L,v as A,x as H,H as S,T as O,d as V,I as D,J as E,e as W}from"./main-4f9e5e1e.js";const P={class:"works-wrapper"},z=["src"],F={__name:"GridOne",props:{works:Array},setup(s){return(r,l)=>{const a=C("router-link");return n(),d("div",P,[(n(!0),d(y,null,G(s.works,e=>(n(),f(a,{key:e.uri,class:"single-work",to:"/"+e.uri},{default:p(()=>[o("figure",{class:_([e.ratio>1?"landscape":"portrait"])},[o("img",{src:e.thumbnail},null,8,z)],2)]),_:2},1032,["to"]))),128))])}}},j=b(F,[["__scopeId","data-v-1f9f4007"]]);const J={class:"works-wrapper"},K=["src"],q={__name:"GridTwo",props:{works:Array},setup(s){return(r,l)=>{const a=C("router-link");return n(),d("div",J,[(n(!0),d(y,null,G(s.works,e=>(n(),f(a,{key:e.uri,class:_(["single-work",[e.size,e.ratio>1?"landscape":"portrait"]]),to:"/"+e.uri},{default:p(()=>[o("figure",null,[o("img",{src:e.thumbnail},null,8,K)])]),_:2},1032,["to","class"]))),128))])}}},Q=b(q,[["__scopeId","data-v-daa87bd8"]]);const U=s=>(T("data-v-2bf8bbf3"),s=s(),B(),s),X=U(()=>o("div",{class:"work-link"},"Arbeiten",-1)),Y={__name:"WorkNavigation",props:{currentPage:String},setup(s){const r=g(null),l=N("/arbeiten"),a=R(),e=g(!1),i=g(!1);M(()=>{m.set(r.value,{y:-window.innerHeight/2})});const c=()=>{e.value?m.to(r.value,{y:-window.innerHeight/2,ease:"power1",duration:1}):m.to(r.value,{y:0,ease:"bounce.out",duration:1}),e.value=!e.value};return(t,u)=>{var I;const w=C("RouterLink");return n(),d(y,null,[o("div",{class:_(["overlay",e.value?"clicky":""]),onClick:c},null,2),o("div",{class:_(["worknagigation-wrapper",{open:e.value}])},[o("h1",{class:"open-menu-link",onClick:c},$(v(a).title),1),o("div",{class:"current-route",onClick:c},$(s.currentPage),1),o("div",{ref_key:"navigationmenutoggle",ref:r,class:_(["navigation-menu-toggle",{open:e.value,startanimation:i.value}])},[k(w,{to:"/",class:"home-link a",onClick:c},{default:p(()=>[x("Gustav Körnig")]),_:1}),X,(n(!0),d(y,null,G(((I=v(l))==null?void 0:I.children)||[],h=>(n(),f(w,{key:h.uri,to:"/"+h.uri,onClick:c},{default:p(()=>[x($(h.title),1)]),_:2},1032,["to"]))),128)),k(w,{to:"/information"},{default:p(()=>[x("Information")]),_:1})],2)],2)],64)}}},Z=b(Y,[["__scopeId","data-v-2bf8bbf3"]]);const ee={class:"page-wrapper"},te={__name:"Workcategory",setup(s){L();const r=A(),l=g(null);r.beforeEach((c,t,u)=>{u()});const a=N(),e=g(1),i=g(null);return H(()=>{document.body.classList.remove("dark-body")}),M(()=>{document.body.classList.remove("dark-body"),S.previousRoute&&!S.previousRoute.path.startsWith("/arbeiten/")&&(console.log(l.value),m.set(l.value,{y:-(window.innerHeight/100)*6}),m.to(l.value,{y:0,ease:"bounce.out",duration:1.5}))}),(c,t)=>(n(),d("div",ee,[k(Z,{"current-page":v(a).title},null,8,["current-page"]),k(E,{parent:"/arbeiten"}),k(O,null,{default:p(()=>[e.value==1?(n(),f(j,{key:"1",works:v(a).children},null,8,["works"])):W("",!0),e.value==2?(n(),f(Q,{key:"2",works:v(a).children},null,8,["works"])):W("",!0)]),_:1}),V(o("div",{ref_key:"modeselector",ref:l,class:"mode-selector"},[o("button",{class:_({active:e.value==1,hovering:i.value===2}),onClick:t[0]||(t[0]=u=>e.value=1),onMouseover:t[1]||(t[1]=u=>i.value=1),onMouseleave:t[2]||(t[2]=u=>i.value=null)}," 1 ",34),o("button",{class:_({active:e.value==2,hovering:i.value===1}),onClick:t[3]||(t[3]=u=>e.value=2),onMouseover:t[4]||(t[4]=u=>i.value=2),onMouseleave:t[5]||(t[5]=u=>i.value=null)}," 2 ",34)],512),[[D,v(a).additionalraster=="true"]])]))}},ne=b(te,[["__scopeId","data-v-586486ce"]]);export{ne as default};
