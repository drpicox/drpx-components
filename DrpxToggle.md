Toggle Controller
====================

An AngularJS controller to add toggle behaviour to a view.


Examples
--------

```html
<div ng-controller="DrpxToggleController as toggle">
    A long time ago, in a galaxy far, far away....<br>

    <div ng-click="toggle.toggle()">
        Show/Hide
    </div>
    <div ng-show="toggle.is()">
        This is the content <br>
        of the toggle.
    </div>

    <div ng-click="toggle.show()">
        Show toggle.
    </div>
    <div ng-click="toggle.hide()">
        Hide toggle.
    </div>

</div>
```

```javascript
// or use it inside another controller
MyStuff.$inject = ['DrpxToggle'];
function MyStuff  ( DrpxToggle ) {
    this.toggleRight = new DrpxToggle();
    this.toggleLeft = new DrpxToggle();
}
```


How to install
--------------

Add the bower component `drpx-components`:

```bash
    $ bower install --save drpx-components
```

Add the dependency to your `index.html`:

```html
    <script src="bower_components/drpx-components/DrpxToggleModule.js"></script>
    <script src="bower_components/drpx-components/DrpxToggleController.js"></script>
    <script src="bower_components/drpx-components/DrpxToggleModel.js"></script>
```

Add the dependency to you `YourApp.js`:

```javascript
    angular.module('YourApp', [

        // ...your other dependencies...

        'drpx.toggle',

    ]);
```



How to use
----------

Use it as a controller in any element:

```html
<ANY ng-controller="DrpToggleController as toggle">  ... </ANY>
```

See examples for more detail.



