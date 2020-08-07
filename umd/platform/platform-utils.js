(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isCordova(plt) {
        var win = plt.win();
        return !!(win['cordova'] || win['PhoneGap'] || win['phonegap']);
    }
    exports.isCordova = isCordova;
    function isElectron(plt) {
        return plt.testUserAgent('Electron');
    }
    exports.isElectron = isElectron;
    function isIos(plt) {
        // shortcut function to be reused internally
        // checks navigator.platform to see if it's an actual iOS device
        // this does not use the user-agent string because it is often spoofed
        // an actual iPad will return true, a chrome dev tools iPad will return false
        // isIpad is iOS13 fix.
        return plt.testNavigatorPlatform('iphone|ipad|ipod') || isIpad(window);
    }
    // iOS 13 fix included from ionic 4.9+
    function isIpad(win) {
        if (testUserAgent(win, /iPad/i)) {
            return true;
          }
        
          // iOS 13+
          if (testUserAgent(win, /Macintosh/i) && isMobile(win)) {
            return true;
          }
        
          return false;
    }
    exports.isIpad = isIpad;
    function isMobile(win) {
        return matchMedia(win, '(any-pointer:coarse)');
    }
    exports.isMobile = isMobile;
    function testUserAgent(win, expr) {
        return expr.test(win.navigator.userAgent);
    }
    exports.testUserAgent = testUserAgent;
    function matchMedia(win, query) {
        return win.matchMedia(query).matches;
    }
    exports.matchMedia = matchMedia;
    function isSafari(plt) {
        return plt.testUserAgent('Safari');
    }
    exports.isSafari = isSafari;
    function isWKWebView(plt) {
        return isIos(plt) && !!plt.win()['webkit'];
    }
    exports.isWKWebView = isWKWebView;
    function isIosUIWebView(plt) {
        return isIos(plt) && !isWKWebView(plt) && !isSafari(plt);
    }
    exports.isIosUIWebView = isIosUIWebView;
});
//# sourceMappingURL=platform-utils.js.map