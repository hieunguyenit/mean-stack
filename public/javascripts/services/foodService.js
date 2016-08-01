/**
 * New node file
 */
angular.module('foodServModule', []).factory('FoodService', function($http) {
	return {
		get : function(idList) {
		    var query = '/api/food';
		    if (idList) query += '?idList=' + idList;
			return $http.get(query);
		},
		create : function(data) {
			return $http.post('/api/food', data);
		}
	}
});