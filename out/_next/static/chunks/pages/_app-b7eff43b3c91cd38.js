(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[636],{6170:(e,t,r)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return r(8034)}])},949:(e,t,r)=>{"use strict";r.d(t,{G:()=>u});var n=r(4848),o=r(1106),a=r.n(o);r(6540);var i=r(6424);function c(e){return new Promise(t=>setTimeout(t,e))}let u=e=>{let{children:t,href:r,...o}=e,u=(0,i.useRouter)(),s=async e=>{e.preventDefault();let t=document.querySelector("body");null==t||t.classList.add("page-transition"),await c(500),u.push(r),await c(500),null==t||t.classList.remove("page-transition")};return(0,n.jsx)(a(),{onClick:s,href:r,...o,children:t})}},6247:(e,t,r)=>{"use strict";function n(){throw Error("`forbidden()` is experimental and only allowed to be enabled when `experimental.authInterrupts` is enabled.")}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"forbidden",{enumerable:!0,get:function(){return n}}),r(3167).HTTP_ERROR_FALLBACK_ERROR_CODE,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},958:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{DynamicServerError:function(){return n},isDynamicServerError:function(){return o}});let r="DYNAMIC_SERVER_USAGE";class n extends Error{constructor(e){super("Dynamic server usage: "+e),this.description=e,this.digest=r}}function o(e){return"object"==typeof e&&null!==e&&"digest"in e&&"string"==typeof e.digest&&e.digest===r}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3750:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{ReadonlyURLSearchParams:function(){return u.ReadonlyURLSearchParams},RedirectType:function(){return u.RedirectType},ServerInsertedHTMLContext:function(){return l.ServerInsertedHTMLContext},forbidden:function(){return u.forbidden},notFound:function(){return u.notFound},permanentRedirect:function(){return u.permanentRedirect},redirect:function(){return u.redirect},unauthorized:function(){return u.unauthorized},unstable_rethrow:function(){return u.unstable_rethrow},useParams:function(){return y},usePathname:function(){return f},useRouter:function(){return p},useSearchParams:function(){return d},useSelectedLayoutSegment:function(){return m},useSelectedLayoutSegments:function(){return h},useServerInsertedHTML:function(){return l.useServerInsertedHTML}});let n=r(6540),o=r(9258),a=r(8519),i=r(4365),c=r(274),u=r(4531),s=r(8228),l=r(465);function d(){let e=(0,n.useContext)(a.SearchParamsContext);return(0,n.useMemo)(()=>e?new u.ReadonlyURLSearchParams(e):null,[e])}function f(){return(0,s.useDynamicRouteParams)("usePathname()"),(0,n.useContext)(a.PathnameContext)}function p(){let e=(0,n.useContext)(o.AppRouterContext);if(null===e)throw Error("invariant expected app router to be mounted");return e}function y(){return(0,s.useDynamicRouteParams)("useParams()"),(0,n.useContext)(a.PathParamsContext)}function h(e){void 0===e&&(e="children"),(0,s.useDynamicRouteParams)("useSelectedLayoutSegments()");let t=(0,n.useContext)(o.LayoutRouterContext);return t?function e(t,r,n,o){let a;if(void 0===n&&(n=!0),void 0===o&&(o=[]),n)a=t[1][r];else{var u;let e=t[1];a=null!=(u=e.children)?u:Object.values(e)[0]}if(!a)return o;let s=a[0],l=(0,i.getSegmentValue)(s);return!l||l.startsWith(c.PAGE_SEGMENT_KEY)?o:(o.push(l),e(a,r,!1,o))}(t.tree,e):null}function m(e){void 0===e&&(e="children"),(0,s.useDynamicRouteParams)("useSelectedLayoutSegment()");let t=h(e);if(!t||0===t.length)return null;let r="children"===e?t[0]:t[t.length-1];return r===c.DEFAULT_SEGMENT_KEY?null:r}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},4531:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{ReadonlyURLSearchParams:function(){return l},RedirectType:function(){return o.RedirectType},forbidden:function(){return i.forbidden},notFound:function(){return a.notFound},permanentRedirect:function(){return n.permanentRedirect},redirect:function(){return n.redirect},unauthorized:function(){return c.unauthorized},unstable_rethrow:function(){return u.unstable_rethrow}});let n=r(8600),o=r(8923),a=r(7966),i=r(6247),c=r(4730),u=r(8542);class s extends Error{constructor(){super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams")}}class l extends URLSearchParams{append(){throw new s}delete(){throw new s}set(){throw new s}sort(){throw new s}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7966:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"notFound",{enumerable:!0,get:function(){return o}});let n=""+r(3167).HTTP_ERROR_FALLBACK_ERROR_CODE+";404";function o(){let e=Error(n);throw e.digest=n,e}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8600:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{getRedirectError:function(){return i},getRedirectStatusCodeFromError:function(){return d},getRedirectTypeFromError:function(){return l},getURLFromRedirectError:function(){return s},permanentRedirect:function(){return u},redirect:function(){return c}});let n=r(7860),o=r(4357),a=r(8923);function i(e,t,r){void 0===r&&(r=o.RedirectStatusCode.TemporaryRedirect);let n=Error(a.REDIRECT_ERROR_CODE);return n.digest=a.REDIRECT_ERROR_CODE+";"+t+";"+e+";"+r+";",n}function c(e,t){let r=n.actionAsyncStorage.getStore();throw i(e,t||((null==r?void 0:r.isAction)?a.RedirectType.push:a.RedirectType.replace),o.RedirectStatusCode.TemporaryRedirect)}function u(e,t){throw void 0===t&&(t=a.RedirectType.replace),i(e,t,o.RedirectStatusCode.PermanentRedirect)}function s(e){return(0,a.isRedirectError)(e)?e.digest.split(";").slice(2,-2).join(";"):null}function l(e){if(!(0,a.isRedirectError)(e))throw Error("Not a redirect error");return e.digest.split(";",2)[1]}function d(e){if(!(0,a.isRedirectError)(e))throw Error("Not a redirect error");return Number(e.digest.split(";").at(-2))}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},4365:(e,t)=>{"use strict";function r(e){return Array.isArray(e)?e[1]:e}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getSegmentValue",{enumerable:!0,get:function(){return r}}),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1480:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{StaticGenBailoutError:function(){return n},isStaticGenBailoutError:function(){return o}});let r="NEXT_STATIC_GEN_BAILOUT";class n extends Error{constructor(...e){super(...e),this.code=r}}function o(e){return"object"==typeof e&&null!==e&&"code"in e&&e.code===r}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},4730:(e,t,r)=>{"use strict";function n(){throw Error("`unauthorized()` is experimental and only allowed to be used when `experimental.authInterrupts` is enabled.")}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"unauthorized",{enumerable:!0,get:function(){return n}}),r(3167).HTTP_ERROR_FALLBACK_ERROR_CODE,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8542:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"unstable_rethrow",{enumerable:!0,get:function(){return function e(t){if((0,i.isNextRouterError)(t)||(0,a.isBailoutToCSRError)(t)||(0,n.isDynamicUsageError)(t)||(0,o.isPostpone)(t))throw t;t instanceof Error&&"cause"in t&&e(t.cause)}}});let n=r(8837),o=r(9222),a=r(8431),i=r(7643);("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5157:(e,t,r)=>{"use strict";function n(e,t,r,n){return!1}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getDomainLocale",{enumerable:!0,get:function(){return n}}),r(2063),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},6397:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return _}});let n=r(7677),o=r(4848),a=n._(r(6540)),i=r(6847),c=r(7785),u=r(2772),s=r(1278),l=r(6185),d=r(7644),f=r(6334),p=r(5157),y=r(296),h=r(1903),m=new Set;function g(e,t,r,n){if((0,c.isLocalURL)(t)){if(!n.bypassPrefetchedCheck){let o=t+"%"+r+"%"+(void 0!==n.locale?n.locale:"locale"in e?e.locale:void 0);if(m.has(o))return;m.add(o)}e.prefetch(t,r,n).catch(e=>{})}}function b(e){return"string"==typeof e?e:(0,u.formatUrl)(e)}let _=a.default.forwardRef(function(e,t){let r,n;let{href:u,as:m,children:_,prefetch:v=null,passHref:j,replace:w,shallow:E,scroll:R,locale:x,onClick:S,onMouseEnter:O,onTouchStart:P,legacyBehavior:D=!1,...M}=e;r=_,D&&("string"==typeof r||"number"==typeof r)&&(r=(0,o.jsx)("a",{children:r}));let A=a.default.useContext(d.RouterContext),k=!1!==v,{href:T,as:C}=a.default.useMemo(()=>{if(!A){let e=b(u);return{href:e,as:m?b(m):e}}let[e,t]=(0,i.resolveHref)(A,u,!0);return{href:e,as:m?(0,i.resolveHref)(A,m):t||e}},[A,u,m]),N=a.default.useRef(T),L=a.default.useRef(C);D&&(n=a.default.Children.only(r));let I=D?n&&"object"==typeof n&&n.ref:t,[U,$,G]=(0,f.useIntersection)({rootMargin:"200px"}),z=a.default.useCallback(e=>{(L.current!==C||N.current!==T)&&(G(),L.current=C,N.current=T),U(e)},[C,T,G,U]),B=(0,h.useMergedRef)(z,I);a.default.useEffect(()=>{A&&$&&k&&g(A,T,C,{locale:x})},[C,T,$,x,k,null==A?void 0:A.locale,A]);let W={ref:B,onClick(e){D||"function"!=typeof S||S(e),D&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(e),A&&!e.defaultPrevented&&function(e,t,r,n,o,a,i,u){let{nodeName:s}=e.currentTarget;"A"===s.toUpperCase()&&(function(e){let t=e.currentTarget.getAttribute("target");return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!(0,c.isLocalURL)(r))||(e.preventDefault(),(()=>{let e=null==i||i;"beforePopState"in t?t[o?"replace":"push"](r,n,{shallow:a,locale:u,scroll:e}):t[o?"replace":"push"](n||r,{scroll:e})})())}(e,A,T,C,w,E,R,x)},onMouseEnter(e){D||"function"!=typeof O||O(e),D&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),A&&g(A,T,C,{locale:x,priority:!0,bypassPrefetchedCheck:!0})},onTouchStart:function(e){D||"function"!=typeof P||P(e),D&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e),A&&g(A,T,C,{locale:x,priority:!0,bypassPrefetchedCheck:!0})}};if((0,s.isAbsoluteUrl)(C))W.href=C;else if(!D||j||"a"===n.type&&!("href"in n.props)){let e=void 0!==x?x:null==A?void 0:A.locale,t=(null==A?void 0:A.isLocaleDomain)&&(0,p.getDomainLocale)(C,e,null==A?void 0:A.locales,null==A?void 0:A.domainLocales);W.href=t||(0,y.addBasePath)((0,l.addLocale)(C,e,null==A?void 0:A.defaultLocale))}return D?a.default.cloneElement(n,W):(0,o.jsx)("a",{...M,...W,children:r})});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},6334:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useIntersection",{enumerable:!0,get:function(){return u}});let n=r(6540),o=r(4959),a="function"==typeof IntersectionObserver,i=new Map,c=[];function u(e){let{rootRef:t,rootMargin:r,disabled:u}=e,s=u||!a,[l,d]=(0,n.useState)(!1),f=(0,n.useRef)(null),p=(0,n.useCallback)(e=>{f.current=e},[]);return(0,n.useEffect)(()=>{if(a){if(s||l)return;let e=f.current;if(e&&e.tagName)return function(e,t,r){let{id:n,observer:o,elements:a}=function(e){let t;let r={root:e.root||null,margin:e.rootMargin||""},n=c.find(e=>e.root===r.root&&e.margin===r.margin);if(n&&(t=i.get(n)))return t;let o=new Map;return t={id:r,observer:new IntersectionObserver(e=>{e.forEach(e=>{let t=o.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)})},e),elements:o},c.push(r),i.set(r,t),t}(r);return a.set(e,t),o.observe(e),function(){if(a.delete(e),o.unobserve(e),0===a.size){o.disconnect(),i.delete(n);let e=c.findIndex(e=>e.root===n.root&&e.margin===n.margin);e>-1&&c.splice(e,1)}}}(e,e=>e&&d(e),{root:null==t?void 0:t.current,rootMargin:r})}else if(!l){let e=(0,o.requestIdleCallback)(()=>d(!0));return()=>(0,o.cancelIdleCallback)(e)}},[s,r,t,l,f.current]),[p,l,(0,n.useCallback)(()=>{d(!1)},[])]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1903:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useMergedRef",{enumerable:!0,get:function(){return o}});let n=r(6540);function o(e,t){let r=(0,n.useRef)(()=>{}),o=(0,n.useRef)(()=>{});return(0,n.useMemo)(()=>e&&t?n=>{null===n?(r.current(),o.current()):(r.current=a(e,n),o.current=a(t,n))}:e||t,[e,t])}function a(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},465:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{ServerInsertedHTMLContext:function(){return o},useServerInsertedHTML:function(){return a}});let n=r(544)._(r(6540)),o=n.default.createContext(null);function a(e){let t=(0,n.useContext)(o);t&&t(e)}},8034:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>O});var n=r(4848);r(3164);var o=r(6540),a=r(1106),i=r.n(a),c=r(3227),u=r.n(c),s={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},l=o.createContext&&o.createContext(s),d=function(){return(d=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},f=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)0>t.indexOf(n[o])&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};function p(e){return function(t){return o.createElement(y,d({attr:d({},e.attr)},t),function e(t){return t&&t.map(function(t,r){return o.createElement(t.tag,d({key:r},t.attr),e(t.child))})}(e.child))}}function y(e){var t=function(t){var r,n=e.attr,a=e.size,i=e.title,c=f(e,["attr","size","title"]),u=a||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),o.createElement("svg",d({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,n,c,{className:r,style:d(d({color:e.color||t.color},t.style),e.style),height:u,width:u,xmlns:"http://www.w3.org/2000/svg"}),i&&o.createElement("title",null,i),e.children)};return void 0!==l?o.createElement(l.Consumer,null,function(e){return t(e)}):t(s)}function h(e){return p({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M480 257.35c0-123.7-100.3-224-224-224s-224 100.3-224 224c0 111.8 81.9 204.47 189 221.29V322.12h-56.89v-64.77H221V208c0-56.13 33.45-87.16 84.61-87.16 24.51 0 50.15 4.38 50.15 4.38v55.13H327.5c-27.81 0-36.51 17.26-36.51 35v42h62.12l-9.92 64.77H291v156.54c107.1-16.81 189-109.48 189-221.31z"}}]})(e)}function m(e){return p({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M349.33 69.33a93.62 93.62 0 0193.34 93.34v186.66a93.62 93.62 0 01-93.34 93.34H162.67a93.62 93.62 0 01-93.34-93.34V162.67a93.62 93.62 0 0193.34-93.34h186.66m0-37.33H162.67C90.8 32 32 90.8 32 162.67v186.66C32 421.2 90.8 480 162.67 480h186.66C421.2 480 480 421.2 480 349.33V162.67C480 90.8 421.2 32 349.33 32z"}},{tag:"path",attr:{d:"M377.33 162.67a28 28 0 1128-28 27.94 27.94 0 01-28 28zM256 181.33A74.67 74.67 0 11181.33 256 74.75 74.75 0 01256 181.33m0-37.33a112 112 0 10112 112 112 112 0 00-112-112z"}}]})(e)}function g(e){return p({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z"}}]})(e)}function b(e){return p({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M412.19 118.66a109.27 109.27 0 01-9.45-5.5 132.87 132.87 0 01-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14 23.9 350 16 350.13 16h-82.44v318.78c0 4.28 0 8.51-.18 12.69 0 .52-.05 1-.08 1.56 0 .23 0 .47-.05.71v.18a70 70 0 01-35.22 55.56 68.8 68.8 0 01-34.11 9c-38.41 0-69.54-31.32-69.54-70s31.13-70 69.54-70a68.9 68.9 0 0121.41 3.39l.1-83.94a153.14 153.14 0 00-118 34.52 161.79 161.79 0 00-35.3 43.53c-3.48 6-16.61 30.11-18.2 69.24-1 22.21 5.67 45.22 8.85 54.73v.2c2 5.6 9.75 24.71 22.38 40.82A167.53 167.53 0 00115 470.66v-.2l.2.2c39.91 27.12 84.16 25.34 84.16 25.34 7.66-.31 33.32 0 62.46-13.81 32.32-15.31 50.72-38.12 50.72-38.12a158.46 158.46 0 0027.64-45.93c7.46-19.61 9.95-43.13 9.95-52.53V176.49c1 .6 14.32 9.41 14.32 9.41s19.19 12.3 49.13 20.31c21.48 5.7 50.42 6.9 50.42 6.9v-81.84c-10.14 1.1-30.73-2.1-51.81-12.61z"}}]})(e)}function _(e){return p({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M508.64 148.79c0-45-33.1-81.2-74-81.2C379.24 65 322.74 64 265 64h-18c-57.6 0-114.2 1-169.6 3.6C36.6 67.6 3.5 104 3.5 149 1 184.59-.06 220.19 0 255.79q-.15 53.4 3.4 106.9c0 45 33.1 81.5 73.9 81.5 58.2 2.7 117.9 3.9 178.6 3.8q91.2.3 178.6-3.8c40.9 0 74-36.5 74-81.5 2.4-35.7 3.5-71.3 3.4-107q.34-53.4-3.26-106.9zM207 353.89v-196.5l145 98.2z"}}]})(e)}function v(){return new Date().getFullYear(),(0,n.jsxs)("div",{id:"section_footer",className:u().footer,children:[(0,n.jsx)("div",{className:u().copyright,children:(0,n.jsx)("p",{children:"RACING TOWARDS THE FUTURE"})}),(0,n.jsxs)("div",{className:u()["social-icons"],children:[(0,n.jsx)(i(),{href:"https://www.facebook.com/",target:"_blank",children:(0,n.jsx)(h,{size:35})}),(0,n.jsx)(i(),{href:"https://www.instagram.com/",target:"_blank",children:(0,n.jsx)(m,{size:35})}),(0,n.jsx)(i(),{href:"https://www.linkedin.com/",target:"_blank",children:(0,n.jsx)(g,{size:35})}),(0,n.jsx)(i(),{href:"https://www.tiktok.com/",target:"_blank",children:(0,n.jsx)(b,{size:35})}),(0,n.jsx)(i(),{href:"https://www.youtube.com/",target:"_blank",children:(0,n.jsx)(_,{size:35})})]})]})}var j=r(8200),w=r.n(j),E=r(949),R=r(6715);function x(){let e=(0,R.useRouter)();return(0,n.jsxs)("nav",{className:w().mynavbar,children:[(0,n.jsx)(E.G,{href:"/",passHref:!0,children:(0,n.jsx)("div",{className:w().logo,children:(0,n.jsx)("img",{src:"/images/home/home.png",alt:"Home Logo"})})}),(0,n.jsxs)("ul",{children:[(0,n.jsx)("li",{className:e.pathname.startsWith("/garage")?w().active:"",children:(0,n.jsx)(E.G,{href:"/garage",children:"GARAGE"})}),(0,n.jsx)("li",{className:e.pathname.startsWith("/team")?w().active:"",children:(0,n.jsx)(E.G,{href:"/team",children:"TEAM"})}),(0,n.jsx)("li",{className:e.pathname.startsWith("/history")?w().active:"",children:(0,n.jsx)(E.G,{href:"/history",children:"HISTORY"})}),(0,n.jsx)("li",{className:e.pathname.startsWith("/news")?w().active:"",children:(0,n.jsx)(E.G,{href:"/news",children:"NEWS"})}),(0,n.jsx)("li",{className:e.pathname.startsWith("/shop")?w().active:"",children:(0,n.jsx)(E.G,{href:"/shop",children:"SHOP"})}),(0,n.jsx)("li",{className:e.pathname.startsWith("/sponsors")?w().active:"",children:(0,n.jsx)(E.G,{href:"/sponsors",children:"SPONSORS"})}),(0,n.jsx)("li",{className:e.pathname.startsWith("/contacts")?w().active:"",children:(0,n.jsx)(E.G,{href:"/contacts",children:"CONTACTS"})})]})]})}function S(e){let{children:t}=e;return(0,n.jsxs)("div",{className:"layout",children:[(0,n.jsx)(x,{}),t,(0,n.jsx)(v,{})]})}let O=function(e){let{Component:t,pageProps:r}=e;return(0,n.jsx)(S,{children:(0,n.jsx)(t,{...r})})}},3164:()=>{},3227:e=>{e.exports={footer:"MyFooter_footer__IoH3g",copyright:"MyFooter_copyright__4dsKW","social-icons":"MyFooter_social-icons__Zj81G"}},8200:e=>{e.exports={mynavbar:"MyNavbar_mynavbar__VcVuZ",logo:"MyNavbar_logo__lBygE",active:"MyNavbar_active__EsHS3"}},8837:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isDynamicUsageError",{enumerable:!0,get:function(){return c}});let n=r(958),o=r(8431),a=r(7643),i=r(8228),c=e=>(0,n.isDynamicServerError)(e)||(0,o.isBailoutToCSRError)(e)||(0,a.isNextRouterError)(e)||(0,i.isDynamicPostpone)(e)},8126:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{METADATA_BOUNDARY_NAME:function(){return r},OUTLET_BOUNDARY_NAME:function(){return o},VIEWPORT_BOUNDARY_NAME:function(){return n}});let r="__next_metadata_boundary__",n="__next_viewport_boundary__",o="__next_outlet_boundary__"},1913:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"actionAsyncStorageInstance",{enumerable:!0,get:function(){return n}});let n=(0,r(8626).createAsyncLocalStorage)()},7860:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"actionAsyncStorage",{enumerable:!0,get:function(){return n.actionAsyncStorageInstance}});let n=r(1913)},8626:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{bindSnapshot:function(){return i},createAsyncLocalStorage:function(){return a},createSnapshot:function(){return c}});let r=Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");class n{disable(){throw r}getStore(){}run(){throw r}exit(){throw r}enterWith(){throw r}static bind(e){return e}}let o="undefined"!=typeof globalThis&&globalThis.AsyncLocalStorage;function a(){return o?new o:new n}function i(e){return o?o.bind(e):n.bind(e)}function c(){return o?o.snapshot():function(e,...t){return e(...t)}}},8228:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{Postpone:function(){return E},abortAndThrowOnSynchronousRequestDataAccess:function(){return j},abortOnSynchronousPlatformIOAccess:function(){return _},accessedDynamicData:function(){return A},annotateDynamicAccess:function(){return L},consumeDynamicAccess:function(){return k},createDynamicTrackingState:function(){return d},createDynamicValidationState:function(){return f},createPostponedAbortSignal:function(){return N},formatDynamicAPIAccesses:function(){return T},getFirstDynamicReason:function(){return p},isDynamicPostpone:function(){return S},isPrerenderInterruptedError:function(){return M},markCurrentScopeAsDynamic:function(){return y},postponeWithTracking:function(){return R},throwIfDisallowedDynamic:function(){return W},throwToInterruptStaticGeneration:function(){return m},trackAllowedDynamicAccess:function(){return B},trackDynamicDataInDynamicRender:function(){return g},trackFallbackParamAccessed:function(){return h},trackSynchronousPlatformIOAccessInDev:function(){return v},trackSynchronousRequestDataAccessInDev:function(){return w},useDynamicRouteParams:function(){return I}});let n=function(e){return e&&e.__esModule?e:{default:e}}(r(6540)),o=r(958),a=r(1480),i=r(3074),c=r(7305),u=r(2249),s=r(8126),l="function"==typeof n.default.unstable_postpone;function d(e){return{isDebugDynamicAccesses:e,dynamicAccesses:[],syncDynamicExpression:void 0,syncDynamicErrorWithStack:null}}function f(){return{hasSuspendedDynamic:!1,hasDynamicMetadata:!1,hasDynamicViewport:!1,hasSyncDynamicErrors:!1,dynamicErrors:[]}}function p(e){var t;return null==(t=e.dynamicAccesses[0])?void 0:t.expression}function y(e,t,r){if((!t||"cache"!==t.type&&"unstable-cache"!==t.type)&&!e.forceDynamic&&!e.forceStatic){if(e.dynamicShouldError)throw new a.StaticGenBailoutError(`Route ${e.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${r}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`);if(t){if("prerender-ppr"===t.type)R(e.route,r,t.dynamicTracking);else if("prerender-legacy"===t.type){t.revalidate=0;let n=new o.DynamicServerError(`Route ${e.route} couldn't be rendered statically because it used ${r}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`);throw e.dynamicUsageDescription=r,e.dynamicUsageStack=n.stack,n}}}}function h(e,t){let r=i.workUnitAsyncStorage.getStore();r&&"prerender-ppr"===r.type&&R(e.route,t,r.dynamicTracking)}function m(e,t,r){let n=new o.DynamicServerError(`Route ${t.route} couldn't be rendered statically because it used \`${e}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`);throw r.revalidate=0,t.dynamicUsageDescription=e,t.dynamicUsageStack=n.stack,n}function g(e,t){t&&"cache"!==t.type&&"unstable-cache"!==t.type&&("prerender"===t.type||"prerender-legacy"===t.type)&&(t.revalidate=0)}function b(e,t,r){let n=D(`Route ${e} needs to bail out of prerendering at this point because it used ${t}.`);r.controller.abort(n);let o=r.dynamicTracking;o&&o.dynamicAccesses.push({stack:o.isDebugDynamicAccesses?Error().stack:void 0,expression:t})}function _(e,t,r,n){let o=n.dynamicTracking;return o&&null===o.syncDynamicErrorWithStack&&(o.syncDynamicExpression=t,o.syncDynamicErrorWithStack=r),b(e,t,n)}function v(e){e.prerenderPhase=!1}function j(e,t,r,n){let o=n.dynamicTracking;throw o&&null===o.syncDynamicErrorWithStack&&(o.syncDynamicExpression=t,o.syncDynamicErrorWithStack=r,!0===n.validating&&(o.syncDynamicLogged=!0)),b(e,t,n),D(`Route ${e} needs to bail out of prerendering at this point because it used ${t}.`)}let w=v;function E({reason:e,route:t}){let r=i.workUnitAsyncStorage.getStore();R(t,e,r&&"prerender-ppr"===r.type?r.dynamicTracking:null)}function R(e,t,r){C(),r&&r.dynamicAccesses.push({stack:r.isDebugDynamicAccesses?Error().stack:void 0,expression:t}),n.default.unstable_postpone(x(e,t))}function x(e,t){return`Route ${e} needs to bail out of prerendering at this point because it used ${t}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`}function S(e){return"object"==typeof e&&null!==e&&"string"==typeof e.message&&O(e.message)}function O(e){return e.includes("needs to bail out of prerendering at this point because it used")&&e.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error")}if(!1===O(x("%%%","^^^")))throw Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js");let P="NEXT_PRERENDER_INTERRUPTED";function D(e){let t=Error(e);return t.digest=P,t}function M(e){return"object"==typeof e&&null!==e&&e.digest===P&&"name"in e&&"message"in e&&e instanceof Error}function A(e){return e.length>0}function k(e,t){return e.dynamicAccesses.push(...t.dynamicAccesses),e.dynamicAccesses}function T(e){return e.filter(e=>"string"==typeof e.stack&&e.stack.length>0).map(({expression:e,stack:t})=>(t=t.split("\n").slice(4).filter(e=>!(e.includes("node_modules/next/")||e.includes(" (<anonymous>)")||e.includes(" (node:"))).join("\n"),`Dynamic API Usage Debug - ${e}:
${t}`))}function C(){if(!l)throw Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js")}function N(e){C();let t=new AbortController;try{n.default.unstable_postpone(e)}catch(e){t.abort(e)}return t.signal}function L(e,t){let r=t.dynamicTracking;r&&r.dynamicAccesses.push({stack:r.isDebugDynamicAccesses?Error().stack:void 0,expression:e})}function I(e){if("undefined"==typeof window){let t=c.workAsyncStorage.getStore();if(t&&t.isStaticGeneration&&t.fallbackRouteParams&&t.fallbackRouteParams.size>0){let r=i.workUnitAsyncStorage.getStore();r&&("prerender"===r.type?n.default.use((0,u.makeHangingPromise)(r.renderSignal,e)):"prerender-ppr"===r.type?R(t.route,e,r.dynamicTracking):"prerender-legacy"===r.type&&m(e,t,r))}}}let U=/\n\s+at Suspense \(<anonymous>\)/,$=RegExp(`\\n\\s+at ${s.METADATA_BOUNDARY_NAME}[\\n\\s]`),G=RegExp(`\\n\\s+at ${s.VIEWPORT_BOUNDARY_NAME}[\\n\\s]`),z=RegExp(`\\n\\s+at ${s.OUTLET_BOUNDARY_NAME}[\\n\\s]`);function B(e,t,r,n,o){if(!z.test(t)){if($.test(t)){r.hasDynamicMetadata=!0;return}if(G.test(t)){r.hasDynamicViewport=!0;return}if(U.test(t)){r.hasSuspendedDynamic=!0;return}if(n.syncDynamicErrorWithStack||o.syncDynamicErrorWithStack){r.hasSyncDynamicErrors=!0;return}else{let n=function(e,t){let r=Error(e);return r.stack="Error: "+e+t,r}(`Route "${e}": A component accessed data, headers, params, searchParams, or a short-lived cache without a Suspense boundary nor a "use cache" above it. We don't have the exact line number added to error messages yet but you can see which component in the stack below. See more info: https://nextjs.org/docs/messages/next-prerender-missing-suspense`,t);r.dynamicErrors.push(n);return}}}function W(e,t,r,n){let o,i,c;if(r.syncDynamicErrorWithStack?(o=r.syncDynamicErrorWithStack,i=r.syncDynamicExpression,c=!0===r.syncDynamicLogged):n.syncDynamicErrorWithStack?(o=n.syncDynamicErrorWithStack,i=n.syncDynamicExpression,c=!0===n.syncDynamicLogged):(o=null,i=void 0,c=!1),t.hasSyncDynamicErrors&&o)throw c||console.error(o),new a.StaticGenBailoutError;let u=t.dynamicErrors;if(u.length){for(let e=0;e<u.length;e++)console.error(u[e]);throw new a.StaticGenBailoutError}if(!t.hasSuspendedDynamic){if(t.hasDynamicMetadata){if(o)throw console.error(o),new a.StaticGenBailoutError(`Route "${e}" has a \`generateMetadata\` that could not finish rendering before ${i} was used. Follow the instructions in the error for this expression to resolve.`);throw new a.StaticGenBailoutError(`Route "${e}" has a \`generateMetadata\` that depends on Request data (\`cookies()\`, etc...) or external data (\`fetch(...)\`, etc...) but the rest of the route was static or only used cached data (\`"use cache"\`). If you expected this route to be prerenderable update your \`generateMetadata\` to not use Request data and only use cached external data. Otherwise, add \`await connection()\` somewhere within this route to indicate explicitly it should not be prerendered.`)}if(t.hasDynamicViewport){if(o)throw console.error(o),new a.StaticGenBailoutError(`Route "${e}" has a \`generateViewport\` that could not finish rendering before ${i} was used. Follow the instructions in the error for this expression to resolve.`);throw new a.StaticGenBailoutError(`Route "${e}" has a \`generateViewport\` that depends on Request data (\`cookies()\`, etc...) or external data (\`fetch(...)\`, etc...) but the rest of the route was static or only used cached data (\`"use cache"\`). If you expected this route to be prerenderable update your \`generateViewport\` to not use Request data and only use cached external data. Otherwise, add \`await connection()\` somewhere within this route to indicate explicitly it should not be prerendered.`)}}}},2528:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"workAsyncStorageInstance",{enumerable:!0,get:function(){return n}});let n=(0,r(8626).createAsyncLocalStorage)()},7305:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"workAsyncStorage",{enumerable:!0,get:function(){return n.workAsyncStorageInstance}});let n=r(2528)},8379:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"workUnitAsyncStorageInstance",{enumerable:!0,get:function(){return n}});let n=(0,r(8626).createAsyncLocalStorage)()},3074:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{getExpectedRequestStore:function(){return o},getPrerenderResumeDataCache:function(){return a},getRenderResumeDataCache:function(){return i},workUnitAsyncStorage:function(){return n.workUnitAsyncStorageInstance}});let n=r(8379);function o(e){let t=n.workUnitAsyncStorageInstance.getStore();if(t){if("request"===t.type)return t;if("prerender"===t.type||"prerender-ppr"===t.type||"prerender-legacy"===t.type)throw Error(`\`${e}\` cannot be called inside a prerender. This is a bug in Next.js.`);if("cache"===t.type)throw Error(`\`${e}\` cannot be called inside "use cache". Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/messages/next-request-in-use-cache`);if("unstable-cache"===t.type)throw Error(`\`${e}\` cannot be called inside unstable_cache. Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`)}throw Error(`\`${e}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`)}function a(e){return"prerender"===e.type||"prerender-ppr"===e.type?e.prerenderResumeDataCache:null}function i(e){return"prerender-legacy"!==e.type&&"cache"!==e.type&&"unstable-cache"!==e.type?"request"===e.type?e.renderResumeDataCache:e.prerenderResumeDataCache:null}},2249:(e,t)=>{"use strict";function r(e,t){let r=new Promise((r,n)=>{e.addEventListener("abort",()=>{n(Error(`During prerendering, ${t} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${t} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context.`))},{once:!0})});return r.catch(n),r}function n(){}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"makeHangingPromise",{enumerable:!0,get:function(){return r}})},9222:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isPostpone",{enumerable:!0,get:function(){return n}});let r=Symbol.for("react.postpone");function n(e){return"object"==typeof e&&null!==e&&e.$$typeof===r}},1106:(e,t,r)=>{e.exports=r(6397)},6424:(e,t,r)=>{e.exports=r(3750)},6715:(e,t,r)=>{e.exports=r(8440)}},e=>{var t=t=>e(e.s=t);e.O(0,[593,792],()=>(t(6170),t(8440))),_N_E=e.O()}]);