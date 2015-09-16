/**
 (c) Sneezry, 2015
 MIT License

 lizhe@lizhe.org
**/

(function(window, undefined) {
'use strict';

var isDelayStart = false, startCount = 0;

var timeout = document.getElementsByTagName('html')[0].getAttribute('data-delay-timeout');

timeout = (!timeout || isNaN(timeout)) ? 10 : Number(timeout);

var getBgImageUrl = function(element) {
    var bgImageRawCss = getComputedStyle(element, null).getPropertyValue('background-image'),
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

var listenBgLoaded = function(element, callback) {
    var src, isLoaded = false,
        timeout = element.getAttribute('data-image-delay-wait'),
        img = document.createElement('img');

    timeout = (!timeout || isNaN(timeout)) ? 5 : Number(timeout);

    element.removeAttribute('data-delay-index');
    src = getBgImageUrl(element);

    img.src = src;
    img.onload = function() {
        if (!isLoaded) {
            isLoaded = true;
            element.removeAttribute('data-image-delay-wait');
            callback();
        }
    };

    setTimeout(function() {
        if (!isLoaded) {
            isLoaded = true;
            element.removeAttribute('data-image-delay-wait');
            callback();
        }
    }, timeout * 1000);
};

var listenLoaded = function(element, callback) {
    if (element.getAttribute('data-delay-src') || element.getAttribute('data-delay-setsrc')) {
        var setsrc, src, isLoaded = false,
            timeout = element.getAttribute('data-image-delay-wait');

        timeout = (!timeout || isNaN(timeout)) ? 5 : Number(timeout);

        if (setsrc = element.getAttribute('data-delay-setsrc')) {
            element.setsrc = setsrc;
        }

        if (src = element.getAttribute('data-delay-src')) {
            element.src = src;
        }

        element.onload = function() {
            if (!isLoaded) {
                isLoaded = true;
                element.removeAttribute('data-image-delay-wait');
                callback();
            }
        };

        setTimeout(function() {
            if (!isLoaded) {
                isLoaded = true;
                element.removeAttribute('data-image-delay-wait');
                callback();
            }
        }, timeout * 1000);
    } else {
        listenBgLoaded(element, callback);
    }
};

var sortDelayList = function(list) {
    var i, currentIndex, group = [], newList = [];

    list.sort(function(a, b) {
        return a.getAttribute('data-delay-index') - b.getAttribute('data-delay-index');
    });

    currentIndex = list[0].getAttribute('data-delay-index');

    for (i = 0; i < list.length; i++) {
        if (currentIndex !== list[i].getAttribute('data-delay-index')) {
            newList.push(group);
            group = [];
            currentIndex = list[i].getAttribute('data-delay-index');
        }

        group.push(list[i]);
    }

    newList.push(group);

    return newList;
};

var loadQueue = function(sortList, index) {
    index = index || 0;

    if (index >= sortList.length) {
        document.getElementsByTagName('html')[0].setAttribute('data-delay-end', 'true');
        return;
    }

    var i, loadedLen = 0;
    for (i = 0; i < sortList[index].length; i++) {
        sortList[index][i].removeAttribute('data-delay-index');
        listenLoaded(sortList[index][i], function() {
            loadedLen++;
            if (loadedLen === sortList[index].length) {
                loadQueue(sortList, index + 1);
            }
        });
    }
};

var delayStart = function() {
    var num, len, src, setsrc, sortList = [], indexList = [], allElements = document.all;

    document.getElementsByTagName('html')[0].setAttribute('data-delay-start', 'true');
    for (num = 0, len = allElements.length; num < len; num++) {
        if (allElements[num].getAttribute('ng-delay-src') && !allElements[num].getAttribute('data-delay-src') && startCount < 10) {
            setTimeout(delayStart, 500);
            startCount++;
            return;
        }
    }

    if (isDelayStart) {
        return;
    } else {
        isDelayStart = true;
    }

    for (num = 0, len = allElements.length; num < len; num++) {
        if ((allElements[num].getAttribute('data-image-delay') !== null ||
            allElements[num].getAttribute('data-delay-src')) &&
            (!allElements[num].getAttribute('data-delay-index') ||
            isNaN(allElements[num].getAttribute('data-delay-index')))) {

            sortList.push(allElements[num]);
            // listenBgLoaded(allElements[num]);
        } else if (allElements[num].getAttribute('data-delay-index') &&
            !isNaN(allElements[num].getAttribute('data-delay-index'))) {

            indexList.push(allElements[num]);
        }
    }

    if (sortList.length > 0 && indexList.length > 0) {
        sortList = [sortList].concat(sortDelayList(indexList));
    } else if (sortList.length > 0) {
        sortList = [sortList];
    } else if (indexList.length > 0) {
        sortList = sortDelayList(indexList);
    }

    if (sortList.length > 0) {
        loadQueue(sortList);
    }
};

var showDelaySrc = function() {
    if (!document.getElementsByTagName('html')[0].getAttribute('data-delay-start')) {
        return;
    }
    
    var num, setsrc, src, allElements = document.all;

    for (num = 0; num < allElements.length; num++) {
        if (setsrc = allElements[num].getAttribute('data-delay-setsrc')) {
            allElements[num].setsrc = setsrc;
        }

        if (src = allElements[num].getAttribute('data-delay-src')) {
            allElements[num].src = src;
        }
    }
};

window.showDelaySrc = showDelaySrc;

window.onload = function() {
    setTimeout(delayStart, 0);
};

setTimeout(delayStart, timeout * 1000);

})(window);