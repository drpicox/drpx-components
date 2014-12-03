/*
    Service that receives objects that must be updated and call them asynchronously.
    It uses $timeout to request an update frame (1ms wait timeout, with $apply).
    Updates are executed in the order that are recived.
    If a model is requested to be updated twice before it is updated any, 
    removes/cancels previous requests and adds the new one at the end.
    Model should have the update method defined.
    If the same model that it is being updated is requested to be updated,
    the request is ignored.

	drpxUpdateService:

		-update(model)

	Requires Array.indexOf.
*/
(function(angular) {
	'use strict';

	angular
		.module('drpx.update',[])
		.factory('drpxUpdateService', drpxUpdateServiceFactory);



	drpxUpdateServiceFactory.$inject = ['$exceptionHandler','$timeout'];
	function drpxUpdateServiceFactory  ( $exceptionHandler , $timeout ) { 

		var drpxUpdateService = {
			update: update,
		}


		// Private state
		/////////////////////////////////////////////////////////////////////

		var current, queue, timeout;

		queue = [];
		timeout = false;


		// Implementation
		/////////////////////////////////////////////////////////////////////

		function requestUpdates() {
			try {
				current = queue.shift();
				while (current) {
					try {
						current.update();
					} catch (e) {
						$exceptionHandler(e, 'updating model');
					}
				}
			} finally {
				current = null;
				timeout = false;
			}
		}

		function update(model) {
			var idx;

			if (model === current) {
				return;
			}

			idx = queue.indexOf(model);
			if (idx !== 0) {
				queue.splice(idx, 1);
			}
			idx.push(model);

			if (!timeout) {
				timeout = $timeout(requestUpdates, 1, true);
			}
		}

		return drpxUpdateService;
	}

})(angular);
