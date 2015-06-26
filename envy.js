angular.module('envy', [])
	.directive('envyStackedArea', function($timeout, envydata) {
		return {
			restrict: "E",
			replace: true,
			scope: {
				data: '=?',
				options: '=?'
			},
			transclude: false,
			template: '<div class="envy envystackedarea"><svg></svg></div>',
			controller: ["$scope", function ($scope) {
			}],
			link: function(scope, element, attrs, controller) {

				var default_options = {
					tooltips: true,
					xFormat: d3.format('.02f'),
					yFormat: d3.format('.02f'),
					style: 'stack',
					showControls: false,
					showLegend: true,
					color: nv.utils.defaultColor(),
					duration: 0,
					margin: {top: 30, right: 25, bottom: 50, left: 60},
					xAxisLabel: "",
					yAxisLabel: ""
				};

				scope.$watch('data', function() {

					scope.options = angular.extend(default_options, scope.options);

					if(!angular.isDefined(scope.data) || scope.data.length == 0) {
						d3.selectAll(element[0].firstChild.childNodes).remove();
						element[0].classList.add('empty');
						envydata.removeChart(attrs.id);
					} else {
						element[0].classList.remove('empty');
						nv.addGraph(function() {
							var chart = nv.models.stackedAreaChart()
								.tooltips(scope.options.tooltips)
								.style(scope.options.style)
								.showControls(scope.options.showControls)
								.showLegend(scope.options.showLegend)
								.color(scope.options.color)
								.duration(scope.options.duration)
								.margin(scope.options.margin);
							chart.xAxis.tickFormat(scope.options.xFormat).axisLabel(scope.options.xAxisLabel);
							chart.yAxis.tickFormat(scope.options.yFormat).axisLabel(scope.options.yAxisLabel);
							d3.select(element[0].firstChild)
								.datum(scope.data)
								.call(chart);
							nv.utils.windowResize(chart.update);

							scope.$on('$destroy', function () {
								envydata.reset();
							});

							envydata.setChart(attrs.id, chart);

							return chart;
						});
					}

				});
			}
		}
	})
	.directive('envyMultiBar', function($timeout, envydata) {
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
					xFormat: d3.format('.02f'),
					yFormat: d3.format('.02f'),
					stacked: true,
					showControls: false,
					showLegend: true,
					color: nv.utils.defaultColor(),
					duration: 0,
					tooltipContent: function(key, x, y, e, graph) {
						return '<p>' + key + ': ' + x + ', ' + y + '</p>';
					},
					margin: {top: 30, right: 20, bottom: 50, left: 60},
					xAxisLabel: "",
					yAxisLabel: "",
					reduceXTicks: true
				};

				scope.$watch('data', function() {

					scope.options = angular.extend(default_options, scope.options);

					if(!angular.isDefined(scope.data) || scope.data.length == 0) {
						d3.selectAll(element[0].firstChild.childNodes).remove();
						element[0].classList.add('empty');
						envydata.removeChart(attrs.id);
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
								.duration(scope.options.duration)
								.margin(scope.options.margin)
								.reduceXTicks(scope.options.reduceXTicks);
							chart.xAxis.tickFormat(scope.options.xFormat).axisLabel(scope.options.xAxisLabel);
							chart.yAxis.tickFormat(scope.options.yFormat).axisLabel(scope.options.yAxisLabel);
							d3.select(element[0].firstChild)
								.datum(scope.data)
								.call(chart);
							nv.utils.windowResize(chart.update);

							scope.$on('$destroy', function () {
								envydata.reset();
							});

							envydata.setChart(attrs.id, chart);

							return chart;
						});
					}

				});
			}
		}
	})
	.directive('envyLine', function($timeout, envydata) {
		return {
			restrict: "E",
			replace: true,
			scope: {
				data: '=?',
				options: '=?'
			},
			transclude: false,
			template: '<div class="envy envyline"><svg></svg></div>',
			controller: ["$scope", function ($scope) {
			}],
			link: function(scope, element, attrs, controller) {

				var default_options = {
					tooltips: true,
					xFormat: d3.format('.02f'),
					yFormat: d3.format('.02f'),
					useInteractiveGuideline: false,
					showLegend: true,
					color: nv.utils.defaultColor(),
					duration: 0,
					margin: {top: 30, right: 20, bottom: 50, left: 60},
					xAxisLabel: "",
					yAxisLabel: ""
				};

				scope.$watch('data', function() {

					scope.options = angular.extend(default_options, scope.options);

					if(!angular.isDefined(scope.data) || scope.data.length == 0) {
						d3.selectAll(element[0].firstChild.childNodes).remove();
						element[0].classList.add('empty');
						envydata.removeChart(attrs.id);
					} else {
						element[0].classList.remove('empty');
						nv.addGraph(function() {
							var chart = nv.models.lineChart()
								.tooltips(scope.options.tooltips)
								.showLegend(scope.options.showLegend)
								.color(scope.options.color)
								.duration(scope.options.duration)
								.useInteractiveGuideline(scope.options.useInteractiveGuideline)
								.margin(scope.options.margin);
							chart.xAxis.tickFormat(scope.options.xFormat).axisLabel(scope.options.xAxisLabel);
							chart.yAxis.tickFormat(scope.options.yFormat).axisLabel(scope.options.yAxisLabel);
							if (scope.options.forceY) {
								chart.forceY(scope.options.forceY);
							}
							d3.select(element[0].firstChild)
								.datum(scope.data)
								.call(chart);
							nv.utils.windowResize(chart.update);

							scope.$on('$destroy', function () {
								envydata.reset();
							});

							envydata.setChart(attrs.id, chart);

							return chart;
						});
					}

				});
			}
		}
	})
	.directive('envyScatter', function($timeout, envydata) {
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
					tooltipContent: function(key, x, y, e, graph) {
						return '<p>' + key + ': ' + x + ', ' + y + '</p>';
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
						envydata.removeChart(attrs.id);
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

							envydata.setChart(attrs.id, chart);
							scope.$on('$destroy', function () {
								envydata.reset();
							});

							return chart;
						});
					}

				});
			}
		}
	});

angular.module('envy').service('envydata', function($q) {

	var charts = {};

	this.setChart  = function(id, chart) {
		if (charts.hasOwnProperty(id)) {
			charts[id].resolve(chart);
		} else {
			var deferred = $q.defer();
			deferred.resolve(chart);
			chart[id] = deferred;
		}
	};

	this.getChart = function(id) {
		if (!charts.hasOwnProperty(id)) {
			var deferred = $q.defer();
			charts[id] = deferred;
		}
		return charts[id].promise;
	};

	this.removeChart = function(id) {
		if (charts.hasOwnProperty(id)) {
			delete charts[id];
		}
	};

	this.reset = function() {
		charts = {};
	};

});
