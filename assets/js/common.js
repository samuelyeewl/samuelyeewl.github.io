$(document).ready(function() {
    $('a.abstract').click(function() {
        $(this).parent().parent().find(".abstract.hidden").toggleClass('open');
    });
    $('a.showauth').click(function() {
        $(this).parent().parent().find("span.extraauth.hidden").toggleClass('open');
        $(this).parent().toggleClass('hidden');
    });
    $('a.hideauth').click(function() {
        $(this).parent().parent().parent().find("span.extraauth.hidden").toggleClass('open');
        $(this).parent().parent().parent().find("span.showauth").toggleClass('hidden');
    });
    $('a.bibtex').click(function() {
        $(this).parent().parent().find(".bibtex.hidden").toggleClass('open');
    });
});
