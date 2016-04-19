# Cordova Plugin Mocks

A simple javascript library to mock the common Apache Cordova plugins. 
Ideal for developing Ionic/Cordova apps in a browser or a device when you want to skip the actual plugin call. 

## Usage

Just include `cordova.mock.js` in your application's main `index.html` file.
It overwrites the common plugin APIs with a mock call, without actually invoking the device call.

## Why ? 
While `ionic serve` is great, it does not have plugins. Ripple has plugins, but is buggy and has a UI that comes in the way of a developer workflow. Hence this. 
Sometimes, we would also want to test on the device while mocking only one specific plugin. 

## Recomended workflow

Here is a suggested Cordova development workflow in a browser. 

1. Create the Cordova/Ionic application, add all the plugins you need
2. Copy `cordova.mock.js` to your app's __www__ folder and add a script tag pointing to it in the __index.html__ file
3. Run a HTTP server with live-reload (like [browsersync](http://browsersync.io) or [livereload](http://livereload.com/))
4. Attach either the VSCode debugger or the Chrome devtools to the running Cordova app. 

Alternatively, you could use this with the __cordova-plugin-browsersync__ to achieve live-reload on a device while mocking some plugins. 

## Extensibility and APIs 

The mock only supports some plugins, but is extensible so that it can be used in other scenarios too. 

### Quickly switch to actual plugin implementation

To quickly disable plugins, call `mock.noMock()` or `mock.noMock(plugin1, plugin2, plugin3)`. 
This can be called either from the Developer tools console that is attached to the running app, or placed in any script. 
Use `mock.yesMock()` or `mock.yesMock(plugin1, plugin3)` to start mocking the plugin implementations again. 

### Mock fail cases for plugins

By default, the mock pretends that all plugin calls have succeeded.
To start the plugin calls to fail, call `mock.fail()` or `mock.fail(plugin1, plugin2, plugin3)`.
This can be called either from the Developer tools console that is attached to the running app, or placed in any script. 
To make the plugins start succeeding again, call `mock.noFail()` or `mock.noFail(plugin1, plugin3)`.

If you just want one plugin call to fail, prefix that call with a `fail.`. 
For example, to make the camera plugin fail, replace `camera.getPicture()` with `fail.camera.getPicture()`

### Logging

To log all plugin calls to the console, simply enable logging using `mock.log=true`, either in the developer tools, or in a script on the page. 

## Customizing the mocks

To either add new mocks, or modify the mock of a plugin defined here, use 

```javascript
plugin('cordova-plugin-camera');
mock('camera.getPicture', function(success, fail, opts /*params to the plugin call*/)){
    if (mock.shouldFail('camera.getPicture')){
        fail(/*Object that should be returned on fail*/);    
    } else {
        success(/* onSuccess result */);
    }
});
```

If you are customizing the mock, please consider sending it back as a pull request - someone in the community may benefit from the mock you wrote !! 

# Contributing

To add new mocks for plugins, place them in the __src/plugins__ folder. Ensure that you run the tests once using `npm test`.