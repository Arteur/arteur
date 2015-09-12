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

        $('a').imageLightbox(
            {
                selector:       'id="imagelightbox"',   // string;
                allowedTypes:   'png|jpg|jpeg|gif',     // string;
                animationSpeed: 250,                    // integer;
                preloadNext:    true,                   // bool;            silently preload the next image
                enableKeyboard: true,                   // bool;            enable keyboard shortcuts (arrows Left/Right and Esc)
                quitOnEnd:      false,                  // bool;            quit after viewing the last image
                quitOnImgClick: false,                  // bool;            quit when the viewed image is clicked
                quitOnDocClick: true,                   // bool;            quit when anything but the viewed image is clicked
                onStart:        false,                  // function/bool;   calls function when the lightbox starts
                onEnd:          false,                  // function/bool;   calls function when the lightbox quits
                onLoadStart:    false,                  // function/bool;   calls function when the image load begins
                onLoadEnd:      false                   // function/bool;   calls function when the image finishes loading
            });
    });
})();
