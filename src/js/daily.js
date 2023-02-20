import getData from './services';
import { CHART_COLORS } from './constants'
import Chart from 'chart.js/auto';

import '../styles/main.css';
import '../styles/daily.css';

const inputCity = document.querySelector('.input-city'),
      weather = document.querySelector('.weather'),
      city = document.querySelector('.city'),
      yourLocation = document.querySelector('.location__city'),
      btnChangeLocation = document.querySelector('.location__change__btn'),
      btnGetLocation = document.querySelector('.location__get__btn'),
      ctx = document.getElementById('myChart');


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
        getWeatherOnCity(localStorage.getItem('lat'), localStorage.getItem('lon'));
    }
})

Chart.defaults.plugins.title.color = '#fff';
Chart.defaults.plugins.legend.color = '#fff';
Chart.defaults.backgroundColor = '#fff';
Chart.defaults.color = '#fff';   

const getWeatherOnCity = (lat, lon) => {
    getWeather(lat, lon).then((res) => {
        console.log(res)
        new Chart(ctx, {
            type: 'line',
            color: '#fff',
            data: {
                labels: res.dailyTime,
                datasets: [{
                  label: 'Temperature',
                  data: res.dailyTemp,
                  fill: 'start',
                  backgroundColor: CHART_COLORS.blue,
                  borderColor: CHART_COLORS.red,
                  color: '#fff',
                  tension: 0.1
                }]
              },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                  color: '#fff'
                },
                
              },
              plugins: {
                subtitle: {
                    display: true,
                    text: 'Custom Chart Subtitle',
                    font: {
                        size: 24
                    },
                    color: '#fff',
                },
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        font: {
                            size: 24
                        }
                    }
                }
              },
              color: '#fff',
              font: {
                size: 24
              }
            }
          });
    })
}



