$(document).ready(function(){
    $( window ).on( "scroll", function() {
        toggleTopButton()
      } );
    
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

    $(".hamburger-menu a").on("click", function() {
        closeNav()
    });

    $(".mobile-nav-close").on("keydown", function(e) {
        if (e.which == 13 || e.which == 32)
            closeNav()
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

    $("#reduce-motion").on("click", function(e){
        toggleMotion(e.target);
    });

    $("#motion-mobile").on("click", function(e){
        toggleMotion(e.target);
    });

    var isAnimated = true;
    var options = {};
    var observer = new IntersectionObserver(observerCallback, options);
    var h1s = document.querySelectorAll('.h1-animate');
    h1s.forEach(header => {
        observer.observe(header);
    });
    var h2s = document.querySelectorAll('.h2-animate');
    h2s.forEach(header => {
        observer.observe(header);
    });
    var ps = document.querySelectorAll('.p-animate');
    ps.forEach(header => {
        observer.observe(header);
    });
})

function toggleTopButton(){
    var button = $("#back-to-top");
    if (button.hasClass("hidden") && document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
        button.removeClass("hidden");
    }
    else{
        button.addClass("hidden");
    }
}

function toggleDarkMode(){
    var main = $(".main");
    var icon = $("#dark-mode");
    if (main.hasClass("dark-mode")){
        main.removeClass("dark-mode");
        icon.html("Dark mode ☾ <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd'><path d='M18 24h-12c-3.311 0-6-2.689-6-6s2.689-6 6-6h12.039c3.293.021 5.961 2.701 5.961 6 0 3.311-2.688 6-6 6zm-12-10c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4z'/></svg>");
        $('#dark-mode-mobile').text("Dark mode ☾");
    }
    else{
        main.addClass("dark-mode");
        icon.html("Light mode ☀︎ <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd'><path d='M6 24h12c3.311 0 6-2.689 6-6s-2.689-6-6-6h-12.039c-3.293.021-5.961 2.701-5.961 6 0 3.311 2.688 6 6 6zm12-10c-2.208 0-4 1.792-4 4s1.792 4 4 4 4-1.792 4-4-1.792-4-4-4z'/></svg>");
        $('#dark-mode-mobile').text("Light mode ☀︎");
    }
    var svgColor = main.hasClass("dark-mode") ? "white" : "black";
    $(".toggle svg").attr("fill", svgColor);
    $(".mobile-nav line").attr("stroke", svgColor);
    $(".mobile-nav-close path").attr("stroke", svgColor);
    closeNav();
}

function toggleMotion(){
    var main = $(".main");
    var icon = $("#reduce-motion");
    if (main.hasClass("no-motion")){
        main.removeClass("no-motion");
        icon.html("Reduce motion <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd'><path d='M18 24h-12c-3.311 0-6-2.689-6-6s2.689-6 6-6h12.039c3.293.021 5.961 2.701 5.961 6 0 3.311-2.688 6-6 6zm-12-10c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4z'/></svg>");
        $('#motion-mobile').text("Turn OFF motion");
    }
    else{
        main.addClass("no-motion");
        icon.html("Reduce motion <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd'><path d='M6 24h12c3.311 0 6-2.689 6-6s-2.689-6-6-6h-12.039c-3.293.021-5.961 2.701-5.961 6 0 3.311 2.688 6 6 6zm12-10c-2.208 0-4 1.792-4 4s1.792 4 4 4 4-1.792 4-4-1.792-4-4-4z'/></svg>");
        $('#motion-mobile').text("Turn ON motion");
    }
    var svgColor = main.hasClass("dark-mode") ? "white" : "black";
    $(".toggle svg").attr("fill", svgColor);
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

function toggleProvinceSelector(menu){
    if (menu.hasClass("invisible"))
        menu.removeClass("invisible");
    else
        menu.addClass("invisible");
}

function setProvince(p){
    var province = $("#current-province");
    province.text(p.text);
}

function observerCallback(entries, observer) {
    var main = $(".main");
    if (!main.hasClass("no-motion")){
        entries.forEach(entry => {
            if (entry.isIntersecting)
                entry.target.classList.add("animate");
        });
    }
}