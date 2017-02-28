var app = angular.module('myApp');

app.controller("trafficCtrl", function($scope, $interval, $http) {
  // Client ID and API key from the Developer Console
  var CLIENT_ID = 'AIzaSyCy9i034B3wFW1FWBMWEcM27UHOrj0pJDI';
  var home= '55 golflinkd dr.'
  var destination= 'carleton University'

  var service = new google.maps.DistanceMatrixService;
  service.getDistanceMatrix({
    origins: [home],
    destinations: [destination],
    travelMode: 'DRIVING',
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false
  }, function(response, status) {
    if (status !== 'OK') {
      alert('Error was: ' + status);
    } else {
      $scope.trafficTime = response.rows[0].elements[0].duration.text;
      destination =""+ response.destinationAddresses[0];
      $scope.destination = destination.split(',')[0];
      $scope.$apply()

    }
  });



 })