!function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["codemirror"],a):a(CodeMirror)}(function(a){"use strict";a.defineMode("lua",function(a,b){function d(a){return new RegExp("^(?:"+a.join("|")+")","i")}function e(a){return new RegExp("^(?:"+a.join("|")+")$","i")}function l(a){for(var b=0;a.eat("=");)++b;return a.eat("["),b}function m(a,b){var c=a.next();return"-"==c&&a.eat("-")?a.eat("[")&&a.eat("[")?(b.cur=n(l(a),"comment"))(a,b):(a.skipToEnd(),"comment"):'"'==c||"'"==c?(b.cur=o(c))(a,b):"["==c&&/[\[=]/.test(a.peek())?(b.cur=n(l(a),"string"))(a,b):/\d/.test(c)?(a.eatWhile(/[\w.%]/),"number"):/[\w_]/.test(c)?(a.eatWhile(/[\w\\\-_.]/),"variable"):null}function n(a,b){return function(c,d){for(var f,e=null;null!=(f=c.next());)if(null==e)"]"==f&&(e=0);else if("="==f)++e;else{if("]"==f&&e==a){d.cur=m;break}e=null}return b}}function o(a){return function(b,c){for(var e,d=!1;null!=(e=b.next())&&(e!=a||d);)d=!d&&"\\"==e;return d||(c.cur=m),"string"}}var c=a.indentUnit,f=e(b.specials||[]),g=e(["_G","_VERSION","assert","collectgarbage","dofile","error","getfenv","getmetatable","ipairs","load","loadfile","loadstring","module","next","pairs","pcall","print","rawequal","rawget","rawset","require","select","setfenv","setmetatable","tonumber","tostring","type","unpack","xpcall","coroutine.create","coroutine.resume","coroutine.running","coroutine.status","coroutine.wrap","coroutine.yield","debug.debug","debug.getfenv","debug.gethook","debug.getinfo","debug.getlocal","debug.getmetatable","debug.getregistry","debug.getupvalue","debug.setfenv","debug.sethook","debug.setlocal","debug.setmetatable","debug.setupvalue","debug.traceback","close","flush","lines","read","seek","setvbuf","write","io.close","io.flush","io.input","io.lines","io.open","io.output","io.popen","io.read","io.stderr","io.stdin","io.stdout","io.tmpfile","io.type","io.write","math.abs","math.acos","math.asin","math.atan","math.atan2","math.ceil","math.cos","math.cosh","math.deg","math.exp","math.floor","math.fmod","math.frexp","math.huge","math.ldexp","math.log","math.log10","math.max","math.min","math.modf","math.pi","math.pow","math.rad","math.random","math.randomseed","math.sin","math.sinh","math.sqrt","math.tan","math.tanh","os.clock","os.date","os.difftime","os.execute","os.exit","os.getenv","os.remove","os.rename","os.setlocale","os.time","os.tmpname","package.cpath","package.loaded","package.loaders","package.loadlib","package.path","package.preload","package.seeall","string.byte","string.char","string.dump","string.find","string.format","string.gmatch","string.gsub","string.len","string.lower","string.match","string.rep","string.reverse","string.sub","string.upper","table.concat","table.insert","table.maxn","table.remove","table.sort"]),h=e(["and","break","elseif","false","nil","not","or","return","true","function","end","if","then","else","do","while","repeat","until","for","in","local"]),i=e(["function","if","repeat","do","\\(","{"]),j=e(["end","until","\\)","}"]),k=d(["end","until","\\)","}","else","elseif"]);return{startState:function(a){return{basecol:a||0,indentDepth:0,cur:m}},token:function(a,b){if(a.eatSpace())return null;var c=b.cur(a,b),d=a.current();return"variable"==c&&(h.test(d)?c="keyword":g.test(d)?c="builtin":f.test(d)&&(c="variable-2")),"comment"!=c&&"string"!=c&&(i.test(d)?++b.indentDepth:j.test(d)&&--b.indentDepth),c},indent:function(a,b){var d=k.test(b);return a.basecol+c*(a.indentDepth-(d?1:0))},lineComment:"--",blockCommentStart:"--[[",blockCommentEnd:"]]"}}),a.defineMIME("text/x-lua","lua")});
