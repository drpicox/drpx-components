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
		.module('drpx.toggle')
		.controller('DrpxToggleController', DrpxToggleController);


	DrpxToggleController.$inject = ['DrpxToggle'];
	function DrpxToggleController  ( DrpxToggle ) {
		DrpxToggle.call(this);
		angular.extend(this, DrpxToggle.prototype);
	}

})(angular);
