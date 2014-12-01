Selector Model
==============

An AngularJS model to add selector behaviour to select one object between many by reference or id.


Examples
--------

Use the model to generate a list of options:

```javascript
angular.module('selector.demo', [
    'drpx.selector'
]).controller('DemoController', function(DrpxSelector) {
    this.selector = new DrpxSelector();
    this.selector.add({
        id: 'colonial-one',
        label: 'Colonial One',
        value: 'Colonial One is a civilian starship that serves as the headquarters for the President of the Twelve Colonies.'
    }, {
        id: 'galactica',
        label: 'Battlestar Galactica',
        value: 'The Galactica is the last of the 12 original Battlestars from the first Cylon war.'
    }, {
        id: 'hitei-kan',
        label: 'Hitei Kan',
        value: 'Hitei Kan is the fleet\'s tylium processing ship and is one of the most important ships in the fleet.'
    });
    this.selector.show('colonial-one');
});
```

Use it in a view:

```html
    <div ng-controller="DemoController as demo">

        <h3>Pick one</h3>
        <div ng-repeat="value in demo.selector.values">
            <button ng-click="demo.selector.show(value)">
                {{value.label}}
                <span ng-show="demo.selector.is(value)">*</span>
            </button>
        </div>
        <h3>{{demo.selector.current.label}}</h3>
        <div>
            {{demo.selector.current.value}}
        </div>

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
    <script src="bower_components/drpx-components/DrpxSelector.js"></script>
```

Add the dependency to you `YourApp.js`:

```javascript
    angular.module('YourApp', [

        // ...your other dependencies...

        'drpx.selector',

    ]);
```

Inject the DrpxSelector model into your stuff:

```javascript
MyStuff.$inject = ['DrpxSelector'];
function MyStuff  ( DrpxSelector ) {
    this.selector = new DrpxSelector();
    // ...
}
```



How to use
----------

See examples for more detail.



