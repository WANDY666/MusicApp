(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3bb6c9d7"],{"2d3b":function(e,t,c){"use strict";c.r(t);c("b0c0");var s=c("7a23");Object(s["w"])("data-v-3f4937de");var n={class:"search"},r={class:"SearchTop"},a={class:"SearchTopNav"},o={class:"right"},i=["placeholder"],l=Object(s["g"])("div",{class:"occupy"},null,-1),u={class:"history"},d=Object(s["g"])("div",{class:"historyLeft"}," 历史 ",-1),b={class:"historyRight"},h=["onClick"],O={class:"topList"},g=["index"],j=["index"],f=["index"],p=["index","src"],y={class:"list"},v=["onClick"],w={class:"index"},k={class:"content"},m={class:"title"},L={class:"author"},x={class:"right"},S={class:"more"};function K(e,t,c,K,I,C){var R=Object(s["A"])("icon");return Object(s["t"])(),Object(s["f"])("div",n,[Object(s["g"])("div",r,[Object(s["g"])("div",a,[Object(s["g"])("div",{class:"back",onClick:t[0]||(t[0]=function(t){return e.$router.back()})},[Object(s["i"])(R,{iconName:"icon-fanhuizuojiantou"})]),Object(s["g"])("div",o,[Object(s["I"])(Object(s["g"])("input",{type:"text","onUpdate:modelValue":t[1]||(t[1]=function(e){return I.searchKey=e}),placeholder:I.placeholder,onKeydown:t[2]||(t[2]=Object(s["J"])((function(e){return C.saveKeyword()}),["enter"]))},null,40,i),[[s["E"],I.searchKey]])])]),l,Object(s["g"])("div",u,[d,Object(s["g"])("div",b,[(Object(s["t"])(!0),Object(s["f"])(s["a"],null,Object(s["z"])(I.keywordList,(function(e,t){return Object(s["t"])(),Object(s["f"])("div",{onClick:function(t){return C.historySearch(e)},class:"keyword",key:t},Object(s["C"])(e),9,h)})),128))])])]),Object(s["I"])(Object(s["g"])("header",O,[Object(s["g"])("main",{onClick:t[3]||(t[3]=function(e){return C.topSearch(e)})},[(Object(s["t"])(!0),Object(s["f"])(s["a"],null,Object(s["z"])(I.topList,(function(e,t){return Object(s["t"])(),Object(s["f"])("div",{index:t,class:"top",key:t},[Object(s["g"])("div",{index:t,class:"index"},Object(s["C"])(t+1),9,j),Object(s["g"])("div",{index:t,class:"searchWord"},Object(s["C"])(e.searchWord),9,f),""!==e.iconUrl?(Object(s["t"])(),Object(s["f"])("img",{key:0,index:t,src:e.iconUrl,alt:""},null,8,p)):Object(s["e"])("",!0)],8,g)})),128))])],512),[[s["F"],I.showTopList]]),Object(s["I"])(Object(s["g"])("div",y,[(Object(s["t"])(!0),Object(s["f"])(s["a"],null,Object(s["z"])(I.songs,(function(e,t){return Object(s["t"])(),Object(s["f"])("div",{class:"playItem",key:t},[Object(s["g"])("div",{class:"left",onClick:function(c){return C.addMusic(e,t)}},[Object(s["g"])("div",w,Object(s["C"])(t+1),1),Object(s["g"])("div",k,[Object(s["g"])("div",m,Object(s["C"])(e.name),1),Object(s["g"])("div",L,Object(s["C"])(C.getArtists(e.artists,e.album)),1)])],8,v),Object(s["g"])("div",x,[Object(s["i"])(R,{iconName:"icon-bofang"}),Object(s["i"])(R,{iconName:"icon-liebiao1"})])])})),128))],512),[[s["F"],!I.showTopList]]),Object(s["g"])("div",{class:"next",onClick:t[4]||(t[4]=function(e){return C.showMoreRes()})},[Object(s["I"])(Object(s["g"])("div",S," 点击获得更多 ",512),[[s["F"],""!==I.lastSearch]])])])}Object(s["u"])();var I=c("5530"),C=c("1da1"),R=(c("99af"),c("a434"),c("a15b"),c("d81d"),c("96cf"),c("365c")),M=c("cdae"),N=c("5502"),T={data:function(){return{songs:[],placeholder:"wandy",keywordList:[],searchKey:"",lastSearch:"",showTopList:!0,topList:[],offset:0}},created:function(){var e=this;return Object(C["a"])(regeneratorRuntime.mark((function t(){var c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return localStorage.getItem("keywordList")&&(console.log(localStorage.getItem("keywordList")),e.keywordList=JSON.parse(localStorage.getItem("keywordList"))),t.next=3,Object(R["k"])();case 3:c=t.sent,console.log(c),e.topList=c.data.data;case 6:case"end":return t.stop()}}),t)})))()},components:{Icon:M["a"]},methods:Object(I["a"])(Object(I["a"])({topSearch:function(e){var t=e.target,c=t.getAttribute("index");console.log(c),c&&(c=parseInt(c),console.log([e.target],c),this.searchKey=this.topList[c].searchWord,this.saveKeyword())},showMoreRes:function(){var e=this;return Object(C["a"])(regeneratorRuntime.mark((function t(){var c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(R["p"])(e.lastSearch,++e.offset);case 2:c=t.sent,e.songs=e.songs.concat(c.data.result.songs);case 4:case"end":return t.stop()}}),t)})))()},saveKeyword:function(){var e=this;return Object(C["a"])(regeneratorRuntime.mark((function t(){var c,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.searchKey){t.next=16;break}return e.showTopList=!1,console.log(e.searchKey),c=e.keywordList.indexOf(e.searchKey),-1!==c&&e.keywordList.splice(c,1),e.keywordList.unshift(e.searchKey),e.keywordList.length>10&&e.keywordList.pop(),console.log(e.keywordList),t.next=10,Object(R["p"])(e.searchKey);case 10:s=t.sent,e.lastSearch=e.searchKey,e.searchKey="",e.offset=0,console.log(s),e.setSearchSongs(s.data.result.songs);case 16:case"end":return t.stop()}}),t)})))()},historySearch:function(e){var t=this;return Object(C["a"])(regeneratorRuntime.mark((function c(){return regeneratorRuntime.wrap((function(c){while(1)switch(c.prev=c.next){case 0:t.searchKey=e,t.saveKeyword();case 2:case"end":return c.stop()}}),c)})))()},setSearchSongs:function(e){this.songs=e,console.log(this.songs)}},Object(N["c"])(["setPlayIndex","setPlaylist"])),{},{addMusic:function(e){console.log(e),e.al=e.album,e.al.picUrl=e.al.artist.img1v1Url,e.ar=e.artists,this.$store.commit("pushMusic",e),this.$store.dispatch("changeMusic",{playlist:this.$store.state.playlist,playIndex:this.$store.state.playlist.length-1})},getArtists:function(e,t){var c=e.map((function(e){return e.name})).join(", ");return t&&t.name&&(c+=" - "+t.name),c}}),beforeUnmount:function(){this.keywordList&&localStorage.setItem("keywordList",JSON.stringify(this.keywordList))},computed:{}};c("b463");T.render=K,T.__scopeId="data-v-3f4937de";t["default"]=T},b463:function(e,t,c){"use strict";c("ebbc")},ebbc:function(e,t,c){}}]);
//# sourceMappingURL=chunk-3bb6c9d7.55fa3a32.js.map