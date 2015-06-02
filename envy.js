angular.module('envy', [])
	.directive('envyScatter', function() {
		return {
			restrict: "E",
			replace: true,
			scope: {
				data: '=?',
				xformat: '=?',
				yformat: '=?',
				pointrange: '=?'
			},
			transclude: false,
        	template: '<div class="envy"><svg></svg></div>',
			controller: ["$scope", function ($scope) {
			}],
			link: function(scope, element, attrs, controller) {

				if (!angular.isDefined(scope.xformat)) {
					scope.xformat = '.02f';
				}
				if (!angular.isDefined(scope.yformat)) {
					scope.yformat = '.02f';
				}
				if (!angular.isDefined(scope.pointrange)) {
					scope.pointrange = [200, 200];
				}

				nv.addGraph(function() {
					var chart = nv.models.scatterChart().pointRange(scope.pointrange).tooltips(false);
					chart.xAxis.tickFormat(d3.format(scope.xformat));
					chart.yAxis.tickFormat(d3.format(scope.yformat));
					d3.select(element[0].firstChild)
						.datum(scope.data)
						.call(chart);
					nv.utils.windowResize(chart.update);
					return chart;
				});
			}
		}
	});