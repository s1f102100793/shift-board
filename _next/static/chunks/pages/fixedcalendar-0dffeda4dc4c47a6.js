(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[158],{7208:function(e,n,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/fixedcalendar",function(){return a(834)}])},834:function(e,n,a){"use strict";a.r(n);var t=a(5893),l=a(1664),r=a.n(l),i=a(7294),s=a(1733),c=a(3376),d=a(3377),o=a(4072),h=a.n(o);n.default=()=>{let e=new Date,n=new Date(e.getFullYear(),e.getMonth()+1,0).getDate(),a=Array.from({length:n},(e,n)=>n+1),l=["日","月","火","水","木","金","土"],[o,_]=(0,i.useState)({}),[u,f]=(0,i.useState)([]),[x,m]=(0,i.useState)([]),v=async()=>{let e=await c.x.fixedshift.$get().catch(d.F);if(console.log(e),null!=e){f(e);let n=[...new Set(e.map(e=>e.id))];m(n)}};return(0,i.useEffect)(()=>{let e=setInterval(()=>{v()},100);return()=>{clearInterval(e)}},[]),(0,i.useEffect)(()=>{fetch("https://holidays-jp.github.io/api/v1/date.json").then(e=>e.json()).then(e=>{_(e)}).catch(e=>{console.error("Failed to fetch holidays:",e)})},[]),(0,t.jsxs)("div",{className:h().container,children:[(0,t.jsxs)("header",{className:h().header,children:[(0,t.jsx)("div",{className:h().logoContainer,children:(0,t.jsx)("h1",{className:h().logo,children:"シフトボード"})}),(0,t.jsxs)("nav",{className:h().nav,children:[(0,t.jsx)(r(),{href:s.V.$url(),className:h().navItem,children:"ホーム"}),(0,t.jsx)(r(),{href:s.V.calendar.$url(),className:h().navItem,children:"シフトを提出する"})]}),(0,t.jsxs)("div",{className:h().viewOptions,children:[(0,t.jsx)("button",{className:h().viewButton,children:"週表示"}),(0,t.jsx)("button",{className:h().viewButton,children:"月表示"})]})]}),(0,t.jsxs)("table",{className:h().table,children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{children:"User"}),a.map(n=>{let a=new Date(e.getFullYear(),e.getMonth(),n),r=a.getDay(),i="".concat(a.getFullYear(),"-").concat((a.getMonth()+1).toString().padStart(2,"0"),"-").concat(n.toString().padStart(2,"0")),s=!!o[i];return(0,t.jsxs)("th",{className:s||6===r||0===r?h().holidayOrWeekend:"",children:[n," (",l[r],")"]},n)})]})}),(0,t.jsx)("tbody",{children:x.map(e=>(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:e}),a.map(n=>{let a=u.find(a=>a.id===e&&a.date===n.toString());return(0,t.jsx)("td",{children:a?"".concat(a.starttime," - ").concat(a.endtime):""},n)})]},e))})]})]})}},4072:function(e){e.exports={container:"fixedcalendar_container__pF_8l",table:"fixedcalendar_table__fB1c4",weekend:"fixedcalendar_weekend___n7_S",holidayOrWeekend:"fixedcalendar_holidayOrWeekend__kTnkK",header:"fixedcalendar_header__1ua0X",logoContainer:"fixedcalendar_logoContainer__nVsqZ",logo:"fixedcalendar_logo__326Ki",nav:"fixedcalendar_nav__6LrZ6",navItem:"fixedcalendar_navItem__B0xTv",viewOptions:"fixedcalendar_viewOptions__nZFH0",viewButton:"fixedcalendar_viewButton__B5SCJ"}}},function(e){e.O(0,[664,774,888,179],function(){return e(e.s=7208)}),_N_E=e.O()}]);