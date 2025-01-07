import { fetchWeather } from "./apiFetch";
import { convertWeekday, convertImages } from "./functions";

function renderWeather(location, weather) {
  const conditionText = document.querySelector(".condition");
  conditionText.textContent = weather[0].conditions;
  const locationText = document.querySelector(".location");
  locationText.textContent = location;
  const weatherInformationContainer = document.querySelector(".weather-information-container");
  weatherInformationContainer.innerHTML = `
    <h1 class="temperature">${Math.round(weather[0].temp)}°F</h1>
    <div class="weather-information">
      <p id="precipitation">Precipitation: ${weather[0].precipprob}%</p>
      <p id="humidity">Humidity: ${weather[0].humidity}%</p>
      <p id="wind">Wind: ${weather[0].windspeed} mph</p>
      <p id="feels-like">Feels Like: ${weather[0].feelslike}</p>
    </div>
  `;
  const weatherForecastContainer = document.querySelector(".forecast-container");
  weatherForecastContainer.innerHTML = "";
  for (let i = 0; i < 7; i++) {
    const forecastDiv = document.createElement("div");
    forecastDiv.classList.add("forecast");
    forecastDiv.innerHTML = `
      <p class="forecast-day">${convertWeekday(i)}</p>
      <p class="forecast-temperature">${weather[i].temp}°F</p>
      <p class="forecast-conditions">${weather[i].conditions}</p>
    `
    weatherForecastContainer.appendChild(forecastDiv);
  }
}

function fetchAndRenderWeather(location) {
  const loader = document.querySelector(".loader");
  loader.classList.remove("hidden");

  fetchWeather(location).then((weather) => {
    loader.classList.add("hidden");
    renderWeather(location, weather);
  });
}

const headerSearchForm = document.querySelector("header>form");
headerSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const locationInput = document.querySelector("header>form>input");
  fetchAndRenderWeather(locationInput.value);
  headerSearchForm.reset();
});

fetchAndRenderWeather("Bloomington, IN, USA");
