/**
* Model of an toggle.
* 
* DrpxToggle()
*	.active:  boolean
*   .hide()
*   .is(): boolean
*   .show()
*   .toggle()
*/
(function(angular){
	'use strict';

	angular
		.module('drpx.toggle')
		.value('DrpxToggle', DrpxToggle);


	function DrpxToggle() {
		this.active = false;
	}

	DrpxToggle.prototype.hide = hide;
	DrpxToggle.prototype.is = is;
	DrpxToggle.prototype.show = show;
	DrpxToggle.prototype.toggle = toggle;

	function hide() {
		this.active = false;
	}
	function is() {
		return this.active;
	}
	function show() {
		this.active = true;
	}
	function toggle() {
		this.active = !this.active;
	}

})(angular);
