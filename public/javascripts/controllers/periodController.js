/**
 * New node file
 */

angular.module('periodCtrlModule', []).controller('PeriodController',
		function($scope, PeriodService, DishService, FoodService, ElementService) {
			$scope.period = {};
			
			$scope.periods  = [];
			$scope.dishes   = [];
			$scope.foods    = [];
			$scope.elements = [];
			
			$scope.selectedFood     = [];
			$scope.selectedElement  = [];
			$scope.selectedDish     = [];
			
			$scope.completed = 0;
			$scope.approved  = 0;
			
			//
			PeriodService.get().success(function(data) {
				$scope.periods = data;
				angular.forEach(data, function(item){
				    if (item.completed)
				        $scope.completed ++;
				    
				    if (item.approve)
				        $scope.approved ++;
				});
			}).error(function(data) {
				console.log('Error to dish list');
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
			DishService.get().success(function(data) {
				var dishList = [];

				angular.forEach(data, function(item) {
					var dish = {};
					dish.id = item.id;
					dish.ten = item.ten;
					dish.selected = false;

					dishList.push(dish);
				});

				$scope.dishes = dishList;
				
			}).error(function(data) {
				console.log('Error to get dish list');
			});
            
			//
			$scope.save = function() {
				if (!$.isEmptyObject($scope.period)) {
					PeriodService.create($scope.period).success(
							function(data) {
								$scope.period = {};
								window.location.href = "/period";
							});
				}
			};
			
			//
			$scope.editPeriod = function(period) {
				if (period === 'new') {
					$scope.newPeriod = true;
					$scope.period = {
						id : '',
						ten : ''
					};
				} else {
					$scope.newPeriod = false;
					$scope.period = period;
				}
			};

			// Food Dialog
			$scope.launchFoodDialog = function() {
				if ($scope.period.thuc_pham == null)
					 $scope.period.thuc_pham = "";
				
				var selected = $scope.period.thuc_pham.split(',');
				
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
				$scope.period.thuc_pham = tmp;
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
				if ($scope.period.chat == null)
					 $scope.period.chat = "";
			
				var selected = $scope.period.chat.split(',');
				
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
				
				$scope.period.chat = tmp;
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
			
			// Dish Dialog
			$scope.launchDishDialog = function() {
				if ($scope.period.mon_an == null)
					 $scope.period.mon_an = "";
				
				var selected = $scope.period.mon_an.split(',');
				
				for (var i = 0; i < $scope.dishes.length; i++) {
				    $scope.dishes[i].selected = false;
					for (var j = 0; j < selected.length; j++) {
						if ($scope.dishes[i].id === selected[j]) {
							$scope.dishes[i].selected = true;
						}
					}
				}
				
			};
			
			// Add selected dish
			$scope.addSelectedDish = function() {
				var tmp = "";
				angular.forEach($scope.selectedDish, function(item){
					tmp += item.id + ",";
				});
				$scope.period.mon_an = tmp;
			};
			
			// Update selected dish list
			$scope.updateSelectedDish = function(dishList) {
				var has = [];

				angular.forEach(dishList, function(item) {
					if (item.selected === true) {
						has.push(item);
					}
				});

				$scope.selectedDish = has;
			};
			
		});