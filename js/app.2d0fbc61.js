(function(t){function e(e){for(var o,r,c=e[0],s=e[1],u=e[2],h=0,f=[];h<c.length;h++)r=c[h],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&f.push(i[r][0]),i[r]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(t[o]=s[o]);l&&l(e);while(f.length)f.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],o=!0,c=1;c<n.length;c++){var s=n[c];0!==i[s]&&(o=!1)}o&&(a.splice(e--,1),t=r(r.s=n[0]))}return t}var o={},i={app:0},a=[];function r(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=o,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=e,c=c.slice();for(var u=0;u<c.length;u++)e(c[u]);var l=s;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("cd49")},"5c0b":function(t,e,n){"use strict";n("9c0c")},"9c0c":function(t,e,n){},cd49:function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{staticClass:"ma-0 pa-0",attrs:{width:t.options.canvas.width,height:t.options.canvas.height}},[n("v-main",[n("v-container",[n("v-row",[n("v-col",{staticClass:"lg-6"},[n("options-editor",{model:{value:t.options,callback:function(e){t.options=e},expression:"options"}})],1)],1)],1)],1),n("canvas",{attrs:{id:"canvas",width:t.options.canvas.width,height:t.options.canvas.height}})],1)},a=[],r=(n("cb29"),n("0481"),n("4160"),n("d81d"),n("4069"),n("b0c0"),n("d3b7"),n("8a59"),n("9a8c"),n("a975"),n("735e"),n("c1ac"),n("d139"),n("3a7b"),n("d5d6"),n("82f8"),n("e91f"),n("60bd"),n("5f96"),n("3280"),n("3fcc"),n("ca91"),n("25a1"),n("cd26"),n("3c5d"),n("2954"),n("649e"),n("219c"),n("170b"),n("b39a"),n("72f7"),n("159b"),n("2909")),c=n("d4ec"),s=n("bee2"),u=n("262e"),l=n("2caf"),h=n("9ab4"),f=n("1b40"),d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("vue-json-editor",{attrs:{expandedOnStart:!0},on:{"json-change":t.onJsonChange},model:{value:t.options,callback:function(e){t.options=e},expression:"options"}})],1)},v=[],p=n("5530"),g=n("a523"),m=n("0fd9"),b=n("62ad"),w=n("b974"),y=n("ac7c"),M=n("8654"),O=n("8336"),x={display:{waitBeforeClearMilliseconds:100,tickMilliseconds:5},circle:{tonic:"C",degreeOffset:60,saturationFloor:70},viewMode:{single:!1,overtoneGrid:!1,wheel:!0,randomPixelation:!1,concentricPixelation:!0},wheelViewModeConfig:{showOvertones:!1,showEmergence:!1,showEmergentOnly:!1,lineWidth:3,spotlightScaleFactor:.05},canvas:{width:1800,height:1190},mix:{rootBias:1.5,melodyBias:1.5},render:{rootBias:1,middleBias:1,melodyBias:1,emergentBias:1,emergentBiasFloor:.2},overtone:{numberOvertones:7,backoffCoefficient:1.5}},k=n("45a3"),B=function(t){Object(u["a"])(n,t);var e=Object(l["a"])(n);function n(){var t;return Object(c["a"])(this,n),t=e.apply(this,arguments),t.options=Object(p["a"])({},x),t}return Object(s["a"])(n,[{key:"onJsonChange",value:function(t){this.options=t,this.emit()}},{key:"emit",value:function(){return this.options}}]),n}(f["c"]);Object(h["a"])([Object(f["b"])("input")],B.prototype,"emit",null),B=Object(h["a"])([Object(f["a"])({components:{VContainer:g["a"],VRow:m["a"],VCol:b["a"],VSelect:w["a"],VCheckbox:y["a"],VTextField:M["a"],VBtn:O["a"],vueJsonEditor:k["a"]}})],B);var j=B,E=j,P=n("2877"),C=Object(P["a"])(E,d,v,!1,null,null,null),S=C.exports,_=n("7496"),V=n("f6c4"),D=n("fe57"),F=n("71a3"),I=n("c671"),A=(n("25f0"),n("5e54"));n("4ec9"),n("6062"),n("3ca3"),n("ddb0");function z(t,e){var n=[];return t.forEach((function(t){e(t).forEach((function(t){return n.push(t)}))})),n}function N(t,e){return t.map((function(t){return t.map(e)}))}function T(t,e){for(var n=[],o=function(o){n.push(e(t.map((function(t){return t[o]}))))},i=0;i<t[0].length;i++)o(i);return n}function R(t,e){var n=t%12==9?"A":t%12==10?"Bb":t%12==11?"B":t%12==0?"C":t%12==1?"Db":t%12==2?"D":t%12==3?"Eb":t%12==4?"E":t%12==5?"F":t%12==6?"F#":t%12==7?"G":"Ab";return{kind:"scientific",class:n,octave:e}}var W=["A","Bb","B","C","Db","D","Eb","E","F","F#","G","Ab"];z([1,2,3,4,5,6,7,8],(function(t){return W.map((function(e){return e+t.toString()}))}));function G(t){return"midi"==t.kind?t.midi:"scientific"==t.kind?Object(A["a"])(t.class+t.octave.toString()).toMidi():J(t.solfege.solfege)+12*t.solfege.octaveOffset+G(t.tonic)}function J(t){return"do"==t?0:"ra"==t?1:"re"==t?2:"ri"==t||"me"==t?3:"mi"==t?4:"fa"==t?5:"fi"==t||"se"==t?6:"so"==t?7:"si"==t||"le"==t?8:"la"==t?9:"li"==t||"te"==t?10:"ti"==t?11:-1}n("a630");var L=function(){function t(){Object(c["a"])(this,t),this._notes=new Map,this._sustainOn=!1}return Object(s["a"])(t,[{key:"endSustain",value:function(){this._sustainOn=!1;var t=new Map;this._notes.forEach((function(e,n){e.sustained||t.set(n,e)})),this._notes=t}},{key:"beginSustain",value:function(){this._sustainOn=!0}},{key:"handleNoteOn",value:function(e,n){this._notes.set(t.key(e),{velocity:n,note:e,lifespan:0,sustained:!1})}},{key:"handleNoteOff",value:function(e){if(this._sustainOn){var n=this._notes.get(t.key(e));void 0!=n&&(n.sustained=!0)}else this._notes.delete(t.key(e))}},{key:"getNotes",value:function(){var t=Array.from(this._notes.values());return t.sort((function(t,e){return G(t.note)-G(e.note)})),t}},{key:"tick",value:function(t){this._notes.forEach((function(e){return e.lifespan=e.lifespan+t}))}}],[{key:"key",value:function(t){return t.class+t.octave}}]),t}();n("99af"),n("13d5"),n("4d90");function U(t){var e,n,o,i=t.hue/360,a=t.light/100,r=t.saturation/100;if(0==r)e=n=o=a;else{var c=function(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+6*(e-t)*n:n<.5?e:n<2/3?t+(e-t)*(2/3-n)*6:t},s=a<.5?a*(1+r):a+r-a*r,u=2*a-s;e=c(u,s,i+1/3),n=c(u,s,i),o=c(u,s,i-1/3)}return{red:Math.round(255*e),green:Math.round(255*n),blue:Math.round(255*o)}}function $(t){var e=t.hue,n=t.light/100,o=t.saturation,i=o*Math.min(n,1-n)/100,a=function(t){var o=(t+e/30)%12,a=n-i*Math.max(Math.min(o-3,9-o,1),-1);return Math.round(255*a).toString(16).padStart(2,"0")};return"#".concat(a(0)).concat(a(8)).concat(a(4))}var q=new Map([["C",0],["G",30],["D",60],["A",90],["E",120],["B",150],["F#",180],["Db",210],["Ab",240],["Eb",270],["Bb",300],["F",330]]);function H(t,e){return e.map((function(e){return{hue:Math.abs(360-q.get(e.note.class)+t.degreeOffset+q.get(t.tonic))%360,saturation:t.saturationFloor+(100-t.saturationFloor)*e.velocity,light:(G(e.note)-21)*(100/88)}}))}function K(t){return{x:Math.cos(t.hue/180*Math.PI)*t.saturation,y:Math.sin(t.hue/180*Math.PI)*t.saturation,z:t.light}}function Q(t){var e=180*Math.atan2(t.y,t.x)/Math.PI;return{hue:e<0?360+e:e,saturation:Math.sqrt(t.x*t.x+t.y*t.y),light:t.z}}function X(t,e){if(1==e.length)return e[0];for(var n=e.length-2,o=t.rootBias+t.melodyBias+n,i={x:0,y:0,z:0},a=0;a<e.length;a++){var r=0==a?t.rootBias:a==e.length-1?t.melodyBias:1,c=K(e[a]);i.x+=c.x*r,i.y+=c.y*r,i.z+=c.z*r}return i.x/=o,i.y/=o,i.z/=o,Q(i)}function Y(t,e){var n=function(e,n){return{hue:e,light:n,saturation:t.saturation}},o=function(e){return Math.min(100,100/88*e+t.light)},i=1,a=[{color:t,weight:1}],r=function(t){i++;var n=1/(e.backoffCoefficient*i);a.push({color:t,weight:n})};return e.numberOvertones>=1&&r(n(t.hue,o(12))),e.numberOvertones>=2&&r(n(t.hue-31,o(19))),e.numberOvertones>=3&&r(n(t.hue,o(24))),e.numberOvertones>=4&&r(n((t.hue-120+4.2)%360,o(28))),e.numberOvertones>=5&&r(n(t.hue-31,o(31))),e.numberOvertones>=6&&r(n((t.hue+60+9.3)%360,o(34))),Z(a),a}function Z(t){var e=t.map((function(t){return t.weight})).reduce((function(t,e){return t+e}),0);t.forEach((function(t){return t.weight/=e}))}var tt=n("c62b"),et=n.n(tt),nt=function(t){Object(u["a"])(n,t);var e=Object(l["a"])(n);function n(){var t;return Object(c["a"])(this,n),t=e.apply(this,arguments),t.options=x,t.midiBatcher=new L,t.ctx=void 0,t.randomPixelator=function(t){},t.concentricPixelator=function(t,e,n,o){},t.wheelDrawer=function(t,e){},t}return Object(s["a"])(n,[{key:"resize",value:function(){this.options.canvas.width=window.innerWidth,this.options.canvas.height=window.innerHeight,this.randomPixelator=this.makeRandomPixelator(this.ctx,this.options.canvas),this.concentricPixelator=this.makeConcentricPixelator(this.ctx,this.options.canvas),this.wheelDrawer=this.makeColorWheelDrawer(this.ctx,this.options.canvas)}},{key:"created",value:function(){window.addEventListener("resize",this.resize)}},{key:"destroyed",value:function(){window.removeEventListener("resize",this.resize)}},{key:"drawAll",value:function(t,e,n){for(var o=n.height,i=n.width,a=e.length,r=o/a,c=0;c<a;c++)for(var s=e[c],u=s.length,l=i/u,h=0;h<u;h++){var f=s[h];t.beginPath(),t.fillStyle=f,t.rect(h*l,c*r,l,r),t.fill()}}},{key:"makeColorWheelDrawer",value:function(t,e){var n=e.width,o=e.height,i=new Uint8ClampedArray(n*o*4),a=new ImageData(i,n),r=!1;return function(e,c){var s=Math.min(n,o)/2,u=n/2,l=o/2;if(!r){for(var h=n*o,f=0;f<h;f+=1){var d=Math.floor(f/n),v=Math.floor(f-d*n),p=Math.sqrt((v-u)*(v-u)+(d-l)*(d-l));if(p<s){var g=(Math.atan2(d-l,v-u)*(180/Math.PI)+360+90)%360,m={hue:g,saturation:100,light:100*p/s},b=U(m);i[4*f]=b.red,i[4*f+1]=b.green,i[4*f+2]=b.blue,i[4*f+3]=255}}r=!0}t.putImageData(a,0,0);for(var w=0;w<e.length;w++)if((!c.showEmergentOnly||w==e.length-1)&&(c.showEmergence||w!=e.length-1))for(var y=e[w],M=0;M<y.length;M++)if(c.showOvertones||!(M>0)){var O=y[M],x=Math.floor(s*c.spotlightScaleFactor/(M+1)),k=(O.hue-90)*Math.PI/180,B=O.light*s/100,j=B*Math.cos(k),E=B*Math.sin(k);t.lineWidth=c.lineWidth,t.beginPath(),t.arc(j+u,E+l,x,0,2*Math.PI),t.strokeStyle=$({hue:(O.hue+180)%360,saturation:100,light:100-O.light}),t.fillStyle=$(O),t.stroke(),t.fill()}}}},{key:"makeRandomPixelator",value:function(t,e){var n=e.width,o=e.height,i=new Uint8ClampedArray(n*o*4),a=new ImageData(i,n);return function(e){performance.now();for(var n=0;n<i.length;n+=4){var o=e[Math.floor(Math.random()*e.length)];i[n]=o.red,i[n+1]=o.green,i[n+2]=o.blue,i[n+3]=255}performance.now();t.putImageData(a,0,0)}}},{key:"makeConcentricPixelator",value:function(t,e){var n=this,o=e.width,i=e.height,a=o*i*4,r=new Uint8ClampedArray(o*i*4),c=new ImageData(r,o);return function(e,o,i,s){if(1!=e.length){performance.now();var u=a/e.length-1;u-=u%4;for(var l=u,h=0,f=(l+h)/2,d=(l-h)/2,v=0;v<l;v+=4)for(var p=Math.random()-s<Math.abs(v-f)/d*i,g=0;g<e.length;g++){var m=p?o[Math.floor(Math.random()*o.length)]:e[e.length-g-1][Math.floor(Math.random()*e[g].length)];r[g*u+v]=m.red,r[g*u+v+1]=m.green,r[g*u+v+2]=m.blue,r[g*u+v+3]=255}performance.now();t.putImageData(c,0,0)}else n.randomPixelator(e[0])}}},{key:"mounted",value:function(){var t=this,e=document.getElementById("canvas"),n=e.getContext("2d");this.ctx=n,this.resize();var o=0,i=function(){o>t.options.display.waitBeforeClearMilliseconds?(n.clearRect(0,0,t.options.canvas.width,t.options.canvas.height),o=0):o+=t.options.display.tickMilliseconds},a=function(){var e=H(t.options.circle,t.midiBatcher.getNotes());if(0==e.length)i();else{var o=X(t.options.mix,e);n.clearRect(0,0,t.options.canvas.width,t.options.canvas.height),n.rect(0,0,t.options.canvas.width,t.options.canvas.height),n.fillStyle=$(o),n.fill()}t.midiBatcher.tick(50)},c=function(){var e=H(t.options.circle,t.midiBatcher.getNotes());if(0==e.length)i();else{var o=e.map((function(e){return Y(e,t.options.overtone).map((function(t){return t.color}))}));o.push(T(o,(function(e){return X(t.options.mix,e)})));var a=N(o,$);t.drawAll(n,a,t.options.canvas)}},s=function(){var e=H(t.options.circle,t.midiBatcher.getNotes());if(0==e.length)i();else{var n=Object(r["a"])(e);n.length>1&&n.push(X(t.options.mix,n));for(var o=n.map((function(e){return Y(e,t.options.overtone)})),a=0;a<o.length;a++)0==a?o[a].forEach((function(e){return e.weight*=t.options.render.rootBias})):a==o.length-1?o[a].forEach((function(e){return e.weight*=t.options.render.emergentBias})):a==o.length-2?o[a].forEach((function(e){return e.weight*=t.options.render.melodyBias})):o[a].forEach((function(e){return e.weight*=t.options.render.middleBias}));var c=o.flat();Z(c);var s=[];c.forEach((function(t){for(var e=U(t.color),n=0;n<Math.floor(1e4*t.weight);n++)s.push(e)})),t.randomPixelator(s)}},u=function(){var e=H(t.options.circle,t.midiBatcher.getNotes());if(0==e.length)i();else{var n=Object(r["a"])(e),o=n.map((function(e){return Y(e,t.options.overtone)})),a=n.length>0?Y(X(t.options.mix,n),t.options.overtone):[],c=[];o.forEach((function(t){var e=[];t.forEach((function(t){for(var n=U(t.color),o=0;o<Math.floor(100*t.weight);o++)e.push(n)})),c.push(e)}));var s=[];a.forEach((function(t){for(var e=U(t.color),n=0;n<Math.floor(100*t.weight);n++)s.push(e)})),t.concentricPixelator(c,s,t.options.render.emergentBias,t.options.render.emergentBiasFloor)}},l=function(){var e=H(t.options.circle,t.midiBatcher.getNotes()),n=Object(r["a"])(e),o=n.map((function(e){return Y(e,t.options.overtone)})),i=Y(X(t.options.mix,n),t.options.overtone);o.push(i),t.wheelDrawer(N(o,(function(t){return t.color})),t.options.wheelViewModeConfig)},h=function(){t.options.viewMode.single?a():t.options.viewMode.overtoneGrid?c():t.options.viewMode.wheel?l():t.options.viewMode.randomPixelation?s():u()},f=function e(){h(),setTimeout(e,t.options.display.tickMilliseconds)};setTimeout(f,this.options.display.tickMilliseconds),et.a.enable((function(e){void 0!=e?console.log("Error trying to setup midi listener: "+e.name):console.log("Successfully set up midi listner."),console.log(et.a.inputs),console.log(et.a.outputs),0==et.a.inputs.length&&console.log("No midi input device detected.");var n=et.a.inputs[0];n.addListener("midimessage","all",(function(e){e.data[0]>>4==11&&64==e.data[1]&&(e.data[2]<=63?t.midiBatcher.endSustain():t.midiBatcher.beginSustain())})),n.addListener("noteon","all",(function(e){t.midiBatcher.handleNoteOn(R(e.note.number,e.note.octave),e.velocity)})),n.addListener("noteoff","all",(function(e){t.midiBatcher.handleNoteOff(R(e.note.number,e.note.octave))}))}),!0)}}]),n}(f["c"]);nt=Object(h["a"])([Object(f["a"])({components:{OptionsEditor:S,VApp:_["a"],VMain:V["a"],VTabs:D["a"],VTab:F["a"],VTabItem:I["a"],VContainer:g["a"],VRow:m["a"],VCol:b["a"],VBtn:O["a"]}})],nt);var ot=nt,it=ot,at=(n("5c0b"),Object(P["a"])(it,i,a,!1,null,null,null)),rt=at.exports,ct=n("f309"),st=(n("bf40"),new ct["a"]({}));o["a"].use(ct["a"]),o["a"].config.productionTip=!1,new o["a"]({vuetify:st,render:function(t){return t(rt)}}).$mount("#app")}});
//# sourceMappingURL=app.2d0fbc61.js.map