var fail = {};

var methodToPluginMap = {};
var currentPlugin;
function plugin(pluginName) {
    currentPlugin = pluginName;
}

function mock(namespace, stub) {
    methodToPluginMap[method] = currentPlugin;

    var method = prepareNamespace(namespace, window);
    if (typeof stub === 'function') {
        method = pluginMethodCall(stub);
    } else {
        method = stub;
    }
}

mock.disable = function (list) { };

function prepareNamespace(symbolPath, context) {
    if (!symbolPath) {
        return context;
    }
    var parts = symbolPath.split('.');
    var cur = context;
    for (var i = 0, part; part = parts[i]; ++i) {
        cur = cur[part] = cur[part] || {};
    }
    return cur;
}