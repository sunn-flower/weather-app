function displayTemperature(response) {
	console.log(response.data);
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
}

let weatherKey = "23e5c32242e8082ee2e13b831cfd6fb5";
let cityName = "New York";
let tempUnit = "imperial";
let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherKey}&units=${tempUnit}`;

axios.get(weatherUrl).then(displayTemperature);
