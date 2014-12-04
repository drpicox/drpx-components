/*
	Adds scroll with click and move.
	Momentum function is extracted from here:

	- https://github.com/cubiq/iscroll/blob/master/src/utils.js

	When click-and-move finishes it emulates iPhone momentum  
		like -webkit-overflow-scrolling is 'touch'.

	Usage:
	<ANY drpx-click-scroll style="overflow: scroll;">
		contents...
	</ANY>

*/

(function(angular) {
	'use strict';

	angular
		.module('drpx.clickscroll', [])
		.directive('drpxClickScroll', drpxClickScroll);


	drpxClickScroll.$inject = ['$timeout','$$rAF'];
	function drpxClickScroll  ( $timeout , $$rAF ) {

		var directive = {
			restrict: 'A',
			link: link,
		};

		var cancelClick, easeFn, momentumDuration, now;

		cancelClick = configureCancelClickFn();
		easeFn = circularEaseFunction;
		momentumDuration = 1000;
		now = configureNowFn();

		function circularEaseFunction(k) {
			return Math.sqrt( 1 - ( --k * k ) );
		}

		function configureNowFn() {
			return Date.now || function() { return new Date().getTime(); };
		}

		function configureCancelClickFn() {
			function handler(ev) {
				ev.preventDefault();
				ev.stopPropagation();
				ev.stopImmediatePropagation();
				return false;
			}
			if (window.document.addEventListener) {	
				return function(from/*, target*/) {
					$timeout(function() {
						from.removeEventListener('click', handler, true);
					}, 0, false);
					from.addEventListener('click', handler, true);
				};
			} else {
				console.warn('No addEventListener support, click prevention might be bogus');
				return function(from, target) {
					$timeout(function() {
						angular.element(target).off('click', handler);
					}, 0, false);
					angular.element(target).on('click', handler);
				};
			}
		}

		function link(scope, element/*, attrs*/) {
			var scroller, state;

			scroller = element[0];

			state = {
				status: 'ready', // 'warming', 'scrolling', 'momentum', 'watching' (for ios)
				startX: 0,       // point.pageX when is clicked down
				startY: 0,       // point.pageY when is clicked down
				startTime: 0,    // time of the start
				prevX: 0,        // point.pageX of previous event
				prevY: 0,        // point.pageY of previous event
				prevTime: 0,     // time of the previous start event
				momentum: {
					deltaLeft: 0,     // how many pixels left have to move the momentum
					deltaTop: 0,      // how many pixels top have to move the momentum
					completedLeft: 0, // how many left pixels have been already moved
					completedTop: 0,  // how many top pixels have been already moved
					targetTime: 0,    // when has to end the momentum animation (it started at targetTime - momentumDuration)
				},
			};

			angular.element(scroller)
			.on('mousedown', function(ev) {
				// do not activate in fields
				if (ev.target.tagName.match(/input|textarea|select/i)) { return; }

				// get current position				
				var point = ev.touches ? ev.touches[0] : ev;

				// start scrolling with current position
				state.status 	= 'warming';
				state.startX 	= point.pageX;
				state.startY 	= point.pageY;
				state.startTime = now();
			})
			.on('mousemove', function(ev) {

				var deltaX, deltaY, point;

				// early exit if not scrolling
				if (state.status !== 'warming' && state.status !== 'scrolling') {
					return;
				}

				// get current position
				point = ev.touches ? ev.touches[0] : ev;

				// compute deltas
				deltaX = point.pageX - state.startX;
				deltaY = point.pageY - state.startY;

				// wait for 15px to start scrolling
				if (state.status === 'warming' && Math.abs(deltaY)+Math.abs(deltaX) < 15) {
					return;
				}

				// ensure that it is scrolling
				state.status = 'scrolling';

				// save previous scroll position
				state.prevX = state.startX;
				state.prevY = state.startY;
				state.prevTime = state.startTime;

				// save current scroll position
				state.startX = point.pageX;
				state.startY = point.pageY;
				state.startTime = now();

				// update scroll position using deltas
				scroller.scrollLeft = scroller.scrollLeft - deltaX;
				scroller.scrollTop = scroller.scrollTop - deltaY;
			})
			.on('mouseup', function(ev) {

				// cancel click action, current action was scroll (not click)
				if (state.status === 'scrolling') {
					cancelClick(scroller, ev.target);
				}
			})
			.on('mouseup mouseleave mousecancel', function(ev) {
				// early exit if not scrolling
				if (state.status !== 'scrolling') {
					// cancel scrolling if warming
					if (state.status === 'warming') {
						state.status = 'ready';
					}
					return;
				}

				// change status from 'scrolling' to 'momentum' and start momentum
				startMomentum();

				ev.preventDefault();
				ev.stopImmediatePropagation();
				return false;
			});

			// special case for ios momentum
			if (('WebkitOverflowScrolling' in scroller.style) && scroller.style.WebkitOverflowScrolling !== 'touch') {
				angular.element(scroller)
				.on('touchstart', function(ev) {

					var point = ev.touches ? ev.touches[0] : ev;

					// start scrolling and save current and last position to momentum emulation
					state.status = 'watching';
					state.startX = state.prevX = point.pageX;
					state.startY = state.prevY = point.pageY;
					state.startTime = state.prevTime = ev.timeStamp;

				})
				.on('touchmove', function(ev) {
					if (state.status !== 'watching') {
						return;
					}

					var point = ev.touches ? ev.touches[0] : ev;

					// save previous seen
					state.prevX = state.startX;
					state.prevY = state.startY;
					state.prevTime = state.startTime;

					// save current seen
					state.startX = point.pageX;
					state.startY = point.pageY;
					state.startTime = ev.timeStamp;
				})
				.on('touchend touchleave touchcancel', function(/*ev*/) {
					if (state.status !== 'watching') {
						return;
					}

					state.status = 'ready';

					// program momentum
					startMomentum();
				});
			}

			// program momentum
			function startMomentum() {
				// it uses state.prevX/Y/Time state.startX/Y
				var deltaX, deltaY, deltaTime, time;

				// get current time
				time = now();

				// compute movement deltas
				deltaX = -state.startX + state.prevX;
				deltaY = -state.startY + state.prevY;
				deltaTime = time - state.prevTime;

				// compute momentum parameters: nothing completed
				state.momentum.completedLeft = 0;
				state.momentum.completedTop = 0;
				// compute momentum parameters: deltas must be scaled using expected duration
				state.momentum.deltaLeft = (deltaX / deltaTime) * momentumDuration;
				state.momentum.deltaTop  = (deltaY / deltaTime) * momentumDuration;
				// compute momentum parameters: target time when animation ends
				state.momentum.targetTime = time + momentumDuration;

				// start momeuntum animation (set the state properly)
				state.status = 'momentum';
				$$rAF(momentumStep);
			}

			// handle animation
			function momentumStep() {
			
				var deltaLeft, deltaTop, deltaTime, deltaEase, time;

				// caches current time for further operations
				time = now();

				// if time is end, or not more 'momentum' state, end
				if (time > state.momentum.targetTime || state.status !== 'momentum') {
					// change status only if time was expired (and no one has changed it)
					if (state.status === 'momentum') {
						state.status = 'ready';
					}
					return;
				}

				// compute current deltas
				deltaTime = 1 - (state.momentum.targetTime - time) / momentumDuration;
				deltaEase = easeFn(deltaTime);
				deltaLeft = state.momentum.deltaLeft * deltaEase - state.momentum.completedLeft;
				deltaTop = state.momentum.deltaTop * deltaEase - state.momentum.completedTop;

				// apply deltas (it adds animation to any other existing animation/movement)
				scroller.scrollLeft = scroller.scrollLeft + deltaLeft;
				scroller.scrollTop = scroller.scrollTop + deltaTop;

				// save completed steps for next animation step
				state.momentum.completedLeft = state.momentum.completedLeft + deltaLeft;
				state.momentum.completedTop  = state.momentum.completedTop  + deltaTop ;

				// asks for a new step
				$$rAF(momentumStep);				
			}
		}

		return directive;
	}

})(angular);
