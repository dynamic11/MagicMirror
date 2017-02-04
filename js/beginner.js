var app = angular.module('myApp', []);

app.controller("TimeDateWeatherCtrl", function($scope, $interval, $http) {
    var clockInterval = 60000 ;//ms
    var count =0;
    
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
    var icon = weatherIcons[code].icon;

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


weatherIcons={
  "200": {
    "label": "thunderstorm with light rain",
    "icon": "storm-showers"
  },

  "201": {
    "label": "thunderstorm with rain",
    "icon": "storm-showers"
  },

  "202": {
    "label": "thunderstorm with heavy rain",
    "icon": "storm-showers"
  },

  "210": {
    "label": "light thunderstorm",
    "icon": "storm-showers"
  },

  "211": {
    "label": "thunderstorm",
    "icon": "thunderstorm"
  },

  "212": {
    "label": "heavy thunderstorm",
    "icon": "thunderstorm"
  },

  "221": {
    "label": "ragged thunderstorm",
    "icon": "thunderstorm"
  },

  "230": {
    "label": "thunderstorm with light drizzle",
    "icon": "storm-showers"
  },

  "231": {
    "label": "thunderstorm with drizzle",
    "icon": "storm-showers"
  },

  "232": {
    "label": "thunderstorm with heavy drizzle",
    "icon": "storm-showers"
  },

  "300": {
    "label": "light intensity drizzle",
    "icon": "sprinkle"
  },

  "301": {
    "label": "drizzle",
    "icon": "sprinkle"
  },

  "302": {
    "label": "heavy intensity drizzle",
    "icon": "sprinkle"
  },

  "310": {
    "label": "light intensity drizzle rain",
    "icon": "sprinkle"
  },

  "311": {
    "label": "drizzle rain",
    "icon": "sprinkle"
  },

  "312": {
    "label": "heavy intensity drizzle rain",
    "icon": "sprinkle"
  },

  "313": {
    "label": "shower rain and drizzle",
    "icon": "sprinkle"
  },

  "314": {
    "label": "heavy shower rain and drizzle",
    "icon": "sprinkle"
  },

  "321": {
    "label": "shower drizzle",
    "icon": "sprinkle"
  },

  "500": {
    "label": "light rain",
    "icon": "rain"
  },

  "501": {
    "label": "moderate rain",
    "icon": "rain"
  },

  "502": {
    "label": "heavy intensity rain",
    "icon": "rain"
  },

  "503": {
    "label": "very heavy rain",
    "icon": "rain"
  },

  "504": {
    "label": "extreme rain",
    "icon": "rain"
  },

  "511": {
    "label": "freezing rain",
    "icon": "rain-mix"
  },

  "520": {
    "label": "light intensity shower rain",
    "icon": "showers"
  },

  "521": {
    "label": "shower rain",
    "icon": "showers"
  },

  "522": {
    "label": "heavy intensity shower rain",
    "icon": "showers"
  },

  "531": {
    "label": "ragged shower rain",
    "icon": "showers"
  },

  "600": {
    "label": "light snow",
    "icon": "snow"
  },

  "601": {
    "label": "snow",
    "icon": "snow"
  },

  "602": {
    "label": "heavy snow",
    "icon": "snow"
  },

  "611": {
    "label": "sleet",
    "icon": "sleet"
  },

  "612": {
    "label": "shower sleet",
    "icon": "sleet"
  },

  "615": {
    "label": "light rain and snow",
    "icon": "rain-mix"
  },

  "616": {
    "label": "rain and snow",
    "icon": "rain-mix"
  },

  "620": {
    "label": "light shower snow",
    "icon": "rain-mix"
  },

  "621": {
    "label": "shower snow",
    "icon": "rain-mix"
  },

  "622": {
    "label": "heavy shower snow",
    "icon": "rain-mix"
  },

  "701": {
    "label": "mist",
    "icon": "sprinkle"
  },

  "711": {
    "label": "smoke",
    "icon": "smoke"
  },

  "721": {
    "label": "haze",
    "icon": "day-haze"
  },

  "731": {
    "label": "sand, dust whirls",
    "icon": "cloudy-gusts"
  },

  "741": {
    "label": "fog",
    "icon": "fog"
  },

  "751": {
    "label": "sand",
    "icon": "cloudy-gusts"
  },

  "761": {
    "label": "dust",
    "icon": "dust"
  },

  "762": {
    "label": "volcanic ash",
    "icon": "smog"
  },

  "771": {
    "label": "squalls",
    "icon": "day-windy"
  },

  "781": {
    "label": "tornado",
    "icon": "tornado"
  },

  "800": {
    "label": "clear sky",
    "icon": "sunny"
  },

  "801": {
    "label": "few clouds",
    "icon": "cloudy"
  },

  "802": {
    "label": "scattered clouds",
    "icon": "cloudy"
  },

  "803": {
    "label": "broken clouds",
    "icon": "cloudy"
  },

  "804": {
    "label": "overcast clouds",
    "icon": "cloudy"
  },


  "900": {
    "label": "tornado",
    "icon": "tornado"
  },

  "901": {
    "label": "tropical storm",
    "icon": "hurricane"
  },

  "902": {
    "label": "hurricane",
    "icon": "hurricane"
  },

  "903": {
    "label": "cold",
    "icon": "snowflake-cold"
  },

  "904": {
    "label": "hot",
    "icon": "hot"
  },

  "905": {
    "label": "windy",
    "icon": "windy"
  },

  "906": {
    "label": "hail",
    "icon": "hail"
  },

  "951": {
    "label": "calm",
    "icon": "sunny"
  },

  "952": {
    "label": "light breeze",
    "icon": "cloudy-gusts"
  },

  "953": {
    "label": "gentle breeze",
    "icon": "cloudy-gusts"
  },

  "954": {
    "label": "moderate breeze",
    "icon": "cloudy-gusts"
  },

  "955": {
    "label": "fresh breeze",
    "icon": "cloudy-gusts"
  },

  "956": {
    "label": "strong breeze",
    "icon": "cloudy-gusts"
  },

  "957": {
    "label": "high wind, near gale",
    "icon": "cloudy-gusts"
  },

  "958": {
    "label": "gale",
    "icon": "cloudy-gusts"
  },

  "959": {
    "label": "severe gale",
    "icon": "cloudy-gusts"
  },

  "960": {
    "label": "storm",
    "icon": "thunderstorm"
  },

  "961": {
    "label": "violent storm",
    "icon": "thunderstorm"
  },

  "962": {
    "label": "hurricane",
    "icon": "cloudy-gusts"
  }
}