/// <reference path="require.d.ts" />
/// <reference path="jquery.d.ts" />
/// <reference path="enemy-territory-overbounce.ts" />
require.config({
    paths: {
        "jquery": 'js/jquery-2.1.3.min'
    }
});
require(['enemy-territory-overbounce'], function (App) {
    var overbounceCalculator = new App.OverbounceCalculator(800, 8);
});
//# sourceMappingURL=config.js.map