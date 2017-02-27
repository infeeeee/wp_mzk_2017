// Browser detection for when you get desparate. A measure of last resort.
// http://rog.ie/post/9089341529/html5boilerplatejs

// var b = document.documentElement;
// b.setAttribute('data-useragent',  navigator.userAgent);
// b.setAttribute('data-platform', navigator.platform);

// sample CSS: html[data-useragent*='Chrome/13.0'] { ... }


// remap jQuery to $
(function ($) {

	/* trigger when page is ready */
	$(document).ready(function () {

		// your functions go here
		var pw = $(document).outerWidth();

		//kezdőlapon lescrollol a bandhez, nem átlép
		if ($('body').hasClass('home')) {
			$("header nav .mzk-band").click(function (e) {
				e.preventDefault();
				$('html, body').animate({
					scrollTop: $("#contentWrapper").offset().top - 20
				}, 400);
				var mn = $(this).html().toUpperCase();
				$(this).html(mn);
			});

		}

		var postList;
		if ($('body').hasClass('home') || $('body').hasClass('archive')) {
			postList = true;
		}


		//az adott kategória nav nagybetűs
		var currUrl = (window.location.href).split("/")
		var lUrl = currUrl[currUrl.length - 2];

		$("header nav li").each(function () {

			var classList = $(this).attr('class').split(/\s+/);
			// console.log(classList);	

			if (classList[0] === "mzk-" + lUrl) {
				var mn = $(this).html().toUpperCase();
				$(this).html(mn);
			}

		})




		//tag nevek kisbetűsek
		$(".theTags a").each(function () {
			if ($(this).parent(".theTags").hasClass("tn1")) {
				var mn = $(this).html().toLowerCase();
				$(this).html(mn);

			} else {
				$(this).parent(".theTags").addClass("tn1");
				var mn = $(this).html().toLowerCase().split('');
				var nn = mn[0].toUpperCase();
				mn[0] = nn;
				var mn0 = mn.join("");
				$(this).html(mn0);

			}


		})



		//mobil 
		if (pw < 768) {

			//menü
			$("header nav").hide();

			$('#site-title a').addClass('menuHidden').click(function (e) {
				e.preventDefault();
				if ($(this).hasClass('menuHidden')) {
					$("header nav").stop().slideDown();
					$(this).removeClass("menuHidden");
				} else {
					$("header nav").stop().slideUp();
					$(this).addClass("menuHidden");
				}
			});


			$("#contentWrapper").click(function () {
				if (!$('#site-title a').hasClass("menuHidden")) {
					$("header nav").stop().slideUp();
					$('#site-title a').addClass("menuHidden");
				}
			})






		} else { //innen asztali (>768)
			//áthelyezi a social boxot a jobbszélre
			$("#social-box").appendTo($(header));
			var mbw = $("header nav ul li").first().outerWidth();

			$(".theTags a").wrap("<span class='tg'></span>")

			//ne mozogjon a menü és a tagek hovernél
			$("header nav ul li, .theTags span ").each(function () {
				var mbw1 = 5;
				if ($(this).hasClass('tg')) {
					mbw1 = 1;
				}
				var mbw = $(this).outerWidth() + mbw1;
				$(this).css("width", mbw)
			});

			//single mellett a lista ne csússzon tovább
			if (!postList && $('#sidebar').length) {

				var sh = $("#sidebar>div").height();
				var wh = $(window).outerHeight();
				var st = $("#sidebar>div").offset().top + $("#header").outerHeight();
				var sFixed = false;
				var sItemH = $("#sidebar h4:first-child").height();

				if (wh < sh) {
					$(document).scroll(function () {
						var scr = $(document).scrollTop();
						var numm = st + sh - scr - wh;
						// console.log("sTop:" + st + " sHeight:" + sh + " scroll:" + scr + " wHeight:" + wh);
						if (numm <= 0 && !sFixed) {
							$("#sidebar>div").css({ top: st - scr - sItemH, position: "fixed" });
							sFixed = true;
						}
						if (numm > 0 && sFixed) {
							$("#sidebar>div").css({ top: '0', position: "relative" });
							sFixed = false;
						}
					});
				} else {
					$("#sidebar>div").css("position", "fixed");
				}
			}

			//single melletti lista betüi nagybetüsek legyenek, ha aktív
			$("#sidebar>div a").each(function () {
				var sideUrl = $(this).attr("href").split("/");
				var sUrl = sideUrl[currUrl.length - 2]
				if (sUrl == lUrl) {
					var mn = $(this).html().toUpperCase();
					$(this).html(mn);
				}


			})

			//hover a thumbnaileken
			if (postList) {
				$('article img').wrap("<span class='imgWrapper'></span>")
			}
			if (pw >= 480 && !postList) {
				$(".relatedWrapper img").wrap("<span class='imgWrapper'></span>")
			}
			// $(".articleTitle>h2 a").hover(
			// 	function(e){
			// 		$(this).parents('article').find('img').trigger(e.type);
			// 		$(".single .entry-content img").trigger(e.type);
			// 	});


		}//asztali vége

		//band alatti social linkek
		if ($(".sslink").first().length > 0) {
			var ssH = $(".sslink img").first()[0].getBoundingClientRect().height;
			if (ssH > 50) {
				$(".sslink img").css("height", "50px");
			}
		}


		//többoszloposság beállítása
		function multiCol(selector, wrapper) {
			var cww = $(wrapper).width();
			var an = 0;
			var colNum;

			if (pw < 768) {
				colNum = 2;
			} else if (pw >= 768) {
				colNum = 4;

				$("article").each(function () {
					an++;
				})

				var anm = an / 4 - Math.floor(an / 4)
				var dn = 4 - (anm / 0.25)

				if (dn > 0) {
					for (var i = 0; i < dn; i++) {
						$(wrapper).append('<article class="dummy"></article>')
					}
				}
			}
			var arw = (cww - (5 * (colNum - 1))) / colNum
			var arwF = Math.floor(arw);
			if (arw != arwF) {
				arw = arwF;
			}
			$(selector + ' ' + wrapper + " article").css("width", arw);
			console.log('wrapper width:' + cww + ' col width:' + arw);
		}


		if (/*pw >= 480 && */postList) {
			multiCol(".home", "#contentWrapper");
			multiCol(".archive", "#contentWrapper");
		}
		if (/*pw >= 480 && */!postList) {
			multiCol('.single', '.relatedWrapper')
		}



		//más arhívoknál a cím
		var arch2;
		if (postList && !$('body').hasClass("category")) {
			$(".pagetitle").insertAfter("#header");
			arch2 = true;
		}



		//ne takrja ki az oldal tetejét a header
		var hH = $("header").css("height");
		if ($("body").hasClass("home")) {
			$("#aboutWrapper").css("margin-top", hH);
		} else if (arch2) {
			$(".pagetitle").css("margin-top", hH);
		} else {
			$("#contentWrapper").css("margin-top", hH);
		}


		//betöltés
		$(window).on("load", function () {
			$("#loader").hide();
		});







	});

}(window.jQuery || window.$));