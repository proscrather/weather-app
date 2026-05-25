const apiKey = "e214ad0a92e045aa830113328262405";

let chart;

// MAIN WEATHER FUNCTION

async function getWeather() {

  // CURRENT WEATHER

  const currentResponse = await fetch(
  `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=auto:ip`
  );

  const currentData = await currentResponse.json();

  console.log(currentData);

  // FORECAST

  const forecastResponse = await fetch(
  `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=auto:ip&days=1&aqi=yes&alerts=yes`
  );

  const forecastData = await forecastResponse.json();

  console.log(forecastData);

  // CURRENT WEATHER UI

  document.getElementById("city").innerText =
  currentData.location.name;

  document.getElementById("temp").innerText =
  Math.round(currentData.current.temp_c) + "°";

  document.getElementById("condition").innerText =
  currentData.current.condition.text;

  document.getElementById("feelsLike").innerText =
  "Feels like " +
  Math.round(currentData.current.feelslike_c) + "°";

  document.getElementById("humidity").innerText =
  currentData.current.humidity + "%";

  document.getElementById("wind").innerText =
  Math.round(currentData.current.wind_kph) + " km/h";

  document.getElementById("pressure").innerText =
  currentData.current.pressure_mb + " hPa";

  document.getElementById("uv").innerText =
  currentData.current.uv;

  document.getElementById("weatherIcon").src =
  "https:" + currentData.current.condition.icon;

  // 24 HOUR FORECAST

  const hourlyContainer =
  document.querySelector(".hourly-slider");

  hourlyContainer.innerHTML = "";

  const hours =
  forecastData.forecast.forecastday[0].hour;

  hours.forEach(hour=>{

    const time =
    hour.time.split(" ")[1];

    hourlyContainer.innerHTML += `

    <div class="hour">

      <p>${time}</p>

      <img src="https:${hour.condition.icon}">

      <h3>${Math.round(hour.temp_c)}°</h3>

      <small>${hour.chance_of_rain}% rain</small>

      <small>${hour.wind_kph} km/h</small>

    </div>

    `;
  });

  // GRAPH

  const labels = [];
  const temps = [];

  hours.forEach(hour=>{

    labels.push(
      hour.time.split(" ")[1]
    );

    temps.push(hour.temp_c);

  });

  const ctx =
  document.getElementById("tempChart");

  // DESTROY OLD CHART

  if(chart){
    chart.destroy();
  }

  chart = new Chart(ctx,{

    type:"line",

    data:{
      labels:labels,

      datasets:[{
        label:"Temperature °C",

        data:temps,

        tension:0.4
      }]
    },

    options:{
      responsive:true
    }

  });

}

// SEARCH

async function searchWeather(){

  const city =
  document.getElementById("cityInput").value;

  if(city.trim() === ""){
    return;
  }

  // CURRENT WEATHER

  const currentResponse = await fetch(
  `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
  );

  const currentData = await currentResponse.json();

  // FORECAST

  const forecastResponse = await fetch(
  `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=yes&alerts=yes`
  );

  const forecastData = await forecastResponse.json();

  // UPDATE UI

  document.getElementById("city").innerText =
  currentData.location.name;

  document.getElementById("temp").innerText =
  Math.round(currentData.current.temp_c) + "°";

  document.getElementById("condition").innerText =
  currentData.current.condition.text;

  document.getElementById("feelsLike").innerText =
  "Feels like " +
  Math.round(currentData.current.feelslike_c) + "°";

  document.getElementById("humidity").innerText =
  currentData.current.humidity + "%";

  document.getElementById("wind").innerText =
  Math.round(currentData.current.wind_kph) + " km/h";

  document.getElementById("pressure").innerText =
  currentData.current.pressure_mb + " hPa";

  document.getElementById("uv").innerText =
  currentData.current.uv;

  document.getElementById("weatherIcon").src =
  "https:" + currentData.current.condition.icon;

  // HOURLY FORECAST

  const hourlyContainer =
  document.querySelector(".hourly-slider");

  hourlyContainer.innerHTML = "";

  const hours =
  forecastData.forecast.forecastday[0].hour;

  hours.forEach(hour=>{

    const time =
    hour.time.split(" ")[1];

    hourlyContainer.innerHTML += `

    <div class="hour">

      <p>${time}</p>

      <img src="https:${hour.condition.icon}">

      <h3>${Math.round(hour.temp_c)}°</h3>

      <small>${hour.chance_of_rain}% rain</small>

      <small>${hour.wind_kph} km/h</small>

    </div>

    `;
  });

  // GRAPH

  const labels = [];
  const temps = [];

  hours.forEach(hour=>{

    labels.push(
      hour.time.split(" ")[1]
    );

    temps.push(hour.temp_c);

  });

  const ctx =
  document.getElementById("tempChart");

  if(chart){
    chart.destroy();
  }

  chart = new Chart(ctx,{

    type:"line",

    data:{
      labels:labels,

      datasets:[{
        label:"Temperature °C",

        data:temps,

        tension:0.4
      }]
    }

  });

}

getWeather();
document.getElementById("searchBtn")
.addEventListener("click", searchWeather);