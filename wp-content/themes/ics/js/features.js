window.addEventListener('load', function(){
	// variables from localized script,
	libs = libs.split(',');

	var spans = document.querySelectorAll('.head-cont h1 span');
		sect1 = document.getElementById('Feat-new_england_school_of_photography'),
		sect2 = document.getElementById('Feat-47_brand'),
		sect3 = document.getElementById('Feat-ginkgo_bioworks'),
		tl = new TimelineLite();

	for (x = 0; x < spans.length; x++) {
		spans[x].addEventListener('mouseover', function(){
			this.innerText = libsWheel(this);
			console.log(this);
		});
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
		}, 85);

		classCheck(elem, 'active');

	}
});