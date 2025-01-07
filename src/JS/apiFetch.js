const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

async function fetchWeather(location = "", unitGroup = 'us') {
  let locationCity, locationState, locationCountry;
  if (location.split(",").length === 3) {
    locationCity = location.split(', ')[0];
    locationState = location.split(', ')[1];
    locationCountry = location.split(', ')[2];
  } else if (location.split(",").length === 2) {
    locationCity = location.split(', ')[0];
    locationCountry = location.split(', ')[1];
  } else {
    locationCity = location;
  }

  const locationUrl = locationCity + (locationState ? '%2C' + locationState : '') + (locationCountry ? '%2C' + locationCountry : '');
  const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationUrl}?unitGroup=${unitGroup}&key=${WEATHER_API_KEY}&contentType=json`);
  const data = await response.json();
  const weatherData = data.days;

  return weatherData;
}

export { fetchWeather };
