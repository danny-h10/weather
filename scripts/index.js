"use strict"

let cities = [
   { name: "Benbrook, TX", latitude: 32.6732, longitude: -97.4606 },
   { name: "Denver, CO", latitude: 39.712179, longitude: -104.973050 },
   { name: "Portland, OR", latitude: 45.520117, longitude: -122.676683 },
   { name: "Portland, ME", latitude: 43.662093, longitude: -70.260251 },
   { name: "New York, NY", latitude: 40.784642, longitude: -73.962354 },
   { name: "Dallas, TX", latitude: 32.793431, longitude: -96.799543 },
];


window.onload = () => {


   let citiesDDL = document.getElementById("citiesId");

   citiesDDL.addEventListener("change", displayWeatherData)

   populateDDL(citiesDDL, cities);

}

async function displayWeatherData() {

   let selectedCity = cities.find((city) => {
      return city.name === event.target.value;
   })

   let latLongString = `${selectedCity.latitude},${selectedCity.longitude}`;

   let weatherData = await getWeatherData(latLongString);

   let forecast = await getForcastData(weatherData.properties.forecast);

   populateTable(forecast.properties.periods)

}

function populateTable(data) {

   let tBody = document.querySelector("#citiesTableBody")

   tBody.innerHTML = "";

   for (let i = 0; i < data.length; i++) {
      buildTableRow(tBody, data[i])
   }

}

function buildTableRow(tableBody, data) {

   console.log(data)
   let newRow = tableBody.insertRow();

   let cell1 = newRow.insertCell();
   cell1.innerHTML = data.name

   let cell2 = newRow.insertCell();
   cell2.innerHTML = data.temperature

   let cell3 = newRow.insertCell();
   cell3.innerHTML = data.temperatureUnit

   let cell4 = newRow.insertCell();
   cell4.innerHTML = data.windDirection

   let cell5 = newRow.insertCell();
   cell5.innerHTML = data.windSpeed

   let cell6 = newRow.insertCell();
   cell6.innerHTML = data.shortForecast

}


async function getForcastData(forecastURL) {

   let response = await fetch(forecastURL);
   let data = await response.json()

   return data;

}

async function getWeatherData(latLongString) {

   let response = await fetch(`https://api.weather.gov/points/${latLongString}`);
   let data = await response.json()

   return data;

}


function populateDDL(drowpdownToPopulate, data) {

   let defaultOption = document.createElement("option");
   defaultOption.textContent = "Select a Option";
   defaultOption.value = ""

   drowpdownToPopulate.appendChild(defaultOption);

   data.forEach((optionData) => {

      let newOption = document.createElement("option");
      newOption.textContent = optionData.name;
      newOption.value = optionData.name;


      drowpdownToPopulate.appendChild(newOption);

   })

}