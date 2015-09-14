(function () {

    'use strict';
    $( document ).ready(function () {

        $('#permanent').change(function() {
            console.log($(this).val());
            console.log($(this).prop('checked'));
            if($(this).prop('checked')) {
                $('#datepicker').val('');
                $('#datepicker').prop('disabled', true);
            }else {
                $('#datepicker').prop('disabled', false);
            }
        });

        $('#datepicker').datepicker({
            dateFormat: 'dd-mm-yy',
        });

        $('#datepicker').keypress(function (e) {
            e.preventDefault();
        });

        navigator.geolocation.getCurrentPosition(function(position) {
            $('#location').val(position.coords.latitude + ',' + position.coords.longitude);
        });

        $('[data-toggle="tooltip"]').tooltip();

        $(".carousel-inner").swiperight(function() {
            $(this).parent().carousel('prev');
        });

        $(".carousel-inner").swipeleft(function() {
            $(this).parent().carousel('next');
        });

        $('#showMore').click(function () {
            $('.moreReviews').slideToggle();
        });

        $('#createReviewForm').validate({
            rules: {
                galleryName: {
                    required: true
                },
                stars: {
                    required: true
                },
                hearts: {
                    required: true
                },
                icon1: {
                    required: true
                },
                icon2: {
                    required: true
                }
            },
            messages: {
                galleryName: {
                    required: 'Please enter gallery name'
                },
                stars: {
                    required: 'Please enter stars rating'
                },
                hearts: {
                    required: 'Please enter heart rating'
                },
                icon1: {
                    required: 'Please enter icon1 rating'
                },
                icon2: {
                    required: 'Please enter icon2 rating'
                }
            }
        });
    });
})();
