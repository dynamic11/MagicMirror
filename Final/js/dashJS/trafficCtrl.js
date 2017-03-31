var app = angular.module('myApp');

app.controller("trafficCtrl", function($scope, $interval, $http) {
  // Client ID and API key from the Developer Console
  var CLIENT_ID = 'AIzaSyCy9i034B3wFW1FWBMWEcM27UHOrj0pJDI';
  var destination= '55 golflinkd dr.';
  var home= 'carleton University'
  clockInterval=60000;
  var currentDate = new Date();

  $http({
        method: 'GET',
        url: 'js/dashJS/info.json'
     }).then(function (response){
        setupInfo = response;
        getTraffic();
        $interval(getTraffic, clockInterval);
     }, function (response){
        alert("yoooo");
     });

     drivingOptions= {
        departureTime: currentDate,
        trafficModel: "bestguess"
    }

  function getTraffic(isSignedIn) {
    var service = new google.maps.DistanceMatrixService;
    service.getDistanceMatrix({
      origins: [setupInfo.data.home],
      destinations: [setupInfo.data.destination],
      travelMode: 'DRIVING',
      drivingOptions: drivingOptions,
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
  }

 })