let weather = {
    "apiKey": "9f5368f3b1697c7a8d17154d6a801aed",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
      )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const tempCelsius = Math.floor(data.main.temp); 
      const tempFahrenheit = Math.floor((tempCelsius * 9 / 5) + 32); 
      const { humidity } = data.main;
      const { speed } = data.wind;
  
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = tempFahrenheit + "°F"; 
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + "km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900?" + name + "')";
    },
  
    displayMainPage: function () {
      const defaultCity = "Brooklyn"; // Default city
      this.fetchWeather(defaultCity);
    },
    search: function () {
      const searchBar = document.querySelector(".search-bar");
      const city = searchBar.value;
      if (city) {
        this.fetchWeather(city);
      } else {
        this.displayMainPage();
      }
    },
  };
  
  document.addEventListener("DOMContentLoaded", function () {
    weather.displayMainPage();
  
    document.querySelector(".search button").addEventListener("click", function () {
      weather.search();
    });
  
    document.querySelector(".search-bar").addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        weather.search();
      }
    });
  });
  