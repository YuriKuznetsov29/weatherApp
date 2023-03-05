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
      myChart = document.getElementById('myChart'),
      inputDay = document.querySelector('.day__input'),
      inputDateBtn = document.querySelector('.enterBtn'),
      dayErrorMessage = document.querySelector('.day__errorMessage'),
      nextDayBtn = document.querySelector('.day__next'),
      previousDayBtn = document.querySelector('.day__previous'),
      burger = document.querySelector('.burger'),
      nav = document.querySelector('.nav');

burger.addEventListener('click', () => {
    nav.style.display = 'block';
})



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

const setLocationToLocalStorage = (city, lat, lon) => {
  localStorage.setItem('city', city);
  localStorage.setItem('lat', lat);
  localStorage.setItem('lon', lon);
}

// Change location toggle
btnChangeLocation.addEventListener('click', () => {
  document.querySelector('.location__change__wrapper').style.display = 'flex';
  btnChangeLocation.style.display = 'none'

})

// Get location btn
btnGetLocation.addEventListener('click', () => {
  getLocation().then((res) => {
      setLocationToLocalStorage(res.city, res.lat, res.lon);
      console.log(res.city)
      yourLocation.textContent = `Current location: ${res.city}`;
      getWeatherOnCity(res.lat, res.lon);
  })
})

// Change location onEnter
inputCity.addEventListener('keydown', (e) => {
  if (e.keyCode == 13) {
      if (document.querySelector('.errorMessage')) {
          document.querySelector('.errorMessage').remove();
      }
      getCityLocation(inputCity.value).then((res) => {
          if (Object.values(res).length === 1) {
              const errorMessage = document.createElement('label');
              errorMessage.classList.add('errorMessage');
              errorMessage.textContent = 'City not found';
              inputCity.after(errorMessage)
          } else {
              setLocationToLocalStorage(res.results[0].name, res.results[0].latitude, res.results[0].longitude);
              yourLocation.textContent = `Current location: ${res.results[0].name}`;
              getWeatherOnCity(res.results[0].latitude, res.results[0].longitude)
              document.querySelector('.location__change__wrapper').style.display = 'none';
              btnChangeLocation.style.display = 'block'
              clearFindData();
          }
      })
  }
})

// Find location on input
inputCity.addEventListener('input', () => {
  
      if (document.querySelector('.errorMessage')) {
          document.querySelector('.errorMessage').remove();
      }
      if (document.querySelector('.finded-city')) {
          document.querySelectorAll('.finded-city').forEach(elem => {
              elem.remove();
          })
      }
      getCityLocation(inputCity.value).then((res) => {
          if (Object.values(res).length === 1) {
              const errorMessage = document.createElement('label');
              errorMessage.classList.add('errorMessage');
              errorMessage.textContent = 'City not found';
              inputCity.after(errorMessage)
          } else {
              res.results.forEach(el => {
                  const div = document.createElement('div');
                  div.classList.add('finded-city');
                  div.textContent = `${el.name}  ${el.country_code}`;
                  document.querySelector('.location__change__find').append(div)
                  div.addEventListener('click', () => {
                      console.log(el)
                      setLocationToLocalStorage(el.name, el.latitude, el.longitude);
                      yourLocation.textContent = `Current location: ${el.name}`;
                      getWeatherOnCity(el.latitude, el.longitude);
                      document.querySelector('.location__change__wrapper').style.display = 'none';
                      btnChangeLocation.style.display = 'block'
                      clearFindData();
                  })

              });
          }
      })
})



const clearFindData = () => {
  if (document.querySelector('.errorMessage')) {
      document.querySelector('.errorMessage').remove();
  }
  if (document.querySelector('.finded-city')) {
      document.querySelectorAll('.finded-city').forEach(elem => {
          elem.remove();
      })
  }
  inputCity.value = '';
}

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const currentDate = `${year}-${(month + 1) < 10 ? `0${(month + 1)}` : (month + 1)}-${day < 10 ? `0${day}` : day}`;
  console.log(currentDate);
  return currentDate;
}

inputDateBtn.addEventListener('click', () => {
  if (inputDay.value) {
    const regexp = new RegExp(/\d{4}[.-]\d{2}[.-]\d{2}/);

    console.log(regexp.test(inputDay.value))
    if (regexp.test(inputDay.value)) {
      const day = inputDay.value.replace(/\./ig, '-');
      getWeatherOnCity(localStorage.getItem('lat'), localStorage.getItem('lon'), day);
      dayErrorMessage.textContent = '';
    } else {
      dayErrorMessage.textContent = `Invalid date format yyyy-mm-dd`;
    }
    
  }
})

inputDay.addEventListener('keydown', (e) => {
  if (e.keyCode == 13) {
    const regexp = new RegExp(/\d{4}[.-]\d{2}[.-]\d{2}/);
    console.log(regexp.test(inputDay.value))
    if (regexp.test(inputDay.value)) {
      const day = inputDay.value.replace(/\./ig, '-');
      getWeatherOnCity(localStorage.getItem('lat'), localStorage.getItem('lon'), day);
      dayErrorMessage.textContent = '';
    } else {
      dayErrorMessage.textContent = `Invalid date format yyyy-mm-dd`;
    }
  }
})

nextDayBtn.addEventListener('click', () => {
  let day = chart.options.plugins.subtitle.text

  console.log(Number(day.slice(0, 4)), (Number(day.slice(5, 7))) - 1, (Number(day.slice(8))) + 1)
  const lastDate = new Date(Number(day.slice(0, 4)), (Number(day.slice(5, 7))) - 1, (Number(day.slice(8))) + 1);
  const lastYear = lastDate.getFullYear();
  const lastmonth = lastDate.getMonth();
  const lastDay = lastDate.getDate();
  const transformLastDate = `${lastYear}-${(lastmonth + 1) < 10 ? `0${(lastmonth + 1)}` : (lastmonth + 1)}-${lastDay < 10 ? `0${lastDay}` : lastDay}`;
  getWeatherOnCity(localStorage.getItem('lat'), localStorage.getItem('lon'), transformLastDate);
})

previousDayBtn.addEventListener('click', () => {
  let day = chart.options.plugins.subtitle.text

  console.log(Number(day.slice(0, 4)), (Number(day.slice(5, 7))) - 1, (Number(day.slice(8))) - 1)
  const lastDate = new Date(Number(day.slice(0, 4)), (Number(day.slice(5, 7))) - 1, (Number(day.slice(8))) - 1);
  const lastYear = lastDate.getFullYear();
  const lastmonth = lastDate.getMonth();
  const lastDay = lastDate.getDate();
  const transformLastDate = `${lastYear}-${(lastmonth + 1) < 10 ? `0${(lastmonth + 1)}` : (lastmonth + 1)}-${lastDay < 10 ? `0${lastDay}` : lastDay}`;
  getWeatherOnCity(localStorage.getItem('lat'), localStorage.getItem('lon'), transformLastDate);
})


let arrow = document.createElement ('img');
arrow.src ='/src/images/arrow.png';

// Chart.defaults.plugins.title.color = '#fff';
// Chart.defaults.plugins.legend.color = '#fff';
// Chart.defaults.backgroundColor = '#fff';
Chart.defaults.color = '#fff';
Chart.defaults.font.size = 16;
let chart;
const getWeatherOnCity = (lat, lon, day = getCurrentDate()) => {
    getWeather(lat, lon, day).then((res) => {
        const chartConfig = {
          type: 'line',
          color: '#fff',
          data: {
              labels: res.dailyTime,
              datasets: [
                {
                label: 'Temperature',
                data: res.dailyTemp,
                fill: 'start',
                backgroundColor: CHART_COLORS.blue,
                borderColor: CHART_COLORS.red,
                color: '#fff',
                tension: 0.1
              },
              {
                label: 'Moisture',
                data: res.dailyMoi,
                fill: 'start',
                backgroundColor: CHART_COLORS.purple,
                borderColor: CHART_COLORS.green,
                color: '#fff',
                tension: 0.1,
                hidden: true
              },
              {
                label: 'Wind',
                data: res.dailyWind,
                fill: 'start',
                backgroundColor: CHART_COLORS.yellow,
                borderColor: CHART_COLORS.orange,
                color: '#fff',
                tension: 0.1,
                hidden: true,
                pointHitRadius: 10,
                rotation: res.dailyWindDir,
                pointStyle: [arrow],
              },
              {
                label: 'Pressure',
                data: res.dailyPressure,
                fill: 'start',
                backgroundColor: CHART_COLORS.green,
                borderColor: CHART_COLORS.orange,
                color: '#fff',
                tension: 0.1,
                hidden: true
              },
            ]
            },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  display: false,
                }
              },
              x: {
                grid: {
                  display: false,
                }
              }
            },
            plugins: {
              subtitle: {
                  display: true,
                  text: day,
                  font: {
                      size: 24
                  },
              },
              legend: {
                  labels: {
                      // This more specific font property overrides the global property
                      font: {
                          size: 24
                      }
                  },
              }
            },
          }
        }

        if (document.documentElement.clientWidth <= 600) {
          chartConfig.options.plugins.subtitle.font.size = 12;
          chartConfig.options.plugins.legend.labels.font.size = 12;
          Chart.defaults.font.size = 10;
        }

        if (!chart) {
          chart = new Chart(myChart, chartConfig);
        } else {
          {
            console.log(chart)
            function addData(chart, label, data, day) {
              chart.data.labels = label;
              chart.data.datasets = data;
              chart.options.plugins.subtitle.text = day;
              chart.update('active');
            }
            addData(chart, res.dailyTime, chartConfig.data.datasets, day);
        }
      }
    })


}



