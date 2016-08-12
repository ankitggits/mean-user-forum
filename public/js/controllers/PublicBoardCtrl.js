angular.module('sampleApp.PublicBoardCtrl', []).controller('PublicBoardController', function($location,$scope, $http, $cookieStore) {

$scope.boardPosts = function(detail){
  $cookieStore.put('selectedBoardId', detail._id);
  $location.path('/publicPostPage');
}

var refresh = function() {
  $http.get('/boards/public/list').success(function(response) {
    console.log("I got the data I requested");
    $scope.boardlist = response;
    $scope.board = "";
  });
};

refresh();

});