const apiKey = '6e96997869800728525a8b1b3557870f';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?unit=metric&q=';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const weather = document.querySelector('.weather');
const errorWeather = document.querySelector('.error');

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status === 404) {
    weather.style.display = 'none'
    errorWeather.style.display = 'block';
  } else {
    let data = await response.json();
    errorWeather.style.display = 'none';
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = `${Math.round(data.main.temp - 273.15)}°C`;
    document.querySelector('.humidity').innerHTML = `${data.main.humidity}%`;
    document.querySelector('.wind').innerHTML = `${data.wind.speed}km/h`;
  
    const nameImages = data.weather[0].main
    weatherIcon.src = `images/${nameImages.toLowerCase()}.png`
    weather.style.display = 'block'
  }
}

searchBtn.addEventListener('click', () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener('keypress', function (evt) {
  if (evt.key === 'Enter') {
    checkWeather(searchBox.value);
  }
});