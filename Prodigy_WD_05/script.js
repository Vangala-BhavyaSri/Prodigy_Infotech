const apiKey = "f3b8cf1a64f2811777e0ba57080157cd"; //// Get this fromhttps://openweathermap.org/api

function getWeather() {
  const city = document.getElementById("city-input").value;
  const weatherResult = document.getElementById("weather-result");

  if (!city) {
    weatherResult.innerHTML = "Please enter a city name.";
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      const { name, main, weather, wind } = data;
      weatherResult.innerHTML = `
        <h2>${name}</h2>
        <p>🌡️ Temperature: ${main.temp} °C</p>
        <p>🌥️ Condition: ${weather[0].description}</p>
        <p>💧 Humidity: ${main.humidity}%</p>
        <p>🌬️ Wind Speed: ${wind.speed} m/s</p>
      `;
    })
    .catch(error => {
      weatherResult.innerHTML = error.message;
    });
}

