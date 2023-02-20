// import Chart from 'chart.js/auto'
import getData from './services';

import '../styles/main.css';
import '../styles/daily.css';

const inputCity = document.querySelector('.input-city'),
      weather = document.querySelector('.weather'),
      city = document.querySelector('.city'),
      yourLocation = document.querySelector('.location__city'),
      btnChangeLocation = document.querySelector('.location__change__btn'),
      btnGetLocation = document.querySelector('.location__get__btn');

const {getLocation, getCityLocation, getWeather} = getData();

getLocation().then((res) => {
    console.log(res)
    if (!localStorage.getItem('city')) {
        setLocationToLocalStorage(res.city, res.lat, res.lon);
        yourLocation.textContent = `Current location: ${res.city}`;
        getWeatherOnCity(res.lat, res.lon);
    } else {
        console.log(localStorage.getItem('city'))
        yourLocation.textContent = `Current location: ${localStorage.getItem('city')}`;
    }
})

const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '00'],
        datasets: [{
          label: 'My First Dataset',
          data: [-10, -5, 0, 5, 10, 10, 5, 0, 6, 4, 0, -5],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
