'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:MapController
 * @description
 * # MapController
 */
angular.module('MyApp')
  .controller('MapController', function($scope, socket) {
    socket.on('connect', function () {
      console.log('connected');
    });

    $scope.sendEvent = function() {
      socket.emit('socket:message', 'Hi there');
    };
  });
