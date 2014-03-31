var app = angular.module('catalogApp', []);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/topics', {
      controller: 'TopicsController',
      templateUrl: './app/partials/topics.html'
    })

    .when('/skills', {
    	controller: 'SkillsController',
    	templateUrl: './app/partials/skills.html'
    })

    .when('/receipts', {
      controller: 'ReceiptsController',
      templateUrl: './app/partials/receipts.html'
    })

    .otherwise({ redirectTo: '/topics' });
});