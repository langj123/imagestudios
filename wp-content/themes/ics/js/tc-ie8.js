

/*
 * Tiny Carousel 1.9
 * http://www.baijs.nl/tinycarousel
 *
 * Copyright 2010, Maarten Baijs
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/gpl-2.0.php
 *
 * Date: 01 / 06 / 2011
 * Depends on library: jQuery
 *
 */
 
var tinyCarousel;
 
(function ($) 
{
    "use strict";

    $.tiny = $.tiny || { };
    
    $.tiny.carousel = {
        options: {  
            start: 1, // where should the carousel start?
            display: 1, // how many blocks do you want to move at 1 time?
            axis: 'x', // vertical or horizontal scroller? ( x || y ).
            controls: true, // show left and right navigation buttons.
            pager: false, // is there a page number navigation present?
            interval: true, // move to another block on intervals.
            intervaltime: 6000, // interval time in milliseconds.
            rewind: true, // If interval is true and rewind is true it will play in reverse if the last slide is reached.
            animation: true, // false is instant, true is animate.
            duration: 1200, // how fast must the animation move in ms?
            callback: null // function that executes after every move.
        }
    };
    
    $.fn.tinycarousel_start = function () { $(this).data('tcl').start(); };
    $.fn.tinycarousel_stop = function () { $(this).data('tcl').stop(); };
    $.fn.tinycarousel_move = function (iNum) { $(this).data('tcl').move(iNum - 1,true); };
    
    function Carousel(root, options)
    {
        var oSelf     = this
        ,   oViewport = $('.viewport:first', root)
        ,   oContent  = $('.overview:first', root)
        ,   oPages    = oContent.children()
        ,   oBtnNext  = $('.next:first', root)
        ,   oBtnPrev  = $('.prev:first', root)
        ,   oPager    = $('.pager:first', root)
        ,   iPageSize = 0
        ,   iSteps    = 0
        ,   iCurrent  = 0
        ,   oTimer    = undefined
        ,   bPause    = false
        ,   bForward  = true
        ,   bAxis     = options.axis === 'x'
        ;
        
        function setButtons()
        {
            if(options.controls)
            {
                //oBtnPrev.toggleClass('disable', iCurrent <= 0 );
                //oBtnNext.toggleClass('disable', !(iCurrent +1 < iSteps));
            }

            if(options.pager)
            {
                var oNumbers = $('.pagenum', oPager);
                oNumbers.removeClass('active');
                $(oNumbers[iCurrent]).addClass('active');
            }           
        }

        function setPager( oEvent )
        {
            if( $( this ).hasClass( "pagenum" ) )
            { 
                oSelf.move( parseInt( this.rel, 10 ), true ); 
            }
            return false;
        }
        
        function setTimer()
        {
            if(options.interval && !bPause)
            {
                clearTimeout(oTimer);
                oTimer = setTimeout(function(){
                    iCurrent = iCurrent +1 === iSteps ? -1 : iCurrent;
                    bForward = iCurrent +1 === iSteps ? false : iCurrent === 0 ? true : bForward;
                    oSelf.move(bForward ? 1 : -1);
                }, options.intervaltime);
            }
        }

        function setEvents()
        {
            if(options.controls && oBtnPrev.length > 0 && oBtnNext.length > 0)
            {
                oBtnPrev.click(function(){oSelf.move(-1); return false;});
                oBtnNext.click(function(){oSelf.move( 1); return false;});
            }

            if(options.interval)
            {
                //root.hover(oSelf.stop,oSelf.start);
            }

            if(options.pager && oPager.length > 0)
            { 
                $('a',oPager).click(setPager); 
            }
        }

        this.stop  = function () { clearTimeout(oTimer); bPause = true; };
        this.start = function () { bPause = false; setTimer(); };

        this.move  = function (iDirection, bPublic) {
            iCurrent = bPublic ? iDirection : iCurrent += iDirection;
            if(iCurrent > -1 && iCurrent < iSteps) {
                var oPosition = {};
                oPosition[bAxis ? 'margin-left' : 'margin-top'] = -(iCurrent * (iPageSize * options.display));    
                oContent.animate(oPosition,{
                    queue: false,
                    duration: options.animation ? options.duration : 0,
                    complete: function() {
                        if(typeof options.callback === 'function') {
                            options.callback.call(this, oPages[iCurrent], iCurrent);
                        }
                    }
                });
                setButtons();
                setTimer();
            }
            
/*
            
            if (iDirection == 1){
			
                var oldLogo = oContent.children();
                //oldLogo.animate({opacity:0.01},options.duration/2).promise().done(function(){
                    oldLogo.remove();
                    
                    var newLogo;
                    for (var i=0; i<options.display; i++){
                        var logo = options.elements.first();
                        options.elements = options.elements.not(":first");
                        newLogo = newLogo ? logo.after(newLogo) : logo;
                    }
                    
                    options.elements = oldLogo.after(options.elements);
                    
                    oContent.prepend(newLogo);
                    //newLogo.animate({opacity:1},options.duration/2);
                //});
            }
            else {

                var oldLogo = oContent.children();
                //oldLogo.animate({opacity:0.01},200).promise().done(function(){
                    console.log("0"+oldLogo.text());
                    oldLogo.remove();
                    
                    console.log("1"+oldLogo[0].innerText);
                    var newLogo;
                    for (var i=0; i<options.display; i++){
                        var logo = options.elements.last();
                        options.elements = options.elements.not(":last");
                        newLogo = newLogo ? logo.after(newLogo) : logo;
                    }
                    console.log("2"+oldLogo.text());
                    options.elements = oldLogo.after(options.elements);
                    console.log("3"+oldLogo.text());
                    
                    oContent.prepend(newLogo);
                    //newLogo.animate({opacity:1},200);
                //});
            }
           */ 

            setTimer();

        };

       function initialize () {
            var pages = oContent.children();
            //iPageSize = bAxis ? $(oPages[0]).outerWidth(true) : $(oPages[0]).outerHeight(true);
            iPageSize = bAxis ? $(pages).outerWidth(true) : $(pages).outerHeight(true);
            var iLeftover = Math.ceil(((bAxis ? oViewport.outerWidth() : oViewport.outerHeight()) / (iPageSize * options.display)) -1);
            iSteps = Math.max(1, Math.ceil(pages.length / options.display) - iLeftover);
            iCurrent = Math.min(iSteps, Math.max(1, options.start)) -2;
            oContent.css(bAxis ? 'width' : 'height', (iPageSize * pages.length));
            //oSelf.move(1);
            setEvents();
            setTimer();
            return oSelf;
        }

        function resize(display){
            options.display = display;
            //var oldLogo = $(oContent.children()).css({opacity:0.01});
			/*var oldLogo = oContent.children();
            oldLogo.remove();
            options.elements = oldLogo.after(options.elements);
            for (var i=0; i<display; i++){
                var logo = options.elements.first();
                //logo.css({width:265});
                //logo.css({opacity:1});
                options.elements = options.elements.not(":first");
                oContent.append(logo);
            }*/
            
            var pages = oContent.children();
            //$(pages).css({opacity:1});
            
            //iPageSize = bAxis ? $(oPages[0]).outerWidth(true) : $(oPages[0]).outerHeight(true);
            iPageSize = bAxis ? $(pages).outerWidth(true) : $(pages).outerHeight(true);
            var iLeftover = Math.ceil(((bAxis ? oViewport.outerWidth() : oViewport.outerHeight()) / (iPageSize * options.display)) -1);
            iSteps = Math.max(1, Math.ceil(pages.length / options.display) - iLeftover);
            iCurrent = Math.min(iSteps, Math.max(1, options.start)) -2;
            oContent.css(bAxis ? 'width' : 'height', (iPageSize * pages.length));
            
            //iPageSize = width;
        }

        //return initialize();
        initialize();
        //resize();
        
        return {
            resize: resize
        }
        
    }

    
    $.fn.tinycarousel = function(params)
    {
        var breaksWidth = $($("#slider-code .overview").children()).outerWidth(true);
        for (var i=0; i<displayCount; i++){
          breakArray.unshift(breaksWidth*(i+1));
        }
        var wWidth = $(window).width();
        for (var i=0; i<displayCount; i++){
            if (wWidth > breakArray[i]){
                $("#slider-code").css({ "width": breakArray[i] });
                $("#slider-code .viewport").css({ "width": breakArray[i] });
                displayCount = breakArray.length - i;
                break;
            }
        }
        var options = $.extend({}, $.tiny.carousel.options, params);/*
        options.elements = $("#slider-code .overview").children().remove();
        for (var i=0; i<displayCount; i++){
            var logo = options.elements.first();
            options.elements = options.elements.not(":first");
			console.log(logo.find("img")[0].src);
			console.log(logo.text());
			console.log(options.elements.length);
            $("#slider-code .overview").append(logo);
        }*/
        //options.elements.css({"opacity":0.01});
        //$("#slider-code .overview").children().css({"opacity":1});
        //options.elements.css({"width":0});
        //this.each(function () { $(this).data('tcl', new Carousel($(this), options)); });
        tinyCarousel = new Carousel($(this), options);
        resizefunc();
        return this;
    };

    var displayCount = 4;
    //var displayCount;
    var breakArray = [];
    var resizeTimeOut = null;

    var resizefunc = function(){
      var wWidth = $(window).width();
      for (var i=0; i<breakArray.length; i++){
        if (wWidth > breakArray[i]){
          $("#slider-code").css({ "width": breakArray[i] });
          $("#slider-code .viewport").css({ "width": breakArray[i] });
          tinyCarousel.resize(breakArray.length - i);
          break;
        }
      }
    };

    $(window).resize(function(){
        if(resizeTimeOut != null){ clearTimeout(resizeTimeOut); };
        resizeTimeOut = setTimeout(resizefunc, 100);
    });

}(jQuery));

