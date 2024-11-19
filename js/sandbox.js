$(document).ready(function(){

    $(".card button").on("click", function(e) {
        openCardModal(e.target)
    });

    $(".card-modal button").on("click", function() {
        closeCardModal()
    });

    $(".collapsible-link").on("click", function(event) {
        expand(this);
    });
})

function openCardModal(card){
    $("#card-modal").removeClass("invisible");
    var title = card.getAttribute("id");
    $("#card-modal-meal").text(title);
    $("#card-modal-close").trigger("focus");
}

function closeCardModal(){
    $("#card-modal").addClass("invisible");
}

function expand(funny) {
    var expand = funny.nextElementSibling;
    var symbol = funny.firstElementChild;
    if (expand.style.display === 'none') {
        expand.style.display = 'block';
        symbol.innerHTML = '-';
      } else {
        expand.style.display = 'none';
        symbol.innerHTML = '+';
      }
    var isExpanded = funny.getAttribute("aria-expanded") == "true" ? "false" : "true";
    funny.setAttribute("aria-expanded", isExpanded);
}