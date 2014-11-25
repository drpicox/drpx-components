/**
* Model of an toggle.
* 
* DrpxToggleController()
*	.active:  boolean
*   .hide()
*   .is(): boolean
*   .show()
*   .toggle()
*/
(function(angular){
	'use strict';

	angular
		.module('drpx.toggle',[])
		.controller('DrpxToggleController', DrpxToggleController);


	function DrpxToggleController() {
		this.active = false;
	}

	DrpxToggleController.prototype.hide = hide;
	DrpxToggleController.prototype.is = is;
	DrpxToggleController.prototype.show = show;
	DrpxToggleController.prototype.toggle = toggle;

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
