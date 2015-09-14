(function() {
    document.getElementById("take-picture").onchange = function(){
        var files = document.getElementById("take-picture").files;
        var file = files[0];
        if(file === null){
            alert("No file selected.");
        }
        else{
            get_signed_request(file);
        }
    };
})();

function get_signed_request(file){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/sign_s3");
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                var response = JSON.parse(xhr.responseText);
                console.log(response);
                upload_file(file, response.signed_request, response.url);
            }
            else{
                alert("Could not get signed URL from Amazon.");
            }
        }
    };
    xhr.send(JSON.stringify({file_type:file.type}));
}

function upload_file(file, signed_request, url){
    console.log('uplaod file called');
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", signed_request);
    xhr.setRequestHeader('x-amz-acl', 'public-read');
    xhr.onload = function() {
        console.log('on load in funciton');
        if (xhr.status === 200) {
            console.log('uplaod on amazon!');
            //force reaload of the image
            var date = new Date();
            document.getElementById("show-picture").src = url + '?d=' + date.getTime();
            document.getElementById("fileName").value = url;
        }
    };
    xhr.onerror = function() {
        alert("Could not upload file.");
    };
    xhr.send(file);
}
