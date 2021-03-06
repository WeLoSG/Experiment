'use strict';

/**
 * @ngdoc overview
 * @name MyApp
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */


angular.module('MyApp', ['ionic', 'ngCordova', 'ngResource'])

.run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {
    // save to use plugins here
  });

  // add possible global event handlers here

  // Supress google map's infowindow
  function fixInfoWindow() {
    var set = google.maps.InfoWindow.prototype.set;
    google.maps.InfoWindow.prototype.set = function(key, val) {
      if (key === 'map') {
        if (!this.get('noSupress')) {
          return;
        }
      }
      set.apply(this, arguments);
    };
  }

  fixInfoWindow();
})

.config(function($httpProvider, $stateProvider, $urlRouterProvider) {
  // register $http interceptors, if any. e.g.
  // $httpProvider.interceptors.push('interceptor-name');

  // Application routing
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/main.html',
      controller: 'MainController'
    })
    .state('app.map', {
      url: '/map',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/map.html',
          controller: 'MapController'
        }
      }
    })
    .state('app.home', {
      url: '/home',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/home.html',
          controller: 'HomeController'
        }
      }
    })
    .state('app.account', {
      url: '/account',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/account.html',
          controller: 'AccountController'
        }
      }
    })
    .state('app.settings', {
      url: '/settings',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/settings.html',
          controller: 'SettingsController'
        }
      }
    });


  // redirects to default route for undefined routes
  $urlRouterProvider.otherwise('/app/home');
});
