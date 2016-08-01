/**
 * New node file
 */
angular.module('dishServModule', []).factory('DishService', function($http) {
	return {
		get : function(idList) {
		    var query = '/api/dish';
		    if (idList) query += '?idList=' + idList;
			return $http.get(query);
		},
		create : function(data) {
			return $http.post('/api/dish', data);
		}
	}
});