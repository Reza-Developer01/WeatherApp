// Variables
const getCity = document.getElementById("city");
const getState = document.getElementById("state");
const getWChangeBtn = document.getElementById("w-change-btn");
const getLocation = document.getElementById("w-location");
const getMain = document.getElementById("w-main");
const getIcon = document.getElementById("w-icon");
const getTemp = document.getElementById("w-temp");
const getTempMin = document.getElementById("w-temp_min");
const getTempMax = document.getElementById("w-temp_max");
const getPressure = document.getElementById("w-pressure");
const getHumidity = document.getElementById("w-humidity");
const getWindSpeed = document.getElementById("w-wind_speed");
const getLon = document.getElementById("w-lon");
const getLat = document.getElementById("w-lat");

// Functions
const fetchData = async () => {
    try {
        const status = {
            city: getCity.value,
            state: getState.value,
        };

        localStorage.setItem("weatherStatus", JSON.stringify(status));

        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${status.city},${status.state}&appid=8c78747859261688836c3ec3fa237411`
        );
        if (res.ok) {
            const data = await res.json();
            showInUI(data, status);
        } else {
            throw Error(res.status);
        }
        $("#locationModal").modal("hide");
    } catch (error) {
        console.log(error);
    }
};

const showInUI = (data, status) => {
    getLocation.textContent = status.city;
    getMain.textContent = translateWeather(data.weather[0].main);
    getIcon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    );
    getTemp.textContent = data.main.temp;
    getTempMin.textContent = data.main.temp_min;
    getTempMax.textContent = data.main.temp_max;
    getPressure.textContent = data.main.pressure;
    getHumidity.textContent = data.main.humidity;
    getWindSpeed.textContent = data.wind.speed;
    getLon.textContent = data.coord.lon;
    getLat.textContent = data.coord.lat;
};

const translateWeather = (mainWeather) => {
    switch (mainWeather) {
        case "Thunderstorm":
            return "رعد و برق";
        case "Drizzle":
            return "نمنم باران";
        case "Rain":
            return "بارانی";
        case "Snow":
            return "برفی";
        case "Mist":
            return "غبار";
        case "Smoke":
            return "دود";
        case "Haze":
            return "غبار مه";
        case "Dust":
            return "گرد و خاک";
        case "Fog":
            return "مه";
        case "Sand":
            return "شن";
        case "Ash":
            return "خاکستر آتشفشانی";
        case "Squall":
            return "بوران";
        case "Tornado":
            return "توقان";
        case "Clear":
            return "صاف";
        case "Clouds":
            return "ابری";
        default:
            return mainWeather;
    }
};

const loadFromLocalStorage = () => {
    const savedStatus = localStorage.getItem("weatherStatus");
    if (savedStatus) {
        const {city, state} = JSON.parse(savedStatus);
        getCity.value = city;
        getState.value = state;
        fetchData()
    }
};

// EventListeners
getWChangeBtn.addEventListener("click", fetchData);
window.addEventListener("DOMContentLoaded", loadFromLocalStorage);
translateWeather();
