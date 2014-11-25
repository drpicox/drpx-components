If Directive Support
====================

An AngularJS support service that allows to build if-like directives. It is compatible with $animate like ngIf.

The idea is let you to build your own ngIf directive based in any of your requirements, example:

```html
<element your-custom-if="some condition"></element>
```



How to install
--------------

Add the bower component `drpx-components`:

```bash
    $ bower install --save drpx-components
```

Add the dependency to your `index.html`:

```html
    <script src="bower_components/drpx-components/DrpxIfDirectiveSupport.js"></script>
```

Add the dependency to you `YourApp.js`:

```javascript
    angular.module('YourApp', [

        // ...your other dependencies...

        'drpx.ifdirectivesupport',

    ]);
```



How to use
----------

Build a directive as follows:

```js
angular
    .module('YourApp')
    .directive('yourIfDirective', yourIfDirective);


yourIfDirective.$inject = ['DrpxIfDirectiveSupport'/*, your other injections */];
function yourIfDirective  ( DrpxIfDirectiveSupport /*, your other injections */) {

    var directive = {
        restrict: 'A',
        transclude: 'element',
        priority: 600,
        terminal: true,
        $$tlb: true,
        link: link,
    };

    function link(scope, element, attr, ctrl, transclude) {

            // Instance the support class
            var ifSupport = new DrpxIfDirectiveSupport({
                element: element,               // it needs your element
                transclude: transclude,         // it needs the transclusion
                comment: 'if-your-directive'    // a hint for you to debug
            });

            // do same condition, cb, ... that shows the content
            ... {
                ifSupport.enter();
            }

            // do same condition, cb, ... that hides the content
            ... {
                ifSupport.leave();
            }

        },
    };

};
```




