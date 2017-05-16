!function(){"use strict";function e(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function t(e){return"string"!=typeof e&&(e=String(e)),e}function r(e){this.map={},e instanceof r?e.forEach(function(e,t){this.append(t,e)},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}function n(e){return e.bodyUsed?Promise.reject(new TypeError("Already read")):void(e.bodyUsed=!0)}function o(e){return new Promise(function(t,r){e.onload=function(){t(e.result)},e.onerror=function(){r(e.error)}})}function i(e){var t=new FileReader;return t.readAsArrayBuffer(e),o(t)}function s(e){var t=new FileReader;return t.readAsText(e),o(t)}function a(){return this.bodyUsed=!1,this._initBody=function(e){if(this._bodyInit=e,"string"==typeof e)this._bodyText=e;else if(h.blob&&Blob.prototype.isPrototypeOf(e))this._bodyBlob=e;else if(h.formData&&FormData.prototype.isPrototypeOf(e))this._bodyFormData=e;else if(e){if(!h.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(e))throw new Error("unsupported BodyInit type")}else this._bodyText=""},h.blob?(this.blob=function(){var e=n(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this.blob().then(i)},this.text=function(){var e=n(this);if(e)return e;if(this._bodyBlob)return s(this._bodyBlob);if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)}):this.text=function(){var e=n(this);return e?e:Promise.resolve(this._bodyText)},h.formData&&(this.formData=function(){return this.text().then(f)}),this.json=function(){return this.text().then(JSON.parse)},this}function u(e){var t=e.toUpperCase();return p.indexOf(t)>-1?t:e}function c(e,t){t=t||{};var n=t.body;if(c.prototype.isPrototypeOf(e)){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new r(e.headers)),this.method=e.method,this.mode=e.mode,n||(n=e._bodyInit,e.bodyUsed=!0)}else this.url=e;if(this.credentials=t.credentials||this.credentials||"omit",!t.headers&&this.headers||(this.headers=new r(t.headers)),this.method=u(t.method||this.method||"GET"),this.mode=t.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function f(e){var t=new FormData;return e.trim().split("&").forEach(function(e){if(e){var r=e.split("="),n=r.shift().replace(/\+/g," "),o=r.join("=").replace(/\+/g," ");t.append(decodeURIComponent(n),decodeURIComponent(o))}}),t}function l(e){var t=new r,n=e.getAllResponseHeaders().trim().split("\n");return n.forEach(function(e){var r=e.trim().split(":"),n=r.shift().trim(),o=r.join(":").trim();t.append(n,o)}),t}function d(e,t){t||(t={}),this._initBody(e),this.type="default",this.status=t.status,this.ok=this.status>=200&&this.status<300,this.statusText=t.statusText,this.headers=t.headers instanceof r?t.headers:new r(t.headers),this.url=t.url||""}if(!self.fetch){r.prototype.append=function(r,n){r=e(r),n=t(n);var o=this.map[r];o||(o=[],this.map[r]=o),o.push(n)},r.prototype.delete=function(t){delete this.map[e(t)]},r.prototype.get=function(t){var r=this.map[e(t)];return r?r[0]:null},r.prototype.getAll=function(t){return this.map[e(t)]||[]},r.prototype.has=function(t){return this.map.hasOwnProperty(e(t))},r.prototype.set=function(r,n){this.map[e(r)]=[t(n)]},r.prototype.forEach=function(e,t){Object.getOwnPropertyNames(this.map).forEach(function(r){this.map[r].forEach(function(n){e.call(t,n,r,this)},this)},this)};var h={blob:"FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(e){return!1}}(),formData:"FormData"in self,arrayBuffer:"ArrayBuffer"in self},p=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];c.prototype.clone=function(){return new c(this)},a.call(c.prototype),a.call(d.prototype),d.prototype.clone=function(){return new d(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new r(this.headers),url:this.url})},d.error=function(){var e=new d(null,{status:0,statusText:""});return e.type="error",e};var y=[301,302,303,307,308];d.redirect=function(e,t){if(y.indexOf(t)===-1)throw new RangeError("Invalid status code");return new d(null,{status:t,headers:{location:e}})},self.Headers=r,self.Request=c,self.Response=d,self.fetch=function(e,t){return new Promise(function(r,n){function o(){return"responseURL"in s?s.responseURL:/^X-Request-URL:/m.test(s.getAllResponseHeaders())?s.getResponseHeader("X-Request-URL"):void 0}var i;i=c.prototype.isPrototypeOf(e)&&!t?e:new c(e,t);var s=new XMLHttpRequest;s.onload=function(){var e=1223===s.status?204:s.status;if(e<100||e>599)return void n(new TypeError("Network request failed"));var t={status:e,statusText:s.statusText,headers:l(s),url:o()},i="response"in s?s.response:s.responseText;r(new d(i,t))},s.onerror=function(){n(new TypeError("Network request failed"))},s.open(i.method,i.url,!0),"include"===i.credentials&&(s.withCredentials=!0),"responseType"in s&&h.blob&&(s.responseType="blob"),i.headers.forEach(function(e,t){s.setRequestHeader(t,e)}),s.send("undefined"==typeof i._bodyInit?null:i._bodyInit)})},self.fetch.polyfill=!0}}(),function(){"use strict";function e(e){return"function"==typeof e||"object"==typeof e&&null!==e}function t(e){return"function"==typeof e}function r(e){return"object"==typeof e&&null!==e}function n(e){U=e}function o(e){W=e}function i(){return function(){process.nextTick(f)}}function s(){return function(){L(f)}}function a(){var e=0,t=new z(f),r=document.createTextNode("");return t.observe(r,{characterData:!0}),function(){r.data=e=++e%2}}function u(){var e=new MessageChannel;return e.port1.onmessage=f,function(){e.port2.postMessage(0)}}function c(){return function(){setTimeout(f,1)}}function f(){for(var e=0;e<X;e+=2){var t=Q[e],r=Q[e+1];t(r),Q[e]=void 0,Q[e+1]=void 0}X=0}function l(){try{var e=require,t=e("vertx");return L=t.runOnLoop||t.runOnContext,s()}catch(e){return c()}}function d(){}function h(){return new TypeError("You cannot resolve a promise with itself")}function p(){return new TypeError("A promises callback cannot return that same promise.")}function y(e){try{return e.then}catch(e){return te.error=e,te}}function b(e,t,r,n){try{e.call(t,r,n)}catch(e){return e}}function v(e,t,r){W(function(e){var n=!1,o=b(r,t,function(r){n||(n=!0,t!==r?w(e,r):A(e,r))},function(t){n||(n=!0,T(e,t))},"Settle: "+(e._label||" unknown promise"));!n&&o&&(n=!0,T(e,o))},e)}function m(e,t){t._state===Z?A(e,t._result):t._state===ee?T(e,t._result):E(t,void 0,function(t){w(e,t)},function(t){T(e,t)})}function g(e,r){if(r.constructor===e.constructor)m(e,r);else{var n=y(r);n===te?T(e,te.error):void 0===n?A(e,r):t(n)?v(e,r,n):A(e,r)}}function w(t,r){t===r?T(t,h()):e(r)?g(t,r):A(t,r)}function _(e){e._onerror&&e._onerror(e._result),x(e)}function A(e,t){e._state===V&&(e._result=t,e._state=Z,0!==e._subscribers.length&&W(x,e))}function T(e,t){e._state===V&&(e._state=ee,e._result=t,W(_,e))}function E(e,t,r,n){var o=e._subscribers,i=o.length;e._onerror=null,o[i]=t,o[i+Z]=r,o[i+ee]=n,0===i&&e._state&&W(x,e)}function x(e){var t=e._subscribers,r=e._state;if(0!==t.length){for(var n,o,i=e._result,s=0;s<t.length;s+=3)n=t[s],o=t[s+r],n?B(r,n,o,i):o(i);e._subscribers.length=0}}function O(){this.error=null}function j(e,t){try{return e(t)}catch(e){return re.error=e,re}}function B(e,r,n,o){var i,s,a,u,c=t(n);if(c){if(i=j(n,o),i===re?(u=!0,s=i.error,i=null):a=!0,r===i)return void T(r,p())}else i=o,a=!0;r._state!==V||(c&&a?w(r,i):u?T(r,s):e===Z?A(r,i):e===ee&&T(r,i))}function P(e,t){try{t(function(t){w(e,t)},function(t){T(e,t)})}catch(t){T(e,t)}}function D(e,t){var r=this;r._instanceConstructor=e,r.promise=new e(d),r._validateInput(t)?(r._input=t,r.length=t.length,r._remaining=t.length,r._init(),0===r.length?A(r.promise,r._result):(r.length=r.length||0,r._enumerate(),0===r._remaining&&A(r.promise,r._result))):T(r.promise,r._validationError())}function I(e){return new ne(this,e).promise}function C(e){function t(e){w(o,e)}function r(e){T(o,e)}var n=this,o=new n(d);if(!G(e))return T(o,new TypeError("You must pass an array to race.")),o;for(var i=e.length,s=0;o._state===V&&s<i;s++)E(n.resolve(e[s]),void 0,t,r);return o}function M(e){var t=this;if(e&&"object"==typeof e&&e.constructor===t)return e;var r=new t(d);return w(r,e),r}function R(e){var t=this,r=new t(d);return T(r,e),r}function S(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function F(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function N(e){this._id=ue++,this._state=void 0,this._result=void 0,this._subscribers=[],d!==e&&(t(e)||S(),this instanceof N||F(),P(this,e))}function H(){var e;if("undefined"!=typeof global)e=global;else if("undefined"!=typeof self)e=self;else try{e=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var t=e.Promise;t&&"[object Promise]"===Object.prototype.toString.call(t.resolve())&&!t.cast||(e.Promise=ce)}var q;q=Array.isArray?Array.isArray:function(e){return"[object Array]"===Object.prototype.toString.call(e)};var L,U,k,G=q,X=0,W=({}.toString,function(e,t){Q[X]=e,Q[X+1]=t,X+=2,2===X&&(U?U(f):k())}),K="undefined"!=typeof window?window:void 0,Y=K||{},z=Y.MutationObserver||Y.WebKitMutationObserver,J="undefined"!=typeof process&&"[object process]"==={}.toString.call(process),$="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,Q=new Array(1e3);k=J?i():z?a():$?u():void 0===K&&"function"==typeof require?l():c();var V=void 0,Z=1,ee=2,te=new O,re=new O;D.prototype._validateInput=function(e){return G(e)},D.prototype._validationError=function(){return new Error("Array Methods must be provided an Array")},D.prototype._init=function(){this._result=new Array(this.length)};var ne=D;D.prototype._enumerate=function(){for(var e=this,t=e.length,r=e.promise,n=e._input,o=0;r._state===V&&o<t;o++)e._eachEntry(n[o],o)},D.prototype._eachEntry=function(e,t){var n=this,o=n._instanceConstructor;r(e)?e.constructor===o&&e._state!==V?(e._onerror=null,n._settledAt(e._state,t,e._result)):n._willSettleAt(o.resolve(e),t):(n._remaining--,n._result[t]=e)},D.prototype._settledAt=function(e,t,r){var n=this,o=n.promise;o._state===V&&(n._remaining--,e===ee?T(o,r):n._result[t]=r),0===n._remaining&&A(o,n._result)},D.prototype._willSettleAt=function(e,t){var r=this;E(e,void 0,function(e){r._settledAt(Z,t,e)},function(e){r._settledAt(ee,t,e)})};var oe=I,ie=C,se=M,ae=R,ue=0,ce=N;N.all=oe,N.race=ie,N.resolve=se,N.reject=ae,N._setScheduler=n,N._setAsap=o,N._asap=W,N.prototype={constructor:N,then:function(e,t){var r=this,n=r._state;if(n===Z&&!e||n===ee&&!t)return this;var o=new this.constructor(d),i=r._result;if(n){var s=arguments[n-1];W(function(){B(n,o,s,i)})}else E(r,o,e,t);return o},catch:function(e){return this.then(null,e)}};var fe=H,le={Promise:ce,polyfill:fe};"function"==typeof define&&define.amd?define(function(){return le}):"undefined"!=typeof module&&module.exports?module.exports=le:"undefined"!=typeof this&&(this.ES6Promise=le),fe()}.call(this),function(){Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:function(e){"use strict";if(void 0===e||null===e)throw new TypeError("Cannot convert first argument to object");for(var t=Object(e),r=1;r<arguments.length;r++){var n=arguments[r];if(void 0!==n&&null!==n){n=Object(n);for(var o=Object.keys(Object(n)),i=0,s=o.length;i<s;i++){var a=o[i],u=Object.getOwnPropertyDescriptor(n,a);void 0!==u&&u.enumerable&&(t[a]=n[a])}}}return t}})}(),function(){Array.prototype.find||Object.defineProperty(Array.prototype,"find",{enumerable:!1,configurable:!0,writable:!0,value:function(e){if(null===this)throw new TypeError("Array.prototype.find called on null or undefined");if("function"!=typeof e)throw new TypeError("predicate must be a function");for(var t,r=Object(this),n=r.length>>>0,o=arguments[1],i=0;i<n;i++)if(t=r[i],e.call(o,t,i,r))return t}})}(),function(){Array.prototype.findIndex||Object.defineProperty(Array.prototype,"findIndex",{enumerable:!1,configurable:!0,writable:!0,value:function(e){if(null==this)throw new TypeError("Array.prototype.findIndex called on null or undefined");if("function"!=typeof e)throw new TypeError("predicate must be a function");for(var t,r=Object(this),n=r.length>>>0,o=arguments[1],i=0;i<n;i++)if(t=r[i],e.call(o,t,i,r))return i;return-1}})}(),function(){Array.prototype.fill||Object.defineProperty(Array.prototype,"fill",{enumerable:!1,configurable:!0,writable:!0,value:function(e){if(null==this)throw new TypeError("this is null or not defined");for(var t=Object(this),r=t.length>>>0,n=arguments[1],o=n>>0,i=o<0?Math.max(r+o,0):Math.min(o,r),s=arguments[2],a=void 0===s?r:s>>0,u=a<0?Math.max(r+a,0):Math.min(a,r);i<u;)t[i]=e,i++;return t}})}(),function(){Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{enumerable:!1,configurable:!0,writable:!0,value:function(e){"use strict";var t=Object(this),r=parseInt(t.length)||0;if(0===r)return!1;var n,o=parseInt(arguments[1])||0;o>=0?n=o:(n=r+o,n<0&&(n=0));for(var i;n<r;){if(i=t[n],e===i||e!==e&&i!==i)return!0;n++}return!1}})}(),!function(e,t){"function"==typeof define&&define.amd?define([],function(){return e.svg4everybody=t()}):"object"==typeof exports?module.exports=t():e.svg4everybody=t()}(this,function(){function e(e,t){if(t){var r=document.createDocumentFragment(),n=!e.getAttribute("viewBox")&&t.getAttribute("viewBox");n&&e.setAttribute("viewBox",n);for(var o=t.cloneNode(!0);o.childNodes.length;)r.appendChild(o.firstChild);e.appendChild(r)}}function t(t){t.onreadystatechange=function(){if(4===t.readyState){var r=t._cachedDocument;r||(r=t._cachedDocument=document.implementation.createHTMLDocument(""),r.body.innerHTML=t.responseText,t._cachedTarget={}),t._embeds.splice(0).map(function(n){var o=t._cachedTarget[n.id];o||(o=t._cachedTarget[n.id]=r.getElementById(n.id)),e(n.svg,o)})}},t.onreadystatechange()}function r(r){function n(){for(var r=0;r<l.length;){var s=l[r],a=s.parentNode;if(a&&/svg/i.test(a.nodeName)){var u=s.getAttribute("xlink:href");if(o&&(!i.validate||i.validate(u,a,s))){a.removeChild(s);var d=u.split("#"),h=d.shift(),p=d.join("#");if(h.length){var y=c[h];y||(y=c[h]=new XMLHttpRequest,y.open("GET",h),y.send(),y._embeds=[]),y._embeds.push({svg:a,id:p}),t(y)}else e(a,document.getElementById(p))}}else++r}f(n,67)}var o,i=Object(r),s=/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,a=/\bAppleWebKit\/(\d+)\b/,u=/\bEdge\/12\.(\d+)\b/;o="polyfill"in i?i.polyfill:s.test(navigator.userAgent)||(navigator.userAgent.match(u)||[])[1]<10547||(navigator.userAgent.match(a)||[])[1]<537;var c={},f=window.requestAnimationFrame||setTimeout,l=document.getElementsByTagName("use");o&&n()}return r}),!function(e,t){"function"==typeof define&&define.amd?define([],function(){return e.svg4everybody=t()}):"object"==typeof exports?module.exports=t():e.svg4everybody=t()}(this,function(){function e(e,t){if(t){var r=document.createDocumentFragment(),n=!e.getAttribute("viewBox")&&t.getAttribute("viewBox");n&&e.setAttribute("viewBox",n);for(var o=t.cloneNode(!0);o.childNodes.length;)r.appendChild(o.firstChild);e.appendChild(r)}}function t(t){t.onreadystatechange=function(){if(4===t.readyState){var r=t._cachedDocument;r||(r=t._cachedDocument=document.implementation.createHTMLDocument(""),r.body.innerHTML=t.responseText,t._cachedTarget={}),t._embeds.splice(0).map(function(n){var o=t._cachedTarget[n.id];o||(o=t._cachedTarget[n.id]=r.getElementById(n.id)),e(n.svg,o)})}},t.onreadystatechange()}function r(r){function n(){for(var r=0;r<p.length;){var u=p[r],c=u.parentNode;if(c&&/svg/i.test(c.nodeName)){var f=u.getAttribute("xlink:href");if(o){var l=document.createElement("img");l.style.cssText="display:inline-block;height:100%;width:100%",l.setAttribute("width",c.getAttribute("width")||c.clientWidth),l.setAttribute("height",c.getAttribute("height")||c.clientHeight),l.src=i(f,c,u),c.replaceChild(l,u)}else if(a&&(!s.validate||s.validate(f,c,u))){c.removeChild(u);var y=f.split("#"),b=y.shift(),v=y.join("#");if(b.length){var m=d[b];m||(m=d[b]=new XMLHttpRequest,m.open("GET",b),m.send(),m._embeds=[]),m._embeds.push({svg:c,id:v}),t(m)}else e(c,document.getElementById(v))}}else++r}h(n,67)}var o,i,s=Object(r);i=s.fallback||function(e){return e.replace(/\?[^#]+/,"").replace("#",".").replace(/^\./,"")+".png"+(/\?[^#]+/.exec(e)||[""])[0]},o="nosvg"in s?s.nosvg:/\bMSIE [1-8]\b/.test(navigator.userAgent),o&&(document.createElement("svg"),document.createElement("use"));var a,u=/\bMSIE [1-8]\.0\b/,c=/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,f=/\bAppleWebKit\/(\d+)\b/,l=/\bEdge\/12\.(\d+)\b/;a="polyfill"in s?s.polyfill:u.test(navigator.userAgent)||c.test(navigator.userAgent)||(navigator.userAgent.match(l)||[])[1]<10547||(navigator.userAgent.match(f)||[])[1]<537;var d={},h=window.requestAnimationFrame||setTimeout,p=document.getElementsByTagName("use");a&&n()}return r}),svg4everybody();
//# sourceMappingURL=polyfill-generated.js.map
