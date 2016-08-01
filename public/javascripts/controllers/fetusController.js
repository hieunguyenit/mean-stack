/**
 * New node file
 */

angular.module('fetusCtrlModule', []).controller('FetusController',
		function($scope, PeriodService, FoodService, ElementService, FetusService) {
			$scope.fetus = {};
			
			$scope.fetuses  = [];
			$scope.periods  = [];
			$scope.foods    = [];
			$scope.elements = [];
			
			$scope.selectedFood     = [];
			$scope.selectedElement  = [];
			$scope.selectedPeriod   = [];
			
			//
			FetusService.get().success(function(data) {
				$scope.fetuses = data;
			}).error(function(data) {
				console.log('Error to fetus list');
			});

            ElementService.get().success(function(data) {
				var elementList = [];

				angular.forEach(data, function(item) {
					var element = {};
					element.id  = item.id;
					element.ten = item.ten;
					element.selected = false;

					elementList.push(element);
				});

				$scope.elements = elementList;
				
			}).error(function(data) {
				console.log('Error to get element list');
			});
			
			//
			FoodService.get().success(function(data) {
				var foodList = [];

				angular.forEach(data, function(item) {
					var food = {};
					food.id = item.id;
					food.ten = item.ten;
					food.selected = false;

					foodList.push(food);
				});

				$scope.foods = foodList;
				
			}).error(function(data) {
				console.log('Error to get food list');
			});

            //
			PeriodService.get().success(function(data) {
				var periodList = [];

				angular.forEach(data, function(item) {
					var period          = {};
					period.id           = item.id;
					period.ten          = item.ten;
					period.selected       = false;

					periodList.push(period);
				});

				$scope.periods = periodList;
				
			}).error(function(data) {
				console.log('Error to get period list');
			});
            
			//
			$scope.save = function() {
				if (!$.isEmptyObject($scope.fetus)) {
					FetusService.create($scope.fetus).success(
							function(data) {
								$scope.fetus = {};
								window.location.href = "/fetus";
							});
				}
			};
			
			//
			$scope.editFetus = function(fetus) {
				if (fetus === 'new') {
					$scope.newFetus = true;
					$scope.fetus = {
						id : '',
						ten : ''
					};
				} else {
					$scope.newFetus = false;
					$scope.fetus    = fetus;
				}
			};

			// Food Dialog
			$scope.launchFoodDialog = function() {
				if ($scope.fetus.thuc_pham == null)
					 $scope.fetus.thuc_pham = "";
				
				var selected = $scope.fetus.thuc_pham.split(',');
				
				for (var i = 0; i < $scope.foods.length; i++) {
				    $scope.foods[i].selected = false;
					for (var j = 0; j < selected.length; j++) {
						if ($scope.foods[i].id === selected[j]) {
							$scope.foods[i].selected = true;
						}
					}
				}
				
			};
			
			// Add selected food
			$scope.addSelectedFood = function() {
				var tmp = "";
				angular.forEach($scope.selectedFood, function(item){
					tmp += item.id + ",";
				});
				$scope.fetus.thuc_pham = tmp;
			};
			
			// Update selected food list
			$scope.updateSelectedFood = function(foodList) {
				var has = [];

				angular.forEach(foodList, function(item) {
					if (item.selected === true) {
						has.push(item);
					}
				});

				$scope.selectedFood = has;
			};
			
			// Element Dialog
			$scope.launchElementDialog = function() {
				if ($scope.fetus.chat == null)
					 $scope.fetus.chat = "";
			
				var selected = $scope.fetus.chat.split(',');
				
				for (var i = 0; i < $scope.elements.length; i++) {
				    $scope.elements[i].selected = false;
					for (var j = 0; j < selected.length; j++) {
						if ($scope.elements[i].id === selected[j]) {
							$scope.elements[i].selected = true;
						}
					}
				}
				
			};
			
			// Add selected element
			$scope.addSelectedElement = function() {
				var tmp = "";
				
				angular.forEach($scope.selectedElement, function(item){
					tmp += item.id + ",";
				});
				
				$scope.fetus.chat = tmp;
			};
			
			// Update selected food list
			$scope.updateSelectedElement = function(elementList) {
				var has = [];

				angular.forEach(elementList, function(item) {
					if (item.selected === true) {
						has.push(item);
					}
				});

				$scope.selectedElement = has;
				
			};
			
			// Period Dialog
			$scope.launchPeriodDialog = function() {
				if ($scope.fetus.tuan_thai == null)
					 $scope.fetus.tuan_thai = "";
				
				var selected = $scope.fetus.tuan_thai.split(',');
				
				for (var i = 0; i < $scope.periods.length; i++) {
				    $scope.periods[i].selected = false;
					for (var j = 0; j < selected.length; j++) {
						if ($scope.periods[i].id === selected[j]) {
							$scope.periods[i].selected = true;
						}
					}
				}
				
			};
			
			// Add selected period
			$scope.addSelectedPeriod = function() {
				var tmp = "";
				angular.forEach($scope.selectedPeriod, function(item){
					tmp += item.id + ",";
				});
				$scope.fetus.tuan_thai = tmp;
			};
			
			// Update selected period list
			$scope.updateSelectedPeriod = function(periodList) {
				var has = [];

				angular.forEach(periodList, function(item) {
					if (item.selected === true) {
						has.push(item);
					}
				});

				$scope.selectedPeriod = has;
				
			};
			
		});