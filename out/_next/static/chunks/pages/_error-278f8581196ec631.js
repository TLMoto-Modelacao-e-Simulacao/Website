(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[731],{6194:(e,t,r)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/_error",function(){return r(6090)}])},6090:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return c}});let o=r(7677),i=r(4848),n=o._(r(6540)),l=o._(r(6085)),s={400:"Bad Request",404:"This page could not be found",405:"Method Not Allowed",500:"Internal Server Error"};function d(e){let{res:t,err:r}=e;return{statusCode:t&&t.statusCode?t.statusCode:r?r.statusCode:404}}let a={error:{fontFamily:'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{lineHeight:"48px"},h1:{display:"inline-block",margin:"0 20px 0 0",paddingRight:23,fontSize:24,fontWeight:500,verticalAlign:"top"},h2:{fontSize:14,fontWeight:400,lineHeight:"28px"},wrap:{display:"inline-block"}};class c extends n.default.Component{render(){let{statusCode:e,withDarkMode:t=!0}=this.props,r=this.props.title||s[e]||"An unexpected error has occurred";return(0,i.jsxs)("div",{style:a.error,children:[(0,i.jsx)(l.default,{children:(0,i.jsx)("title",{children:e?e+": "+r:"Application error: a client-side exception has occurred"})}),(0,i.jsxs)("div",{style:a.desc,children:[(0,i.jsx)("style",{dangerouslySetInnerHTML:{__html:"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}"+(t?"@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}":"")}}),e?(0,i.jsx)("h1",{className:"next-error-h1",style:a.h1,children:e}):null,(0,i.jsx)("div",{style:a.wrap,children:(0,i.jsxs)("h2",{style:a.h2,children:[this.props.title||e?r:(0,i.jsx)(i.Fragment,{children:"Application error: a client-side exception has occurred (see the browser console for more information)"}),"."]})})]})]})}}c.displayName="ErrorPage",c.getInitialProps=d,c.origGetInitialProps=d,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)}},e=>{var t=t=>e(e.s=t);e.O(0,[636,593,792],()=>t(6194)),_N_E=e.O()}]);