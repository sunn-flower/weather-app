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

function displayForecast() {
	let forecastElement = document.querySelector("#forecast");
	let forecastHTML = `<div class="row">`;
	forecastHTML =
		forecastHTML +
		`
		<div class="col-2">
			<div class="forecast-day">Thursday</div>
				<img
									src="http://openweathermap.org/img/wn/02d@2x.png"
									alt=""
									width="36"
				/>
					<div class="forecast-temps">
						<span class="forecast-max-temp"> 18 </span>
						<span class="forecast-min-temp"> 12 </span>
					</div>
			</div>
		`;
	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
	let dateTime = document.querySelector("#date-time");
	let currentTemperature = document.querySelector("#current-temperature");
	let currentCity = document.querySelector("#current-city");
	let currentCondition = document.querySelector("#current-condition");
	let humidity = document.querySelector("#humidity");
	let wind = document.querySelector("#wind");
	let currentWeatherIcon = document.querySelector("#current-weather-icon");

	fahrenheitTemperature = response.data.main.temp;

	currentTemperature.innerHTML = Math.round(response.data.main.temp);
	currentCity.innerHTML = response.data.name;
	currentCondition.innerHTML = response.data.weather[0].description;
	humidity.innerHTML = response.data.main.humidity;
	wind.innerHTML = Math.round(response.data.wind.speed);
	dateTime.innerHTML = formatDate(response.data.dt * 1000);
	currentWeatherIcon.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	currentWeatherIcon.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
	let weatherKey = "23e5c32242e8082ee2e13b831cfd6fb5";

	let tempUnit = "imperial";
	let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}&units=${tempUnit}`;
	axios.get(weatherUrl).then(displayTemperature);
}

function handleSubmit(event) {
	event.preventDefault();
	let searchInput = document.querySelector("#search-input");
	search(searchInput.value);
}

function displayCelsiusTemp(event) {
	event.preventDefault();
	let currentTemperature = document.querySelector("#current-temperature");
	let celsiusTemperature = (fahrenheitTemperature - 32) * 0.5556;
	currentTemperature.innerHTML = Math.round(celsiusTemperature);
	fahrenheitLink.classList.remove("active");
	celsiusLink.classList.add("active");
}

function displayFahrenheitTemp(event) {
	event.preventDefault();
	let currentTemperature = document.querySelector("#current-temperature");
	currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
	celsiusLink.classList.remove("active");
	fahrenheitLink.classList.add("active");
}

search("New York");

displayForecast();

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);
