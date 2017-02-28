var app = angular.module('myApp', []);

app.controller("TimeDateWeatherCtrl", function($scope, $interval, $http) {
    var clockInterval = 60000 ;//ms
    var count =0;

   $http({
      method: 'GET',
      url: 'js/weatherIcons.json'
   }).then(function (response){
      weatherIcons = response;
      console.log(weatherIcons);
   });
    
    function getTimeDateWeather() {
        $scope.clock =  moment().format('h:mm a'); // get the current time
        $scope.date =  moment().format('dddd, MMMM Do YYYY');

        //create request for current weather form api
        var requestWeather = {
            method: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/weather',
            params: {
               q: 'Ottawa',
              mode: 'json',
              units: 'metric',
              appid: '8eee1c035d624944ccda323d1a05d458'
            }
        };

        //create request for daily high and low
        var requestForecast = {
            method: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/forecast/daily',
            params: {
               q: 'Ottawa',
              mode: 'json',
              units: 'metric',
              appid: '8eee1c035d624944ccda323d1a05d458'
            }
        };

        //get current weather
        $http(requestWeather).then(function (response) {

            //get sunrise and sunset time
            var sunrise = unixTimeToTwentyFourHour(response.data.sys.sunrise);
            var sunset = unixTimeToTwentyFourHour(response.data.sys.sunset);

            $scope.temp = Math.round(response.data.main.temp); 
            $scope.desc = response.data.weather[0].description;

            weatherIcon = getWeatherIcon(response.data.weather[0].id, sunrise, sunset);
            $scope.icon = weatherIcon;
          }, function (response) {
            alert("Current Weather could not be found");
          });

        //get daily high and low from api
        $http(requestForecast).then(function (response) {
            $scope.high = Math.round(response.data.list[0].temp.max);
            $scope.low = Math.round(response.data.list[0].temp.min);

          }, function (response) {
            alert("Forecast could not be found");
        });

    }
    getTimeDateWeather();
    $interval(getTimeDateWeather, clockInterval);
               
 })


function getWeatherIcon(weatherCode, sunrise, sunset) {
    var prefix = 'wi wi-';
    var code = weatherCode;
    var icon = weatherIcons.data[code].icon;

    // If we are not in the ranges mentioned above, add a day/night prefix.
    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
        if (moment().format('H')>=sunset || moment().format('H')<=sunrise){
            icon = 'night-' + icon;
        }else{
            icon = 'day-' + icon;
        }
            
    }

    // Finally tack on the prefix.
    icon = prefix + icon; 
    return icon;

}

//converts unix time provided by the API to 24h clck
function unixTimeToTwentyFourHour(UnixTime){

  var d = new Date(UnixTime * 1000); // Convert the passed timestamp to milliseconds
    hh = d.getHours();
    return hh;

}









// var weatherIcons = JSON.parse( "yourjsonfile.json");
//  var prefix = 'wi wi-';
//   var code = resp.weather[0].id;
//   var icon = weatherIcons[code].icon;

//   // If we are not in the ranges mentioned above, add a day/night prefix.
//   if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
//     icon = 'day-' + icon;
//   }

//   // Finally tack on the prefix.
//   icon = prefix + icon;


// var app = angular.module('myApp', []);

// app.controller("TimeCtrl", function($scope, $interval,$timeout) {
//     $scope.clock = "loading clock..."; // initialise the time variable
//     $clockInterval = 5000 ;//ms
    
//     function getTimeDate() {
//         $scope.clock =  moment().format('h:mm a'); // get the current time
//         $scope.date =  moment().format('dddd, MMMM Do YYYY');
//     }

//     $interval(getTimeDate(), $clockInterval);
               
//  })

// app.controller("weather", function($scope, $interval,$timeout) {
//     $scope.icon = ""; // initialise the time variable
//     $scope.temp = "loading";
//     $weatherInterval = 60000; //ms
    
//     function getWeather() {
//         $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=Ottawa&APPID=8eee1c035d624944ccda323d1a05d458&mode=json&units=metric",
//             function(json){
//                 $scope.icon = 'owf owf-'+ json.weather[0].id;
//                 $scope.temp = Math.round(json.main.temp); 
//                 $scope.$apply();      
//           });
//    }
//     $interval(getWeather(), $weatherInterval);
               
// })

        // $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=Ottawa&APPID=8eee1c035d624944ccda323d1a05d458&mode=json&units=metric",
        //     function(json){
        //         //$scope.icon = 'owf owf-'+ json.weather[0].id;
        //         $scope.temp = Math.round(json.main.temp); 
        //         weatherIcon = getWeatherIcon(json.weather[0].id);
        //         alert
        //         $scope.icon = weatherIcon;
        //         $scope.$apply();                     
        // });

    //     $http.get({method: 'JSONP', url: 'http://api.openweathermap.org/data/2.5/weather?q=Ottawa&APPID=8eee1c035d624944ccda323d1a05d458&mode=json&units=metric'}).then(function(response) {
    //     //$scope.icon = 'owf owf-'+ json.weather[0].id;
    //     alert(Math.round(response.main.temp));
    //             $scope.temp = Math.round(response.main.temp); 
    //             weatherIcon = getWeatherIcon(response.weather[0].id);
    //             alert(Math.round(response.main.temp));
    //             $scope.icon = weatherIcon;
  
    // });

}