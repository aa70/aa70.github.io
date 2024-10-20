$(document).ready(function(){
    $(".mobile-nav").on("click", function() {
        openNav()
    });

    $(".mobile-nav").on("keydown", function(e) {
        if (e.which == 13 || e.which == 32)
            openNav()
    });
    
    $(".mobile-nav-close").on("click", function() {
        closeNav()
    });

    $(".mobile-nav-close").on("keydown", function(e) {
        if (e.which == 13 || e.which == 32)
            closeNav()
    });

    $(".card button").on("click", function(e) {
        openCardModal(e.target)
    });

    $(".card-modal button").on("click", function() {
        closeCardModal()
    });

    $(".province-button").on("click", function(){
        toggleProvinceSelector($("#province-menu"));
    });

    $(".province-button-mobile").on("click", function(){
        toggleProvinceSelector($("#province-modal"));
    });

    $("#province-menu a").on("click", function(e){
        setProvince(e.target);
        toggleProvinceSelector($("#province-menu"));
    });

    $("#province-modal a").on("click", function(e){
        setProvince(e.target);
        toggleProvinceSelector($("#province-modal"));
    });

    $("#modal-close-button").on("click", function(e){
        setProvince(e.target);
        toggleProvinceSelector($("#province-modal"));
    });

    $("#dark-mode").on("click", function(e){
        toggleDarkMode(e.target);
    });

    $("#dark-mode-mobile").on("click", function(e){
        toggleDarkMode(e.target);
    });
})

function toggleDarkMode(){
    var main = $(".main");
    var icon = $("#dark-mode");
    if (main.hasClass("dark-mode")){
        main.removeClass("dark-mode");
        icon.text("☾");
    }
    else{
        main.addClass("dark-mode");
        icon.text("☀︎");
    }
    closeNav();
}

function openNav(){
    var closeButton = $("#close-button");
    var menuButton = $("#hamburger");
    var menu = $("#menu");
    closeButton.removeClass("hidden");
    menuButton.addClass("hidden");
    menu.removeClass("hidden");
    $(".hamburger-menu").attr("aria-expanded", true);
}

function closeNav(){
    var closeButton = $("#close-button");
    var menuButton = $("#hamburger");
    var menu = $("#menu");
    closeButton.addClass("hidden");
    menuButton.removeClass("hidden");
    menu.addClass("hidden");
    $(".hamburger-menu").attr("aria-expanded", false);
}

function openCardModal(card){
    $("#card-modal").removeClass("invisible");
    var title = card.getAttribute("id");
    $("#card-modal-meal").text(title);
    $("#card-modal-close").trigger("focus");
}

function closeCardModal(){
    $("#card-modal").addClass("invisible");
}

function toggleProvinceSelector(menu){
    if (menu.hasClass("hidden"))
        menu.removeClass("hidden");
    else
        menu.addClass("hidden");
}

function setProvince(p){
    var province = $("#current-province");
    province.text(p.text);
}