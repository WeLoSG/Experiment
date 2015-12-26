'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:MapController
 * @description
 * # MapController
 */
angular.module('MyApp')
  .controller('MapController', function($scope, $ionicLoading, socket) {
    socket.on('connect', function() {
      console.log('connected');
    });

    socket.on('socket:broadcast', function(data) {
      console.log('New message received: ' + data.message);
    });

    $scope.sendLocation = function(location) {
      socket.emit('socket:message', {
        message: 'Hi there'
      });
    };

    $scope.initMap = function(map) {
      $scope.map = map;

      if (!$scope.map) {
        return;
      }

      $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
      });

      navigator.geolocation.getCurrentPosition(function(pos) {
        var myLocation = new google.maps.LatLng(pos.coords.latitude,
          pos.coords.longitude);
        $scope.map.setCenter(myLocation);
        $scope.map.setZoom(14);
        var marker = new google.maps.Marker({
          position: myLocation,
          map: map,
        });

        $ionicLoading.hide();
      }, function(error) {
        console.log('Unable to get location: ' + error.message);
        $ionicLoading.hide();
      });
    };
  });
