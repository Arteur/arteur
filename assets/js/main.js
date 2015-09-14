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

        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#show-picture').append("<img class='img-responsive' src='" + e.target.result + "'/>");
                };

                reader.readAsDataURL(input.files[0]);
            }
        }

        $("#take-picture").change(function(){
            // readURL(this);
        });
    });
})();
