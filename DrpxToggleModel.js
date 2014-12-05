/**
* Model of an toggle.
* 
* DrpxToggle()
*	.current:  boolean
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


	function DrpxToggle(options) {
		this.current = false;
		angular.extend(this, options);
	}

	DrpxToggle.prototype.hide = hide;
	DrpxToggle.prototype.is = is;
	DrpxToggle.prototype.show = show;
	DrpxToggle.prototype.toggle = toggle;

	function hide() {
		this.current = false;
	}
	function is() {
		return this.current;
	}
	function show() {
		this.current = true;
	}
	function toggle() {
		this.current = !this.current;
	}

})(angular);
