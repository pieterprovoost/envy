angular.module('envy', [])
	.directive('envyMultiBar', function($timeout) {
		return {
			restrict: "E",
			replace: true,
			scope: {
				data: '=?',
				options: '=?'
			},
			transclude: false,
			template: '<div class="envy envymultibar"><svg></svg></div>',
			controller: ["$scope", function ($scope) {
			}],
			link: function(scope, element, attrs, controller) {

				var default_options = {
					tooltips: true,
					pointRange: [100, 100],
					xFormat: '.02f',
					yFormat: '.02f',
					stacked: true,
					showControls: false,
					showLegend: true,
					color: nv.utils.defaultColor(),
					duration: 0,
					tooltipContent: function(key, y, e, graph) {
						return '<p>' + key + ': ' + y + '</p>';
					}
				};

				scope.$watch('data', function() {

					scope.options = angular.extend(default_options, scope.options);

					if(!angular.isDefined(scope.data) || scope.data.length == 0) {
						d3.selectAll(element[0].firstChild.childNodes).remove();
						element[0].classList.add('empty');
					} else {
						element[0].classList.remove('empty');
						nv.addGraph(function() {
							var chart = nv.models.multiBarChart()
								.tooltips(scope.options.tooltips)
								.tooltipContent(scope.options.tooltipContent)
								.stacked(scope.options.stacked)
								.showControls(scope.options.showControls)
								.showLegend(scope.options.showLegend)
								.color(scope.options.color)
								.duration(scope.options.duration);
							chart.xAxis.tickFormat(d3.format(scope.options.xFormat));
							chart.yAxis.tickFormat(d3.format(scope.options.yFormat));
							d3.select(element[0].firstChild)
								.datum(scope.data)
								.call(chart);
							nv.utils.windowResize(chart.update);
							return chart;
						});
					}

				});
			}
		}
	})
	.directive('envyScatter', function($timeout) {
		return {
			restrict: "E",
			replace: true,
			scope: {
				data: '=?',
				options: '=?'
			},
			transclude: false,
        	template: '<div class="envy envyscatter"><svg></svg></div>',
			controller: ["$scope", function ($scope) {
			}],
			link: function(scope, element, attrs, controller) {

				var default_options = {
					tooltips: true,
					tooltipContent: function(key, y, e, graph) {
						return '<p>' + key + ': ' + y + '</p>';
					},
					pointRange: [100, 100],
					showLegend: true,
					xFormat: d3.format('.02f'),
					yFormat: d3.format('.02f'),
					margin: {top: 30, right: 20, bottom: 50, left: 75},
					color: nv.utils.defaultColor(),
					duration: 0
				};

				scope.$watch('data', function() {

					scope.options = angular.extend(default_options, scope.options);

					if(!angular.isDefined(scope.data) || scope.data.length == 0) {
						d3.selectAll(element[0].firstChild.childNodes).remove();
						element[0].classList.add('empty');
					} else {
						element[0].classList.remove('empty');
						nv.addGraph(function() {
							var chart = nv.models.scatterChart()
								.margin(scope.options.margin)
								.tooltips(scope.options.tooltips)
								.tooltipContent(scope.options.tooltipContent)
								.pointRange(scope.options.pointRange)
								.color(scope.options.color)
								.duration(scope.options.duration);
							chart.xAxis.tickFormat(scope.options.xFormat);
							chart.yAxis.tickFormat(scope.options.yFormat);
							d3.select(element[0].firstChild)
								.datum(scope.data)
								.call(chart);
							nv.utils.windowResize(chart.update);
							return chart;
						});
					}

				});
			}
		}
	});