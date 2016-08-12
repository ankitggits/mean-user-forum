angular.module('sampleApp.HomeCtrl', []).controller('HomeController', function($location, $scope, $http, $cookieStore) {

	$scope.hasError=false;
	$scope.errorMessage="";

	$scope.loginUser = function() {
	  console.log($scope.loginDetail);
	  if($scope.loginDetail==undefined || $scope.loginDetail.username==undefined || $scope.loginDetail.password==undefined){
      	$scope.errorMessage="invalid input";
      	$scope.hasError=true;
      }else if($scope.loginDetail.username=='admin' && $scope.loginDetail.password=='admin'){
		$scope.hasError=false;
		$scope.errorMessage="";
		$location.path('/userPage');
		$cookieStore.put('isLoggedIn', true);
		$cookieStore.put('isAdmin', true);
      }else{
      	$scope.hasError=false;
      	$scope.errorMessage="";
      	$http.post('/auth/login', $scope.loginDetail).success(function(response) {
		    	console.log(response);
		    	$cookieStore.put('isLoggedIn', true);
		    	$cookieStore.put('loggedUserName', response.name);
		    	$scope.loggedUserName = response.name;
		    	$location.path('/boardUserPage');
		  }).error(function (data, status, header, config) {
	            console.log(response);
	            $scope.errorMessage=response.message;
      			$scope.hasError=true;
	      });
      }
	};

	$scope.logoutUser = function() {		  
  			$http.post('/auth/logout').success(function(response) {
			    	$scope.errorMessage="";
		  			$scope.hasError=false;
		  			$cookieStore.put('isLoggedIn', false);
		  			$cookieStore.put('isAdmin', false);
		  			$cookieStore.put('loggedUserName', undefined);
		  			$location.path('/');
			}).error(function (data, status, header, config) {
		            alert("Logout failed");
			});			  
	};

	$scope.clearMsg = function() {
		$scope.hasError=false;
		$scope.errorMessage="";
	};
	
	$scope.isLoggedInFun = function() {
		$scope.loggedUserName = $cookieStore.get('loggedUserName');
		return $cookieStore.get('isLoggedIn');
	};
	
	$scope.isAdminFun = function() {
		return $cookieStore.get('isAdmin');
	};
	

});