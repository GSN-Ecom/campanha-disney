/**
* Landing Page LFouder
* Desenvolvido por F5 WEB DESIGN E TECNOLOGIA ATUALIZADA
* https://www.ef5.com.br/
* 2026-03-12 17:38:01 
**/
"use strict";jQuery(function($){console.log("jQuery loaded!");// MANIPULAÇÃO DE HASH E SCROLL INICIAL
var pendingHash=null;if(location.hash){pendingHash=location.hash;// Evita que o navegador tente rolar automaticamente
history.scrollRestoration="manual";// Limpa a URL temporariamente para controlar o scroll via JS
history.replaceState(null,"",location.pathname+location.search);window.scrollTo(0,0)}// BOTÃO BACK TO TOP
var btn=document.querySelector(".back-to-top");function toggleBackToTop(){if(!btn)return;if(window.scrollY>300){btn.classList.add("visible")}else{btn.classList.remove("visible")}}window.addEventListener("scroll",toggleBackToTop);if(btn){btn.addEventListener("click",function(e){e.preventDefault();window.scrollTo({top:0,behavior:"smooth"})})}// SCROLL SUAVE E REDIRECIONAMENTO DE ÂNCORAS
$(".nav-link[href^=\"#\"]").on("click",function(e){var target=$(this).attr("href");if(!target||target==="#")return;var hash=target.charAt(0)==="#"?target:"#"+target;var isHome=location.pathname==="/supernosso/"||location.pathname==="/index.html"||location.pathname==="/";if(isHome){// Se já estiver na home, apenas rola
e.preventDefault();var $t=$(hash);if($t.length){var offset=Math.max(0,$t.offset().top-85);$("html, body").stop().animate({scrollTop:offset},600,"swing")}return}// Se não estiver na home, redireciona tentando caminhos diferentes
e.preventDefault();e.stopImmediatePropagation();var origin=window.location.origin;var urlRootHash=origin+"/supernosso/"+hash;var urlIndexHash=origin+"/index.html"+hash;// Tenta o caminho principal
window.location.assign(urlRootHash);// Fallback caso o ambiente exija index.html explicitamente
setTimeout(function(){var stillSamePage=location.pathname!=="/supernosso/"&&location.pathname.indexOf("/index.html")===-1;var hashNotSet=location.hash!==hash;if(stillSamePage||hashNotSet){window.location.assign(urlIndexHash)}},200)});// EXECUÇÃO DO SCROLL APÓS CARREGAMENTO (LOAD)
$(window).on("load",function(){if(pendingHash){var $el=$(pendingHash);if($el.length){setTimeout(function(){var offset=Math.max(0,$el.offset().top-85);$("html, body").stop().animate({scrollTop:offset},700,"swing");// Devolve o hash para a URL de forma limpa
history.replaceState(null,"",pendingHash)},300)}}});// CARROSSEL PRINCIPAL (SLICK)
$(".carousel").slick({dots:false,arrows:true,infinite:true,autoplay:true,speed:500,slidesToShow:1,slidesToScroll:1,responsive:[{breakpoint:991,settings:{dots:true,arrows:false}}]});// TROCA DE IMAGENS DINÂMICAS - DESKTOP E MOBILE
function updateImages(){$(".carousel img").each(function(){var $img=$(this);var mobileSrc=$img.data("mobile");if(!$img.data("desktop")){$img.data("desktop",$img.attr("src"))}var desktopSrc=$img.data("desktop");if(window.innerWidth<=768){if(mobileSrc&&$img.attr("src")!==mobileSrc){$img.attr("src",mobileSrc)}}else{if(desktopSrc&&$img.attr("src")!==desktopSrc){$img.attr("src",desktopSrc)}}})}updateImages();$(window).resize(updateImages);// CONTROLE DO MENU OFFCANVAS (BOOTSTRAP)
$(document).on("click",".offcanvas a.nav-link, .offcanvas .btn--offcanvas",function(){var offcanvasElement=document.getElementById("offcanvasNavbar2");var bsOffcanvas=bootstrap.Offcanvas.getInstance(offcanvasElement);if(bsOffcanvas){bsOffcanvas.hide()}});// SLIDER "COMO PARTICIPAR" (MOBILE ONLY)
function initParticipateSlider(){var $slider=$(".js-participate-slider");var $wrapper=$(".how-to-participate__wrapper");if($(window).width()<=576){if(!$slider.hasClass("slick-initialized")){// Eventos de Init e Mudança de Slide
$slider.on("init afterChange",function(event,slick,currentSlide){var current=currentSlide||0;var total=slick.slideCount;// Esconde no início
if(current===0){$(".slick-prev").css("visibility","hidden")}else{$(".slick-prev").css("visibility","visible")}//  Desloca a Prev e esconde a Next
if(total===current+1){$wrapper.addClass("how-to-participate__wrapper--last-slide");$(".slick-next").css("visibility","hidden")}else{$wrapper.removeClass("how-to-participate__wrapper--last-slide");$(".slick-next").css("visibility","visible")}});$slider.slick({dots:false,infinite:false,speed:300,slidesToShow:1.2,slidesToScroll:1,arrows:true,mobileFirst:true,responsive:[{breakpoint:576,settings:"unslick"}]})}}}// Inicializa o slider
initParticipateSlider();// RE-INICIALIZAÇÃO NO RESIZE
var resizeTimer;$(window).on("resize",function(){clearTimeout(resizeTimer);resizeTimer=setTimeout(initParticipateSlider,100)})});
