/**
 * New node file
 */
angular.module('elementCtrlModule', []).controller(
		'ElementController',
		function($scope, ElementService, FoodService, DishService) {
			$scope.element = {};
			
			$scope.selectedFood = [];
			$scope.selectedDish = [];
			
			$scope.elements = [];
			$scope.foods = [];
			$scope.dishes   = [];
			
			$scope.completed = 0;
			$scope.approved  = 0;

			//
			ElementService.get().success(function(data) {
				$scope.elements = data;
				angular.forEach(data, function(item){
				    if (item.completed)
				        $scope.completed ++;
				    
				    if (item.approve)
				        $scope.approved ++;
				});
			}).error(function(data) {
				console.log('Error to element list');
			});

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
				if (!$.isEmptyObject($scope.element)) {
					ElementService.create($scope.element).success(
							function(data) {
								$scope.element = {};
								window.location.href = "/element";
							});
				}
			};

			//
			$scope.editElement = function(element) {
				if (element === 'new') {
					$scope.newElement = true;
					$scope.element = {
						id : '',
						ten : ''
					};
				} else {
					$scope.newElement = false;
					$scope.element = element;
				}
			};

			//
			$scope.launchFoodDialog = function() {
				if ($scope.element.thuc_pham == null)
					 $scope.element.thuc_pham = "";
				
				var selected = $scope.element.thuc_pham.split(',');
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
				$scope.element.thuc_pham = tmp;
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
			
			// Dish Dialog
			$scope.launchDishDialog = function() {
				if ($scope.element.mon_an == null)
					 $scope.element.mon_an = "";
				
				var selected = $scope.element.mon_an.split(',');
				
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
				$scope.element.mon_an = tmp;
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