var tinyCarousel;!function($){"use strict";function t(t,i){function e(){if(i.controls,i.pager){var t=$(".pagenum",v);t.removeClass("active"),$(t[g]).addClass("active")}}function n(t){return $(this).hasClass("pagenum")&&l.move(parseInt(this.rel,10),!0),!1}function r(){i.interval&&!y&&(clearTimeout(w),w=setTimeout(function(){g=g+1===p?-1:g,x=g+1!==p&&(0===g||x),l.move(x?1:-1)},i.intervaltime))}function a(){i.controls&&f.length>0&&d.length>0&&(f.click(function(){return l.move(-1),!1}),d.click(function(){return l.move(1),!1})),i.interval,i.pager&&v.length>0&&$("a",v).click(n)}function o(){var t=u.children();m=M?$(t).outerWidth(!0):$(t).outerHeight(!0);var e=Math.ceil((M?c.outerWidth():c.outerHeight())/(m*i.display)-1);return p=Math.max(1,Math.ceil(t.length/i.display)-e),g=Math.min(p,Math.max(1,i.start))-2,u.css(M?"width":"height",m*t.length),a(),r(),l}function s(t){i.display=t;var e=u.children();m=M?$(e).outerWidth(!0):$(e).outerHeight(!0);var n=Math.ceil((M?c.outerWidth():c.outerHeight())/(m*i.display)-1);p=Math.max(1,Math.ceil(e.length/i.display)-n),g=Math.min(p,Math.max(1,i.start))-2,u.css(M?"width":"height",m*e.length)}var l=this,c=$(".viewport:first",t),u=$(".overview:first",t),h=u.children(),d=$(".next:first",t),f=$(".prev:first",t),v=$(".pager:first",t),m=0,p=0,g=0,w=void 0,y=!1,x=!0,M="x"===i.axis;return this.stop=function(){clearTimeout(w),y=!0},this.start=function(){y=!1,r()},this.move=function(t,n){if(g=n?t:g+=t,g>-1&&g<p){var a={};a[M?"margin-left":"margin-top"]=-(g*(m*i.display)),u.animate(a,{queue:!1,duration:i.animation?i.duration:0,complete:function(){"function"==typeof i.callback&&i.callback.call(this,h[g],g)}}),e(),r()}r()},o(),{resize:s}}$.tiny=$.tiny||{},$.tiny.carousel={options:{start:1,display:1,axis:"x",controls:!0,pager:!1,interval:!0,intervaltime:6e3,rewind:!0,animation:!0,duration:1200,callback:null}},$.fn.tinycarousel_start=function(){$(this).data("tcl").start()},$.fn.tinycarousel_stop=function(){$(this).data("tcl").stop()},$.fn.tinycarousel_move=function(t){$(this).data("tcl").move(t-1,!0)},$.fn.tinycarousel=function(n){for(var a=$($("#slider-code .overview").children()).outerWidth(!0),o=0;o<i;o++)e.unshift(a*(o+1));for(var s=$(window).width(),o=0;o<i;o++)if(s>e[o]){$("#slider-code").css({width:e[o]}),$("#slider-code .viewport").css({width:e[o]}),i=e.length-o;break}var l=$.extend({},$.tiny.carousel.options,n);return tinyCarousel=new t($(this),l),r(),this};var i=4,e=[],n=null,r=function(){for(var t=$(window).width(),i=0;i<e.length;i++)if(t>e[i]){$("#slider-code").css({width:e[i]}),$("#slider-code .viewport").css({width:e[i]}),tinyCarousel.resize(e.length-i);break}};$(window).resize(function(){null!=n&&clearTimeout(n),n=setTimeout(r,100)})}(jQuery);