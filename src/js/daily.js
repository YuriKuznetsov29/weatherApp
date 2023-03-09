import getData from './services';
import chartConfigs from './chartConfigs';
import changeLocation from './changeLocation';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import '../styles/main.css';
import '../styles/daily.css';

const myChart = document.getElementById('myChart'),
      myChartMoi = document.getElementById('myChartMoi'),
      myChartWind = document.getElementById('myChartWind'),
      myChartPressure = document.getElementById('myChartPressure'),
      inputDay = document.querySelector('.day__input'),
      inputDateBtn = document.querySelector('.enterBtn'),
      dayErrorMessage = document.querySelector('.day__errorMessage'),
      nextDayBtn = document.querySelector('.day__next'),
      previousDayBtn = document.querySelector('.day__previous'),
      burger = document.querySelector('.burger'),
      nav = document.querySelector('.nav');


const {getWeather} = getData();
const {tempChartConfig, moiChartConfig, windChartConfig, pressureChartConfig} = chartConfigs();

burger.addEventListener('click', () => {
    nav.style.display = 'block';
})

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
  let day = tempChart.options.plugins.subtitle.text

  console.log(Number(day.slice(0, 4)), (Number(day.slice(5, 7))) - 1, (Number(day.slice(8))) + 1)
  const lastDate = new Date(Number(day.slice(0, 4)), (Number(day.slice(5, 7))) - 1, (Number(day.slice(8))) + 1);
  const lastYear = lastDate.getFullYear();
  const lastmonth = lastDate.getMonth();
  const lastDay = lastDate.getDate();
  const transformLastDate = `${lastYear}-${(lastmonth + 1) < 10 ? `0${(lastmonth + 1)}` : (lastmonth + 1)}-${lastDay < 10 ? `0${lastDay}` : lastDay}`;
  getWeatherOnCity(localStorage.getItem('lat'), localStorage.getItem('lon'), transformLastDate);
})

previousDayBtn.addEventListener('click', () => {
  let day = tempChart.options.plugins.subtitle.text

  console.log(Number(day.slice(0, 4)), (Number(day.slice(5, 7))) - 1, (Number(day.slice(8))) - 1)
  const lastDate = new Date(Number(day.slice(0, 4)), (Number(day.slice(5, 7))) - 1, (Number(day.slice(8))) - 1);
  const lastYear = lastDate.getFullYear();
  const lastmonth = lastDate.getMonth();
  const lastDay = lastDate.getDate();
  const transformLastDate = `${lastYear}-${(lastmonth + 1) < 10 ? `0${(lastmonth + 1)}` : (lastmonth + 1)}-${lastDay < 10 ? `0${lastDay}` : lastDay}`;
  getWeatherOnCity(localStorage.getItem('lat'), localStorage.getItem('lon'), transformLastDate);
})

Chart.register(ChartDataLabels);
// Chart.defaults.plugins.title.color = '#fff';
// Chart.defaults.plugins.legend.color = '#fff';
// Chart.defaults.backgroundColor = '#fff';
Chart.defaults.color = '#fff';
Chart.defaults.font.size = 16;

let tempChart;
let moiChart;
let windChart;
let pressureChart;

const getWeatherOnCity = (lat, lon, day = getCurrentDate()) => {
    getWeather(lat, lon, day).then((res) => {

        if (document.documentElement.clientWidth <= 600) {
          // chartConfig.options.plugins.subtitle.font.size = 12;
          // chartConfig.options.plugins.legend.labels.font.size = 12;
          // Chart.defaults.options.plugins.subtitle.font.size = 12;
          // Chart.defaults.options.plugins.legend.labels.font.size = 12;
          Chart.defaults.font.size = 10;
          const chartContainer = document.querySelectorAll('.chart-container');
          chartContainer.forEach(el => {
            el.style.cssText = 'height:300px; width: 800px;'
          })
        }

        if (!tempChart) {
          tempChartConfig.data.labels = res.dailyTime;
          tempChartConfig.data.datasets[0].data = res.dailyTemp,
          tempChartConfig.options.plugins.subtitle.text = day;
          tempChart = new Chart(myChart, tempChartConfig);
        } else {
            function addData(chart, label, data, day) {
              chart.data.labels = label;
              chart.data.datasets[0].data = data;
              chart.options.plugins.subtitle.text = day;
              chart.update('active');
            }
            addData(tempChart, res.dailyTime, res.dailyTemp, day);
        }
        
        if (!moiChart) {
          moiChartConfig.data.labels = res.dailyTime;
          moiChartConfig.data.datasets[0].data = res.dailyMoi;
          moiChartConfig.options.plugins.subtitle.text = day;
          moiChart = new Chart(myChartMoi, moiChartConfig);
        } else {
            function addData(chart, label, data, day) {
              chart.data.labels = label;
              chart.data.datasets[0].data = data;
              chart.options.plugins.subtitle.text = day;
              chart.update('active');
            }
            addData(moiChart, res.dailyTime, res.dailyMoi, day);
        }

        if (!windChart) {
          windChartConfig.data.labels = res.dailyTime;
          windChartConfig.data.datasets[0].data = res.dailyWind;
          windChartConfig.data.datasets[0].rotation = res.dailyWindDir
          windChartConfig.options.plugins.subtitle.text = day;
          windChart = new Chart(myChartWind, windChartConfig);
        } else {
            function addData(chart, label, data, rotation, day) {
              chart.data.labels = label;
              chart.data.datasets[0].data = data;
              chart.data.datasets[0].rotation = rotation;
              chart.options.plugins.subtitle.text = day;
              chart.update('active');
            }
            addData(windChart, res.dailyTime, res.dailyWind, res.dailyWindDir, day);
        }

        if (!pressureChart) {
          pressureChartConfig.data.labels = res.dailyTime;
          pressureChartConfig.data.datasets[0].data =  res.dailyPressure;
          pressureChartConfig.options.plugins.subtitle.text = day;
          pressureChart = new Chart(myChartPressure, pressureChartConfig);
        } else {
            function addData(chart, label, data, day) {
              chart.data.labels = label;
              chart.data.datasets[0].data = data;
              chart.options.plugins.subtitle.text = day;
              chart.update('active');
            }
            addData(pressureChart, res.dailyTime, res.dailyPressure, day);
        }
    })
}

changeLocation(getWeatherOnCity);



