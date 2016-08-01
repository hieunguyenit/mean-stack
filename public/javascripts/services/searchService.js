/**
 * New node file
 */
angular.module('searchServModule', []).factory('SearchService', function($http) {
	return {
		get : function(keyword) {
			return $http.get('/api/search?keyword='+keyword);
		}
	}
});