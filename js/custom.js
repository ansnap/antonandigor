$(document).ready(function() {
    /* All modals */
    $('.modal').on('shown.bs.modal', function(e) {
        $(this).scrollTop(0);
        $('body').addClass('not-scrollable');
    });

    $('.modal').on('hidden.bs.modal', function(e) {
        $('body').removeClass('not-scrollable');
    });

    /* Header */
    $('#header a, #presentation .content a').click(function() {
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

    /* Portfolio */
    $('#portfolio .work-thumbs li').click(function() {
        $('#work-gallery img').attr('src', $(this).find('img').data('full-img'));
        $('#work-gallery').modal('toggle');
    });

    $('#work-gallery').on('hidden.bs.modal', function(e) {
        $('#work-gallery img').attr('src', '');
    });

    /* Rates */

    // Total sum
    function recalculate() {
        var sum = 0;

        $('#rates-expanded input:checked').each(function() {
            sum += parseInt($(this).data('price'));
        });

        $('#rates-expanded .total-cost .sum').text(sum);
    }

    // Check inputs
    function checkOptions(element) {
        $('#rates-expanded input').prop('checked', false);
        var options = $(element).data('incl').split(',');
        for (var i in options) {
            var o = options[i];
            if (o.indexOf('|') === -1) {
                $('#rates-expanded input[name="' + o + '"]').prop('checked', true);
            } else {
                $('#rates-expanded input[name="' + o.split('|')[0] + '"][value="' + o.split('|')[1] + '"]').prop('checked', true);
            }
        }
        recalculate();
    }

    $('#rates-expanded input').change(function() {
        recalculate();
    });

    $('#rates-expanded').collapse({
        toggle: false
    });

    $('#rates .details, #presentation .custom').click(function() {
        $('#rates-expanded').collapse('show');
        checkOptions($(this));
    });

    $('#rates .order').click(function() {
        checkOptions($(this).siblings('.details'));
    });

    $('#rates .order, #rates-expanded .order').click(function() {
        $('#rates #order-window').modal();
    });

    // Include selected information to order
    $('#rates #order-window').on('show.bs.modal', function(e) {
        var options_str = '';
        $('#rates-expanded input').each(function() {
            if ($(this).prop('checked') === true) {
                options_str += $(this).siblings('span').text() + ' | ';
            }
        });
        if (options_str) {
            $('#order-window .order-details').show();
            $('#order-window [name="options"]').val(options_str);
        }
    });

    $('#rates #order-window').on('hide.bs.modal', function(e) {
        $('#order-window .order-details').hide();
    });

    /* Questions */
    $('#questions').collapse({
        toggle: false
    });
    $('#questions .title').click(function() {
        $(this).siblings('.container').collapse('toggle');
    });

});