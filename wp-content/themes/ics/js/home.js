

//Client list show / hide, Carousel
jQuery(document).ready(function(){

$(".curtains > li").css({"position":"absolute"});
$("#work, #about, #footer").css({"top":"100%"});
$("#footer .blimptext, #blimp .blimptext").css({"top":"140%"});
$("#tagline").css({"margin-top": 0});
$("#banner .navbar-inner").css({"margin-top": -55});
//$("#loadcover").show();

    $('#client-wrap').hide('0');

    $("div.client-carousel").carousel({autoslide:true});
    $('#slider-code').tinycarousel({display: 4, duration: 500});

    //Vertically center the homepage content
    var resizefunc = function(){
        var mt = $(window).height()-$("#tagline").height();
        mt = mt > 60 ? mt/2 : 60;
        $("#tagline").css({"margin-top":mt});
    };
    resizefunc();
    var resizeTimeOut = null;
    $(window).resize(function(){
        if(resizeTimeOut != null){ clearTimeout(resizeTimeOut); };
        resizeTimeOut = setTimeout(resizefunc, 100);
    });

    $('#show-clients').click(function() {
        if ($('#client-wrap').is(':visible')) {
            $('#client-wrap').slideUp(500,function(){kikaScroll.scrollAnimate.resize();});
            $('#show-clients').text('Our Clients');
        } else {
            $('#client-wrap').slideDown(500,function(){kikaScroll.scrollAnimate.resize();});
            $('#show-clients').text('Hide Clients');
        }
    

    });
});


/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */

(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

if ($.event.fixHooks) {
    for ( var i=types.length; i; ) {
        $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
    }
}

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },
    
    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    
    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";
    
    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }
    
    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;
    
    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }
    
    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
    
    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);
    
    return ($.event.dispatch || $.event.handle).apply(this, args);
}

})(jQuery);



/**
 * @author sole / http://soledadpenades.com
 * @author mr.doob / http://mrdoob.com
 * @author Robert Eisele / http://www.xarg.org
 * @author Philippe / http://philippe.elsass.me
 * @author Robert Penner / http://www.robertpenner.com/easing_terms_of_use.html
 * @author Paul Lewis / http://www.aerotwist.com/
 * @author lechecacharro
 * @author Josh Faul / http://jocafa.com/
 */

var TWEEN = TWEEN || ( function () {

    var i, tl, interval, time, fps = 60, autostart = false, tweens = [], num_tweens;

    return {
    
        setFPS: function ( f ) {

            fps = f || 60;

        },

        start: function ( f ) {
            
            if( arguments.length != 0 ) {
                this.setFPS( f );
            }
            
            interval = setInterval( this.update, 1000 / fps );

        },

        stop: function () {

            clearInterval( interval );

        },

        setAutostart: function ( value ) {

            autostart = value;
            
            if(autostart && !interval) {
                this.start();
            }

        },

        add: function ( tween ) {

            tweens.push( tween );

            if (autostart && !interval) {

                this.start();

            }

        },

        getAll: function() {

            return tweens;

        },

        removeAll: function() {

            tweens = [];

        },

        remove: function ( tween ) {

            i = tweens.indexOf( tween );

            if ( i !== -1 ) {

                tweens.splice( i, 1 );

            }

        },

        update: function (_time) {

            i = 0; num_tweens = tweens.length;
            var time = _time || new Date().getTime();

            while ( i < num_tweens ) {

                if ( tweens[ i ].update( time ) ) {

                    i++;

                } else {

                    tweens.splice( i, 1 );
                    num_tweens--;

                }

            }

            if (num_tweens == 0 && autostart == true) {

                this.stop();

            }

        }

    };

} )();

TWEEN.Tween = function ( object ) {

    var _object = object,
    _valuesStart = {},
    _valuesDelta = {},
    _valuesEnd = {},
    _duration = 1000,
    _delayTime = 0,
    _startTime = null,
    _easingFunction = TWEEN.Easing.Linear.EaseNone,
    _chainedTween = null,
    _onUpdateCallback = null,
    _onCompleteCallback = null;

    this.to = function ( properties, duration ) {

        if( duration !== null ) {

            _duration = duration;

        }

        for ( var property in properties ) {

            // This prevents the engine from interpolating null values
            if ( _object[ property ] === null ) {

                continue;

            }

            // The current values are read when the tween starts;
            // here we only store the final desired values
            _valuesEnd[ property ] = properties[ property ];

        }

        return this;

    };
 
    this.start = function (_time) {

        TWEEN.add( this );

        _startTime = _time ? _time + _delayTime : new Date().getTime() + _delayTime;

        for ( var property in _valuesEnd ) {

            // Again, prevent dealing with null values
            if ( _object[ property ] === null ) {

                continue;

            }

            _valuesStart[ property ] = _object[ property ];
            _valuesDelta[ property ] = _valuesEnd[ property ] - _object[ property ];

        }

        return this;
    };

    this.stop = function () {

        TWEEN.remove( this );
        return this;

    };

    this.delay = function ( amount ) {

        _delayTime = amount;
        return this;

    };

    this.easing = function ( easing ) {

        _easingFunction = easing;
        return this;

    };

    this.chain = function ( chainedTween ) {

        _chainedTween = chainedTween;
        return this;

    };

    this.onUpdate = function ( onUpdateCallback ) {

        _onUpdateCallback = onUpdateCallback;
        return this;

    };

    this.onComplete = function ( onCompleteCallback ) {

        _onCompleteCallback = onCompleteCallback;
        return this;

    };

    this.update = function ( time ) {

        var property, elapsed, value;

        if ( time < _startTime ) {

            return true;

        }

        elapsed = ( time - _startTime ) / _duration;
        elapsed = elapsed > 1 ? 1 : elapsed;

        value = _easingFunction( elapsed );

        for ( property in _valuesDelta ) {

            _object[ property ] = _valuesStart[ property ] + _valuesDelta[ property ] * value;

        }

        if ( _onUpdateCallback !== null ) {

            _onUpdateCallback.call( _object, value );

        }

        if ( elapsed == 1 ) {

            if ( _onCompleteCallback !== null ) {

                _onCompleteCallback.call( _object );

            }

            if ( _chainedTween !== null ) {

                _chainedTween.start();

            }

            return false;

        }

        return true;

    };

    /*
    this.destroy = function () {

        TWEEN.remove( this );

    };
    */
}

TWEEN.Easing = { Linear: {}, Quadratic: {}, Cubic: {}, Quartic: {}, Quintic: {}, Sinusoidal: {}, Exponential: {}, Circular: {}, Elastic: {}, Back: {}, Bounce: {} };


TWEEN.Easing.Linear.EaseNone = function ( k ) {

    return k;

};

//

TWEEN.Easing.Quadratic.EaseIn = function ( k ) {

    return k * k;

};

TWEEN.Easing.Quadratic.EaseOut = function ( k ) {

    return - k * ( k - 2 );

};

TWEEN.Easing.Quadratic.EaseInOut = function ( k ) {

    if ( ( k *= 2 ) < 1 ) return 0.5 * k * k;
    return - 0.5 * ( --k * ( k - 2 ) - 1 );

};

//

TWEEN.Easing.Cubic.EaseIn = function ( k ) {

    return k * k * k;

};

TWEEN.Easing.Cubic.EaseOut = function ( k ) {

    return --k * k * k + 1;

};

TWEEN.Easing.Cubic.EaseInOut = function ( k ) {

    if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k;
    return 0.5 * ( ( k -= 2 ) * k * k + 2 );

};

//

TWEEN.Easing.Quartic.EaseIn = function ( k ) {

    return k * k * k * k;

};

TWEEN.Easing.Quartic.EaseOut = function ( k ) {

     return - ( --k * k * k * k - 1 );

}

TWEEN.Easing.Quartic.EaseInOut = function ( k ) {

    if ( ( k *= 2 ) < 1) return 0.5 * k * k * k * k;
    return - 0.5 * ( ( k -= 2 ) * k * k * k - 2 );

};

//

TWEEN.Easing.Quintic.EaseIn = function ( k ) {

    return k * k * k * k * k;

};

TWEEN.Easing.Quintic.EaseOut = function ( k ) {

    return ( k = k - 1 ) * k * k * k * k + 1;

};

TWEEN.Easing.Quintic.EaseInOut = function ( k ) {

    if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k * k * k;
    return 0.5 * ( ( k -= 2 ) * k * k * k * k + 2 );

};

// 

TWEEN.Easing.Sinusoidal.EaseIn = function ( k ) {

    return - Math.cos( k * Math.PI / 2 ) + 1;

};

TWEEN.Easing.Sinusoidal.EaseOut = function ( k ) {

    return Math.sin( k * Math.PI / 2 );

};

TWEEN.Easing.Sinusoidal.EaseInOut = function ( k ) {

    return - 0.5 * ( Math.cos( Math.PI * k ) - 1 );

};

//

TWEEN.Easing.Exponential.EaseIn = function ( k ) {

    return k == 0 ? 0 : Math.pow( 2, 10 * ( k - 1 ) );

};

TWEEN.Easing.Exponential.EaseOut = function ( k ) {

    return k == 1 ? 1 : - Math.pow( 2, - 10 * k ) + 1;

};

TWEEN.Easing.Exponential.EaseInOut = function ( k ) {

    if ( k == 0 ) return 0;
        if ( k == 1 ) return 1;
        if ( ( k *= 2 ) < 1 ) return 0.5 * Math.pow( 2, 10 * ( k - 1 ) );
        return 0.5 * ( - Math.pow( 2, - 10 * ( k - 1 ) ) + 2 );

};

// 

TWEEN.Easing.Circular.EaseIn = function ( k ) {

    return - ( Math.sqrt( 1 - k * k ) - 1);

};

TWEEN.Easing.Circular.EaseOut = function ( k ) {

    return Math.sqrt( 1 - --k * k );

};

TWEEN.Easing.Circular.EaseInOut = function ( k ) {

    if ( ( k /= 0.5 ) < 1) return - 0.5 * ( Math.sqrt( 1 - k * k) - 1);
    return 0.5 * ( Math.sqrt( 1 - ( k -= 2) * k) + 1);

};

//

TWEEN.Easing.Elastic.EaseIn = function( k ) {

    var s, a = 0.1, p = 0.4;
    if ( k == 0 ) return 0; if ( k == 1 ) return 1; if ( !p ) p = 0.3;
    if ( !a || a < 1 ) { a = 1; s = p / 4; }
    else s = p / ( 2 * Math.PI ) * Math.asin( 1 / a );
    return - ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );

};

TWEEN.Easing.Elastic.EaseOut = function( k ) {

    var s, a = 0.1, p = 0.4;
    if ( k == 0 ) return 0; if ( k == 1 ) return 1; if ( !p ) p = 0.3;
    if ( !a || a < 1 ) { a = 1; s = p / 4; }
    else s = p / ( 2 * Math.PI ) * Math.asin( 1 / a );
    return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );

};

TWEEN.Easing.Elastic.EaseInOut = function( k ) {

    var s, a = 0.1, p = 0.4;
    if ( k == 0 ) return 0; if ( k == 1 ) return 1; if ( !p ) p = 0.3;
        if ( !a || a < 1 ) { a = 1; s = p / 4; }
        else s = p / ( 2 * Math.PI ) * Math.asin( 1 / a );
        if ( ( k *= 2 ) < 1 ) return - 0.5 * ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );
        return a * Math.pow( 2, -10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;

};

//

TWEEN.Easing.Back.EaseIn = function( k ) {

    var s = 1.70158;
    return k * k * ( ( s + 1 ) * k - s );

};

TWEEN.Easing.Back.EaseOut = function( k ) {

    var s = 1.70158;
    return ( k = k - 1 ) * k * ( ( s + 1 ) * k + s ) + 1;

};

TWEEN.Easing.Back.EaseInOut = function( k ) {

    var s = 1.70158 * 1.525;
    if ( ( k *= 2 ) < 1 ) return 0.5 * ( k * k * ( ( s + 1 ) * k - s ) );
    return 0.5 * ( ( k -= 2 ) * k * ( ( s + 1 ) * k + s ) + 2 );

};

// 

TWEEN.Easing.Bounce.EaseIn = function( k ) {

    return 1 - TWEEN.Easing.Bounce.EaseOut( 1 - k );

};

TWEEN.Easing.Bounce.EaseOut = function( k ) {

    if ( ( k /= 1 ) < ( 1 / 2.75 ) ) {

        return 7.5625 * k * k;

    } else if ( k < ( 2 / 2.75 ) ) {

        return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;

    } else if ( k < ( 2.5 / 2.75 ) ) {

        return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;

    } else {

        return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;

    }

};

TWEEN.Easing.Bounce.EaseInOut = function( k ) {

    if ( k < 0.5 ) return TWEEN.Easing.Bounce.EaseIn( k * 2 ) * 0.5;
    return TWEEN.Easing.Bounce.EaseOut( k * 2 - 1 ) * 0.5 + 0.5;

};


var infinity = false;
var scrollMouseDown = false;
var mouseDownTimer = null;
var breakertest;
var animcounter = 0;
var outsideAnimLoop;

(function($){

        
    $.extend(true, window, {
        scrollax: {
            make: scrollax,
        }
    });
      
function scrollax(opts){
    
    var settings = {},
        defaults = {
            startAt: 1,                 // start experience at
            sectionCheckInterval: 1000, // check section interval
            clampWidth: 1600,
            tracking: false
        },
        scrollAnimate,
        //currentSection = -1,
        currentSection = 1,
        checkSectionLock = 1,
        updateCount = 0,
        loadProgress;
    
    //Animation viewport metrics
    var wHeight, wWidth, wCenter, pagePercent, outroComp, ratio;
    //Scrollbar related stuff
    var $scrollBar, $scrollThumb, isScrolling, clickEventToGoTo, clickScrollInt, scrollBarHeight, scrollThumbHeight, thumbDelta, scrollThumbPosition, scrollPercent;
    //Tooltip stuff
    var tooltipJustOpened = true;
    //Overlay
    var $overlay;
    var player;
    var lastActivity = (new Date()).getTime();
    var pulseReminders = 3;
    var pulseScrollTeaserRunning = false;
    var animLoop;

    //---------------------------------------------
    // Animation Data
    //---------------------------------------------
    
    var t = 0;

    var totalHeightPx = 7800;

    var eventsDelta = 0;

    var scrollOffset = 0;
   
    var sectionIndex = opts.sectionIndex;
    var maxScroll = opts.maxScroll;
    var animation = opts.animation;
    var waypoints = opts.waypoints;
    var container = opts.container;
    
    var useBrowserScrollBar = opts.useBrowserScrollBar;
    
    function getAnimLoop(){ return animLoop; }
    function stopAnimLoop(){
        window.cancelRequestAnimFrame(outsideAnimLoop);
    }
    
    // ---------------------------------------------
    // SECTIONS
    // ---------------------------------------------

    function setSectionIndex(sections){
        sectionIndex = sections;
    }

    function checkSection() {
        if (checkSectionLock>0) {
            checkSectionLock--;
            return;
        }
        
        var scrollTop = scrollAnimate.getScrollTop();

        for (var i = 0; i<sectionIndex.length; i++) {
            
            //sectionIndex[i].position = $(sectionIndex[i].id).offset().top;
            
            var section = sectionIndex[i];
            //var actualScrollTop = section.correct ? scrollTop+ratio+extraFudgeFactor : scrollTop;
            var actualScrollTop = section.correct ? scrollTop : scrollTop;
            if (actualScrollTop > section.position ) {

                //var sectionEnd = (i==sectionIndex.length-1) ? scrollAnimate.getMaxScroll()+ratio+extraFudgeFactor : sectionIndex[i+1].position;
                var sectionEnd = (i==sectionIndex.length-1) ? scrollAnimate.getMaxScroll() : sectionIndex[i+1].position;
                if (actualScrollTop < sectionEnd) {
                    //if (i>3)
                        //pulseReminders = 0;
                    enterSection(i);
                    return;
                }
                
            }
        };
    }

    function gotoSectionTag(sectionTag, goHard) {
        for (var i = 0; i<sectionIndex.length; i++) {
            if (sectionIndex[i].tag===sectionTag) {
                var newpos = sectionIndex[i].position;
                newpos = sectionIndex[i].offset ? newpos + sectionIndex[i].offset : newpos;
                //console.log(ratio);
                /*
                if (sectionIndex[i].correct == true ) 
                    newpos -=ratio;
                */
                /*if (newpos < scrollAnimate.getScrollTop()){
                    newpos = maxScroll + newpos + 5;
                }*/
                newpos = newpos > scrollAnimate.getScrollTop() ? newpos + 5 : newpos - 5;
                //newpos = newpos > scrollAnimate.getScrollTop() ? newpos + 5 : newpos - 5;
                //if (i == 11){
                    //newpos += 700;
                //}

                /*
                if ($scrollBar.length > 0){
                    if (goHard){
                        scrollAnimate.setScrollHard(newpos);
                    }
                    else {
                        scrollAnimate.scrollTo( newpos );
                    }
                }
                else {
                    if (scrollAnimate.isTouch()){
                        if (goHard){
                            //$(window).scrollTop( newpos );
                            scrollAnimate.setScrollHard(newpos);
                        }
                        else {
                            //$(window).scrollTop( newpos );
                            scrollAnimate.scrollTo( newpos );
                        }
                    }
                    else {
                        if (goHard){
                            //$(window).scrollTop( newpos );
                            scrollAnimate.setScrollHard(newpos);
                            scrollAnimate.scrollTo(newpos+1);
                        }
                        else {
                            //$(window).scrollTop( newpos );
                            scrollAnimate.scrollTo( newpos );
                        }
                    }
                }
                
                */
                


                if (goHard){
                    if (!((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.toLowerCase().indexOf("android") > -1) )) {
                        $(window).scrollTop( newpos );
                    }
                    scrollAnimate.setScrollHard(newpos);
                    scrollAnimate.scrollTo(newpos+1);
                }
                else {    
                    if (!((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.toLowerCase().indexOf("android") > -1) )) {
                        $(window).scrollTop( newpos );
                    }
                    scrollAnimate.scrollTo( newpos );
                }
                
				
				/*
					if (scrollAnimate.isTouch()){
                        if (goHard){
                            //$(window).scrollTop( newpos );
                            scrollAnimate.setScrollHard(newpos);
                            scrollAnimate.scrollTo(newpos+1);
                        }
                        else {
                            //$(window).scrollTop( newpos );
                            scrollAnimate.scrollTo( newpos );
                        }
                    }
                    else {
                        if (goHard){
                            scrollAnimate.setScrollHard(newpos);
                            //scrollAnimate.scrollTo(newpos+1);
                        	$(window).scrollTop( newpos+1 );
                        }
                        else {
                            $(window).scrollTop( newpos );
                            //scrollAnimate.scrollTo( newpos );
                        }
                    }
*/
                enterSection(i);
                return;
            }
        }
    }
    
    function gotoNextSection(sectionTag) {
        for (var i = 0; i<sectionIndex.length; i++) {
            if (sectionIndex[i].tag===sectionTag) {
                var newpos = sectionIndex[i].position;
                
                newpos = newpos > scrollAnimate.getScrollTop() ? newpos + 5 : kikaScroll.maxScroll + newpos + 5;;
                
                scrollAnimate.scrollTo( newpos );
                enterSection(i);
                return;
            }
        }
    }
    
    function enterSection(index) {
        if (currentSection==index) {
            return;
        }
        currentSection = index;
        /*
         * $('#navigation > a').each( function(i, elm){
            if (i==index) {
                $(elm).addClass('active');
            } else {
                $(elm).removeClass('active');
            }
        });
        */
        //location.hash = sectionIndex[index].tag;
        //_gaq.push(['_trackEvent', 'Section Entered', sectionIndex[index].name]);
        
        if (index == 1 || index == 2 || index == 4){
            if (location.hash != sectionIndex[index].tag){
                if(history.pushState){ // check if the browser supports the pushState
                    history.pushState({}, "", sectionIndex[index].tag);
                }
                else {
                    location.hash = sectionIndex[index].tag;
                }
                $(".navbar .active").removeClass("active");
                $(".menu-"+sectionIndex[index].name).addClass("active");
            }
        }
        
        
    }
    
    function getCurrentSection(){
        return currentSection;
    }


    // ---------------------------------------------
    // ScrollBar
    // ---------------------------------------------

    function activateScrollBar(thumbHeight) {
        scrollThumbHeight = thumbHeight;
        scrollThumbPosition = 0;
        scrollPercent = 0;
        isScrolling = false;
        $scrollBar = $('#scrollBar');
        $scrollBar.show();
        $scrollThumb = $('#scrollBar .thumb');
        $scrollThumb.css('height',scrollThumbHeight+"px");
        $scrollThumb.bind('mousedown', startScroll);
    }
    function resizeScrollBar() {
        scrollBarHeight = wHeight;
        $scrollBar.css('height',scrollBarHeight+"px");
        setScrollBarPosition(scrollPercent);
    }
    function setScrollBarPosition(percent) {
        scrollThumbPosition = (scrollBarHeight-scrollThumbHeight)*percent;
        $scrollThumb.css('top',scrollThumbPosition);
    }

    //Click on scrollBar Events
    
    function clickScroll(event) {
        clickEventToGoTo = event;
        thumbDelta = (scrollThumbPosition - event.pageY) > 0 ? (-1 * pagePercent) : pagePercent;
        scrollPercent = (scrollThumbPosition/(scrollBarHeight-scrollThumbHeight)) + thumbDelta;
        scrollPercent = scrollPercent > 1 ? 1 : Math.max(0, scrollPercent);
        scrollAnimate.scrollTo( maxScroll*scrollPercent );
        clickScrollInt = setTimeout(function(){clickScroll(clickEventToGoTo);},200);
        return false;
    }
    function updateScrollPosition(event){
        clearTimeout(clickScrollInt);
        clickScrollInt = setTimeout(function(){clickScroll(event);},40);
    }
    function endScrollClick(event){
        isScrolling = false;
        //$(document).unbind('mousemove', updateScrollPosition);
        $(document).unbind('mouseup', endScrollClick);
        clearTimeout(clickScrollInt);
        return false;
    }
    
    //Click on scrollThumb Events
    
    function startScroll(event) {
        isScrolling = true;
        thumbDelta = scrollThumbPosition - event.pageY;
        //$(document).bind('mousemove', scrollUpdate);
        $(document).bind('mouseup', endScroll);
        return false;
    }
    /*function scrollUpdate(event) {
        scrollThumbPosition = event.pageY+thumbDelta;
        scrollThumbPosition = Math.max(0, Math.min(scrollBarHeight-scrollThumbHeight, scrollThumbPosition));
        scrollPercent = scrollThumbPosition/(scrollBarHeight-scrollThumbHeight);
        scrollPercent = scrollPercent > 1 ? 1 : Math.max(0, scrollPercent);
        scrollAnimate.scrollTo( maxScroll*scrollPercent );
        return false;
    }*/
    function endScroll(event) {
        isScrolling = false;
        //$(document).unbind('mousemove', scrollUpdate);
        $(document).unbind('mouseup', endScroll);
        return false;
    }

    // ---------------------------------------------
    // Util stuff
    // ---------------------------------------------

    function isTouch() {
        return 'ontouchstart' in window;
    }

    //--------------------------------------------------
    // Public & Setup
    //--------------------------------------------------
    var init = function( opts ) {
        settings = $.extend( defaults, opts );

        //initalizeNavigation();

        if (useBrowserScrollBar){
            activateScrollBar(37);
            $scrollBar.hide();
            //container.css({"position":"static"});
            //$("body").css({"overflow-y":"auto","overflow-x":"hidden"});
            //animation = animation.slice(2,animation.length);
            //if (!(isTouch())){
                $(window).scroll(function(){
                    var scrollTo = $(window).scrollTop();
                    kikaScroll.scrollAnimate.scrollTo(scrollTo);
                });
            //}
        }
        else {
            if (!isTouch()){
                activateScrollBar(37);
                $('#scrollBar .thumb').mousedown(function(e){
                    scrollMouseDown = true;
                });
                $('#scrollBar .thumb').mouseup(function(e){
                    scrollMouseDown = false;
                });
            }
        }
        if (window.location.hash) {
            //Do something
            //Just doing it in the onStart
        };

        //Create scroll animator
        scrollAnimate = ScrollAnimator();
        scrollAnimate.init({
            //Animation data
            animation: animation,
            
            waypoints: waypoints,
            
            scrollOffset: scrollOffset,
            //infinity: infinity,
            
            useBrowserScrollBar: useBrowserScrollBar,
            
            //Default Settings
            maxScroll: maxScroll,       // max scroll
            useRAF : false,             // set requestAnimationFrame
            tickSpeed: 70,              // set interval (ms) if not using RAF
            scrollSpeed: 35,
            debug: false,               // turn on debug
            //tweenSpeed: .2,             // scrollTop tween speed
            tweenSpeed: .4,             // scrollTop tween speed
            startAt: settings.startAt,  // scrollTop where the experience starts
            container: container,      // main container
            
            //Callbacks
            onStart: function() {
                //Fixme this working?
                /*if (window.location.hash){
                    var hash = window.location.hash;
                    container.scrollTop(0)
                    kikaScroll.gotoSectionTag(hash);
                }*/
            },

            //There be dragons here, no touching...
            onResize: function(page) {
                //Nasty page tidy up stuff on resize
                wHeight = page.wHeight;
                //Clamp width if needed
                //wWidth = (settings.clampWidth > 0 && page.wWidth > settings.clampWidth) ? settings.clampWidth : page.wWidth;
                if (page.wWidth > settings.clampWidth){
                    wWidth = (settings.clampWidth > 0 && $(window).width() > settings.clampWidth) ? settings.clampWidth : $(window).width();
                }
                else {
                    wWidth = (settings.clampWidth > 0 && page.wWidth > settings.clampWidth) ? settings.clampWidth : page.wWidth;
                }
                wCenter = page.wCenter; 
                pagePercent = wHeight / maxScroll;
                
                if ($scrollBar.length > 0) 
                    resizeScrollBar();
                /*
                if ($("#about").length > 0){
                    $("#about").css({"top":$(window).height()});
                }*/

                if (useBrowserScrollBar && kikaScroll){
                    
                    var windowheight = $(window).height();

                    var curtains = $(".curtains").children();
                    var position = 0;
                    for (var i=0; i<curtains.length; i++){
                        //var zindex = layerOrder[i];
                        //$(curtains[i]).css({"z-index": zindex });
                        var height =  $(curtains[i]).height();
                        if (i==0 || i==3 || i==5){
                            height = windowheight;
                        }
                        if (i==4){
                            height += windowheight;
                        }
                        sectionIndex[i]["position"] = position;
                        sectionIndex[i]["height"] = height;
                        position += height;
                    }
                    
                    //$("#main").css({"height":height- $(curtains[2]).height() });
                    $("#forceHeight").css({"height":position });
                    //$("#footer").css({"bottom":-500 });

                    //sectionIndex[1].position = sectionIndex[1].position*2;
                    //sectionIndex[3].height += windowheight;
                    scrollAnimate.animation()[0].keyframes[1].properties["margin-top"] = -windowheight;
                    scrollAnimate.animation()[2].keyframes[1].properties["margin-top"] = -sectionIndex[1].height;
                    scrollAnimate.animation()[3].keyframes[1].properties["margin-top"] = -windowheight;
                    scrollAnimate.animation()[4].keyframes[0].properties["margin-top"] = -windowheight;
                    scrollAnimate.animation()[4].keyframes[1].properties["margin-top"] = -sectionIndex[2].height-windowheight;
                    scrollAnimate.animation()[8].keyframes[1].properties["margin-top"] = -sectionIndex[4].height-windowheight;
                    scrollAnimate.animation()[11].keyframes[1].properties["margin-top"] = (windowheight-sectionIndex[6].height)/2-$("#space .blimptext").height()/2;
                    scrollAnimate.animation()[12].keyframes[1].properties["margin-top"] = -sectionIndex[6].height;

                    sectionIndex[4].offset = windowheight;

                    //sectionIndex[6].position = sectionIndex[1].position + $("#portfolio")[0].offsetTop;

                    maxScroll = position;

                    scrollAnimate.setMaxScroll(maxScroll);

                }

                scrollAnimate.scrollTo(scrollAnimate.getScrollTop());
                
            },

            onUpdate: function(scrollTop) {
                if ($scrollBar) 
                    setScrollBarPosition(scrollTop/kikaScroll.maxScroll);
            }
        });

        // section checks
        setInterval( checkSection, settings.sectionCheckInterval );

        return scrollAnimate;
    }
        //Keyboard Controls
        $(window).keydown(function(e) {
            if (e.keyCode == 40 || e.keyCode == 39) {
                var currentScroll = scrollAnimate.getScrollTop();
                var targetScroll = currentScroll + 70;
                scrollAnimate.scrollTo(targetScroll);
                
            }
            if (e.keyCode == 38 || e.keyCode == 37) {
                var currentScroll = scrollAnimate.getScrollTop();
                var targetScroll = currentScroll - 70;
                scrollAnimate.scrollTo(targetScroll);   
            }
            
        });
        
        $(document).on("mousewheel", function(e,delta){
                //scrollAnimate.wheelHandler(e,delta);
        });
        /*
        $(document).on("click", 'a.scrollTo', function(e){
                e.preventDefault();
                console.log("a");
                //var hash = this.href.substring( this.href.indexOf('#') );
                var hash = this.href;
                var hash = this.hash;
                kikaScroll.gotoSectionTag(hash);
                return false;
        });*/
        $(document).on("click", '.scrollTo', function(e){
                e.preventDefault();
                var hash = this.hash ? this.hash : $(this).find("a")[0].hash;
                kikaScroll.gotoSectionTag(hash);
                return false;
        });
        $(document).on("click", '#nextscreen', function(e){
                e.preventDefault();
                //console.log("next");
                var sec = kikaScroll.getCurrentSection() + 2;
                var sectouse = sec > 9 ? 1 : sec;
                kikaScroll.gotoNextSection(sectionIndex[sectouse].id);
                return false;
        });
        $(document).on("mousedown", "#scrollBar", function(e){
            if (!($(e.target).hasClass("thumb"))){
                clickScroll(e);
                isScrolling = true;
                //$(document).bind('mousemove', updateScrollPosition);
                $(document).bind('mouseup', endScrollClick);
            }
            return false;
        });
            
    init();
        
    return {
        init: init,
        scrollAnimate: scrollAnimate,
        setScrollBarPosition: setScrollBarPosition,
        gotoSectionTag: gotoSectionTag,
        enterSection: enterSection,
        setSectionIndex: setSectionIndex,
        
        resizeScrollBar: resizeScrollBar,
        sectionIndex: sectionIndex,
        maxScroll: maxScroll,
        
        gotoNextSection: gotoNextSection,
        getCurrentSection: getCurrentSection,
        getAnimLoop: getAnimLoop,
        stopAnimLoop: stopAnimLoop,
    }
    
//})();
}
})(jQuery);

var ScrollAnimator = function() {

    var settings = {},
        page,
        started = false,
        paused = false,
        animation = null,
        waypoints = null,
        scrollOffset = 0,
        maxScroll = 0,
        useBrowserScrollBar;

    var w = $(window),
        d = $(document),
        touch = false,                  // is touch device
        touchStart = { x: 0, y: 0 },    // vars for touch
        scrollStart = 0,                // vars for scroll
        scrollTopTweened = 0,
        scrollTop = 0,
        scrollDirection = 0,
        autoScrollInterval;
    
    //--------------------------------------------------
    //Animation Controller
    //--------------------------------------------------
    function animationLoop() {
        outsideAnimLoop = requestAnimFrame(animationLoop);

        if (paused)
            return;
        
        if (Math.ceil(scrollTopTweened) !== Math.floor(scrollTop)) {

              $("#scrolldiv").html("<div>Scrolltop "+scrollTop+" and scrollTopTweened "+scrollTopTweened+"</div>");
            //Smooth out scrolling action
            scrollTopTweened += settings.tweenSpeed * (scrollTop - scrollTopTweened);
            //Direction
            scrollDirection = scrollTop > scrollTopTweened ? 1 : -1;

            for (var i in animation) {
                var anim = animation[i];
                
                var animstart = typeof anim.startAt === 'function' ? anim.startAt() : anim.startAt;
                var animend = typeof anim.endAt === 'function' ? anim.endAt() : anim.endAt;

                // check if animation is in range
                if (scrollTopTweened >= animstart && scrollTopTweened <= animend) {
                    startAnimatable( anim );
                    render( anim );
                } else {
                    stopAnimatable( anim );
                }
            }


            for (var i=0; i<waypoints.length; i++){

                var ot = $(waypoints[i].el).offset().top;
            
                if (useBrowserScrollBar){
                    ot = ot - $(window).scrollTop();
                }
            
                if (waypoints[i].offset){ot += waypoints[i].offset;}
                if (ot >= 0 && waypoints[i].d == "down"){
                    waypoints[i].d = "up";
                    waypoints[i].func(waypoints[i].d);
                }
                else if (ot <= 0 && waypoints[i].d == "up"){
                    waypoints[i].d = "down";
                    waypoints[i].func(waypoints[i].d);
                }
            }
            
            // onAnimate callback
            if (typeof settings.onUpdate === 'function') settings.onUpdate(scrollTopTweened);
        }
    }

    function render( anim ) {
        //Calculate %

        var animstart = typeof anim.startAt === 'function' ? anim.startAt() : anim.startAt;
        var animend = typeof anim.endAt === 'function' ? anim.endAt() : anim.endAt;

        var progress = (animstart - scrollTopTweened) / (animstart - animend);
        //Clamp progress between 0 and 100 percent (render is always called 1 last time at the end to clean up)
        progress = Math.max(0, Math.min(1, progress));
        //Create new CSS properties map
        var properties = {};

        anim.lastProgress = progress;

        //Check and run keyframes within scroll range
        if (anim.keyframes) {
            for ( var i = 1; i < anim.keyframes.length; i++ ) {
                var keyframe = anim.keyframes[ i ],
                    lastkeyframe = anim.keyframes[ i - 1 ],
                    keyframeProgress = ( lastkeyframe.position - progress ) / ( lastkeyframe.position - keyframe.position );
                
                if ( keyframeProgress >= 0 && keyframeProgress <= 1 ) {
                    
                    if (keyframe.onProgress && typeof keyframe.onProgress === 'function') {
                        keyframe.onProgress( keyframeProgress , scrollDirection );
                    }

                    for ( var property in keyframe.properties ) {
                        
                        //Are we animating a background in more than X?
                        if (property==="background-position" && keyframe.properties[property].hasOwnProperty("x")) {
                            //Process the object
                            var startValues = keyframe.properties[property];
                            var endValues   = lastkeyframe.properties[property];
                            var result = "";
                            if (typeof startValues.x === "number") {
                                result += getTweenedValue( endValues.x, startValues.x, keyframeProgress, 1, keyframe.ease ) + "px";
                            } else {
                                result += startValues.x
                            }
                            result += " ";
                            if (typeof startValues.y === "number") {
                                result += getTweenedValue( endValues.y, startValues.y, keyframeProgress, 1, keyframe.ease ) + "px";
                            } else {
                                result += startValues.y
                            }
                            //console.log(result);
                            properties[ property ] = result;
                        } else {
                            //Just tween the value otherwise
                            properties[ property ] = getTweenedValue( lastkeyframe.properties[property], keyframe.properties[property], keyframeProgress, 1, keyframe.ease );
                        }
                    }
                }
            }
        }

        // Apply all tweened css styles
        anim._elem.css( properties );

        // onProgress callback
        if (anim.onProgress && typeof anim.onProgress === 'function') {
            anim.onProgress.call(anim, progress );
        }
        
    }

    // Run before animation starts when animation is in range
    function startAnimatable( anim ) {
        // apply start properties
        if (!anim._started) {
            if (anim.onStartAnimate && typeof anim.onStartAnimate === 'function') {
                anim.onStartAnimate.call( anim , scrollDirection );
            } else {
                //anim._elem.css('display', 'block');
            }
            
            anim._started = true;
        }
    }

    /* run after animation is out of range  */
    function stopAnimatable( anim ) {

        var animstart = typeof anim.startAt === 'function' ? anim.startAt() : anim.startAt;
        var animend = typeof anim.endAt === 'function' ? anim.endAt() : anim.endAt;


            /*if (scrollDirection<0 && anim.lastProgress>0 && anim.startAt > scrollTopTweened) {

                console.log("fixed< "+anim.selector);
            } else if (scrollDirection>0 && anim.lastProgress<1 && anim.endAt < scrollTopTweened) {

                console.log("fixed> "+anim.selector);
            }*/

        // Apply end properties after items move out of range if they were running
        if ( (anim._started && animend < scrollTopTweened || anim._started && animstart > scrollTopTweened ) 
            || (scrollDirection<0 && anim.lastProgress>0 && animstart > scrollTopTweened)
            || (scrollDirection>0 && anim.lastProgress<1 && animend < scrollTopTweened) 
            ) {

            //if (!infiniteLoop){
                render( anim );
            //}
            
            if (anim.onEndAnimate && typeof anim.onEndAnimate === 'function') {
                anim.onEndAnimate.call( anim , scrollDirection );
            } else {
                //anim._elem.css('display', 'none');
            }
            anim._started = false;
            //infiniteLoop = false;
        } 
        /*
        else {
        //  //If they were not running, check items behind where we were scrolling to. Check if they did not complete 
        //  //running in the right direction, and if not, clean them up
          if (scrollDirection<0 && anim.lastProgress>0 && animstart > scrollTopTweened) {
              render( anim );
        //      console.log("fixed< "+anim.selector);
          } else if (scrollDirection>0 && anim.lastProgress<1 && animend < scrollTopTweened) {
              render( anim );
        //      console.log("fixed> "+anim.selector);
          }
         }
         */
    }

    /* 
    sets up all the start and end parameters for each animation 
    this will run when our page is loaded and on resizing
    */
    function setAnimatable() {
        var elemslist = [];
        for (var i in animation) {
            var anim = animation[i];

            anim.lastProgress = 0;

            // grab dom element
            if (anim._elem == undefined) {
                anim._elem = $(anim.selector);
            }

            if (typeof anim.onInit == 'function') anim.onInit.call( anim );

            // iterate through keyframes
            for (var k in anim.keyframes) {
                var keyframe = anim.keyframes[k];
                
                // apply starting properties
                if (keyframe.position == 0) {
                    //if (elemslist.indexOf(anim._elem.selector) == -1){
                    if ($.inArray(anim._elem.selector,elemslist) == -1){
                        anim._elem.css( keyframe.properties );
                    }
                    elemslist.push(anim._elem.selector);
                };
                
                // setup keyframe 0
                if (keyframe.position == 0) {
                    var nKeyframe = anim.keyframes[Number(k)+1];    // next keyframe
                    for (var property in nKeyframe.properties) {
                        if (keyframe.properties[ property ] == undefined) {
                            // grab current offset and load into properties for keyframe 0
                            if (/left|top/.test(property)) {
                                keyframe.properties[ property ] = anim._elem.position()[ property ];
                            }

                            // todo: width & height
                        }
                    }
                }
                
                // fill in properties from current element
                // find missing properties from last occurance of property
                var bIndex = Number(k); // start 1 back from current

                while (bIndex > 0) {
                    var bKeyframe = anim.keyframes[ bIndex ];

                    for (var property in bKeyframe.properties) {
                        if ( keyframe.properties[ property ] == undefined) {
                            keyframe.properties[ property ] = bKeyframe.properties[ property ];
                        }
                    }

                    bIndex--;
                };

                // onInit callback
                if (typeof keyframe.onInit == 'function') keyframe.onInit( anim );

            }
        
        }
/*
        for (var i=0; i<waypoints.length; i++){
            waypoints[i].func("up");
        }
  */      
    }
    
    // resets animations
    function resetAnimatable() {
        for (var i in animation) {
            if ( typeof animation[i].startAt != 'function' ){
               animation[i]["startAt"] += scrollOffset;
            }
            /*if (i == 0){
                animation[0]["startAt"] = 0;
            }*/
            if ( typeof animation[i].endAt != 'function' ){
               animation[i]["endAt"] += scrollOffset;
            }
            var anim = animation[i];
        
            if (anim._started) {
                //delete anim._elem;
                delete anim._started;
            }
        }
        
        if (!useBrowserScrollBar){
        animation[0]["startAt"] = 0;
        animation[0]["keyframes"][1]["properties"].top -= scrollOffset;
        animation[1]["keyframes"][0]["properties"].top -= scrollOffset;
        animation[1]["keyframes"][1]["properties"].top = ( -1 * maxScroll ) + 1200;
        //animation[1]["endAt"] = maxScroll;
        }
    }

    function forceRender(){
        for (var i=0; i<animation.length; i++){
            render(animation[i]);
        }
    }
    
    function resize() {
            
        var container = settings.container;
        //var container = $(window);
        
        page = {
            wWidth:  container.width(),
            wHeight: container.height(),
            wCenter: { left: container.width()/2, top: container.height()/2 }
        };

        // onResize callback
        if (settings.onResize && typeof settings.onResize === 'function') 
            settings.onResize(page);
        
    }

    // --------------------------------------------------
    // EVENT HANDLERS
    // --------------------------------------------------

    // window resize 
    function resizeHandler(e) {
        resize();
    }
    
    // touch
    function touchStartHandler(e) {
        //e.preventDefault();
        touchStart.x = e.touches[0].pageX;

        // Store the position of finger on swipe begin:
        touchStart.y = e.touches[0].pageY;

        // Store scroll val on swipe begin:
        scrollStart = scrollTop;
    };

    function touchEndHandler(e) {
        
    }

    function touchMoveHandler(e) {

        e.preventDefault();
        if (paused)
            return;
        var offset = {};
        offset.x = touchStart.x - e.touches[0].pageX;

        // Get distance finger has moved since swipe begin:
        offset.y = touchStart.y - e.touches[0].pageY;   

        // Add finger move dist to original scroll value
        targetScroll = scrollStart + offset.y*2.5;
        scrollTo(targetScroll);
    }

    // scrollwheel
    function wheelHandler(e, delta, deltaX, deltaY) {
        if (paused)
            return;
        var targetScroll = scrollTop - (delta * settings.scrollSpeed);
        
        scrollTo(targetScroll);
    };
    //--------------------------------------------------
    // Helpers
    //--------------------------------------------------
    
    // get tweened values
    function getTweenedValue(start, end, currentTime, totalTime, tweener) {
        var percentComplete = currentTime/totalTime;
        
        if (isNaN(start)){
            
            //var rxPropSplit = /:|;/g;

            //Numeric values with optional sign.
            var rxNumericValue = /(:?\+|-)?[\d.]+/g;
            
            //Finds rgb(a) colors, which don't use the percentage notation.
            var rxRGBAIntegerColor = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g;

            //Finds all gradients.
            var rxGradient = /[a-z\-]+-gradient/g;
            
            var _parseProp = function(val) {
                var numbers = [];

                //One special case, where floats don't work.
                //We replace all occurences of rgba colors
                //which don't use percentage notation with the percentage notation.
                rxRGBAIntegerColor.lastIndex = 0;
                val = val.replace(rxRGBAIntegerColor, function(rgba) {
                    return rgba.replace(rxNumericValue, function(n) {
                        return n / 255 * 100 + '%';
                    });
                });

                //Handle prefixing of "gradient" values.
                //For now only the prefixed value will be set. Unprefixed isn't supported anyway.
                rxGradient.lastIndex = 0;
                val = val.replace(rxGradient, function(s) {
                    return theDashedCSSPrefix + s;
                });


                //Now parse ANY number inside this string and create a format string.
                val = val.replace(rxNumericValue, function(n) {
                    numbers.push(+n);
                    return '?';
                });

                //Add the formatstring as first value.
                numbers.unshift(val);

                return numbers;
            };
            
            /**
             * Calculates the new values for two given values array.
             */
            var _calcInterpolation = function(val1, val2, progress) {
                //They both need to have the same length
                if(val1.length !== val2.length) {
                    throw 'Can\'t interpolate between "' + val1[0] + '" and "' + val2[0] + '"';
                }

                //Add the format string as first element.
                var interpolated = [val1[0]];

                for(var valueIndex = 1; valueIndex < val1.length; valueIndex++) {
                    //That's the line where the two numbers are actually interpolated.
                    interpolated[valueIndex] = val1[valueIndex] + ((val2[valueIndex] - val1[valueIndex]) * progress);
                }

                return interpolated;
            };

            /**
             * Interpolates the numeric values into the format string.
             */
            var _interpolateString = function(val) {
                var valueIndex = 1;

                return val[0].replace(/\?/g, function() {
                    return val[valueIndex++];
                });
            };
            
            var start = _parseProp(start);
            var end = _parseProp(end);
            
            var value = _calcInterpolation(start, end, percentComplete);

            //value = _interpolateString(value);
            return _interpolateString(value);
            
        }
        else {
            var delta = end - start;
            if (!tweener) tweener = TWEEN.Easing.Linear.EaseNone;

            return tweener(percentComplete) * delta + start
        }
    }
    
    // detect if touch events
    function isTouch() {
        return 'ontouchstart' in window;
    }

    // --------------------------------------------------
    // PUBLIC
    // --------------------------------------------------
    function init( opts ) {
        var defaults = {
                maxScroll: 1000,
                tickSpeed: 30,
                scrollSpeed: 20,
                useRAF: true,
                tweenSpeed: .3,
                scrollOffset: 0,
                //infinity: false,
                //maxScroll: maxScroll
            };

        settings = $.extend( defaults, opts );
        
        animation = settings.animation;
        
        waypoints = settings.waypoints;
        
        scrollOffset = settings.scrollOffset;
        
        useBrowserScrollBar = settings.useBrowserScrollBar;
        
        //infinity = settings.infinity;
        
        maxScroll = settings.maxScroll;
        
        touch = isTouch();
        
        if (touch) {
            var container = settings.container[0];
            container.addEventListener('touchstart', touchStartHandler, true);
            container.addEventListener('touchmove', touchMoveHandler, true);
            /*container.addEventListener('touchmove', function(){
                if (touchTime != null){ clearTimeout(touchTime); };
                touchTime = setTimeout(touchMoveHandler,100);
            }, true);*/
            container.addEventListener('touchend', touchEndHandler, true);
        }

        //d.on('mousewheel', wheelHandler);
        $(window).resize(function(){
            if(innerresizeTimeOut != null){ clearTimeout(innerresizeTimeOut); };
            innerresizeTimeOut = setTimeout(resizeHandler, 100);
            //kikaScroll.resized = true;
        })

        // animation loop
        window.requestAnimFrame = (function(){
            if (settings.useRAF) {
                return  
                window.requestAnimationFrame       || 
                window.webkitRequestAnimationFrame || 
                window.mozRequestAnimationFrame    || 
                window.oRequestAnimationFrame      || 
                window.msRequestAnimationFrame     || 
                function( callback ){
                    //kikaScroll.animLoop = window.setTimeout(callback, settings.tickSpeed);
                    return window.setTimeout(callback, settings.tickSpeed);
                };
            } else {
                return function( callback ){
                    //kikaScroll.animLoop = window.setTimeout( callback, settings.tickSpeed);
                    return window.setTimeout(callback, settings.tickSpeed);
                }
            };
        })();
        
        window.cancelRequestAnimFrame = ( function() {
            return window.cancelAnimationFrame          ||
                window.webkitCancelRequestAnimationFrame    ||
                window.mozCancelRequestAnimationFrame       ||
                window.oCancelRequestAnimationFrame     ||
                window.msCancelRequestAnimationFrame        ||
                clearTimeout
        })();
        
        setAnimatable();
        resetAnimatable();
        resize();
        //startfunc();
        
        return this;
    };
    
    // start
    function startfunc() {
        if (!started && settings.startAt){
            scrollTopTweened = scrollTop = settings.startAt;
        }
            
        //scrollTop++;
    
        if (!started) {
            animationLoop();
            started=true;
        };
        if (settings.onStart && typeof settings.onStart === 'function') {
            settings.onStart();
        }

        for (var i=0; i<waypoints.length; i++){
            waypoints[i].func("up");
        }
        
        //kikaScroll.enterSection(1);
      
    };

    function getPageInfo() {
        return page;
    };

    function getScrollTop() {
        return scrollTopTweened;
    };

    function getMaxScroll() {
        return maxScroll;
    };
    function setMaxScroll(integer) {
        maxScroll = integer;
    };
    
    function setScrollHard(scroll){
        
        scrollTop = scroll;
        scrollTopTweened = scroll - 1;
    }

    function scrollTo( scroll ) {
        if (paused)
            return;
        
        if (scroll >= maxScroll || scroll <= 0){
            if (scrollMouseDown || !infinity){
                if (scroll >= maxScroll){
                    scroll = maxScroll;
                }
                if (scroll <= 0){
                    scroll = 0;
                }
                scrollTop = scroll;
            }
            else {
                if (infinity){
                    
                    if (scroll >= maxScroll){
                        scroll = scroll - maxScroll + 1;
                        scrollDirection = 1;
                    }
                    if (scroll <= 0){
                        scroll = maxScroll + scroll - 1;
                        scrollDirection = -1;
                    }
                    callInfinity(scroll);
                    
                }
            }
        }
        else {
            scrollTop = scroll;
            
            clearTimeout(mouseDownTimer);
            mouseDownTimer = setTimeout(function(){
                scrollMouseDown = false;
            }, 1500);
        }
    };

    function callInfinity(scroll){
        if (scrollDirection == -1){
            scrollTop = scrollTopTweened = maxScroll;
            kikaScroll.setScrollBarPosition( 1 );

            forceRender();
            
            scrollTop = scroll;
        }
        else {
            scrollTop = scrollTopTweened = 0;
            kikaScroll.setScrollBarPosition( 0 );

            for (var i=0; i<animation.length; i++){
                if (i != 0 && i != 1){
                    render(animation[i]);
                }
            }
            
            animation[0]._started = false;
            animation[1]._started = false;
            animation[0].lastProgress = 0;
            animation[1].lastProgress = 0;

            render(animation[0]);
            render(animation[2]);
            
            scrollTop = scroll;
        }
    }
    
    function setOffset( integer ){
        scrollOffset = integer;
    }

    function autoScrollStart() {
        if (autoScrollInterval)
            return;
        autoScrollInterval = setInterval( aScroll, 100  );
    }

    function autoScrollStop() {
        clearInterval( autoScrollInterval );
    }

    function aScroll() {
        scrollTop+= 5;
        if (scrollTop > settings.maxScroll) scrollTop = scrollTopTweened = 0;
    }

    function stopScroll() {
        scrollTopTweened = scrollTop;
    }

    function pauseScroll() {
        paused = true;
    }

    function resumeScroll() {
        paused = false;
    }

    function getAnimation() {
        return animation;
    }

    return {
        init: init,
        startfunc: startfunc,
        pause: pauseScroll,
        resume: resumeScroll,
        getPageInfo: getPageInfo,
        getScrollTop: getScrollTop,
        getMaxScroll: getMaxScroll,
        setMaxScroll: setMaxScroll,
        autoScrollStart: autoScrollStart,
        autoScrollStop: autoScrollStop,
        stopScroll: stopScroll,
        setScrollHard: setScrollHard,
        scrollTo: scrollTo,
        resize:resize,
        setOffset: setOffset,
        //infiniteLoop: infiniteLoop,
        wheelHandler: wheelHandler,
        resetAnimatable: resetAnimatable,
        forceRender: forceRender,
        animation: getAnimation,
        isTouch: isTouch
    }
};


var kikaScroll;
var animation;
var waypoints;
var sectionIndex = [];
var maxScroll;
var wWidth;
var wHeight;
var topShown = false;

/*var layerOrder = [
    4,3,3,1,3,0,3
];*/

var innerresizeTimeOut = null;
var touchTime = null;

$(window).load( function() {
//$(document).ready(function(){

    //var block = document.body.offsetWidth;
    
    //$(window).scrollTop(0);

    
    wWidth = $(window).width();
    wHeight = $(window).height();
    
    var curtains = $(".curtains").children();
    var position = 0;
    for (var i=0; i<curtains.length; i++){
        //var zindex = layerOrder[i];
        //$(curtains[i]).css({"z-index": zindex });
        //var height =  $(curtains[i]).outerHeight();
        var height =  $(curtains[i]).height();
        if (i==0 || i==3 || i==5){
            height = wHeight;
            if (i != 0){
                if (height < 600){height=600;}
            }
        }
        if (i==4){
            height += wHeight;
        }
        var name = curtains[i].id;
        var obj = {};
        obj["id"] = "#"+name;
        obj["tag"] = "#"+name;
        obj["name"] = name;
        obj["correct"] = false;
        obj["position"] = position;
        obj["height"] = height;
        sectionIndex.push(obj);
        position += height;
    }
    
    /*sectionIndex.push({
        id: "#portfolio",
        tag: "#portfolio",
        name: "portfolio",
        correct: false,
        position: sectionIndex[1].position + $("#portfolio")[0].offsetTop
    });*/

    //$("#main").css({"height":height- $(curtains[2]).height() });
    //$("#forceHeight").css({"height":position });
    //$("#footer").css({"bottom":-500 });

    
    //if (!((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.toLowerCase().indexOf("android") > -1) )) {
        $("#forceHeight").css({"height":position });
    //}

    //sectionIndex[1].position = sectionIndex[1].position*2;
    //sectionIndex[3].height += wHeight;
    sectionIndex[4].offset = wHeight;

    maxScroll = position;
    
    /*
    sectionIndex = [
        {id:"#plunge",name:"plunge",tag:"#plunge",position:0,correct:false},
        {id:"#work",name:"work",tag:"#work",position:$(curtains[0]).height(),correct:false},
        {id:"#blimp",name:"blimp",tag:"#blimp",position:$(curtains[1]).height(),correct:false},
        {id:"#about",name:"about",tag:"#about",position:$(curtains[2]).height(),correct:false},
        {id:"#space",name:"space",tag:"#space",position:$(curtains[3]).height(),correct:false},
        {id:"#footer",name:"footer",tag:"#footer",position:$(curtains[4]).height(),correct:false},
    ];
    */
    
    
    animation = [
                     {
                         selector: '#plunge',
                         startAt: 0,
                         endAt: function(){ return sectionIndex[1].position;},
                         keyframes: [
                             { 
                                 position: 0,
                                 properties: {
                                     //"margin-top": "0%"
                                     "margin-top": 0
                                 }
                                 
                             },
                             {
                                 position: 1,
                                 ease: TWEEN.Easing.Linear.EaseNone,
                                onInit: function( anim ) {
                                    //this.properties['margin-top'] = "-100%";
                                    this.properties['margin-top'] = -wHeight;
                                },
                                properties: {
                                 }
                             }
                         ]
                     },
                     {
                     selector: '#banner .navbar-inner',
                     startAt: function(){ return sectionIndex[1].position-50;},
                    onEndAnimate: function(){
                        showTop();
                        $("#banner .brand")[0].onclick = "";
                        $("#banner")[0].onmouseover = "";
                        $("#banner")[0].onmouseout = "";
                                
                    },
                     endAt: function(){ return sectionIndex[1].position;},
                     keyframes: [
                         { 
                             position: 0,
                             onInit: function( anim ) {
                                if (!topShown){
                                    hideTop();
                                    $("#banner .brand")[0].onclick = function(){
                                        kikaScroll.gotoSectionTag("#work");
                                        return false;
                                    };
                                    $("#banner")[0].onmouseover = function(){
                                        showTop();
                                    };
                                    $("#banner")[0].onmouseout = function(){
                                        hideTop();
                                    };
                                }
                             },
                             properties: {
                             }
                             
                         },
                         {
                             position: 1,
                             ease: TWEEN.Easing.Linear.EaseNone,
                             onInit: function( anim ) {
                             },
                             properties: {
                             }
                         }
                     ]
                 },{
                     selector: '#home',
                     startAt: function(){ 
                        return sectionIndex[1].position+50;
                    },
                     endAt: function(){
                        return sectionIndex[2].position;
                    },
                     keyframes: [
                         { 
                             position: 0,
                             properties: {
                                 "margin-top": 0
                             }
                             
                         },
                         {
                             position: 1,
                             ease: TWEEN.Easing.Linear.EaseNone,
                             onInit: function( anim ) {
                                this.properties['margin-top'] = -1 * sectionIndex[1].height;
                             },
                             properties: {
                             }
                         }
                     ]
                 },{
                     selector: '#work',
                     startAt: function(){ 
                        //return sectionIndex[1].position+50;
                        return sectionIndex[1].height;
                    },
                     endAt: function(){
                        return sectionIndex[2].position;
                    },
                     keyframes: [
                         { 
                             position: 0,
                             properties: {
                                 "margin-top": 0
                             }
                             
                         },
                         {
                             position: 1,
                             ease: TWEEN.Easing.Linear.EaseNone,
                             onInit: function( anim ) {
                                this.properties['margin-top'] = -wHeight;
                             },
                             properties: {
                             }
                         }
                     ]
                 },{
                     selector: '#work',
                     startAt: function(){ 
                        return sectionIndex[2].position;
                    },
                     endAt: function(){
                        return sectionIndex[3].position+$(window).height();
                    },
                     keyframes: [
                         { 
                             position: 0,
                             onInit: function( anim ) {
                                this.properties['margin-top'] = -wHeight;
                             },
                             properties: {
                                 //"margin-top": 0
                             }
                             
                         },
                         {
                             position: 1,
                             ease: TWEEN.Easing.Linear.EaseNone,
                             onInit: function( anim ) {
                                this.properties['margin-top'] = -1 * sectionIndex[2].height-wHeight;
                             },
                             properties: {
                             }
                         }
                     ]
                 },{
                     selector: '#blimp',
                     startAt: function(){ return sectionIndex[3].position-$(window).height();},
                     endAt: function(){ return sectionIndex[4].position+$(window).height();},
                     keyframes: [
                         { 
                             position: 0,
                             onInit: function( anim ) {
                             },
                             properties: {
                                 "top": "0%",
                             }
                             
                         },
                         {
                             position: 1,
                             ease: TWEEN.Easing.Linear.EaseIn,
                             onInit: function( anim ) {
                             },
                             properties: {
                                 "top": "-20%",
                             }
                         }
                     ]
                 },{
                         selector: '#bigblimptext .blimptext',
                         //startAt:  $(curtains[0]).height() + $(curtains[1]).height() ,
                         startAt: function(){ return sectionIndex[3].position;},
                         endAt: function(){ return sectionIndex[4].position;},
                         keyframes: [
                             { 
                                 position: 0,
                                onInit: function( anim ) {
                                    //$("#blimp .blimptext").css({"margin-top":$("#blimp .blimptext").height()/2*-1});
                                },
                                 onInit: function( anim ) {
                                     this.properties['top'] = "100%";
                                 },
                                 properties: {
                                 }
                                 
                             },
                             {
                                 position: 1,
                                 ease: TWEEN.Easing.Quadratic.EaseOut,
                                 onInit: function( anim ) {
                                     this.properties['top'] = "50%";
                                 },
                                 properties: {
                                 }
                             }
                         ]
                },{
                         selector: '#bigblimptext .blimptext',
                         startAt: function(){return sectionIndex[4].position;},
                         endAt: function(){return sectionIndex[4].position+sectionIndex[4].height/2;},
                         keyframes: [
                             { 
                                 position: 0,
                                onInit: function( anim ) {
                                    //$("#blimp .blimptext").css({"margin-top":$("#blimp .blimptext").height()/2*-1});
                                },
                                 onInit: function( anim ) {
                                     this.properties['top'] = "50%";
                                 },
                                 properties: {
                                 }
                                 
                             },
                             {
                                 position: 1,
                                 ease: TWEEN.Easing.Quadratic.EaseIn,
                                 onInit: function( anim ) {
                                     this.properties['top'] = "10%";
                                 },
                                 properties: {
                                 }
                             }
                         ]
                },{
                     selector: '#about',
                     startAt: function(){ return (sectionIndex[4].position);},
                     //endAt: function(){return (sectionIndex[4].position-$(window).height()/2);},
                     endAt: function(){return (sectionIndex[5].position + $(window).height());},
                     keyframes: [
                         { 
                             position: 0,
                             onInit: function( anim ) {
                                //this.properties['margin-top'] = $(window).height();
                             },
                             properties: {
                                 "margin-top": 0,
                                 //"top": "100%"
                             }
                             
                         },
                         {
                             position: 1,
                             ease: TWEEN.Easing.Linear.EaseNone,
                             onInit: function( anim ) {
                                this.properties['margin-top'] = -1 * sectionIndex[4].height - wHeight;
                             },
                             properties: {
                                 //top: -4000
                                 //"top": "0%"
                             }
                         }
                     ]
                 },{
                     selector: '#blimp',
                     startAt: function(){ return sectionIndex[4].position+sectionIndex[4].height/2;},
                     endAt: function(){ return sectionIndex[4].position+sectionIndex[4].height/2+1;},
                     keyframes: [
                         { 
                             position: 0,
                             properties: {
                                 "z-index": 1,
                             }
                             
                         },
                         {
                             position: 1,
                             ease: TWEEN.Easing.Linear.EaseIn,
                             properties: {
                                 "z-index": 0,
                             }
                         }
                     ]
                 },{
                     selector: '#space',
                     startAt: function(){ return sectionIndex[4].position+sectionIndex[4].height/2;},
                     endAt: function(){ return sectionIndex[4].position+sectionIndex[4].height/2+1},
                     keyframes: [
                         { 
                             position: 0,
                             properties: {
                                 "z-index": 0,
                             }
                             
                         },
                         {
                             position: 1,
                             ease: TWEEN.Easing.Linear.EaseIn,
                             properties: {
                                 "z-index": 1,
                             }
                         }
                     ]
                 },{
                         selector: '#space .blimptext',
                         //startAt: function(){ return (sectionIndex[3].position+sectionIndex[3].height/2);},
                         startAt: function(){ return (sectionIndex[5].position-$(window).height()); },
                         //endAt: function(){ return (sectionIndex[5].position+sectionIndex[5].height-$(window).height());},
                         endAt: function(){ return (sectionIndex[6].position+sectionIndex[6].height-$(window).height()); },
                         keyframes: [
                             { 
                                 position: 0,
                                 onInit: function( anim ) {
                                     
                                    //$("#space .blimptext").css({"margin-top":$("#space .blimptext").height()/2*-1});
                                     this.properties['top'] = "100%";
                                 },
                                 properties: {
                                    'margin-top' : 0,
                                    //'top': "100%"
                                 }
                                 
                             },
                             {
                                 position: 1,
                                 ease: TWEEN.Easing.Quadratic.EaseOut,
                                 onInit: function( anim ) {
                                     this.properties['top'] = "0%";
                                     this.properties["margin-top"] = ($(window).height()-sectionIndex[6].height)/2-$("#space .blimptext").height()/2;
                                 },
                                 properties: {
                                    //'top': "0%"
                                 }
                             }
                         ]
                },{
                     selector: '#footer',
                     startAt: function(){return (sectionIndex[6].position-$(window).height());},
                     endAt: function(){return (sectionIndex[6].position+sectionIndex[6].height-$(window).height());},
                     keyframes: [
                         { 
                             position: 0,
                             onInit: function( anim ) {
                                this.properties['margin-top'] = 0;
                            },
                             properties: {
                                 //"margin-top": 0
                             }
                             
                         },
                         {
                             position: 1,
                             ease: TWEEN.Easing.Linear.EaseNone,
                             onInit: function( anim ) {
                                this.properties['margin-top'] = -1 * sectionIndex[6].height;
                            },
                             properties: {
                             }
                         }
                     ]
                 }                         
                     
                     
    ];
    
    
    
    waypoints = []; /*
       { 
            el: '#about',
            d: "up",
            func: function( direction) {
                if (direction === 'down') {  // do this on the way down
                    $("#blimp").css({"z-index":-1});
                }
                else {  // do this on the way back up through the waypoint
                    $("#blimp").css({"z-index":0});
                }
            },
            offset: 200
        }
    
    ];*/

var scrollInit = function(){
    //$(window).scrollTop(0);
                
    kikaScroll = new scrollax.make({
        
                animation : animation,
                waypoints : waypoints,
                sectionIndex : sectionIndex,
                maxScroll : maxScroll,
                container : $("#main"),
                useBrowserScrollBar : true
        
    });
    kikaScroll.scrollAnimate.startfunc();
};
var setPlungeCSS = function(){
    $("#plunge").css({"top":"-20%"});
    $("#logo").css({"top":"-40%"});
    $("#nextarrow").css({"bottom":"5%"});
    $("#plunge .blimptext").css({"top":"58%"}).show();
};


//if (window.location.hash == "#portfolio"){
if (window.location.hash.length > 0){
    //goToHash(window.location.hash);
    //$("#loadcover").css({"background":"white"});
    
    if (!((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.toLowerCase().indexOf("android") > -1) )) {
        $(window).scrollTop( 0 );
    }
    //$(window).scrollTop(0);
    setPlungeCSS();
    scrollInit();
    //kikaScroll.gotoSectionTag("#work",true);
    setTimeout(function(){
        kikaScroll.gotoSectionTag(window.location.hash,true);
    },200);

    $("#loadcover").delay(500).fadeOut(500);
}
else {
    $("#loadcover").fadeOut(300).promise().done(function(){
            /*if (navigator.userAgent.match(/AppleWebKit/) && ! navigator.userAgent.match(/Chrome/)) {
                    $(".curtains > li").fadeTo(0,0.0001);
                    $("#plunge").fadeTo(0,1);
            }*/
        scrollInit();
        kikaScroll.scrollAnimate.pause();

        var firstClick = function(e){
            /*if (navigator.userAgent.match(/AppleWebKit/) && ! navigator.userAgent.match(/Chrome/)) {
                $(".curtains > li").fadeTo(0,1);
            }*/
            if (e.target.id == "nextarrow"){
                firstScrollFunc();
                return false;
            }
            var hash = e.target.hash ? e.target.hash : $(e.target).closest("a")[0].hash;
            unbind();
            //$(".curtains").children().show();
            setPlungeCSS();
            kikaScroll.scrollAnimate.resume();
            //var hash = window.location.hash;
            setTimeout(function(){
                kikaScroll.gotoSectionTag(hash);
            },20);
        };
        var unbind = function(){
            $(window).off("scroll",firstScrollFunc);
            $(window).off("mousewheel",firstScrollFunc);
            $(window).off("touchstart",firstScrollFunc);
            $(".scrollTo").off("click",firstClick);
        }

        /*
        if (window.location.hash.length > 0){
            goToHash(window.location.hash);
        }
        else {*/
            var firstScroll = true;
            var firstScrollFunc = function(){
                if (firstScroll){
                    firstScroll = false;
                    /*if (navigator.userAgent.match(/AppleWebKit/) && ! navigator.userAgent.match(/Chrome/)) {
                        $("#plunge").animate({"top":"-20%"},850);
                        $("#logo").animate({"top":"-40%"},0);
                        $("#nextarrow").animate({"bottom":"5%"},0);
                    } else {*/
                        $("#plunge").animate({"top":"-20%"},850);
                        $("#logo").animate({"top":"-40%"},500);
                        $("#nextarrow").animate({"bottom":"5%"},850);
                    //}
                    setTimeout(function(){
                        //$("#plunge .blimptext").animate({"top":-($(window).height()*0.6)},600);
                        $("#plunge .blimptext").animate({"top":"58%"},600,function(){
                            //$(".curtains").children().show();
                            unbind();
                            /*if (navigator.userAgent.match(/AppleWebKit/) && ! navigator.userAgent.match(/Chrome/)) {
                                $(".curtains > li").fadeTo(0,1);
                            }*/
                            kikaScroll.scrollAnimate.resume();
                        });
                        $("#plunge .blimptext").delay(100).show();
                    },300);
                }
                firstScroll = false;
                //$(window).scrollTop(0);
            };
            $(window).on("scroll", firstScrollFunc);
            $(window).on("mousewheel", firstScrollFunc);
            $(window).on("touchstart",firstScrollFunc);
            $(".scrollTo").on("click", firstClick);
        //}
        
    });

}
 
//$("body").css({"overflow":"visible"});
$('#plunge .blimptext').css({"margin-top":-1*$("#plunge .blimptext").height()/2});
//$("#blimp .blimptext").css({"margin-top":-1*$("#blimp .blimptext").height()/2});
$("#blimp .blimptext").each(function( index ) {
  $(this).css({"margin-top":-1*$(this).height()/2});
});

});


function showTop(){
    topShown = true;
    $("#banner .navbar-inner").stop().animate({"margin-top":0}, 300, "linear");
}

function hideTop(){
    topShown = false;
    $("#banner .navbar-inner").stop().animate({"margin-top":-60}, 300, "linear");
}

