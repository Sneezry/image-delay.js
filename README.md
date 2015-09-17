## image-delay.js

Delay loading images.

## CDN Source Files

Add `image-delay.css` and `image-delay.min.js` in your pages.

```
<link rel="stylesheet" href="//cdn.jsdelivr.net/image-delay.js/latest/image-delay.css">
<script src="//cdn.jsdelivr.net/image-delay.js/latest/image-delay.min.js"></script>
```

To work with AngularJS apps, you also need add `ng-image-delay.js` in your pages.

```
<script src="//cdn.jsdelivr.net/image-delay.js/latest/ng-image-delay.js"></script>
```

## How To Use

* Use `data-delay-src` instead of `src` in `img` tag you'd like to delay loading.

* Add `data-image-delay` attribute in any element you'd like to delay loading background image.

* Add `data-image-delay-wait` attribute in any element you'd like to load background image and show it when it's ready.

* Set a timeout option in `html` tag with `data-delay-timeout` attribute, for example, `<html data-delay-timeout='10'>` means delay image will be load after 10 seconds even if your page is still not loaded. Default value is 10 seconds.

* Set a timeout value with `data-image-delay-wait` if you like, for example, `<div data-image-delay-wait='5'></div>` means delay background image will be show after 5 seconds if the images is still not loaded. If you'd like to show them as soon as possible, you may use `data-image-delay`.

* If the delay image is loaded failed, `data-image-delay-error` attribute will be set.

## Load Images Order By Index

You can also load images order by index, add `data-delay-index` in any tag you'd like to load by index. Tags without index will be loaded first, tags with small index will be loaded before those with large index. Image delay elements will inherit parent delay index. Here is an exmaple below.

```
<div style='background: url(cat.png)' data-image-delay data-delay-index='2'></div>
<img data-delay-src='dog.png' data-delay-index='1'>
<img data-delay-src='bird.png'>
```

The bird will be loaded first, then the dog, and the cat is the last.

## Work With Retina Display

Generally, designers may draw different images for retina display and none-retina display. For background image, you may use `-webkit-image-set` to set different background images for retina display and none-retina display. For example, `background-image: -webkit-image-set(url(none-retina.png) 1px, url(retina.png) 2px)`. image-delay.js can handle this automatically with `data-image-delay-wait` elements. For `img` element, you may also set `data-delay-setsrc` to figure out which image we should use. `data-delay-setsrc` has the same form of value with `setsrc`, for example, `data-delay-setsrc='retina.png 2x'`.

## Add CSS3 Transition

You can also add CSS3 transition to make it look better. For example, you may add code below in your style sheet:

```
div {
    transition: opacity 2s;
    -moz-transition: opacity 2s;
    -webkit-transition: opacity 2s;
    -o-transition: opacity 2s;
}
```

## Work With AngularJS

AngularJS apps use `ng-src` instead of `src` in `img` tags, and `data-delay-src` doesn't support ng expressions. To work with AngularJS, you need include ng-image-delay.js in your project, and inject `ng-image-delay` module to your app.

```
var app = angular.module('myApp', ['ng-image-delay']);
```

Then, use `ng-delay-src` instead of `ng-src`.

## Passive Mode

image-delay.js can run automatically after `window.onload` event is called, however, in some cases, it is not a good opportunity. For example, if your page is an AngularJS app, and the app has an `ng-view` of which content can be modified by the router, then doms in `ng-view` may be not loaded when `window.onload` event is called. You can handle this progress, and make image-delay.js know when your page is ready to start loading delay images. To make passive mode effective, add `data-delay-passive` in `html` tag, and call `imageDelayStart()` whenever you think all things are ready.

## Live Demo

<http://sneezry.github.io/image-delay.js/example/>

## License

MIT License.
