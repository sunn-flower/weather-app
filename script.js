function displayTemperature(response) {
	console.log(response.data.main.temp);
	let currentTemperature = document.querySelector("#current-temperature");
	currentTemperature.innerHTML = Math.round(response.data.main.temp);
}

let weatherKey = "23e5c32242e8082ee2e13b831cfd6fb5";
let cityName = "New York";
let tempUnit = "imperial";
let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherKey}&units=${tempUnit}`;

axios.get(weatherUrl).then(displayTemperature);
