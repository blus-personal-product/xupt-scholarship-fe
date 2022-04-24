var A=Object.defineProperty;var m=Object.getOwnPropertySymbols;var C=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable;var x=(t,e,s)=>e in t?A(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s,b=(t,e)=>{for(var s in e||(e={}))C.call(e,s)&&x(t,s,e[s]);if(m)for(var s of m(e))E.call(e,s)&&x(t,s,e[s]);return t};import{r,C as L,d as n,m as P}from"./vendor-53f28a41.js";import{s as j,g as _,S as d,L as F,E as O}from"./style.module-22f9f897.js";import{a as D,g as M}from"./index-74bab682.js";import{D as g}from"./time-a4cc2158.js";const T=t=>{var s,c;const e=[{color:"#08979c",background:"#e6fffb",borderColor:"#87e8de"},{color:"#096dd9",background:"#e6f7ff",borderColor:"#91d5ff"},{color:"#531dab",background:"#f9f0ff",borderColor:"#d3adf7"}];return`
    <div style="width: 320px;">
      <div style="display:flex;">
        <h4 style="font-weight: 600;">${t.title}</h4>
        <h5
        style="box-shadow:1px 1px 4px #aaa;font-weight: 550;background: ${(s=d[t.status])==null?void 0:s.color};border: 1px solid ${(c=d[t.status])==null?void 0:c.border};padding: 0px 4px;margin-left: 8px;border-radius: 2px;"
        >${d[t.status].text}</h5>
      </div>
      <div style="display: flex;justify-content: space-between;border-bottom: 1px solid #aaa;padding-bottom: 8px;margin: 4px 0;">
        <span>\u65F6\u95F4\uFF1A${t.date[0]}~${t.date[1]}</span>
        <ul style="list-style: none;display: flex;">
          ${t.responsible_department.map((l,o)=>`
            <li
              style="margin: 0 4px;background: ${e[o%3].background};color: ${e[o%3].color};border-radius: 2px;box-shadow:1px 1px 4px #ccc;border: 1px solid ${e[o%3].borderColor};width: fit-content;padding: 0px 4px;"
              key="${l}-${o}"
            >
              ${l}
            </li>
          `).join(`
`)}
        </ul>
      </div>
      <p style="width: 100%;white-space: normal;">${t.desc}</p>   
    </div>
  `},z=t=>{const{title:e}=t,{process_id:s}=D(),[c,l]=r.exports.useState(),o=r.exports.useMemo(()=>_(c),[c]),y=r.exports.useMemo(()=>({title:{text:e},tooltip:{formatter:a=>{const{data:u}=a;return T(u)}},animationDurationUpdate:1500,animationEasingUpdate:"quinticInOut",series:[{type:"graph",layout:"none",symbolSize:64,label:{show:!0,overflow:"breakAll",width:56,formatter:a=>a.data.title},edgeSymbol:["circle","arrow"],edgeSymbolSize:[4,10],edgeLabel:{fontSize:20},data:o,links:F,lineStyle:{opacity:.9,width:2,curveness:0}}]}),[o]),h=["not_start","in_progress","completed","backtracking","error"],w=async()=>{try{const S=(await M(s)).form.form.reduce((f,p)=>{const[$,k]=p.date||[],i=[n($,g),n(k,g)],v=[i[0]>n(),i[0]<n()&&i[1]>n(),i[1]<n()];return f[p.step]={date:p.date,status:h[v.indexOf(!0)]},f},{});l(S)}catch(a){P.error(a.message)}finally{}};return r.exports.useEffect(()=>{w()},[s]),r.exports.createElement(O,{option:y})},H=t=>r.exports.createElement(L,{className:j["process-step-card"]},r.exports.createElement(z,b({},t)));export{H as A,z as a};
//# sourceMappingURL=index-35361678.js.map
