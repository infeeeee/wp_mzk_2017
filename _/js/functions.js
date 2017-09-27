// Browser detection for when you get desparate. A measure of last resort.
// http://rog.ie/post/9089341529/html5boilerplatejs
// var b = document.documentElement;
// b.setAttribute('data-useragent',  navigator.userAgent);
// b.setAttribute('data-platform', navigator.platform);
// sample CSS: html[data-useragent*='Chrome/13.0'] { ... }
// remap jQuery to $
!function(e){e(document).ready(function(){function t(t,r){var i,s=e(r).width(),n=0
if(a<768)i=2
else if(a>=768){i=4,e(r+" article").each(function(){n++})
var o=n/4-Math.floor(n/4),l=4-o/.25
if(l>0&&n>0)for(var h=0;h<l;h++)e(r).append('<article class="dummy"></article>')}var d=(s-5*(i-1))/i,c=Math.floor(d)
d!=c&&(d=c),e(t+" "+r+" article").css("width",d),console.log("wrapper width:"+s+" col width:"+d)}var a=e(document).outerWidth(),r=!1
e("body").hasClass("home")&&e("header nav .mzk-band").click(function(t){t.preventDefault(),e("html, body").animate({scrollTop:e("#contentWrapper").offset().top-20},400)
var a=e(this).html().toUpperCase()
e(this).html(a),r&&(e("header nav").stop().slideUp(),e("#site-title a").addClass("menuHidden"))})
var i=!1;(e("body").hasClass("home")||e("body").hasClass("archive")&&!e("body").hasClass("category-tour-date"))&&(i=!0)
var s=window.location.href.split("/"),n=s[s.length-2]
if(e("header nav li").each(function(){if(e(this).attr("class").split(/\s+/)[0]==="mzk-"+n){var t=e(this).html().toUpperCase()
e(this).html(t)}}),e("img.aligncenter").parent().css({display:"flex","flex-direction":"column","align-items":"center"}),e("#aboutbox p:last-child>img").each(function(){e(this).wrap("<span></span>")}),e.fn.wrapStart=function(e){var t=this.contents().filter(function(){return 3==this.nodeType}).first(),a=t.text(),r=a.split(" ",e).join(" ")
t.length&&(t[0].nodeValue=a.slice(r.length),t.before('<h1 class="contactMZK">'+r+"</h1>"))},e("#contentWrapper>.Contact").length&&(e("#contentWrapper>.Contact>h2").hide(),e(".contactTitle").wrapStart(1)),e("body").hasClass("category-tour-date")&&e("body").hasClass("archive")&&!e("#contentWrapper article").length&&e("#contentWrapper").append("<h2>No tour dates</h2>"),e(".theTags a").each(function(){if(e(this).parent(".theTags").hasClass("tn1")){var t=e(this).html().toLowerCase()
e(this).html(t)}else{e(this).parent(".theTags").addClass("tn1")
var t=e(this).html().toLowerCase().split(""),a=t[0].toUpperCase()
t[0]=a
var r=t.join("")
e(this).html(r)}}),e("iframe").each(function(){e(this).attr("src").indexOf("youtube")&&e(this).wrap("<div class='ytcontainer'></div>")}),a<768)r=!0,e("header nav").hide(),e("#site-title a").addClass("menuHidden").click(function(t){t.preventDefault(),e(this).hasClass("menuHidden")?(e("header nav").stop().slideDown(),e(this).removeClass("menuHidden")):(e("header nav").stop().slideUp(),e(this).addClass("menuHidden"))}),e("#contentWrapper").click(function(){e("#site-title a").hasClass("menuHidden")||(e("header nav").stop().slideUp(),e("#site-title a").addClass("menuHidden"))})
else{if(e("#social-box").appendTo(e(header)),e(".theTags a").wrap("<span class='tg'></span>"),e("header nav ul li, .theTags span,#sidebar article header a").each(function(){var t=e(this).outerWidth(),a=1.3
e(this).hasClass("menu-item")?a=1.1:e(this).hasClass("tg")&&(a=1.05)
var r=parseInt(t*a)
e(this).css("width",r)}),e(".archive .articleTitle").each(function(){var t=e(this).outerHeight()+2
e(this).css("height",t)}),console.log(e("article .singleHeader").outerHeight(),e("article .entry-content").outerHeight(),e("article .relatedWrapper ").outerHeight(),e("#sidebar div").outerHeight()),!i&&e("#sidebar").length&&e("#sidebar .widget").length&&e("article .singleHeader").outerHeight()+e("article .entry-content").outerHeight()+e("article .relatedWrapper").outerHeight()>e("#sidebar div").outerHeight()){var o=e("#sidebar>div").height(),l=e(window).outerHeight(),h=e("#sidebar>div").offset().top+e("#header").outerHeight(),d=!1,c=e("#sidebar h4:first-child").height()
l<o?e(document).scroll(function(){var t=e(document).scrollTop(),a=h+o-t-l
a<=0&&!d&&(e("#sidebar>div").css({top:h-t-c,position:"fixed"}),d=!0),a>0&&d&&(e("#sidebar>div").css({top:"0",position:"relative"}),d=!1)}):e("#sidebar>div").css("position","fixed")}e("#sidebar>div a").each(function(){if(e(this).attr("href").split("/")[s.length-2]==n){var t=e(this).html().toUpperCase()
e(this).html(t)}}),i?e("article img").wrap("<span class='imgWrapper'></span>"):e("body").hasClass("category-tour-date")&&e(".eventThumbnail img").wrap("<span class='imgWrapper'></span>"),a>=480&&!i&&e(".relatedWrapper img").wrap("<span class='imgWrapper'></span>"),e(".articleTitle>h2 a").hover(function(){e(this).closest("article").find(".imgWrapper").addClass("hover")},function(){e(this).closest("article").find(".imgWrapper").removeClass("hover")}),e(".imgWrapper").hover(function(){e(this).closest("article").find(".articleTitle h2 a").css("font-style","italic")},function(){e(this).closest("article").find(".articleTitle h2 a").css("font-style","")})}e(".relatedWrapper").children().length?e(".relatedWrapper>.category-tour-date").length&&e(".relatedWrapper>.category-release").length?(e("#contentWrapper>article").append('<h2 class="relatedTitle">Tour dates</h2>'),e("#contentWrapper>article").append('<div class="relatedWrapper tour-date-wrapper">'),e(".relatedWrapper>.category-tour-date").each(function(){e(this).hasClass("category-tour-date")&&e(this).appendTo(".tour-date-wrapper")})):e(".relatedWrapper>.category-tour-date").length&&!e(".relatedWrapper>.category-release").length&&e(".relatedTitle").html("Tour Dates"):e(".relatedTitle").hide(),i&&(t(".home","#contentWrapper"),t(".archive","#contentWrapper")),i||t(".single",".relatedWrapper")
var p
i&&!e("body").hasClass("category")&&(e(".pagetitle").insertAfter("#header"),p=!0)
var u=e("header").css("height")
e("body").hasClass("home")?e("#aboutWrapper").css("margin-top",u):p?e(".pagetitle").css("margin-top",u):e("#contentWrapper").css("margin-top",u),e(window).on("load",function(){e("#loader").hide()})})}(window.jQuery||window.$)
