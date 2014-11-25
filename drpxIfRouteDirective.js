(function(angular) {

	/*
		Add or removes an element if route matches or not.

		<ANY drpx-if-route="match-regexp">...</ANY>
	*/
	angular
		.module('drpx.ifroute',[
			'drpx.ifdirectivesupport',
		])
		.directive('drpxIfRoute', drpxIfRoute);

	drpxIfRoute.$inject = ['DrpIfDirectiveSupport','$location'];
	function drpxIfRoute  ( DrpIfDirectiveSupport , $location ) {

		var directive = {
			restrict: 'A',
			transclude: 'element',
			priority: 600,
			terminal: true,
			$$tlb: true,
			link: link,
		};

		function link(scope, element, attr, ctrl, transclude) {

			var ifSupport = new DrpIfDirectiveSupport({
				element: element,
				transclude: transclude,
				comment: 'if-route'
			});

			scope.$watch(function() {
				return $location.path();
			}, function (newPath) {
				var match = '^' + attr.drpxIfRoute + '$';
				if (newPath.match(match)) {
					ifSupport.enter();
				} else {
					ifSupport.leave();
				}
			});
		}

		return directive;
	}

})(angular);
