(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[844],{1836:function(t,a,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/calendar",function(){return e(6984)}])},6984:function(t,a,e){"use strict";e.r(a);var n=e(5893),o=e(8582),i=e(2688),s=e(7294),c=e(8417),r=e.n(c);let d=["January","February","March","April","May","June","July","August","September","October","November","December"],l=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];a.default=()=>{let t=new Date,a={day:t.getDate(),month:t.getMonth(),year:t.getFullYear()},[e,c]=(0,s.useState)(t.getMonth()),[u,_]=(0,s.useState)(t.getFullYear()),[h,f]=(0,s.useState)([]),[B,S]=(0,s.useState)({}),[y,m]=(0,s.useState)(!1),[p,b]=(0,s.useState)([]);(0,s.useRef)(null),(0,s.useRef)(null),(0,s.useEffect)(()=>{let t=new Date(u,e+1,0).getDate(),a=new Date(u,e,1).getDay(),n=[];for(let t=0;t<a;t++)n.push(null);for(let a=1;a<=t;a++)n.push(a);f(n)},[e,u]),(0,s.useEffect)(()=>{fetch("https://holidays-jp.github.io/api/v1/date.json").then(t=>t.json()).then(t=>{S(t)}).catch(t=>{console.error("Failed to fetch holidays:",t)})},[]);let j=t=>{let a=e+t,n=u;a>11?(a=0,n++):a<0&&(a=11,n--),c(a),_(n)},v=t=>{b(a=>a.includes(t)?a.filter(a=>a!==t):[...a,t])},x=Array.from(Array(48)).map((t,a)=>"".concat(a<20?"0":"").concat(Math.floor(a/2),":").concat(a%2==0?"00":"30"));return(0,n.jsxs)("div",{className:r().container,children:[(0,n.jsxs)("div",{className:r().calendarSection,children:[(0,n.jsxs)("div",{className:r().monthNavigation,children:[(0,n.jsx)("button",{className:r().navButton,onClick:()=>j(-1),children:"＜"}),(0,n.jsxs)("span",{children:[d[e]," ",u]}),(0,n.jsx)("button",{className:r().navButton,onClick:()=>j(1),children:"＞"})]}),(0,n.jsxs)("div",{className:r().calendarGrid,children:[l.map(t=>(0,n.jsx)("div",{className:"".concat(r().calendarDay," ").concat(r().dayLabel),children:t},t)),h.map((t,o)=>{let i="";null!==t&&(i="".concat(u,"-").concat((e+1).toString().padStart(2,"0"),"-").concat(t.toString().padStart(2,"0")));let s=B[i];return(0,n.jsx)("div",{className:"".concat(r().calendarDay," \n                ").concat(t===a.day&&e===a.month&&u===a.year?r().today:""," \n                ").concat(o%7==0||s?r().sunday:""," \n                ").concat(o%7==6?r().saturday:""," \n                ").concat(null!==t&&p.includes(t)?r().selectedDay:""," \n                "),onClick:()=>{null!==t&&v(t)},children:t},o)})]})]}),(0,n.jsxs)("div",{className:r().shiftInputSection,children:[(0,n.jsx)("div",{className:r().clearButtonContainer,children:(0,n.jsx)("button",{className:r().clearButton,onClick:()=>{b([])},children:"選択をクリア"})}),(0,n.jsxs)("div",{className:r().selectedDaysSection,children:["選択された日： ",p.map(t=>"".concat(d[e]," ").concat(t)).join(", ")]}),(0,n.jsx)("button",{className:r().addButton,onClick:()=>m(!0),children:"＋シフトを追加"}),(0,n.jsxs)("div",{className:"".concat(r().shiftBar," ").concat(y?r().shiftBarVisible:""),children:[(0,n.jsx)("div",{className:r().closeButtonContainer,children:(0,n.jsx)("button",{onClick:()=>m(!1),children:"閉じる"})}),(0,n.jsxs)("div",{className:"autocompleteContainer",children:[(0,n.jsx)(i.Z,{id:"disabled-options-demo",options:x,getOptionDisabled:t=>t===x[0]||t===x[2],sx:{width:300},renderInput:t=>(0,n.jsx)(o.Z,{...t,label:"バイト開始時間"})}),(0,n.jsx)(i.Z,{id:"disabled-options-demo",options:x,getOptionDisabled:t=>t===x[0]||t===x[2],sx:{width:300},renderInput:t=>(0,n.jsx)(o.Z,{...t,label:"バイト終了時間"})})]})]})]})]})}},8417:function(t){t.exports={container:"ShiftBoard_container__8_m0V",calendarSection:"ShiftBoard_calendarSection__d45s4",monthNavigation:"ShiftBoard_monthNavigation__5FDy7",navButton:"ShiftBoard_navButton__aFFIE",shiftInputSection:"ShiftBoard_shiftInputSection__nvcZn",inputGroup:"ShiftBoard_inputGroup__S6brJ",submitButton:"ShiftBoard_submitButton__LI_sn",calendarGrid:"ShiftBoard_calendarGrid__fCQk3",calendarDay:"ShiftBoard_calendarDay__Wezft",daysOfWeek:"ShiftBoard_daysOfWeek__JBKFS",dayLabel:"ShiftBoard_dayLabel__ONjXj",today:"ShiftBoard_today__bjcPE",selectedDay:"ShiftBoard_selectedDay__zn_oj",sunday:"ShiftBoard_sunday__OiIyE",saturday:"ShiftBoard_saturday__vmI6a",holiday:"ShiftBoard_holiday__Jd_8R",shiftBar:"ShiftBoard_shiftBar__V2gx5",shiftBarVisible:"ShiftBoard_shiftBarVisible__7QO9W",addButton:"ShiftBoard_addButton__FVo_6",selectedDaysSection:"ShiftBoard_selectedDaysSection__ok4FC",clearButtonContainer:"ShiftBoard_clearButtonContainer__hWZ_v",clearButton:"ShiftBoard_clearButton__blBXu",autocompleteContainer:"ShiftBoard_autocompleteContainer__gSvJ0",closeButtonContainer:"ShiftBoard_closeButtonContainer__V_g5m"}}},function(t){t.O(0,[470,774,888,179],function(){return t(t.s=1836)}),_N_E=t.O()}]);