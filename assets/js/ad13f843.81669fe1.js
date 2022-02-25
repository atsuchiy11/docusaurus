"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8681],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return v}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),m=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=m(e.components);return r.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=m(n),v=i,d=p["".concat(s,".").concat(v)]||p[v]||c[v]||a;return n?r.createElement(d,o(o({ref:t},u),{},{components:n})):r.createElement(d,o({ref:t},u))}));function v(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=p;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var m=2;m<a;m++)o[m]=n[m];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},5791:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return m},toc:function(){return u},default:function(){return p}});var r=n(7462),i=n(3366),a=(n(7294),n(3905)),o=["components"],l={sidebar_position:2},s="EventEmitter",m={unversionedId:"nodejs/events",id:"nodejs/events",title:"EventEmitter",description:"- Node.js \u306b\u304a\u3051\u308b Observer \u30d1\u30bf\u30fc\u30f3\u3092\u5b9f\u88c5\u3059\u308b\u305f\u3081\u306e\u30e2\u30b8\u30e5\u30fc\u30eb",source:"@site/docs/nodejs/events.md",sourceDirName:"nodejs",slug:"/nodejs/events",permalink:"/docusaurus/docs/nodejs/events",editUrl:"https://github.com/prime-x-co-ltd/jamstack-js-tutorial/tree/main/docs/nodejs/events.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"\u975e\u540c\u671f\u30d7\u30ed\u30b0\u30e9\u30df\u30f3\u30b0",permalink:"/docusaurus/docs/nodejs/async"},next:{title:"\u30b9\u30c8\u30ea\u30fc\u30e0",permalink:"/docusaurus/docs/nodejs/stream"}},u=[{value:"\u30e1\u30bd\u30c3\u30c9",id:"\u30e1\u30bd\u30c3\u30c9",children:[],level:2},{value:"FizBuzz \u306e\u5b9f\u88c5",id:"fizbuzz-\u306e\u5b9f\u88c5",children:[{value:"\u30a4\u30d9\u30f3\u30c8\u306f\u540c\u671f\u7684\u306b\u5b9f\u884c\u3055\u308c\u308b",id:"\u30a4\u30d9\u30f3\u30c8\u306f\u540c\u671f\u7684\u306b\u5b9f\u884c\u3055\u308c\u308b",children:[],level:3},{value:"\u30ea\u30b9\u30ca\u306f\u540c\u671f\u7684\u306b\u5b9f\u884c\u3055\u308c\u308b",id:"\u30ea\u30b9\u30ca\u306f\u540c\u671f\u7684\u306b\u5b9f\u884c\u3055\u308c\u308b",children:[],level:3},{value:"\u30ea\u30b9\u30ca\u306f\u30ac\u30d9\u30fc\u30b8\u30b3\u30ec\u30af\u30b7\u30e7\u30f3\u306e\u5bfe\u8c61\u5916",id:"\u30ea\u30b9\u30ca\u306f\u30ac\u30d9\u30fc\u30b8\u30b3\u30ec\u30af\u30b7\u30e7\u30f3\u306e\u5bfe\u8c61\u5916",children:[],level:3},{value:"\u30a8\u30e9\u30fc\u30cf\u30f3\u30c9\u30ea\u30f3\u30b0",id:"\u30a8\u30e9\u30fc\u30cf\u30f3\u30c9\u30ea\u30f3\u30b0",children:[],level:3},{value:"\u7d99\u627f",id:"\u7d99\u627f",children:[],level:3},{value:"async \u3092\u4f7f\u3046",id:"async-\u3092\u4f7f\u3046",children:[],level:3},{value:"Promise \u3092\u4f7f\u3046",id:"promise-\u3092\u4f7f\u3046",children:[],level:3}],level:2}],c={toc:u};function p(e){var t=e.components,n=(0,i.Z)(e,o);return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"eventemitter"},"EventEmitter"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Node.js \u306b\u304a\u3051\u308b Observer \u30d1\u30bf\u30fc\u30f3\u3092\u5b9f\u88c5\u3059\u308b\u305f\u3081\u306e\u30e2\u30b8\u30e5\u30fc\u30eb"),(0,a.kt)("li",{parentName:"ul"},"\u76e3\u8996\u5bfe\u8c61\uff08",(0,a.kt)("inlineCode",{parentName:"li"},"Subject"),"\uff09\u306b\u5bfe\u3057\u3066\u767a\u751f\u3057\u305f\u4f55\u3089\u304b\u306e\u30a4\u30d9\u30f3\u30c8\u304c\u3001\u76e3\u8996\u5f79\uff08",(0,a.kt)("inlineCode",{parentName:"li"},"Observer"),"\uff09\u306b\u9010\u4e00\u901a\u77e5\u3055\u308c\u308b"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"Subject"),"\u306b\u306f\u8907\u6570\u306e",(0,a.kt)("inlineCode",{parentName:"li"},"Observer"),"\u3092\u767b\u9332\u3067\u304d\u308b"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"EventEmitter"),"\u81ea\u4f53\u306f",(0,a.kt)("inlineCode",{parentName:"li"},"Subject"),"\u3068\u3057\u3066\u6a5f\u80fd\u3057\u3001\u30ea\u30b9\u30ca\u304c",(0,a.kt)("inlineCode",{parentName:"li"},"Observer"),"\u3068\u3057\u3066\u6a5f\u80fd\u3059\u308b")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"\u307e\u3068\u3081\u308b\u3068\u3001\u4efb\u610f\u306e\u30a4\u30d9\u30f3\u30c8\u3092\u5b9a\u7fa9\u3057\u3066 Observer \u30d1\u30bf\u30fc\u30f3\u3092\u5b9f\u88c5\u3067\u304d\u308b")),(0,a.kt)("h2",{id:"\u30e1\u30bd\u30c3\u30c9"},"\u30e1\u30bd\u30c3\u30c9"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"on(event, listener)"),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"\u6307\u5b9a\u3057\u305f\u30a4\u30d9\u30f3\u30c8\u306b\u5bfe\u3059\u308b\u65b0\u3057\u3044\u30ea\u30b9\u30ca\u3092\u767b\u9332\u3059\u308b"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"once(event, listener)"),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"\u4e00\u5ea6\u30a4\u30d9\u30f3\u30c8\u304c\u767a\u884c\u3055\u308c\u305f\u3089\u524a\u9664\u3055\u308c\u3001\u4ee5\u964d\u306e\u30a4\u30d9\u30f3\u30c8\u3067\u306f\u5b9f\u884c\u3055\u308c\u306a\u3044"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"off(event, listener)"),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"\u6307\u5b9a\u3055\u308c\u305f\u30a4\u30d9\u30f3\u30c8\u306b\u767b\u9332\u3055\u308c\u305f\u30ea\u30b9\u30ca\u3092\u524a\u9664\u3059\u308b"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"emit(event[, ...args])"),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"\u6307\u5b9a\u3057\u305f\u30a4\u30d9\u30f3\u30c8\u3092\u6307\u5b9a\u3057\u305f\u5f15\u6570\u3067\u767a\u884c\u3059\u308b")))),(0,a.kt)("h2",{id:"fizbuzz-\u306e\u5b9f\u88c5"},"FizBuzz \u306e\u5b9f\u88c5"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"title=\u30a4\u30d9\u30f3\u30c8\u51e6\u7406\u306e\u5b9a\u7fa9",title:"\u30a4\u30d9\u30f3\u30c8\u51e6\u7406\u306e\u5b9a\u7fa9"},"function createFizzBuzzEventEmitter(until) {\n    const eventEmitter = new events.EventEmitter()\n    // \u30a4\u30d9\u30f3\u30c8\u306e\u767a\u884c\u3092\u5e38\u306b\u975e\u540c\u671f\u306b\u3059\u308b\n    Promise.resolve().then(\n        () => _emitFizzBuzz(eventEmitter, until)\n        // or\n        // process.nextTick(() => _emitFizzBuzz(eventEmitter, until))\n    )\n    return eventEmitter\n}\n\nasync function _emitFizzBuzz(eventEmitter, until) {\n    eventEmitter.emit('start')\n    let count = 1\n    while (count <= until) {\n        await new Promise((resolve) => setTimeout(resolve, 100))\n        if (count % 15 === 0) {\n            eventEmitter.emit('FizzBuzz', count)\n        } else if (count % 3 === 0) {\n            eventEmitter.emit('Fizz', count)\n        } else if (count % 5 === 0) {\n            eventEmitter.emit('Buzz', count)\n        }\n        count += 1\n    }\n    eventEmitter.emit('end')\n}\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"title=\u30ea\u30b9\u30ca\u306e\u767b\u9332/\u524a\u9664",title:"\u30ea\u30b9\u30ca\u306e\u767b\u9332/\u524a\u9664"},"const startListener = () => console.log('start')\nconst fizzListener = (count) => console.log('Fizz', count)\nconst buzzListener = (count) => console.log('Buzz', count)\nconst fizzBuzzListener = (count) => console.log('FizzBuzz', count)\n\nfunction endListener() {\n    console.log('end')\n    this.off('start', startListener)\n        .off('Fizz', fizzListener)\n        .off('Buzz', buzzListener)\n        .off('FizzBuzz', fizzBuzzListener)\n        .off('end', endListener)\n}\n\ncreateFizzBuzzEventEmitter(40)\n    .on('start', startListener)\n    .on('Fizz', fizzListener)\n    .once('Buzz', buzzListener)\n    .on('FizzBuzz', fizzBuzzListener)\n    .on('end', endListener)\n")),(0,a.kt)("h3",{id:"\u30a4\u30d9\u30f3\u30c8\u306f\u540c\u671f\u7684\u306b\u5b9f\u884c\u3055\u308c\u308b"},"\u30a4\u30d9\u30f3\u30c8\u306f\u540c\u671f\u7684\u306b\u5b9f\u884c\u3055\u308c\u308b"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"title=\u30a4\u30d9\u30f3\u30c8\u3092\u540c\u671f\u7684\u306b\u5b9a\u7fa9\u3057\u305f\u5834\u5408",title:"\u30a4\u30d9\u30f3\u30c8\u3092\u540c\u671f\u7684\u306b\u5b9a\u7fa9\u3057\u305f\u5834\u5408"},"function createFizzBuzzEventEmitter(until) {\n    const eventEmitter = new events.EventEmitter()\n    _emitFizzBuzz(eventEmitter, until)\n    // ...\n\nasync function _emitFizzBuzz(eventEmitter, until) {\n    eventEmitter.emit('start') // 1.\u30a4\u30d9\u30f3\u30c8\u304c\u767a\u884c\u3055\u308c\u308b\n    // ...\n\ncreateFizzBuzzEventEmitter(40)\n    // \u30ea\u30b9\u30ca\u767b\u9332\u3088\u308a\u5148\u306b\u30a4\u30d9\u30f3\u30c8\u304c\u767a\u884c\u3055\u308c\u3066\u3044\u308b\u306e\u3067\u5b9f\u884c\u3055\u308c\u306a\u3044\n    .on('start', startListener) // 2.\u30ea\u30b9\u30ca\u3092\u767b\u9332\u3059\u308b\n    // ...\n")),(0,a.kt)("h3",{id:"\u30ea\u30b9\u30ca\u306f\u540c\u671f\u7684\u306b\u5b9f\u884c\u3055\u308c\u308b"},"\u30ea\u30b9\u30ca\u306f\u540c\u671f\u7684\u306b\u5b9f\u884c\u3055\u308c\u308b"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"const fooEvenEmitter = new events.EventEmitter()\n// \u767b\u9332\u3068\u540c\u6642\u306b\u5b9f\u884c\nfooEvenEmitter.on('foo', () => console.log('\u30a4\u30d9\u30f3\u30c8\u30ea\u30b9\u30ca\u306e\u5b9f\u884c'))\nconsole.log('foo\u30a4\u30d9\u30f3\u30c8\u306e\u767a\u884c', fooEvenEmitter.emit('foo'))\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-zsh",metastring:"title=\u5b9f\u884c\u7d50\u679c",title:"\u5b9f\u884c\u7d50\u679c"},"\u30a4\u30d9\u30f3\u30c8\u30ea\u30b9\u30ca\u306e\u5b9f\u884c\nfoo\u30a4\u30d9\u30f3\u30c8\u306e\u767a\u884c true\n")),(0,a.kt)("h3",{id:"\u30ea\u30b9\u30ca\u306f\u30ac\u30d9\u30fc\u30b8\u30b3\u30ec\u30af\u30b7\u30e7\u30f3\u306e\u5bfe\u8c61\u5916"},"\u30ea\u30b9\u30ca\u306f\u30ac\u30d9\u30fc\u30b8\u30b3\u30ec\u30af\u30b7\u30e7\u30f3\u306e\u5bfe\u8c61\u5916"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"const barEventEmitter = new events.EventEmitter()\nfor (let i = 0; i < 11; i++) {\n    barEventEmitter.on('bar', () => console.log('bar'))\n}\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-zsh",metastring:"title=\u5b9f\u884c\u7d50\u679c",title:"\u5b9f\u884c\u7d50\u679c"},"MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 bar listeners added to [EventEmitter]. Use emitter.setMaxListeners() to increase limit\n")),(0,a.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"\u30ea\u30b9\u30ca\u6570 10 \u3092\u8d85\u3048\u308b")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},(0,a.kt)("inlineCode",{parentName:"p"},"EventEmitter.setMaxListeners(size: number)"),"\u3092\u4f7f\u3046"),(0,a.kt)("pre",{parentName:"div"},(0,a.kt)("code",{parentName:"pre",className:"language-js"},"const barEventEmitter = new events.EventEmitter()\nbarEventEmitter.setMaxListeners(100)\nfor (let i = 0; i < 11; i++) {\n    barEventEmitter.on('bar', () => console.log('bar'))\n}\n")))),(0,a.kt)("h3",{id:"\u30a8\u30e9\u30fc\u30cf\u30f3\u30c9\u30ea\u30f3\u30b0"},"\u30a8\u30e9\u30fc\u30cf\u30f3\u30c9\u30ea\u30f3\u30b0"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"EventEmitter"),"\u3067\u306f",(0,a.kt)("inlineCode",{parentName:"p"},"error"),"\u30a4\u30d9\u30f3\u30c8\u3067\u30a8\u30e9\u30fc\u3092\u4f1d\u64ad\u3059\u308b"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"try {\n    new events.EventEmitter()\n        .on('error', (err) => console.log('error\u30a4\u30d9\u30f3\u30c8'))\n        // error\u30a4\u30d9\u30f3\u30c8\u3067\u88dc\u8db3\u3055\u308ccatch\u6587\u306f\u901a\u3089\u306a\u3044\n        .emit('error', () => new Error('\u30a8\u30e9\u30fc'))\n} catch (err) {\n    console.log('catch')\n}\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-zsh",metastring:"title=\u5b9f\u884c\u7d50\u679c",title:"\u5b9f\u884c\u7d50\u679c"},"error\u30a4\u30d9\u30f3\u30c8\n")),(0,a.kt)("h3",{id:"\u7d99\u627f"},"\u7d99\u627f"),(0,a.kt)("p",null,"\u7d99\u627f\u30d1\u30bf\u30fc\u30f3\u306e\u65b9\u304c\u591a\u3044\u306e\u3067\u3053\u3061\u3089\u3092\u4f7f\u3046\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"title=EventEmitter\u3092\u7d99\u627f\u3057\u305f\u30af\u30e9\u30b9",title:"EventEmitter\u3092\u7d99\u627f\u3057\u305f\u30af\u30e9\u30b9"},"class FizzBuzzEventEmitter extends events.EventEmitter {\n    async start(until) {\n        this.emit('start')\n        let count = 1\n        while (true) {\n            if (count % 15 === 0) {\n                this.emit('FizzBuzz', count)\n            } else if (count % 3 === 0) {\n                this.emit('Fizz', count)\n            } else if (count % 5 === 0) {\n                this.emit('Buzz', count)\n            }\n            count += 1\n            if (count >= until) break\n            await new Promise((resolve) => setTimeout(resolve, 100))\n        }\n        this.emit('end')\n    }\n}\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"title=\u30a4\u30f3\u30b9\u30bf\u30f3\u30b9\u751f\u6210",title:"\u30a4\u30f3\u30b9\u30bf\u30f3\u30b9\u751f\u6210"},"new FizzBuzzEventEmitter()\n    .on('start', startListener)\n    .on('Fizz', fizzListener)\n    .once('Buzz', buzzListener)\n    .on('FizzBuzz', fizzBuzzListener)\n    .on('end', endListener)\n    .start(20)\n")),(0,a.kt)("h3",{id:"async-\u3092\u4f7f\u3046"},"async \u3092\u4f7f\u3046"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"events.on(emitter, eventName)")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"EventEmitter"),"\u304b\u3089 async \u30a4\u30c6\u30e9\u30d6\u30eb\u3092\u751f\u6210\u3057\u3001",(0,a.kt)("inlineCode",{parentName:"p"},"for await...of"),"\u3067\u30cf\u30f3\u30c9\u30ea\u30f3\u30b0\u3059\u308b"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"emitter"),"\u306b",(0,a.kt)("inlineCode",{parentName:"li"},"eventName"),"\u306e\u30ea\u30b9\u30ca\u3092\u767b\u9332\u3059\u308b"),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"emit"),"\u3067\u30a4\u30d9\u30f3\u30c8\u3092\u767a\u884c\u3059\u308b"),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"for await...of"),"\u304b\u3089\u629c\u3051\u308b\u3068\u30ea\u30b9\u30ca\u306f\u524a\u9664\u3055\u308c\u308b")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},";(async () => {\n    const eventAEmitter = new events.EventEmitter()\n    const eventAIterable = events.on(eventAEmitter, 'eventA')\n    console.log(eventAEmitter.listeners('eventA'))\n\n    // \u3053\u3053\u306f\u540c\u671f\u51e6\u7406\n    eventAEmitter.emit('eventA', 'hello')\n    eventAEmitter.emit('eventA', 'hello', 'world')\n    eventAEmitter.emit('eventA', 'end')\n\n    // \u767a\u884c\u3055\u308c\u305f\u30a4\u30d9\u30f3\u30c8\u3092\u9806\u756a\u306b\u51e6\u7406\uff08end\u3067\u629c\u3051\u308b\uff09\n    for await (const a of eventAIterable) {\n        if (a[0] === 'end') {\n            break\n        }\n        console.log('eventA', a)\n    }\n    // \u30eb\u30fc\u30d7\u304b\u3089\u629c\u3051\u308b\u3068\u30ea\u30b9\u30ca\u306f\u524a\u9664\u3055\u308c\u308b\n    console.log(eventAEmitter.listeners('eventA'))\n})()\n")),(0,a.kt)("h3",{id:"promise-\u3092\u4f7f\u3046"},"Promise \u3092\u4f7f\u3046"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"events.once(emitter, eventName)")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"const eventBEmitter = new events.EventEmitter()\nconst eventBPromise = events.once(eventBEmitter, 'eventB')\neventBPromise.then((arg) => console.log('eventB\u767a\u751f', arg))\neventBEmitter.emit('eventB', 'hello', 'world')\n")))}p.isMDXComponent=!0}}]);