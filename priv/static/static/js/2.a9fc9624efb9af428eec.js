(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{1007:function(t,e,i){"use strict";i.r(e);var n=i(1008),c=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,function(){return n[t]})}(r);var a=i(1011),s=i(0);var o=function(t){i(1009)},u=Object(s.a)(c.a,a.a,a.b,!1,o,null,null);e.default=u.exports},1008:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=c(i(345));function c(t){return t&&t.__esModule?t:{default:t}}var r={components:{TabSwitcher:c(i(204)).default},data:function(){return{meta:{stickers:[]},path:""}},computed:{pack:function(){return this.$store.state.instance.stickers||[]}},methods:{clear:function(){this.meta={stickers:[]}},pick:function(t,e){var i=this,c=this.$store;fetch(t).then(function(t){t.blob().then(function(t){var r=new File([t],e,{mimetype:"image/png"}),a=new FormData;a.append("file",r),n.default.uploadMedia({store:c,formData:a}).then(function(t){i.$emit("uploaded",t),i.clear()},function(t){console.warn("Can't attach sticker"),console.warn(t),i.$emit("upload-failed","default")})})})}}};e.default=r},1009:function(t,e,i){var n=i(1010);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,i(2).default)("cc6cdea4",n,!0,{})},1010:function(t,e,i){(t.exports=i(1)(!1)).push([t.i,".sticker-picker{width:100%;position:relative}.sticker-picker .tab-switcher{position:absolute;top:0;bottom:0;left:0;right:0}.sticker-picker .sticker-picker-content .sticker{display:inline-block;width:20%;height:20%}.sticker-picker .sticker-picker-content .sticker img{width:100%}.sticker-picker .sticker-picker-content .sticker img:hover{filter:drop-shadow(0 0 5px var(--link,#d8a070))}",""])},1011:function(t,e,i){"use strict";i.d(e,"a",function(){return n}),i.d(e,"b",function(){return c});var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"sticker-picker"},[i("tab-switcher",{staticClass:"tab-switcher",attrs:{"render-only-focused":!0,"scrollable-tabs":""}},t._l(t.pack,function(e){return i("div",{key:e.path,staticClass:"sticker-picker-content",attrs:{"image-tooltip":e.meta.title,image:e.path+e.meta.tabIcon}},t._l(e.meta.stickers,function(n){return i("div",{key:n,staticClass:"sticker",on:{click:function(i){i.stopPropagation(),i.preventDefault(),t.pick(e.path+n,e.meta.title)}}},[i("img",{attrs:{src:e.path+n}})])}),0)}),0)],1)},c=[]}}]);
//# sourceMappingURL=2.a9fc9624efb9af428eec.js.map