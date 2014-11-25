/**
* Model of an accordion.
* 
* DrpxAccordionController()
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
		.module('drpx.accordion',[])
		.controller('DrpxAccordionController', DrpxAccordionController);


	function DrpxAccordionController() {
		this.current = false;
	}

	DrpxAccordionController.prototype.any = any;
	DrpxAccordionController.prototype.hide = hide;
	DrpxAccordionController.prototype.is = is;
	DrpxAccordionController.prototype.show = show;
	DrpxAccordionController.prototype.toggle = toggle;

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

})(angular);
