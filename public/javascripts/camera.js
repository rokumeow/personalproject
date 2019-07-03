/**
 * control the camera, used in create stories and create events
 * @author Shengyang
 * @return base64 encoded image data
 * @exception IOException
 * @version v1.0
 */

var video = document.getElementById('video');
var cambutton = document.getElementById('camera');
var snapbutton = document.getElementById("snap");
var canvas = document.getElementById('canvas');
var photoarea = document.getElementById('pc_photo_area');
var mobile_photoarea = document.getElementById('mobile_photo_area');
var m_camera = document.getElementById('m_camera');
var imagestring = document.getElementById('imagestring');
var frame = document.getElementById('frame');
var fromfile = document.getElementById('fromfile');

var context = canvas.getContext('2d');
// track the stream so that it can be stoped
var track = null;
var camera_avtive = false;
var imgdata = null;

function start_webcam(){
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({video: true}).then(function (stream) {
            video.srcObject = stream;
            video.play();
            track = stream.getTracks()[0];
            camera_avtive = true;
        });
    }
}

function draw() {
    canvas.width = this.width;
    canvas.height = this.height;
    context.drawImage(this, 0,0);
    // canvas to string
    imgdata = canvas.toDataURL();
    //console.log(imgdata);
    imagestring.value = imgdata;
    //console.log("input value");
    // console.log(imagestring.value);
}
function failed() {
    console.error("The provided file couldn't be loaded as an Image media");
}

// if using a mobile browser
// use html5 camera
var sUserAgent = navigator.userAgent;
if (sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('iPhone') > -1 || sUserAgent.indexOf('iPad') > -1 || sUserAgent.indexOf('iPod') > -1 || sUserAgent.indexOf('Symbian') > -1) {
    cambutton.addEventListener("click", function () {
        if (mobile_photoarea.hidden === true){
            mobile_photoarea.hidden = false;
        }
        else {
            mobile_photoarea.hidden = true;
        }
    });
    m_camera.addEventListener('change', function(e) {
        var file = e.target.files[0];
        // display the image on the page
        frame.src = URL.createObjectURL(file);
        // load the image to the hidden canvas
        var img = new Image();
        img.onload = draw;
        img.onerror = failed;
        img.src = URL.createObjectURL(file);
    });
}
else {
    // if using a pc
    // use webcam

    // start the camera
    cambutton.addEventListener("click", function () {
        // shart the camera when inactive
        if (photoarea.hidden === true) {
            photoarea.hidden = false;
            start_webcam();
        }
        // hide the camera when active
        else {
            // stop recording
            if (camera_avtive) {
                track.stop();
            }
            photoarea.hidden = true;
        }
    });

    // take photo
    snapbutton.addEventListener("click", function () {
        if (camera_avtive) {
            // stop the video
            video.pause();
            // stop recording
            track.stop();
            // cache the photo to the canvas
            context.drawImage(video, 0, 0);
            imgdata = canvas.toDataURL();
            imagestring.value = imgdata;
            camera_avtive = false;
            snapbutton.innerHTML = "retake";
        }
        // restart the webcam
        else {
            start_webcam();
            snapbutton.innerHTML = "take photo";
        }
    });


}


// direct file upload
// for both mobile and pc
fromfile.onchange = function(e) {
    // draw the image in canvas
    var img = new Image();
    img.onload = draw;
    img.onerror = failed;
    img.src = URL.createObjectURL(this.files[0]);
};




