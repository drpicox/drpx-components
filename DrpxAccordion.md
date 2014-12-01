Accordion Controller
====================

An AngularJS controller to add accordion behaviour to a view.


Examples
--------

```html
<div ng-controller="DrpxAccordionController as accordion">
    A long time ago, in a galaxy far, far away....<br>

    <ul>
        <li>
            <div ng-click="accordion.toggle('part1')">
                Part 1
            </div>
            <p ng-show="accordion.is('part1')">
                It is a period of civil war. Rebel<br>
                spaceships, striking from a hidden<br>
                base, have won their first victory<br>
                against the evil Galactic Empire.<br>
            </p>
        </li>
        <li>
            <div ng-click="accordion.toggle('part2')">
                Part 2
            </div>
            <p ng-show="accordion.is('part2')">
                During the battle, rebel spies managed<br>
                to steal secret plans to the Empire's<br>
                ultimate weapon, the DEATH STAR, an<br>
                armored space station with enough<br>
                power to destroy an entire planet.<br>
            </p>
        </li>
        <li>
            <div ng-click="accordion.toggle('part3')">
                Part 3
            </div>
            <p ng-show="accordion.is('part3')">
                Pursued by the Empire's sinister agents,<br>
                Princess Leia races home aboard her<br>
                starship, custodian of the stolen plans<br>
                that can save her people and restore<br>
                freedom to the galaxy....<br>
            </p>
        </li>
    </ul>

    <div ng-click="accordion.hide()" ng-show="accordion.any()">
        Close accordion.
    </div>
</div>
```

```javascript
// or use it as a model
MyStuff.$inject = ['DrpxAccordion'];
function MyStuff  ( DrpxAccordion ) {
    this.accordionRight = new DrpxAccordion();
    this.accordionLeft = new DrpxAccordion();
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
    <script src="bower_components/drpx-components/DrpxAccordionModule.js"></script>
    <script src="bower_components/drpx-components/DrpxAccordionController.js"></script>
    <script src="bower_components/drpx-components/DrpxAccordionModel.js"></script>
```

Add the dependency to you `YourApp.js`:

```javascript
    angular.module('YourApp', [

        // ...your other dependencies...

        'drpx.accordion',

    ]);
```



How to use
----------

Use it as a controller in any element:

```html
<ANY ng-controller="DrpAccordionController as accordion">  ... </ANY>
```

See examples for more detail.



