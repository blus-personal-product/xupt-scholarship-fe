import{r as e,C as m,E as n,_ as s,z as p}from"./vendor-8198df31.js";import{s as a,C as i,A as d}from"./index-2ac29698.js";import"./index-5474f163.js";const l=u=>{const{title:c,processInfoList:r}=u;return e.exports.createElement(m,{className:a["process-step-card"],title:e.exports.createElement("div",{className:a["card-box-title"]},r.length?null:"\u5F53\u524D\u5904\u7406\u6D41\u7A0B")},r.length?r.map(t=>e.exports.createElement(s,{key:t.step,title:e.exports.createElement("div",{className:a["card-title"]},c),bordered:!0,column:{xxl:4,xl:3,lg:3,md:3,sm:2,xs:1}},e.exports.createElement(s.Item,{label:"\u5F53\u524D\u6D41\u7A0B"},t.step),e.exports.createElement(s.Item,{label:"\u5904\u7406\u65F6\u957F"},t.date[0]),e.exports.createElement(s.Item,{label:"\u5904\u7406\u4EBA"},t.manager.map(o=>o.name).join(",")),e.exports.createElement(s.Item,{label:"\u9884\u671F\u5904\u7406\u622A\u81F3\u65F6\u95F4"},t.date[1]),e.exports.createElement(s.Item,{label:"\u5F53\u524D\u5904\u7406\u6BD4\u4F8B"},t.processingRatio),e.exports.createElement(s.Item,{label:"\u65E5\u5904\u7406\u901F\u7387"},t.dailyProcessingRate),e.exports.createElement(s.Item,{label:"\u6D41\u7A0B\u63CF\u8FF0"},t.desc))):e.exports.createElement(n,null))};l.defaultProps={processInfoList:[{step:"deployment_mobilization_phase",date:i,manager:[{name:"-",email:"-",avatar:"-"}],processingRatio:"0/0",dailyProcessingRate:0,desc:""}]};const B=()=>e.exports.createElement(p,{direction:"vertical",className:a["process-card-space"],size:"large"},e.exports.createElement(l,{title:"\u5F53\u524D\u6D41\u7A0B\u72B6\u6001",processInfoList:[]}),e.exports.createElement(d,{title:"\u8BC4\u5B9A\u603B\u6D41\u7A0B",currentStep:"first_class_announcement"}));export{B as default};
//# sourceMappingURL=index-53fb4587.js.map
