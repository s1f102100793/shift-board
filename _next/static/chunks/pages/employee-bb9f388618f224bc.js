(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[678],{1897:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/employee",function(){return a(7132)}])},7132:function(e,t,a){"use strict";a.r(t);var l=a(5893),i=a(7294),n=a(1374),s=a.n(n);let d=["田中太郎","佐藤次郎","鈴木花子","山田一郎","木村太一","高橋雅子","中村翔太","小林悠","石田光","加藤あや","田中太郎","佐藤次郎","鈴木花子","山田一郎","木村太一","高橋雅子","中村翔太","小林悠","石田光","加藤あや"];t.default=()=>{let e=new Date,t=new Date(e.getFullYear(),e.getMonth()+1,0).getDate(),a=Array.from({length:t},(e,t)=>t+1),n=["日","月","火","水","木","金","土"],[r,o]=(0,i.useState)({}),[m,c]=(0,i.useState)(!1),[h,u]=(0,i.useState)(null),[T,_]=(0,i.useState)(null),[p,y]=(0,i.useState)(null),j=e=>{u(e),c(!0)},x=[{id:"田中太郎",date:1,startTime:"09:00",endTime:"18:00"},{id:"佐藤次郎",date:1,startTime:"10:00",endTime:"19:00"},{id:"鈴木花子",date:1,startTime:"11:00",endTime:"20:00"},{id:"山田一郎",date:2,startTime:"09:00",endTime:"18:00"},{id:"木村太一",date:2,startTime:"12:00",endTime:"21:00"},{id:"高橋雅子",date:3,startTime:"09:00",endTime:"18:00"},{id:"中村翔太",date:3,startTime:"10:00",endTime:"19:00"},{id:"小林悠",date:4,startTime:"11:00",endTime:"20:00"},{id:"石田光",date:4,startTime:"12:00",endTime:"21:00"},{id:"加藤あや",date:5,startTime:"09:00",endTime:"18:00"},{id:"田中太郎",date:5,startTime:"17:00",endTime:"22:30"}];return(0,i.useEffect)(()=>{fetch("https://holidays-jp.github.io/api/v1/date.json").then(e=>e.json()).then(e=>{o(e)}).catch(e=>{console.error("Failed to fetch holidays:",e)})},[]),(0,l.jsxs)("div",{className:s().container,children:[(0,l.jsxs)("table",{className:s().table,children:[(0,l.jsx)("thead",{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("th",{children:"".concat(e.getFullYear(),"年 ").concat(e.getMonth()+1,"月")}),a.map(t=>{let a=new Date(e.getFullYear(),e.getMonth(),t),i=a.getDay(),d="".concat(a.getFullYear(),"-").concat((a.getMonth()+1).toString().padStart(2,"0"),"-").concat(t.toString().padStart(2,"0")),o=!!r[d];return(0,l.jsxs)("th",{className:o||6===i||0===i?s().holiday:"",onClick:()=>j(t),children:[t," (",n[i],")"]},t)})]})}),(0,l.jsx)("tbody",{children:d.map(e=>(0,l.jsxs)("tr",{children:[(0,l.jsx)("td",{className:s().employeeName,children:e}),a.map(t=>{let a=x.find(a=>a.id===e&&a.date===t);return(0,l.jsx)("td",{children:a?"".concat(a.startTime," - ").concat(a.endTime):""},t)})]},e))})]}),m&&(0,l.jsx)("div",{className:s().modalOverlay,children:(0,l.jsxs)("div",{className:s().modal,children:[(0,l.jsx)("button",{onClick:()=>{c(!1)},children:"閉じる"}),null!==h&&(0,l.jsxs)("div",{children:[(0,l.jsxs)("h2",{children:[h,"日(",n[new Date(e.getFullYear(),e.getMonth(),h).getDay()],")のシフト詳細"]}),(0,l.jsxs)("table",{className:s().timeTable,children:[(0,l.jsx)("thead",{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("th",{children:"名前"}),Array.from({length:15},(e,t)=>10+t).map(e=>(0,l.jsxs)("th",{children:[e,":00"]},e))]})}),(0,l.jsx)("tbody",{children:d.map(e=>(0,l.jsxs)("tr",{children:[(0,l.jsx)("td",{children:e}),Array.from({length:15},(e,t)=>10+t).map(t=>{let a=x.find(t=>t.id===e&&t.date===h),[i]=(null==a?void 0:a.startTime.split(":").map(Number))||[],[n]=(null==a?void 0:a.endTime.split(":").map(Number))||[],d=i<=t&&t<n;return(0,l.jsx)("td",{className:d?s().shiftTime:s().timeCell,onMouseDown:()=>{d&&_({employeeId:e,startHour:t})},onMouseEnter:()=>{T&&T.employeeId===e&&_(e=>e?{employeeId:e.employeeId,startHour:e.startHour,endHour:t}:null)},onMouseUp:()=>{T&&_(null)},children:T&&T.employeeId===e&&T.startHour<=t&&("number"!=typeof T.endHour||T.endHour>t)?(0,l.jsx)("div",{className:s().editingTimeIndicator}):null},t)})]},e))})]})]})]})})]})}},1374:function(e){e.exports={container:"EmployeeTask_container__v_sj_",table:"EmployeeTask_table__1JDcJ",holiday:"EmployeeTask_holiday__V6nvt",employeeName:"EmployeeTask_employeeName__oip2U",modalOverlay:"EmployeeTask_modalOverlay__cgzmE",modal:"EmployeeTask_modal__Gyle0",shiftBar:"EmployeeTask_shiftBar__pzGlG",timeTable:"EmployeeTask_timeTable__hRt4i",timeCell:"EmployeeTask_timeCell__eJIjd",shiftTime:"EmployeeTask_shiftTime__NkD_N",editingTimeIndicator:"EmployeeTask_editingTimeIndicator__5crLm"}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=1897)}),_N_E=e.O()}]);