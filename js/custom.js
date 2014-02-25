$(document).ready(function() {
    // All modals
    $('.modal').on('shown.bs.modal', function(e) {
        $('body').addClass('not-scrollable');
    });

    $('.modal').on('hidden.bs.modal', function(e) {
        $('body').removeClass('not-scrollable');
    });

    // Header
    $('#header a, #presentation a').click(function() {
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 100
        }, 500);
        return false;
    });

    $(document).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('#header').addClass('fixed');
        } else {
            $('#header').removeClass('fixed');
        }
    });

    // Portfolio
    $('#portfolio .work-thumbs li').click(function() {
        $('#work-gallery').modal('toggle');
        $('#portfolio-gallery').carousel($(this).index());
    });

    // Rates
    function recalculate() {
        var sum = 0;

        $('#rates-expanded input:checked').each(function() {
            sum += parseInt($(this).data('price'));
        });

        $('#rates-expanded .total-cost .sum').text(sum);
    }

    $('#rates-expanded input').change(function() {
        recalculate();
    });

    $('#rates-expanded').collapse({
        toggle: false
    });
    $('#rates .details').click(function() {
        $('#rates-expanded').collapse('show');

        $('#rates-expanded input').prop('checked', false);
        var options = $(this).data('incl').split(',');
        for (var i in options) {
            var o = options[i];
            if (o.indexOf('|') === -1) {
                $('#rates-expanded input[name="' + o + '"]').prop('checked', true);
            } else {
                $('#rates-expanded input[name="' + o.split('|')[0] + '"][value="' + o.split('|')[1] + '"]').prop('checked', true);
            }
        }
        recalculate();
    });

    $('#rates .order, #rates-expanded .order').click(function() {
        $('#rates #order-window').modal();
    });

    // Questions
    $('#questions').collapse({
        toggle: false
    });
    $('#questions .title').click(function() {
        $(this).siblings('.container').collapse('toggle');
    });

});