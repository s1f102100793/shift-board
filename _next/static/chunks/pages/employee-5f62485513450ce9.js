(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[678],{1897:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/employee",function(){return a(7132)}])},7132:function(e,t,a){"use strict";a.r(t);var l=a(5893),n=a(1664),i=a.n(n),s=a(7294),o=a(1733),r=a(3376),d=a(3377),c=a(1374),m=a.n(c);t.default=()=>{let e=new Date,t=new Date(e.getFullYear(),e.getMonth()+1,0).getDate(),a=Array.from({length:t},(e,t)=>t+1),n=["日","月","火","水","木","金","土"],[c,h]=(0,s.useState)({}),[u,_]=(0,s.useState)(!1),[p,y]=(0,s.useState)(null),[f,g]=(0,s.useState)(null),x=e=>{y(e),_(!0)},[T,j]=(0,s.useState)([]),[v,N]=(0,s.useState)([]),[k,E]=(0,s.useState)([]),b=async()=>{let e=await r.x.shift.$get().catch(d.F);if(null!=e){j(e);let t=[...new Set(e.map(e=>e.id))];E(t)}},w=async()=>{let e=await r.x.fixedshift.$get().catch(d.F);null!=e&&N(e)},S=async(e,t,a,l)=>{await r.x.fixedshift.post({body:{id:e,date:t,starttime:a,endtime:l}})},H=async(e,t)=>{await r.x.fixedshift.delete({body:{id:e,date:t}})};(0,s.useEffect)(()=>{let e=setInterval(()=>{b(),w()},100);return()=>{clearInterval(e)}},[]),(0,s.useEffect)(()=>{fetch("https://holidays-jp.github.io/api/v1/date.json").then(e=>e.json()).then(e=>{h(e)}).catch(e=>{console.error("Failed to fetch holidays:",e)})},[]);let I=e=>"".concat(Math.floor(e).toString().padStart(2,"0"),":").concat((e%1==.5?30:0).toString().padStart(2,"0"));return(0,l.jsxs)("div",{className:m().container,children:[(0,l.jsxs)("header",{className:m().header,children:[(0,l.jsx)("div",{className:m().logoContainer,children:(0,l.jsx)("h1",{className:m().logo,children:"シフトボード"})}),(0,l.jsx)("nav",{className:m().nav,children:(0,l.jsx)(i(),{href:o.V.$url(),className:m().navItem,children:"ホーム"})}),(0,l.jsxs)("div",{className:m().viewOptions,children:[(0,l.jsx)("button",{className:m().viewButton,children:"週表示"}),(0,l.jsx)("button",{className:m().viewButton,children:"月表示"})]})]}),(0,l.jsxs)("table",{className:m().table,children:[(0,l.jsx)("thead",{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("th",{children:"".concat(e.getFullYear(),"年 ").concat(e.getMonth()+1,"月")}),a.map(t=>{let a=new Date(e.getFullYear(),e.getMonth(),t),i=a.getDay(),s="".concat(a.getFullYear(),"-").concat((a.getMonth()+1).toString().padStart(2,"0"),"-").concat(t.toString().padStart(2,"0")),o=!!c[s];return(0,l.jsxs)("th",{className:o||6===i||0===i?m().holiday:"",onClick:()=>x(t.toString()),children:[t," (",n[i],")"]},t)})]})}),(0,l.jsx)("tbody",{children:k.map(e=>(0,l.jsxs)("tr",{children:[(0,l.jsx)("td",{className:m().employeeName,children:e}),a.map(t=>{let a=T.find(a=>a.id===e&&a.date===t.toString()),n=v.find(a=>a.id===e&&a.date===t.toString()),i=n?(0,l.jsx)("span",{className:"".concat(m().redText," ").concat(m().clickableRedText),onClick:()=>{window.confirm("この確定シフトを取り消しますか？")&&H(e,t.toString())},children:"".concat(n.starttime," - ").concat(n.endtime)}):a?(0,l.jsx)("span",{onClick:async()=>{await S(e,t.toString(),a.starttime,a.endtime)},children:"".concat(a.starttime," - ").concat(a.endtime)}):null;return(0,l.jsx)("td",{children:i},t)})]},e))})]}),u&&(0,l.jsx)("div",{className:m().modalOverlay,children:(0,l.jsxs)("div",{className:m().modal,children:[(0,l.jsx)("button",{onClick:()=>{_(!1)},children:"閉じる"}),null!==p&&(0,l.jsxs)("div",{children:[(0,l.jsxs)("h2",{children:[p,"日(",n[new Date(e.getFullYear(),e.getMonth(),Number(p)).getDay()],")のシフト詳細"]}),(0,l.jsxs)("table",{className:m().timeTable,children:[(0,l.jsx)("thead",{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("th",{children:"名前"}),Array.from({length:30},(e,t)=>10+.5*t).map(e=>(0,l.jsxs)("th",{children:[Math.floor(e),":",e%1==0?"00":"30"]},e))]})}),(0,l.jsx)("tbody",{children:k.map(e=>(0,l.jsxs)("tr",{children:[(0,l.jsx)("td",{children:e}),Array.from({length:30},(e,t)=>10+.5*t).map(t=>{let a=Math.floor(t),n=t%1==0?0:30,i=T.find(t=>t.id===e&&t.date===p),[s,o]=(null==i?void 0:i.starttime.split(":").map(Number))||[0,0],[r,d]=(null==i?void 0:i.endtime.split(":").map(Number))||[0,0],c=v.find(t=>t.id===e&&t.date===p),[h,u]=(null==c?void 0:c.starttime.split(":").map(Number))||[0,0],[_,y]=(null==c?void 0:c.endtime.split(":").map(Number))||[0,0],x=(s<a||s===a&&o<=n)&&(r>a||r===a&&d>n),j=(null==f?void 0:f.employeeId)===e&&"string"==typeof(null==f?void 0:f.startHour)&&"string"==typeof(null==f?void 0:f.endHour)&&parseFloat(f.startHour)<=t&&parseFloat(f.endHour)>t;return(0,l.jsx)("td",{className:j?m().editingTime:(h<a||h===a&&u<=n)&&(_>a||_===a&&y>n)?m().editingTime:x?m().shiftTime:m().timeCell,onMouseDown:()=>{x&&g({employeeId:e,startHour:t.toString()})},onMouseEnter:()=>{f&&f.employeeId===e&&(t>=s&&(t<r||t===r&&n<d)?g(e=>e?{employeeId:e.employeeId,startHour:e.startHour,endHour:t.toString()}:null):g(null))},onMouseUp:()=>{if(f&&"string"==typeof f.startHour&&""!==f.startHour.trim()&&"string"==typeof f.endHour&&""!==f.endHour.trim()){let t=I(parseFloat(f.startHour)),a=I(parseFloat(f.endHour));S(e,p,t,a),g(null)}},children:f&&f.employeeId===e&&parseInt(f.startHour,10)<=t&&("string"!=typeof f.endHour||parseInt(f.endHour,10)>t)?(0,l.jsx)("div",{className:m().editingTimeIndicator}):null},t)})]},e))})]})]})]})})]})}},1374:function(e){e.exports={container:"EmployeeTask_container__v_sj_",table:"EmployeeTask_table__1JDcJ",holiday:"EmployeeTask_holiday__V6nvt",employeeName:"EmployeeTask_employeeName__oip2U",modalOverlay:"EmployeeTask_modalOverlay__cgzmE",modal:"EmployeeTask_modal__Gyle0",shiftBar:"EmployeeTask_shiftBar__pzGlG",timeTable:"EmployeeTask_timeTable__hRt4i",timeCell:"EmployeeTask_timeCell__eJIjd",shiftTime:"EmployeeTask_shiftTime__NkD_N",editingTimeIndicator:"EmployeeTask_editingTimeIndicator__5crLm",editingTime:"EmployeeTask_editingTime__qfq_N",redText:"EmployeeTask_redText__VqJ1_",clickableRedText:"EmployeeTask_clickableRedText__mMf6i",header:"EmployeeTask_header__RbSQv",logoContainer:"EmployeeTask_logoContainer__axQcy",logo:"EmployeeTask_logo__fgojn",nav:"EmployeeTask_nav__rX9pP",navItem:"EmployeeTask_navItem__VXfaL",viewOptions:"EmployeeTask_viewOptions__GO_NY",viewButton:"EmployeeTask_viewButton__BMSyt"}}},function(e){e.O(0,[664,774,888,179],function(){return e(e.s=1897)}),_N_E=e.O()}]);