"use strict"
let cities = [
    { name: "Benbrook, TX", latitude: 32.6732, longitude: -97.4606 },
    { name: "Denver, CO", latitude: 39.712179, longitude: -104.973050 },
    { name: "Portland, OR", latitude: 45.520117, longitude: -122.676683 },
    { name: "Portland, ME", latitude: 43.662093, longitude: -70.260251 }
];


window.onload = () => {

    let theDropDown = document.getElementById("citesDropDown");

    makeCitiesDropdown(theDropDown, cities);

    theDropDown.addEventListener("change", displayWeatherData)


    fetchWeather();

}


function makeCitiesDropdown(dropDownToPoppulate, data) {

    data.forEach((optionData) => {

        let newOption = document.createElement("option")
        newOption.textContent = optionData.name;
        newOption.value = optionData.name;

        dropDownToPoppulate.appendChild(newOption);
    })



}

async function displayWeatherData() {
    let selectedCity = cities.find((city) => {

        return city.name === event.target.value;
    })
    let latLongString = ${selectedCity.latitude},${selectedCity.longitude};

    let weatherData = await fetchWeatherWeather(latLongString);

    let forecast = await getForcastDetails(weatherData.properties.forecast)

    makeTableRows(forecast.properties.periods)
}




async function fetchWeather(latLongString) {

    try {

        let response = await fetch(https://api.weather.gov/points/${latLongString})
        let weatherData = await response.json();
        console.log(weatherData)
        if (!response.ok) {
            throw new Error("not working")
        }


    } catch (error) {
        console.log(error)
    }
}



async function getForcastDetails(forecastURl) {
    let response = await fetch(forecastURl);
    let data = await response.json()
    return data;
}

function makeTableRows(forecast) {

    let tbody = document.querySelector("#weatherTBody")

    for (let i = 0; i < forecast.length; i++) {

        let row = tbody.insertRow();

        let nameCell = row.insertCell();
        nameCell.innerHtml = cities[i].name

        let latitudeCell = row.insertCell();
        latitudeCell.innerHtml = cities[i].latitude

        let longitudeCell = row.insertCell();
        longitudeCell.innerHtml = cities[i].longitude


    }

}