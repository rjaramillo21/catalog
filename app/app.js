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

    .otherwise({ redirectTo: '/topics' });
});