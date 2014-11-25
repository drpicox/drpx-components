/**
	A behaviour directive to add/remove classes by route matching.

	<any drpx-class-route="{'class-name': 'route-match-regexp',...}">...</any>
*/
(function(angular) {
	'use strict';

	angular
		.module('drpx.classroute',[])
		.directive('drpxClassRoute', drpxClassRoute);


	drpxClassRoute.$inject = ['$location','$parse'];
	function drpxClassRoute  ( $location , $parse ) {

		var directive = {
			restrict: 'A',
			compile: compile,
		};

		function compile(element, attrs) {
			var getter = $parse(attrs.drpxClassRoute);

			return function(scope, element/*, attrs*/) {
				var added;

				// keeps track of added classes so they can be removed
				added = [];

				// watches for changes in the scope
				scope.$watch(function() {
					return $location.path();
				}, function(newPath) {
					var className, match, matches, i, l;

					if (newPath === undefined || newPath === null) { return; }

					for (i = 0, l = added.length; i < l; i++) {
						element.removeClass(added[i]);
					}

					matches = getter(scope);

					added.length = 0;
					for (className in matches) {
						if (matches.hasOwnProperty(className)) {
							match = matches[className];
							if (newPath.match(match) && !element.hasClass(className)) {
								element.addClass(className);
								added.push(className);
							}
						}
					}
				});
			};
		}

		return directive;

	}]);
})(angular);
