An Angular Service to update models
===================================

An angular service to call in a deferred mode update from multiple objects.

Examples
--------

```javascript
mode.update = function() {
    ...
};

drpxUpdateService.update(model);
```



How to install
--------------

Add the bower component `drpx-components`:

```bash
    $ bower install --save drpx-components
```

Add the dependency to your `index.html`:

```html
    <script src="bower_components/drpx-components/drpxUpdateService.js"></script>
```

Add the dependency to you `YourApp.js`:

```javascript
    angular.module('YourApp', [

        // ...your other dependencies...

        'drpx.update',

    ]);
```



How to use
----------

Invoke it in html code. You can call as many times as you want with as many models as you want. Models must have `update` method so they can be invoked. See Examples.



