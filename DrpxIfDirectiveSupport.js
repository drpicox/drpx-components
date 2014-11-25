/*
	DrpxIfDirectiveSupport:

		new DrpxIfDirectiveSupport({element: , transclude: , comment: })

		.enter()
		.leave()

		// 'private'
		.element
		.transclude
		.block
		.childScope
		.previousElement

	This implementation comes from AngularJS ngIf code.
*/
(function(angular) {
	'use strict';

	angular
		.module('drpx.ifdirectivesupport',[])
		.factory('DrpxIfDirectiveSupport', drpxIfDirectiveSupportFactory);



	drpxIfDirectiveSupportFactory.$inject = ['$animate'];
	function drpxIfDirectiveSupportFactory  ( $animate ) { 

		function DrpxIfDirectiveSupport(options) {
			angular.extend(this, options);
		}

		DrpxIfDirectiveSupport.prototype.enter = enter;
		DrpxIfDirectiveSupport.prototype.leave = leave;


		// Methods
		/////////////////////////////////////////////////////////////////////////

		function enter() {
			var self = this;
			if (!self.childScope) {
				self.transclude(function(clone, newScope) {
					self.childScope = newScope;
					clone[clone.length++] = document.createComment(' end if: ' + self.comment + ' ');
					self.block = {
						clone: clone,
					};
					$animate.enter(clone, self.element.parent(), self.element);
				});
			}
		};

		function leave() {
			var self = this;
			if (self.previousElements) {
				self.previousElements.remove();
				self.previousElements = null;
			}
			if (self.childScope) {
				self.childScope.$destroy();
				self.childScope = null;
			}
			if (self.block) {
				self.previousElements = getBlockElements(self.block.clone);
				$animate.leave(self.previousElements, function() {
					self.previousElements = null;
				});
				self.block = null;
			}		
		};


		// Private functions
		/////////////////////////////////////////////////////////////////////////

		function getBlockElements(nodes) {
			var startNode = nodes[0],
			    endNode = nodes[nodes.length - 1];
			if (startNode === endNode) {
				return angular.element(startNode);
			}

			var element = startNode;
			var elements = [element];

			do {
				element = element.nextSibling;
				if (!element) { break; }
				elements.push(element);
			} while (element !== endNode);

			return angular.element(elements);
		}

		return DrpxIfDirectiveSupport;
	}

})(angular);
