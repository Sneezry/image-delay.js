## image-delay.js

Load images delay.

## How To Use

* Use `data-delay-src` instead of `src` in `img` tag you'd like to load delay.

* Add `data-image-delay` attribute in any element you'd like to load background image delay.

* Add `data-image-delay-wait` attribute in any element you'd like to load background image and show it when it's ready.

* Set a timeout option in `html` tag with `data-delay-timeout` attribute, for example, `<html data-delay-timeout='10'>` means delay image will be load after 10 seconds if your page is still not loaded. Default value is 10 seconds.

* Set a timeout value with `data-image-delay-wait` if you like, for example, `<div data-image-delay-wait='5'></div>` means delay background image will be show after 5 seconds if the images is still not loaded. If you'd like show them as soon as possible, you may use `data-image-delay`.

## Work With Retina Display

Generally, designers may draw different images for retina display and none-retina display. For background image, you may use `-webkit-image-set` to set different background images for retina display and none-retina display. For example, `background-image: -webkit-image-set(url(none-retina.png) 1px, url(retina.png) 2px)`. image-delay.js can handle this automatically with `data-image-delay-wait` elements. For `img` element, you may also set `data-delay-setsrc` to figure out which image we should use. `data-delay-setsrc` has the same form of value with `setsrc`, for example, `data-delay-setsrc='retina.png 2x'`.

## Add CSS3 Transition

You can also add CSS3 transition to make it looks better. For example, you may add code below in your style sheet:

```
div {
    transition: opacity 2s;
    -moz-transition: opacity 2s;
    -webkit-transition: opacity 2s;
    -o-transition: opacity 2s;
}

[data-image-delay-wait] {
    opacity: 0;
}
```

## Live Demo

<http://sneezry.github.io/image-delay.js/example/>
