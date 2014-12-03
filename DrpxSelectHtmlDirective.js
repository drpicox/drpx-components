(function(angular) {

	/*
		Creates a Select "popup"(by styles) wich uses html for each element.

		<drpx-select-html
				ng-model="your.model"
				data-options="option in your.options"
				>
			YourHtml{option}
		</drpx-select-html>

		It renders something like:

		<drpx-select-html
				ng-model="your.model"
				data-options="option in your.options">
			<div class="drpx-current" ng-click="visible = !visible">
				YourHtml{option=current}
			</div>
			<ul class="options" ng-show="visible">
				<li 	ng-repeat="option in your.options"
						ng-click="select(option)"
						ng-class="{'drpx-current': your.model === option}">
					YourHtml{option}
				</li>
			</ul>
		</drpx-select-html>
	*/
	angular
		.module('drpx.selecthtml',[])
		.directive('drpxSelectHtml', drpxSelectHtml);

	drpxSelectHtml.$inject = ['$document'];
	function drpxSelectHtml  ( $document ) {

		var directive = {
			restrict: 'E',
			require: 'ngModel',
			transclude: true,
			terminal: true,
			$$tlb: true,
			link: link,
		};

		function link(scope, element, attr, ngModel, transclude) {
			var collectionName, currentElement, currentScope, currentIdx, liElements, liScopes, match, optionName, ulElement, ulVisible;

			match = attr.options.match(/\s*(\S+)\s+in\s+(.*)/);
			if (!match) {
				throw new Error('unexpected [data-options] format "'+attr.options+'"');
			}

			optionName = match[1];
			collectionName = match[2];

			currentElement = angular.element('<div />');
			currentElement.addClass('drpx-current');
			currentElement.on('click', toggleUlVisibility);
			transclude(transcludeCurrent);
			element.append(currentElement);

			ulElement = angular.element('<ul />');
			ulElement.addClass('ng-hide');
			ulVisible = false;
			liElements = [];
			liScopes = [];
			element.append(ulElement);

			ngModel.$render = updateCurrent;
			scope.$watchCollection(collectionName, updateCollection);

			function emptyUl() {
				var i, l;

				for (i = 0, l = liElements.length; i < l; i++) {
					liElements[i].remove();
					liScopes[i].$destroy();
				}

				liElements.length = 0;
				liScopes.length = 0;
			}

			function createLi(option) {
				transclude(function(clone, liScope) {
					var liElement;

					liElement = angular.element('<li>');
					liElement.append(clone);
					liElement.on('click', function() {
						selectOption(option);
						scope.$apply();
					});

					liScope[optionName] = option;

					liElements.push(liElement);
					liScopes.push(liScope);
					ulElement.append(liElement);
				});
			}

			function hideUl() {
				ulVisible = false;
				$document.off('click', hideUl);
				ulElement.addClass('ng-hide');
			}

			function selectOption(option) {
				ngModel.$setViewValue(option);
				updateCurrent();
			}

			function showUl() {
				ulVisible = true;
				ulElement.removeClass('ng-hide');
				setTimeout(function() {$document.on('click', hideUl);});
			}

			function toggleUlVisibility() {
				if (ulVisible) { hideUl(); }
				else { showUl(); }
			}

			function transcludeCurrent(clone, scope) {
				currentElement.append(clone);
				currentScope = scope;
			}

			function updateCurrent() {
				var option, i, l;

				// get the option
				option = ngModel.$viewValue;

				// update current
				currentScope[optionName] = option;

				// update li items
				for (i = 0, l = liElements.length; i < l; i++) {
					if (liScopes[i][optionName] === option) {
						liElements[i].addClass('drpx-current');
					} else {
						liElements[i].removeClass('drpx-current');
					}
				}
			}

			function updateCollection(newCollection) {
				emptyUl();

				angular.forEach(newCollection, createLi);
				updateCurrent();
			}

		}

		return directive;
	}

})(angular);
