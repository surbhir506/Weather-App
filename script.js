import { tipList } from './tips.js';

const apiKey = '5e1511bf19d0e101adbe349ea947d35b';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?&units=metric';

async function checkWeather() {
  // FETCHING DATA
  let userInput = document.querySelector('.userInput');
  const response = await fetch(
    `${apiUrl}&q=${userInput.value}&appid=${apiKey}`
  );

  let data = await response.json();
  console.log(data);

  // DOM MANIPULATE
  if (response.status == 400 || response.status == 404) {
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.weather-info-container').style.display = 'none';
    document.querySelector('footer').style.display = 'block';
  } else {
    document.querySelector('footer').style.display = 'none';
    document.querySelector('.error').style.display = 'none';
    document.querySelector('.weather-info-container').style.display = 'block';
    document.querySelector('.temp').innerHTML =
      Math.floor(data.main.temp) + '°C';
    document.querySelector('.main').innerHTML = data.weather[0].main;
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';
  }
  userInput.value = '';

  // WEATHER ICON
  let icon = document.querySelector('.weather-icon');
  icon.src = 'https://i.postimg.cc/d1XxvMVg/cloudy.png';

  // RANDOM TIPS
  let randomNum = Number(Math.floor(Math.random() * 10));
  document.querySelector('.tip-list').innerHTML = tipList[randomNum];
}

let btn = document
  .querySelector('.searchBTN')
  .addEventListener('click', checkWeather);
