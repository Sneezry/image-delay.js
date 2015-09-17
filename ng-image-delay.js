angular.module('ng-image-delay', [])
  .directive('ngDelaySrc', function() {
    return {
      restrict: 'A',
      priority: 99,
      link: function(scope, element, attr) {
        attr.$observe('ngDelaySrc', function(value) {
          if (/MSIE 8/.test(navigator.userAgent)) {
            attr.$set('src', value);
            element.prop('src', value);
          } else {
            attr.$set('data-delay-src', value);
          }
        });
      }
    };
});