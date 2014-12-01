/**
* Model of an accordion.
* 
* DrpxAccordion()
*	.current:  boolean|string
*   .any(): boolean
*   .hide()
*   .is(value): boolean
*   .show(value)
*   .toggle(value)
*/
(function(angular){
	'use strict';

	angular
		.module('drpx.accordion')
		.factory('DrpxAccordion', drpxAccordionFactory);


	function drpxAccordionFactory() {

		function DrpxAccordion() {
			this.current = false;
		}

		DrpxAccordion.prototype.any = any;
		DrpxAccordion.prototype.hide = hide;
		DrpxAccordion.prototype.is = is;
		DrpxAccordion.prototype.show = show;
		DrpxAccordion.prototype.toggle = toggle;

		function any() {
			return this.current !== false;
		}
		function hide() {
			this.current = false;
		}
		function is(value) {
			return this.current === value;
		}
		function show(value) {
			this.current = value;
		}
		function toggle(value) {
			if (this.current !== value) {
				this.current = value;
			} else {
				this.current = false;
			}
		}


		return DrpxAccordion;
	}


})(angular);
