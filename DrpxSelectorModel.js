/**
* Model of a selector.
* 
* Selector can have multiple limited elements/objects.
* 
* DrpxSelector({key:,values:})  # key and values are optional, if values is given it is used as this.values
*	.current: boolean|value
*	.values: [value]
*   .add(value)
*   .any(): boolean
*   .hide()
*   .is(value/id): boolean
*   .next()
*   .prev()
*   .show(value/id)
*   .toggle(value/id)
*/
(function(angular){
	'use strict';

	angular
		.module('drpx.selector', [])
		.factory('DrpxSelector', drpxSelectorFactory);


	function drpxSelectorFactory() {

		function DrpxSelector(options) {
			this.key = 'id';
			this.current = false;
			this.values = [];

			angular.extend(this, options);
			this.current = find.call(this, this.current);
		}

		DrpxSelector.prototype.add = add;
		DrpxSelector.prototype.any = any;
		DrpxSelector.prototype.hide = hide;
		DrpxSelector.prototype.indexOf = indexOf;
		DrpxSelector.prototype.is = is;
		DrpxSelector.prototype.find = find;
		DrpxSelector.prototype.next = next;
		DrpxSelector.prototype.prev = prev;
		DrpxSelector.prototype.show = show;
		DrpxSelector.prototype.toggle = toggle;

		function add() {
			this.values.push.apply(this.values, arguments);
		}

		function any() {
			return this.current !== false;
		}

		function hide() {
			this.current = false;
		}

		function indexOf(value) {
			var i, l;

			for (i = 0, l = this.values.length; i < l; i++) {
				if (this.values[i] === value || this.values[i][this.key] === value) {
					return i;
				}
			}
			return -1;
		}

		function is(value) {
			return this.current === value || this.current && this.current[this.key] === value;
		}

		function find(value) {
			var idx;

			idx = this.indexOf(value);
			return this.values[idx] || false;
		}

		function next() {
			var idx;

			idx = this.values.indexOf(this.current);
			idx = (idx + 1) % this.values.length;
			this.current = this.values[idx];
		}

		function prev() {
			var idx;

			idx = this.values.indexOf(this.current);
			if (idx > 0) {
				idx = idx - 1;
			} else {
				idx = this.values.length - 1;
			}
			//idx = (idx + this.values.length - 1) % this.values.length;
			this.current = this.values[idx];
		}

		function show(value) {
			this.current = this.find(value);
		}

		function toggle(value) {
			if (!this.is(value)) {
				this.current = this.find(value);
			} else {
				this.current = false;
			}
		}


		return DrpxSelector;
	}


})(angular);
