angular.module('sampleApp.appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })

        .when('/userPage', {
            templateUrl: 'views/user.html',
            controller: 'UserController'
        })

        .when('/boardAdminPage', {
            templateUrl: 'views/boardAdmin.html',
            controller: 'AdminBoardController'
        })

        .when('/boardUserPage', {
            templateUrl: 'views/boardUser.html',
            controller: 'BoardController'
        })

        .when('/publicBoardPage', {
            templateUrl: 'views/publicBoard.html',
            controller: 'PublicBoardController'
        })

        .when('/postPage', {
            templateUrl: 'views/post.html',
            controller: 'PostController'    
        })

        .when('/publicPostPage', {
            templateUrl: 'views/publicPost.html',
            controller: 'PostController'
        });



    $locationProvider.html5Mode(false);

}]);