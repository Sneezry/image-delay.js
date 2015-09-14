/**
 (c) Sneezry, 2015
 MIT License

 lizhe@lizhe.org
**/

(function(window, undefined) {
'use strict';

var isDelayStart = false;

var timeout = document.getElementsByTagName('html')[0].getAttribute('data-delay-timeout');

timeout = (!timeout || isNaN(timeout)) ? 10 : Number(timeout);

var getBgImageUrl = function(element) {
    var bgImageRawCss = element.style.backgroundImage,
        bgImageRawCssURL = bgImageRawCss.match(/^\s*\-webkit\-image\-set\((.*?)\)\s*$/),
        i, bgImageURL, dpr = 1;

    bgImageRawCssURL = (bgImageRawCssURL ? bgImageRawCssURL[1] : bgImageRawCss).split(',');

    for (i = 0; i < bgImageRawCssURL.length; i++) {
        if (bgImageRawCssURL[i].match(/1x\s*$/) && dpr === 1) {
            bgImageURL = bgImageRawCssURL[i].match(/url\([\s"']*(.*?)[\s"']*\)/);
        }

        if (bgImageRawCssURL[i].match(/2x\s*$/) && window.devicePixelRatio > 1 && dpr < 2) {
            dpr = 2;
            bgImageURL = bgImageRawCssURL[i].match(/url\([\s"']*(.*?)[\s"']*\)/);
        }

        if (bgImageRawCssURL[i].match(/3x\s*$/) && window.devicePixelRatio > 2 && dpr < 3) {
            dpr = 3;
            bgImageURL = bgImageRawCssURL[i].match(/url\([\s"']*(.*?)[\s"']*\)/);
        }
    }

    if (!bgImageURL) {
        bgImageURL = bgImageRawCssURL[0].match(/url\([\s"']*(.*?)[\s"']*\)/);
    }

    return bgImageURL ? bgImageURL[1] : null;
};

var listenBgLoaded = function(element) {
    var isLoaded = false,
        timeout = element.getAttribute('data-image-delay-wait'),
        src = getBgImageUrl(element),
        img = document.createElement('img');

    timeout = isNaN(timeout) ? 5 : Number(timeout);
    img.src = src;
    img.onload = function() {
        element.removeAttribute('data-image-delay-wait');
    };

    setTimeout(function() {
        element.removeAttribute('data-image-delay-wait');
    }, timeout * 1000);
};

var delayStart = function() {
    if (isDelayStart) {
        return;
    } else {
        isDelayStart = true;
    }

    var num, len, src, setsrc, img = document.getElementsByTagName('img'), allElements = document.all;

    for (num = 0, len = img.length; num < len; num++) {
        if (setsrc = img[num].getAttribute('data-delay-setsrc')) {
            img[num].setsrc = setsrc;
        }

        if (src = img[num].getAttribute('data-delay-src')) {
            img[num].src = src;
        }
    }

    document.getElementsByTagName('html')[0].setAttribute('data-delay-start', 'true');

    for (num = 0, len = allElements.length; num < len; num++) {
        if (allElements[num].getAttribute('data-image-delay-wait')) {
            listenBgLoaded(allElements[num]);
        }
    }
};

window.onload = function() {
    setTimeout(delayStart, 0);
};

setTimeout(delayStart, timeout * 1000);

})(window);