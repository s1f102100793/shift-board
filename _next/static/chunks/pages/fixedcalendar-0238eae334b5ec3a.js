(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[158],{7208:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/fixedcalendar",function(){return n(834)}])},834:function(e,t,n){"use strict";n.r(t);var a=n(5893),r=n(1664),l=n.n(r),i=n(7294),c=n(1733),s=n(3376),d=n(3377),o=n(4072),h=n.n(o);t.default=()=>{let e=new Date,t=new Date(e.getFullYear(),e.getMonth()+1,0).getDate(),[n,r]=(0,i.useState)("month"),o=e.getDate()-e.getDay(),_="month"===n?Array.from({length:t},(e,t)=>t+1):Array.from({length:7},(n,a)=>{let r=o+a;if(r<=0){let t=new Date(e.getFullYear(),e.getMonth(),0).getDate();return t+r}return r>t?r-t:r}),u=["日","月","火","水","木","金","土"],[f,x]=(0,i.useState)({}),[g,m]=(0,i.useState)([]),[v,j]=(0,i.useState)([]),w=async()=>{let e=await s.x.fixedshift.$get().catch(d.F);if(console.log(e),null!=e){m(e);let t=[...new Set(e.map(e=>e.id))];j(t)}};return(0,i.useEffect)(()=>{let e=setInterval(()=>{w()},100);return()=>{clearInterval(e)}},[]),(0,i.useEffect)(()=>{fetch("https://holidays-jp.github.io/api/v1/date.json").then(e=>e.json()).then(e=>{x(e)}).catch(e=>{console.error("Failed to fetch holidays:",e)})},[]),(0,a.jsxs)("div",{className:h().container,children:[(0,a.jsxs)("header",{className:h().header,children:[(0,a.jsx)("div",{className:h().logoContainer,children:(0,a.jsx)("h1",{className:h().logo,children:"シフトボード"})}),(0,a.jsxs)("nav",{className:h().nav,children:[(0,a.jsx)(l(),{href:c.V.$url(),className:h().navItem,children:"ホーム"}),(0,a.jsx)(l(),{href:c.V.calendar.$url(),className:h().navItem,children:"シフトを提出する"})]}),(0,a.jsxs)("div",{className:h().viewOptions,children:[(0,a.jsx)("button",{className:h().viewButton,onClick:()=>r("week"),children:"週表示"}),(0,a.jsx)("button",{className:h().viewButton,onClick:()=>r("month"),children:"月表示"})]})]}),(0,a.jsxs)("table",{className:h().table,children:[(0,a.jsx)("thead",{children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{children:"User"}),_.map(t=>{let n=new Date(e.getFullYear(),e.getMonth(),t),r=n.getDay(),l="".concat(n.getFullYear(),"-").concat((n.getMonth()+1).toString().padStart(2,"0"),"-").concat(t.toString().padStart(2,"0")),i=!!f[l];return(0,a.jsxs)("th",{className:i||6===r||0===r?h().holidayOrWeekend:"",children:[t," (",u[r],")"]},t)})]})}),(0,a.jsx)("tbody",{children:v.map(e=>(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{children:e}),_.map(t=>{let n=g.find(n=>n.id===e&&n.date===t.toString());return(0,a.jsx)("td",{children:n?"".concat(n.starttime," - ").concat(n.endtime):""},t)})]},e))})]})]})}},4072:function(e){e.exports={container:"fixedcalendar_container__pF_8l",table:"fixedcalendar_table__fB1c4",weekend:"fixedcalendar_weekend___n7_S",holidayOrWeekend:"fixedcalendar_holidayOrWeekend__kTnkK",header:"fixedcalendar_header__1ua0X",logoContainer:"fixedcalendar_logoContainer__nVsqZ",logo:"fixedcalendar_logo__326Ki",nav:"fixedcalendar_nav__6LrZ6",navItem:"fixedcalendar_navItem__B0xTv",viewOptions:"fixedcalendar_viewOptions__nZFH0",viewButton:"fixedcalendar_viewButton__B5SCJ"}}},function(e){e.O(0,[664,774,888,179],function(){return e(e.s=7208)}),_N_E=e.O()}]);