window.addEventListener('load', function(){
	// variables from localized script,
	libs = libs.split(',');

	var spans = document.querySelectorAll('.head-cont h1 span'),
		section = document.getElementsByTagName('section'),
		sect1 = document.getElementById('Feat-new_england_school_of_photography'),
		sect2 = document.getElementById('Feat-47_brand'),
		sect3 = document.getElementById('Feat-ginkgo_bioworks'),
		spins = document.getElementsByClassName('spin'),
		rotate = 0,
		tl = new TimelineLite();

	for (x = 0; x < spans.length; x++) {
		spans[x].addEventListener('mouseover', function(){
			this.innerText = libsWheel(this);
		});
	}

	for(var i = 0, length1 = section.length; i < length1; i++){
 		if (section[i].className.indexOf("section-") != -1) {
 			var sImgs = section[i].getElementsByTagName('img'),
 				s = section[i],
 				sWidth = s.offsetWidth,
 				sHeight = s.offsetHeight;

 			for(var x = 0, length2 = sImgs.length; x < length2; x++){
 				if (sImgs[x].className.indexOf("shapes") != -1) {
 				var iHeight = sImgs[x].height,
 					iWidth = sImgs[x].width,
 					rY = (Math.random() * sHeight) > iHeight ? (Math.random() * sHeight) : (Math.random() * sHeight) - iHeight,
					rX = (Math.random() * sWidth) > iWidth ? (Math.random() * sWidth) : (Math.random() * sWidth) - iWidth;

 					TweenLite.to(sImgs[x], .3,{left: rX, top: rY, opacity: 1 });
					Draggable.create(sImgs[x], {type:"top,left", edgeResistance:0.5, bounds: s, throwProps:true});
				}
 			}
 		}
 	}

 	// random spins
	if (spins.length > 0) {
		var timer = setInterval(function(){
			for(var i = 0, length1 = spins.length; i < length1; i++){
				TweenLite.to(spins[i], 15, {rotation:rotate, transformOrigin:"50% 50%", ease:Linear.easeNone});
			}
			rotate++;
		}, 20);
	}

	window.addEventListener('scroll', function(){
		scrollCheckHead();
		scrollFeat(sect1, tl, 0);
		scrollFeat(sect2, tl, 500);
		scrollFeat(sect3, tl, 500);
		// tl.to(window, 1, {scrollTo: 500});
	});

	function scrollCheckHead() {
		var scrollPos = document.body.scrollTop,
			main = document.querySelector('.home #main'),
			head = document.querySelector('.home #main .main-head'),
			headY = head.offsetTop,
			headHeight = head.clientHeight,
			headY = headY + headHeight,
			perScroll = (1 - scrollPos/headY);

			main.style.background = 'rgba(255, 195, 40,' + perScroll + ')';

	}

	function scrollFeat(sect, timeline, offset) {
		var s = sect,
			fC = s.querySelector('.feat-cont'),
			scrollPos = document.body.scrollTop,
			sY = sect.offsetTop,
			sH = sect.clientHeight,
			wHeight = window.innerHeight;

			// when section is half in view port
			if (scrollPos > (sY/2 + offset) && scrollPos <= (sY + sH - 300)) {
				classCheck(s, 'toggled');
				setTimeout(function(){
					classCheck(fC, 'toggled');
				}, 600);
			} else if (scrollPos > (sY + sH - 300)) {
				classRemove(fC, ' toggled');
				setTimeout(function(){
					classRemove(s, ' toggled');
				}, 600);
			}
	}

	function classCheck(elem, className) {
		if (elem.classList.value.indexOf(className) == -1) {
			elem.classList += ' ' + className;
		}
	}
	function classRemove(elem, className) {
		if (elem.classList.value.indexOf(className) !== -1) {
			var classes = elem.classList.value;
				elem.classList.value = elem.classList.value.replace(className, "");
		}
	}

	// for animating in mab libs style section
	function libsWheel(elem) {
		var time = new Date().getTime(),
			inter = setInterval(function(){
				ranNum = Math.floor(Math.random() * libs.length);
				elem.innerText = libs[ranNum];
				if (new Date().getTime() - time > 1000) {
					clearInterval(inter);
					elem.classList = '';
					return;
				}
		}, 40);

		classCheck(elem, 'active');

	}
});