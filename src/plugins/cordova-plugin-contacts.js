plugin('cordova-plugin-contacts');

mock('navigator.contacts.create', function () {

});

mock('navigator.contacts.find', function (fields, success, fail, opts) {

});

mock('navigator.contacts.pickContact', function () {

});