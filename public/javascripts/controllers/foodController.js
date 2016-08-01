/**
 * New node file
 */

angular.module('foodCtrlModule', []).controller('FoodController',
		function($scope, FoodService, ElementService, DishService) {
			$scope.food = {};
			$scope.foods = [];
			$scope.completed = 0;
			$scope.approved  = 0;
			
			$scope.elements = [];
			$scope.dishes   = [];
			
			$scope.selectedElement = [];
			$scope.selectedDish     = [];
			
			//
			FoodService.get().success(function(data) {
				$scope.foods = data;
				angular.forEach(data, function(item){
				    if (item.completed)
				        $scope.completed ++;
				    
				    if (item.approve)
				        $scope.approved ++;
				});
			}).error(function(data) {
				console.log('Error to element list');
			});

			//
			ElementService.get().success(function(data) {
				var eleList = [];

				angular.forEach(data, function(item) {
					var element = {};
					element.id = item.id;
					element.ten = item.ten;
					element.selected = false;

					eleList.push(element);
				});

				$scope.elements = eleList;
				
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
				if (!$.isEmptyObject($scope.food)) {
					FoodService.create($scope.food).success(
							function(data) {
								$scope.element = {};
								window.location.href = "/food";
							});
				}
			};
			
			//
			$scope.editFood = function(food) {
				if (food === 'new') {
					$scope.newFood = true;
					$scope.food = {
						id : '',
						ten : ''
					};
				} else {
					$scope.newFood = false;
					$scope.food = food;
				}
			};

			//
			$scope.launchElementDialog = function() {
				if ($scope.food.chat == null)
					$scope.food.chat = "";
				
				var selected = $scope.food.chat.split(',');
				for (var i = 0; i < $scope.elements.length; i++) {
				    $scope.elements[i].selected = false;
					for (var j = 0; j < selected.length; j++) {
						if ($scope.elements[i].id === selected[j]) {
							$scope.elements[i].selected = true;
						}
					}
				}
			};

			//
			// Add selected element
			$scope.addSelectedElement = function() {
				var tmp = "";
				angular.forEach($scope.selectedElement, function(item){
					tmp += item.id + ",";
				});
				$scope.food.chat = tmp;
			};
			
			// Update selected element list
			$scope.updateSelectedElement = function(eleList) {
				var has = [];

				angular.forEach(eleList, function(item) {
					if (item.selected === true) {
						has.push(item);
					}
				});

				$scope.selectedElement = has;
			};
			
				// Dish Dialog
			$scope.launchDishDialog = function() {
				if ($scope.food.mon_an == null)
					 $scope.food.mon_an = "";
				
				var selected = $scope.food.mon_an.split(',');
				
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
				$scope.food.mon_an = tmp;
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