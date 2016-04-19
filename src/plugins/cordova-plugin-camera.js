plugin('cordova-plugin-camera');

mock('camera.getPicture', function (success, fail, opts) {
});

mock('camera.cleanup', function (success, fail) {
});
