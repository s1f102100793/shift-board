(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[844],{1836:function(t,n,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/calendar",function(){return e(6984)}])},6984:function(t,n,e){"use strict";e.r(n);var a=e(5893),i=e(7294),r=e(8417),s=e.n(r);let c=["January","February","March","April","May","June","July","August","September","October","November","December"];n.default=()=>{let t=new Date,[n,e]=(0,i.useState)(t.getMonth()),[r,o]=(0,i.useState)(t.getFullYear()),[u,l]=(0,i.useState)([]);(0,i.useEffect)(()=>{let t=new Date(r,n+1,0).getDate(),e=new Date(r,n,1).getDay(),a=[];for(let t=0;t<e;t++)a.push(null);for(let n=1;n<=t;n++)a.push(n);l(a)},[n,r]);let _=t=>{let a=n+t,i=r;a>11?(a=0,i++):a<0&&(a=11,i--),e(a),o(i)};return(0,a.jsxs)("div",{className:s().container,children:[(0,a.jsxs)("div",{className:s().calendarSection,children:[(0,a.jsxs)("div",{className:s().monthNavigation,children:[(0,a.jsx)("button",{className:s().navButton,onClick:()=>_(-1),children:"＜"}),(0,a.jsxs)("span",{children:[c[n]," ",r]}),(0,a.jsx)("button",{className:s().navButton,onClick:()=>_(1),children:"＞"})]}),(0,a.jsx)("div",{className:s().calendarGrid,children:u.map((t,n)=>(0,a.jsx)("div",{className:s().calendarDay,children:t},n))})]}),(0,a.jsx)("div",{className:s().shiftInputSection})]})}},8417:function(t){t.exports={container:"ShiftBoard_container__8_m0V",calendarSection:"ShiftBoard_calendarSection__d45s4",monthNavigation:"ShiftBoard_monthNavigation__5FDy7",navButton:"ShiftBoard_navButton__aFFIE",shiftInputSection:"ShiftBoard_shiftInputSection__nvcZn",inputGroup:"ShiftBoard_inputGroup__S6brJ",submitButton:"ShiftBoard_submitButton__LI_sn",calendarGrid:"ShiftBoard_calendarGrid__fCQk3",calendarDay:"ShiftBoard_calendarDay__Wezft"}}},function(t){t.O(0,[774,888,179],function(){return t(t.s=1836)}),_N_E=t.O()}]);