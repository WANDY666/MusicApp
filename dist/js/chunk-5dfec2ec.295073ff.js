(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5dfec2ec"],{"423d":function(t,e,n){"use strict";n("85f1")},"85f1":function(t,e,n){},d4fb:function(t,e,n){"use strict";n.r(e);n("b0c0");var r=n("7a23"),c=n("f1c7"),a=n.n(c);Object(r["w"])("data-v-ffee005c");var s={class:"ArtSquare"},i={class:"loading",src:a.a},o=Object(r["g"])("div",{class:"title"}," 歌手广场 ",-1),l=["index"],u={ref:"real",class:"real"},h=["src"],d={class:"name"},f={class:"count"};function b(t,e,n,c,a,b){var g=Object(r["A"])("icon"),p=Object(r["A"])("router-link");return Object(r["t"])(),Object(r["f"])("div",s,[Object(r["I"])(Object(r["g"])("img",i,null,512),[[r["F"],a.showLoading]]),Object(r["g"])("header",null,[Object(r["g"])("div",{class:"back",onClick:e[0]||(e[0]=function(e){return t.$router.back()})},[Object(r["i"])(g,{iconName:"icon-fanhuizuojiantou"}),o])]),Object(r["g"])("nav",{ref:"nav",onClick:e[1]||(e[1]=function(t){return b.switchTag(t)})},[(Object(r["t"])(!0),Object(r["f"])(r["a"],null,Object(r["z"])(a.areas,(function(t,e){return Object(r["t"])(),Object(r["f"])("span",{index:e,class:Object(r["o"])({active:e===a.currentIndex}),key:t.id},Object(r["C"])(t.area),11,l)})),128))],512),Object(r["g"])("main",{ref:"main",onTouchstart:e[4]||(e[4]=function(){return b.touchstart&&b.touchstart.apply(b,arguments)}),onTouchmove:e[5]||(e[5]=function(){return b.touchmove&&b.touchmove.apply(b,arguments)}),onTouchend:e[6]||(e[6]=function(){return b.touchend&&b.touchend.apply(b,arguments)})},[Object(r["g"])("div",u,[(Object(r["t"])(!0),Object(r["f"])(r["a"],null,Object(r["z"])(a.lists,(function(t,n){return Object(r["t"])(),Object(r["f"])("section",{onErrorCapture:e[3]||(e[3]=function(){return b.imgError&&b.imgError.apply(b,arguments)}),key:t.id},[Object(r["g"])("article",{onScroll:e[2]||(e[2]=function(){return b.scrollSection&&b.scrollSection.apply(b,arguments)})},[(Object(r["t"])(!0),Object(r["f"])(r["a"],null,Object(r["z"])(t.artists,(function(t,e){return Object(r["t"])(),Object(r["d"])(p,{to:{path:"/artPaper",query:{id:t.id}},class:"card",key:t.id},{default:Object(r["H"])((function(){return[Object(r["g"])("img",{src:t.img1v1Url,alt:"artist.name"},null,8,h),Object(r["g"])("div",d,Object(r["C"])(t.name),1),Object(r["g"])("div",f,[Object(r["i"])(g,{iconName:"icon-play"}),Object(r["h"])(" "+Object(r["C"])(b.playCount(t.musicSize)+"首"),1)])]})),_:2},1032,["to"])})),128))],32)],32)})),128))],512)],544)])}Object(r["u"])();var g=n("1da1"),p=(n("96cf"),n("159b"),n("99af"),n("ac1f"),n("466d"),n("b680"),n("cdae")),m=n("365c"),j={components:{Icon:p["a"]},data:function(){return{areas:[{id:-1,area:"全部"},{id:7,area:"华语"},{id:96,area:"欧美"},{id:8,area:"日本"},{id:16,area:"韩国"},{id:0,area:"其他"}],currentIndex:0,touchstartX:0,touchstartY:0,showLoading:!1,lastLocation:0,scrollId:0,distanceX:0,distanceY:0,scrollSectionId:0,lists:[]}},created:function(){var t=this;return Object(g["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.areas.forEach(function(){var e=Object(g["a"])(regeneratorRuntime.mark((function e(n,r){var c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.lists[r]={offset:0,limit:12,id:n.id,area:n.id},e.next=3,Object(m["b"])({limit:t.lists[r].limit,offset:t.lists[t.currentIndex].limit*t.lists[r].offset++,area:t.lists[r].area});case 3:c=e.sent,console.log(c),t.lists[r].artists=c.data.artists;case 6:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}());case 1:case"end":return e.stop()}}),e)})))()},methods:{imgError:function(t){"IMG"===t.target.tagName&&(console.log([t.target]),t.target.src="http://p1.music.126.net/u9WtIRsF39ayeb5HX7bm8A==/109951165806093811.jpg")},scrollSection:function(t){var e=this;return Object(g["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:0!==e.scrollSectionId&&clearTimeout(e.scrollSectionId),e.scrollSectionId=setTimeout(Object(g["a"])(regeneratorRuntime.mark((function n(){var r,c,a,s,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(r=t.target,c=r.scrollHeight,a=r.scrollTop,s=r.clientHeight,!(c-60<=a+s)){n.next=11;break}return e.showLoading=!0,n.next=8,Object(m["b"])({limit:e.lists[e.currentIndex].limit,offset:e.lists[e.currentIndex].limit*e.lists[e.currentIndex].offset++,area:e.lists[e.currentIndex].area});case 8:i=n.sent,e.lists[e.currentIndex].artists=e.lists[e.currentIndex].artists.concat(i.data.artists),setTimeout((function(){console.log(i),e.showLoading=!1,console.log(i),console.log(i.data.artists),r.scrollTo({top:r.scrollTop+100,behavior:"smooth"})}),1e3);case 11:e.scrollSectionId=0;case 12:case"end":return n.stop()}}),n)}))),20);case 2:case"end":return n.stop()}}),n)})))()},touchstart:function(t){console.log("touchstart"),this.$refs.real.style.transition="none",this.touchstartX=t.targetTouches[0].pageX,this.touchstartY=t.targetTouches[0].pageY,this.lastLocation=parseFloat(getComputedStyle(this.$refs.real).getPropertyValue("left").match(/[+-]?[0-9]+/)[0])},touchmove:function(t){this.distanceX=t.targetTouches[0].pageX-this.touchstartX,this.distanceY=t.targetTouches[0].pageY-this.touchstartY,2*Math.abs(this.distanceY)<Math.abs(this.distanceX)&&(this.$refs.real.style.left=this.lastLocation+this.distanceX+"px",console.log("懂啊你們"))},touchend:function(){2*Math.abs(this.distanceY)<Math.abs(this.distanceX)?(this.$refs.real.style.transition="left 0.3s ease-out",this.distanceX<0?this.switchTo(Math.min(this.currentIndex+1,this.lists.length-1)):this.switchTo(Math.max(0,this.currentIndex-1))):this.switchTo(this.currentIndex)},playCount:function(t){var e=t;return t>=1e8?(e=t/1e8,e=e.toFixed(2)+"亿"):t>=1e4&&(e=t/1e4,e=e.toFixed(2)+"万"),e},switchTo:function(t){var e=this.$refs.nav,n=e.clientWidth,r=e.scrollLeft;this.currentIndex=t;var c=e.children[t].offsetLeft;console.log(n,r,c),e.scrollTo({left:c-151,behavior:"smooth"}),this.$refs.real.style.left="-".concat(t*this.$refs.main.clientWidth,"px"),console.log("switch "+t)},switchTag:function(t){if("SPAN"===t.target.tagName){var e=t.target;this.switchTo(parseInt(e.getAttribute("index")))}}}};n("423d");j.render=b,j.__scopeId="data-v-ffee005c";e["default"]=j},f1c7:function(t,e,n){t.exports=n.p+"img/loading.12def9b0.gif"}}]);
//# sourceMappingURL=chunk-5dfec2ec.295073ff.js.map