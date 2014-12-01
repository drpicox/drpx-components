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
		.module('drpx.accordion')
		.controller('DrpxAccordionController',DrpxAccordionController);


	DrpxAccordionController.$inject = ['DrpxAccordion'];
	function DrpxAccordionController  ( DrpxAccordion ) {
		DrpxAccordion.call(this);
		angular.extend(this, DrpxAccordion.prototype);
	}

})(angular);
