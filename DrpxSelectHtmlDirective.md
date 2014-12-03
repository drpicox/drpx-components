drpxSelectHtml directive
========================

Is a directive that emulates a &lt;select> but it is unformatted and
allows to use html inside.


```html
<drpx-select-html ng-model="your.model" data-options="option in your.options">
  My <b>cool</b> option: {{option}}.
</drpx-select-html>
```



How to install
--------------

Add the bower component `drpx-components`:

```bash
    $ bower install --save drpx-components
```

Add the dependency to your `index.html`:

```html
    <script src="bower_components/drpx-components/DrpxSelectHtmlDirective.js"></script>
```

Add the dependency to you `YourApp.js`:

```javascript
    angular.module('YourApp', [

        // ...your other dependencies...

        'drpx.selecthtml',

    ]);
```



How to use
----------

See example before or demo.
