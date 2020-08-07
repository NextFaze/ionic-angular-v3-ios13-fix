export function isCordova(plt) {
    const win = plt.win();
    return !!(win['cordova'] || win['PhoneGap'] || win['phonegap']);
}
export function isElectron(plt) {
    return plt.testUserAgent('Electron');
}
export function isIos(plt) {
    // shortcut function to be reused internally
    // checks navigator.platform to see if it's an actual iOS device
    // this does not use the user-agent string because it is often spoofed
    // an actual iPad will return true, a chrome dev tools iPad will return false
    // isIpad is iOS13 fix.
    return plt.testNavigatorPlatform('iphone|ipad|ipod') || isIpad(window);
}
// iOS 13 fix included from ionic 4.9+
export function isIpad(win) {
    if (testUserAgent(win, /iPad/i)) {
        return true;
      }
    
      // iOS 13+
      if (testUserAgent(win, /Macintosh/i) && isMobile(win)) {
        return true;
      }
    
      return false;
}
export function isMobile(win) {
    return matchMedia(win, '(any-pointer:coarse)');
}
export function testUserAgent(win, expr) {
    return expr.test(win.navigator.userAgent);
}
export function matchMedia(win, query) {
    return win.matchMedia(query).matches;
}
export function isSafari(plt) {
    return plt.testUserAgent('Safari');
}
export function isWKWebView(plt) {
    return isIos(plt) && !!plt.win()['webkit'];
}
export function isIosUIWebView(plt) {
    return isIos(plt) && !isWKWebView(plt) && !isSafari(plt);
}
//# sourceMappingURL=platform-utils.js.map