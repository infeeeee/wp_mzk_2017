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
        var isMobile = false;

        //kezdőlapon lescrollol a bandhez, nem átlép
        if ($('body').hasClass('home')) {
            $("header nav .mzk-band").click(function (e) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: $("#contentWrapper").offset().top - 20
                }, 400);
                var mn = $(this).html().toUpperCase();
                $(this).html(mn);
                if (isMobile) {
                    $("header nav").stop().slideUp();
                    $('#site-title a').addClass("menuHidden");
                }
            });

        }

        var postList = false;
        if ($('body').hasClass('home') || ($('body').hasClass('archive') && !$('body').hasClass('category-tour-date'))) {
            postList = true;
        }


        //az adott kategória nagy nagybetűs
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

        //középre igazított képek középre:
        $("img.aligncenter").parent().css({
            "display": "flex",
            "flex-direction": "column",
            "align-items": "center"
        })

        //a kezdőoldalon levő képek köré kerüljön egy tag, h szépek legyenek, ha nem lenne link
        $('#aboutbox p:last-child>img').each(function () {
            $(this).wrap("<span></span>")
        })



        //első n szót megkeresi
        $.fn.wrapStart = function (numWords) {
            var node = this.contents().filter(function () { return this.nodeType == 3 }).first(),
                text = node.text(),
                first = text.split(" ", numWords).join(" ");

            if (!node.length)
                return;

            node[0].nodeValue = text.slice(first.length);
            node.before('<h1 class="contactMZK">' + first + '</h1>');
        };

        //Contact oldalon nem látszik a cím, az mzk felirat meg nagy
        if ($("#contentWrapper>.Contact").length) {
            $("#contentWrapper>.Contact>h2").hide();
            $(".contactTitle").wrapStart(1);
        }

        // Ha nincs találat az eseményeknél, akkor is megjelenjen h nincs találat
        if ($('body').hasClass('category-tour-date') && $('body').hasClass('archive') && !$('#contentWrapper article').length) {
            $("#contentWrapper").append("<h2>No tour dates</h2>")
        }


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


        //youtube linkek kapjanak egy containert
        $("iframe").each(function () {
            var ifUrl = $(this).attr("src");
            if (ifUrl.indexOf("youtube")) {
                $(this).wrap("<div class='ytcontainer'></div>")
            }

        })


        //mobil 
        if (pw < 768) {

            //menü
            isMobile = true;
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
            // var mbw = $("header nav ul li").first().outerWidth();

            $(".theTags a").wrap("<span class='tg'></span>")

            //ne mozogjon a menü és a tagek hovernél
            $("header nav ul li, .theTags span,#sidebar article header a").each(function () {
                var thow = $(this).outerWidth();

                var mbw1 = 1.3
                if ($(this).hasClass('menu-item')) {
                    mbw1 = 1.1;
                } else if ($(this).hasClass('tg')) {
                    mbw1 = 1.05;
                }

                var mbw = parseInt(thow * mbw1)
                $(this).css("width", mbw)
            });

            $(".archive .articleTitle").each(function () {
                var mbh = $(this).outerHeight() + 2;
                $(this).css("height", mbh)
            })


            console.log($("article .singleHeader").outerHeight(), $("article .entry-content").outerHeight(), $("article .relatedWrapper ").outerHeight(),
                $("#sidebar div").outerHeight())

            //single mellett a lista ne csússzon tovább
            if (!postList && $('#sidebar').length && $("#sidebar .widget").length &&
                $("article .singleHeader").outerHeight() + $("article .entry-content").outerHeight() + $("article .relatedWrapper").outerHeight() >
                $("#sidebar div").outerHeight()) {

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
            } else if ($('body').hasClass('category-tour-date')) {
                $('.eventThumbnail img').wrap("<span class='imgWrapper'></span>")
            }
            if (pw >= 480 && !postList) {
                $(".relatedWrapper img").wrap("<span class='imgWrapper'></span>")
            }
            $(".articleTitle>h2 a").hover(function () {
                $(this).closest('article').find('.imgWrapper').addClass("hover");
                //$(".single .entry-content img").hide()//.trigger(e.type);
            }, function () {
                $(this).closest('article').find('.imgWrapper').removeClass("hover");
            });
            $(".imgWrapper").hover(function () {
                $(this).closest('article').find(".articleTitle h2 a").css("font-style", "italic")
            }, function () {
                $(this).closest('article').find(".articleTitle h2 a").css("font-style", "")
            });



        }//asztali vége

        //related:
        //ha nincs release, akkor ne jelenjen meg a felirat
        if (!$('.relatedWrapper').children().length) {
            $(".relatedTitle").hide();
        } else if ($('.relatedWrapper>.category-tour-date').length && $('.relatedWrapper>.category-release').length) {
            //Ha van event, akkor az külön sorban jelenjen meg
            $('#contentWrapper>article').append('<h2 class="relatedTitle">Tour dates</h2>');
            $('#contentWrapper>article').append('<div class="relatedWrapper tour-date-wrapper">');
            $('.relatedWrapper>.category-tour-date').each(function () {
                if ($(this).hasClass('category-tour-date')) {
                    $(this).appendTo('.tour-date-wrapper')
                }
            })

        } else if ($('.relatedWrapper>.category-tour-date').length && !$('.relatedWrapper>.category-release').length) {
            //ha csak eventek vannak, akkor jó legyen a cím
            $(".relatedTitle").html('Tour Dates')
        }



        //band alatti social linkek
        // if ($(".sslink").first().length > 0) {
        // 	var ssH = $(".sslink img").first()[0].getBoundingClientRect().height;
        // 	console.log(ssH);
        // 	if (ssH > 50) {
        // 		$(".sslink img").css("height", "50px");
        // 	}
        // }


        //többoszloposság beállítása
        function multiCol(selector, wrapper) {
            var cww = $(wrapper).width();
            var an = 0;
            var colNum;

            if (pw < 768) {
                colNum = 2;
            } else if (pw >= 768) {
                colNum = 4;

                $(wrapper + " article").each(function () {
                    an++;
                })

                var anm = an / 4 - Math.floor(an / 4)
                var dn = 4 - (anm / 0.25)

                if (dn > 0 && an > 0) {
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


        if (postList) {
            multiCol(".home", "#contentWrapper");
            multiCol(".archive", "#contentWrapper");
        }
        if (!postList) {
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