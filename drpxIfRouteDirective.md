If Route Directive
===================

An AngularJS directive that acts like ngIf but shows/removes the element based in the current route path.


Examples
--------

```html
<div drpx-if-route="/?">
    This is present only when route is the root.
</div>

<div drpx-if-route="/products">
    This is present only when route is /products.
</div>

<div drpx-if-route="/products/[^/]+">
    This is present only when route is pointing to a product, /products/:id.
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
    <script src="bower_components/drpx-components/drpxIfRouteDirective.js"></script>
```

Make sure that you have included the dependency with `DrpxIfDirectiveSupport`:

```html
     <script src="bower_components/drpx-components/DrpxIfDirectiveSupport.js"></script>
```

Add the dependency to you `YourApp.js`:

```javascript
    angular.module('YourApp', [

        // ...your other dependencies...

        'drpx.ifroute',

    ]);
```




How to use
----------

Invoke it in your html templates using the directive as attribute and as value a string with a regular expression that should satisfy the current url:

```html
<ANY drpx-if-route="yourStringRegex"> content present when the route matches</ANY>
```




