(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[678],{1897:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/employee",function(){return n(6828)}])},6828:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return k}});var i=n(5893),o=n(7294),s=n(1664),a=n.n(s),l=n(3376),r=n(3377);let d=()=>{let e=new Date,t=new Date(e.getFullYear(),e.getMonth()+1,0).getDate(),n=Array.from({length:t},(e,t)=>t+1),[i,s]=(0,o.useState)({}),[a,d]=(0,o.useState)(!1),[c,m]=(0,o.useState)(null),[_,h]=(0,o.useState)(null),[u,p]=(0,o.useState)([]),[f,x]=(0,o.useState)([]),[y,g]=(0,o.useState)([]),j=async()=>{let e=await l.x.shift.$get().catch(r.F);if(null!=e){p(e);let t=[...new Set(e.map(e=>e.id))];g(t)}},v=async()=>{let e=await l.x.fixedshift.$get().catch(r.F);null!=e&&x(e)},T=async(e,t,n,i)=>{await l.x.fixedshift.post({body:{id:e,date:t,starttime:n,endtime:i}})},N=async(e,t)=>{await l.x.fixedshift.delete({body:{id:e,date:t}})};return{date:e,daysArray:n,weekDays:["日","月","火","水","木","金","土"],holidays:i,setHolidays:s,isModalOpen:a,selectedDate:c,editingShift:_,setEditingShift:h,shifts:u,fixedShifts:f,employees:y,openModal:e=>{m(e),d(!0)},closeModal:()=>{d(!1)},fetchShift:j,fetchFixedShift:v,createFixedShift:T,deleteFixedShift:N,formatTime:e=>"".concat(Math.floor(e).toString().padStart(2,"0"),":").concat((e%1==.5?30:0).toString().padStart(2,"0"))}};var c=n(1733),m=n(9750),_=n.n(m);let h=()=>(0,i.jsx)("div",{className:_().logoContainer,children:(0,i.jsx)("h1",{className:_().logo,children:"シフトボード"})}),u=()=>(0,i.jsx)("nav",{className:_().nav,children:(0,i.jsx)(a(),{href:c.V.$url(),className:_().navItem,children:"ホーム"})}),p=()=>(0,i.jsxs)("div",{className:_().viewOptions,children:[(0,i.jsx)("button",{className:_().viewButton,children:"週表示"}),(0,i.jsx)("button",{className:_().viewButton,children:"月表示"})]}),f=()=>(0,i.jsxs)("header",{className:_().header,children:[(0,i.jsx)(h,{}),(0,i.jsx)(u,{}),(0,i.jsx)(p,{})]}),x=e=>{let{date:t,day:n,holidays:o,openModal:s}=e,a=new Date(t.getFullYear(),t.getMonth(),n),l=a.getDay(),r="".concat(a.getFullYear(),"-").concat((a.getMonth()+1).toString().padStart(2,"0"),"-").concat(n.toString().padStart(2,"0")),c=!!o[r],{weekDays:m}=d();return(0,i.jsxs)("th",{className:c||6===l||0===l?_().holiday:"",onClick:()=>s(n.toString()),children:[n," (",m[l],")"]})},y=e=>{let{date:t,daysArray:n,holidays:o,openModal:s}=e;return(0,i.jsx)("thead",{children:(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{children:"".concat(t.getFullYear(),"年 ").concat(t.getMonth()+1,"月")}),n.map(e=>(0,i.jsx)(x,{date:t,day:e,holidays:o,openModal:s},e))]})})},g=e=>{let{name:t}=e;return(0,i.jsx)("td",{className:_().employeeName,children:t})},j=e=>{let{shift:t,onDelete:n}=e;return(0,i.jsx)("span",{className:"".concat(_().redText," ").concat(_().clickableRedText),onClick:()=>{window.confirm("この確定シフトを取り消しますか？")&&n()},children:"".concat(t.starttime," - ").concat(t.endtime)})},v=e=>{let{shift:t,onCreateFixed:n}=e;return(0,i.jsx)("span",{onClick:async()=>{await n()},children:"".concat(t.starttime," - ").concat(t.endtime)})},T=e=>{let{employee:t,day:n,shifts:o,fixedShifts:s,deleteFixedShift:a,createFixedShift:l}=e,r=o.find(e=>e.id===t&&e.date===n.toString()),d=s.find(e=>e.id===t&&e.date===n.toString());return d?(0,i.jsx)(j,{shift:d,onDelete:()=>a(t,n.toString())}):r?(0,i.jsx)(v,{shift:r,onCreateFixed:()=>l(t,n.toString(),r.starttime,r.endtime)}):null},N=e=>{let{employees:t,daysArray:n,shifts:o,fixedShifts:s,deleteFixedShift:a,createFixedShift:l}=e;return(0,i.jsx)("tbody",{children:t.map(e=>(0,i.jsxs)("tr",{children:[(0,i.jsx)(g,{name:e}),n.map(t=>(0,i.jsx)("td",{children:(0,i.jsx)(T,{employee:e,day:t,shifts:o,fixedShifts:s,deleteFixedShift:a,createFixedShift:l})},t))]},e))})},S=()=>(0,i.jsx)("thead",{children:(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{children:"名前"}),Array.from({length:30},(e,t)=>10+.5*t).map(e=>(0,i.jsxs)("th",{children:[Math.floor(e),":",e%1==0?"00":"30"]},e))]})});var b=n(1374),w=n.n(b),k=()=>{let{date:e,daysArray:t,weekDays:n,holidays:s,setHolidays:a,isModalOpen:l,selectedDate:r,editingShift:c,setEditingShift:m,shifts:_,fixedShifts:h,employees:u,openModal:p,closeModal:x,fetchShift:g,fetchFixedShift:j,createFixedShift:v,deleteFixedShift:T,formatTime:b}=d();return(0,o.useEffect)(()=>{let e=setInterval(()=>{g(),j()},100);return()=>{clearInterval(e)}},[g,j]),(0,o.useEffect)(()=>{fetch("https://holidays-jp.github.io/api/v1/date.json").then(e=>e.json()).then(e=>{a(e)}).catch(e=>{console.error("Failed to fetch holidays:",e)})},[a]),(0,i.jsxs)("div",{className:w().container,children:[(0,i.jsx)(f,{}),(0,i.jsxs)("table",{className:w().table,children:[(0,i.jsx)(y,{date:e,daysArray:t,holidays:s,openModal:p}),(0,i.jsx)(N,{employees:u,daysArray:t,shifts:_,fixedShifts:h,deleteFixedShift:T,createFixedShift:v})]}),l&&(0,i.jsx)("div",{className:w().modalOverlay,children:(0,i.jsxs)("div",{className:w().modal,children:[(0,i.jsx)("button",{onClick:x,children:"閉じる"}),null!==r&&(0,i.jsxs)("div",{children:[(0,i.jsxs)("h2",{children:[r,"日(",n[new Date(e.getFullYear(),e.getMonth(),Number(r)).getDay()],")のシフト詳細"]}),(0,i.jsxs)("table",{className:w().timeTable,children:[(0,i.jsx)(S,{}),(0,i.jsx)("tbody",{children:u.map(e=>(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:e}),Array.from({length:30},(e,t)=>10+.5*t).map(t=>{let n=Math.floor(t),o=t%1==0?0:30,s=_.find(t=>t.id===e&&t.date===r),[a,l]=(null==s?void 0:s.starttime.split(":").map(Number))||[0,0],[d,u]=(null==s?void 0:s.endtime.split(":").map(Number))||[0,0],p=h.find(t=>t.id===e&&t.date===r),[f,x]=(null==p?void 0:p.starttime.split(":").map(Number))||[0,0],[y,g]=(null==p?void 0:p.endtime.split(":").map(Number))||[0,0],j=(a<n||a===n&&l<=o)&&(d>n||d===n&&u>o),T=(null==c?void 0:c.employeeId)===e&&"string"==typeof(null==c?void 0:c.startHour)&&"string"==typeof(null==c?void 0:c.endHour)&&parseFloat(c.startHour)<=t&&parseFloat(c.endHour)>t;return(0,i.jsx)("td",{className:T?w().editingTime:(f<n||f===n&&x<=o)&&(y>n||y===n&&g>o)?w().editingTime:j?w().shiftTime:w().timeCell,onMouseDown:()=>{j&&m({employeeId:e,startHour:t.toString()})},onMouseEnter:()=>{c&&c.employeeId===e&&(t>=a&&(t<d||t===d&&o<u)?m(e=>e?{employeeId:e.employeeId,startHour:e.startHour,endHour:t.toString()}:null):m(null))},onMouseUp:()=>{if(c&&"string"==typeof c.startHour&&""!==c.startHour.trim()&&"string"==typeof c.endHour&&""!==c.endHour.trim()){let t=b(parseFloat(c.startHour)),n=b(parseFloat(c.endHour));v(e,r,t,n),m(null)}},children:c&&c.employeeId===e&&parseInt(c.startHour,10)<=t&&("string"!=typeof c.endHour||parseInt(c.endHour,10)>t)?(0,i.jsx)("div",{className:w().editingTimeIndicator}):null},t)})]},e))})]})]})]})})]})}},9750:function(e){e.exports={clearButtonContainer:"shiftcomponents_clearButtonContainer__ECrlI",clearButton:"shiftcomponents_clearButton___8Z4S",selectedDaysSection:"shiftcomponents_selectedDaysSection__yhF56",addButton:"shiftcomponents_addButton__fh7Vc",closeButtonContainer:"shiftcomponents_closeButtonContainer__LvZlH",timespace:"shiftcomponents_timespace__T7_sK",shiftsubmitbutton:"shiftcomponents_shiftsubmitbutton__dKqmo",deleteShiftButton:"shiftcomponents_deleteShiftButton__nl2Jt",monthNavigation:"shiftcomponents_monthNavigation___uN0r",navButton:"shiftcomponents_navButton__Xh_I6",calendarDay:"shiftcomponents_calendarDay__qLp0G",dayLabel:"shiftcomponents_dayLabel__MwLE_",logoContainer:"shiftcomponents_logoContainer__OKkJ_",logo:"shiftcomponents_logo__e7T9n",nav:"shiftcomponents_nav__3AOnq",navItem:"shiftcomponents_navItem__ZuEy1",viewOptions:"shiftcomponents_viewOptions__WcyE_",viewButton:"shiftcomponents_viewButton__1LdBU",header:"shiftcomponents_header__qbxjR",holiday:"shiftcomponents_holiday__FbfgS",employeeName:"shiftcomponents_employeeName__LC0kM",redText:"shiftcomponents_redText__8bkvY",clickableRedText:"shiftcomponents_clickableRedText__mdhWc",modalOverlay:"shiftcomponents_modalOverlay__XiSKs",modal:"shiftcomponents_modal__uVezG",editingTime:"shiftcomponents_editingTime__JqDPD",shiftTime:"shiftcomponents_shiftTime__XgAru",timeCell:"shiftcomponents_timeCell__TTJHc",editingTimeIndicator:"shiftcomponents_editingTimeIndicator__5tRF2"}},1374:function(e){e.exports={container:"EmployeeTask_container__v_sj_",table:"EmployeeTask_table__1JDcJ",modalOverlay:"EmployeeTask_modalOverlay__cgzmE",modal:"EmployeeTask_modal__Gyle0",shiftBar:"EmployeeTask_shiftBar__pzGlG",timeTable:"EmployeeTask_timeTable__hRt4i",timeCell:"EmployeeTask_timeCell__eJIjd",shiftTime:"EmployeeTask_shiftTime__NkD_N",editingTimeIndicator:"EmployeeTask_editingTimeIndicator__5crLm",editingTime:"EmployeeTask_editingTime__qfq_N"}}},function(e){e.O(0,[664,774,888,179],function(){return e(e.s=1897)}),_N_E=e.O()}]);