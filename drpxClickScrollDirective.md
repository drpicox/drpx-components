Click Scroll Directive
======================

An AngularJS directive that allows to use click events to scroll a panel. It
allows to make compatible scroll events (like Mac touchpad scroll) with
click and scroll of other systems.

Examples
--------

```html
<div drpx-click-scroll style="overflow: auto;">
    A very long long text... or big image... or... anything that may not fit.
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
    <script src="bower_components/drpx-components/drpxClickScrollDirective.js"></script>
```

Add the dependency to you `YourApp.js`:

```javascript
    angular.module('YourApp', [

        // ...your other dependencies...

        'drpx.clickscroll',

    ]);
```




How to use
----------

Invoke it in your html templates using the directive as attribute. This element should be able to scroll:

```html
<ANY drpx-click-scroll> content with overflow </ANY>
```




