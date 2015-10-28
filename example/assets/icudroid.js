var ICUDROID = function() {

    return {
        jsPackage: function(name) {
            var p = name.split(".");
            var currentPackage = window;
            for (var i = 0; i < p.length; i++) {
                var packageName = p[i];
                if(!currentPackage[packageName]){
                    currentPackage[packageName] = {};
                }
                currentPackage = currentPackage[packageName];
            }
        }
    }
}();
