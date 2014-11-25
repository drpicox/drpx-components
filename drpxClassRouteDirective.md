Route Class Directive
=====================

An AngularJS directive like ngClass that adds and removes css classes based in the current route path.


Examples
--------

```html
<div drpx-class-route="{'home-page' : '/?', 'a-product-page': '/products/[^/]+'">
    ...
</div>
```



How to install
--------------

Add the bower component `drpx-components`:

```bash
    $ bower install --save drpx-components
```

Add the dependency to your `index.html`:

```html
    <script src="bower_components/drpx-components/drpxClassRouteDirective.js"></script>
```

Add the dependency to you `YourApp.js`:

```javascript
    angular.module('YourApp', [

        // ...your other dependencies...

        'drpx.classroute',

    ]);
```



How to use
----------

Invoke it in your html templates using the directive as attribute and as value an object whose keys are css class names and values string regular expressions:

```html
<ANY drpx-class-route="{'class-name': 'routeStringRegex', ...}">  ... </ANY>
```




