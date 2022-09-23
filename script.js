function formatDate(timestamp) {
	let date = new Date(timestamp);
	let hours = date.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[date.getDay()];
	return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
	let dateTime = document.querySelector("#date-time");
	let currentTemperature = document.querySelector("#current-temperature");
	let currentCity = document.querySelector("#current-city");
	let currentCondition = document.querySelector("#current-condition");
	let humidity = document.querySelector("#humidity");
	let wind = document.querySelector("#wind");
	currentTemperature.innerHTML = Math.round(response.data.main.temp);
	currentCity.innerHTML = response.data.name;
	currentCondition.innerHTML = response.data.weather[0].description;
	humidity.innerHTML = response.data.main.humidity;
	wind.innerHTML = Math.round(response.data.wind.speed);
	dateTime.innerHTML = formatDate(response.data.dt * 1000);
}

let weatherKey = "23e5c32242e8082ee2e13b831cfd6fb5";
let cityName = "New York";
let tempUnit = "imperial";
let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherKey}&units=${tempUnit}`;

axios.get(weatherUrl).then(displayTemperature);
