import chartConfigs from "./chartConfigs";
import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, Filler, BarController, BarElement} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';
import getData from "../../services";
import { getTimeWithUtcOffset } from "../../utils";

const {tempChartConfig, windChartConfig, sunChartConfig, sunriseConfig, sunsetConfig, trueNoonConfig, horizontConfig} = chartConfigs();
const {getWeather} = getData();

Chart.register(annotationPlugin, ChartDataLabels, LineController, LineElement, PointElement, CategoryScale, LinearScale, Filler, BarController, BarElement);

Chart.defaults.color = '#000';
Chart.defaults.font.size = 16;
Chart.defaults.plugins.datalabels.align = 'end';

let tempChart;
let windChart;
let sunChart;

const getCurrentDate = () => {
  return new Date().toLocaleDateString().replace(/(\d{2})\.(\d{2})\.(\d{4})/g, '$3-$2-$1')
}

export function createCharts(location, root, day = getCurrentDate()) {

  const myChart = root.querySelector('#myChart'),
        myChartWind = root.querySelector('#myChartWind'),
        myChartSun = root.querySelector('#myChartSun'),
        loading = root.querySelectorAll('.loadingChart');

  
  adaptiveCharts(root)
  loading.forEach(el => el.style.display = 'block')
  
  const {lat, lon, timezone} = location

  getWeather(lat, lon, timezone, day).then((res) => {
    loading.forEach(el => el.style.display = 'none')
    createTempChart(myChart, res)
    createWindChart(myChartWind, res)
    createSunChart(myChartSun, lon, res)
  })
}

function adaptiveCharts(root) {
  if (document.documentElement.clientWidth <= 650) {
    const chartContainer = root.querySelectorAll('.chart-container'),
          sunChartContainer = document.querySelector('.sunChart-container');

    Chart.defaults.font.size = 10;
    tempChartConfig.data.datasets[0].borderWidth = 1
    tempChartConfig.data.datasets[0].pointRadius = 2
    sunChartConfig.data.datasets[0].borderWidth = 1
    sunChartConfig.data.datasets[1].borderWidth = 1
    sunChartConfig.data.datasets[2].borderWidth = 1
    const windowWidth = document.documentElement.clientWidth
    sunChartContainer.style.cssText = `height:${windowWidth * 0.5}px; width: ${windowWidth - 30}px;`
    sunsetConfig.yMax = -1.2
    sunriseConfig.yMax = -1.2
    trueNoonConfig.yMax = -1.2
    horizontConfig.yMax = 0.3
    chartContainer.forEach(el => {
      el.style.cssText = 'height:300px; width: 800px;'
    })
  }
}

function createTempChart(element, res) {
  const {dailyTime, dailyTemp} = res    

  if (!tempChart) {
    tempChartConfig.data.labels = dailyTime;
    tempChartConfig.data.datasets[0].data = dailyTemp,
    tempChart = new Chart(element, tempChartConfig);
  } else {
      function addData(chart, data) {
        chart.data.datasets[0].data = data;
        chart.update('active');
      }
      addData(tempChart, dailyTemp);
  }
}

function createWindChart(element, res) {
  const {dailyTime, dailyWind, dailyWindDir} = res
  
  const datasets = windChartConfig.data.datasets

  if (!windChart) {
    windChartConfig.data.labels = dailyTime;
    datasets[0].data = dailyWind.map(el => el + 2.5);
    datasets[1].data = dailyWind;
    datasets[0].rotation = dailyWindDir
    windChart = new Chart(element, windChartConfig);
  } else {
      function addData(chart, data, rotation) {
        const chartDatasets = chart.data.datasets
        chartDatasets[0].data = data.map(el => el + 2.5);
        chartDatasets[0].rotation = rotation;
        chartDatasets[1].data = data;
        chart.update('active');
      }
      addData(windChart, dailyWind, dailyWindDir);
  }
}

function createSunChart(myChartSun, lon, res) {
  const {sunrise, sunset, utcOffset} = res

  const {time} = getTimeWithUtcOffset(utcOffset)
  const [labels, sin] = sinusCalk()
  const sunPosition = culkSunPosition(sunrise, sunset, time)
  const sun = createSunImg()
  const trueNoon = culkTrueNoon(utcOffset, lon)
  const shift = sunPosition < 24  || sunPosition > 72 ? 2 : 0

  const datasets = sunChartConfig.data.datasets

  if (!sunChart) {
    sunriseConfig.label.content = sunrise
    sunsetConfig.label.content = sunset
    trueNoonConfig.label.content = trueNoon;
    sunChartConfig.data.labels = labels;
    datasets[0].data = sin; // sinus
    datasets[1].data = sin.slice(0, sunPosition + 1);
    datasets[2].data = new Array(labels.length).fill(0) // горизонт
    datasets[3].data = sin.map(el => +el + 0.20 + '').slice(0, sunPosition + 1)
    // debugger
    if (sunPosition > 1) {
      datasets[3].pointStyle[sunPosition - shift] = sun
    }
    sunChart = new Chart(myChartSun, sunChartConfig);
  } else {
      function addData(chart) {
        sunriseConfig.label.content = sunrise
        sunsetConfig.label.content = sunset
        trueNoonConfig.label.content = trueNoon

        const chartDatasets = chart.data.datasets
        chartDatasets[1].data = sin.slice(0, sunPosition + 1)
        chartDatasets[3].data = sin.map(el => +el + 0.20 + '').slice(0, Math.floor(sunPosition + 1))
        chartDatasets[3].pointStyle = []
        if (sunPosition > 1) {
          datasets[3].pointStyle[sunPosition - shift] = sun
        }
        chart.update()
      }
      addData(sunChart);
  }
}

function createSunImg() {
  let sun = document.createElement('img');
  if (document.documentElement.clientWidth <= 650) {
    sun.src = 'smallSun.svg';
  } else {
    sun.src = 'sun.svg';
  }
  return sun
}

function sinusCalk() {
  let labels = []
  let sin = []

  const step = Math.PI / 48
  
  for (let i = -Math.PI / 2; i < 1.5*Math.PI; i+= step) {
      labels.push(''+i.toFixed(10));
      sin.push(Math.sin(i).toFixed(10));
  }
  
  // const modTime = 5.8

  // const sunriseMod = (+sunrise.slice(0, 2) + (+sunrise.slice(3, 5) * (10/6))/100)
  // const sunsetMod = (+sunset.slice(0, 2) + (+sunset.slice(3, 5) * (10/6))/100)

  // const dayDuration = Math.abs(sunsetMod - sunriseMod)
  // const nigthDuration = 24 - dayDuration

  // const nigthCoeff = (48 / nigthDuration) / 4
  // const dayCoeff = (48 / dayDuration) / 4

  // let sunPosition
  // if (modTime <= sunriseMod) {
  //   sunPosition = modTime * nigthCoeff * 4
  // } else if (modTime > sunriseMod && modTime <= sunsetMod) {
  //   sunPosition = 24 + ((modTime - sunriseMod) * dayCoeff * 4)
  // } else if (modTime > sunsetMod) {
  //   sunPosition = 72 + ((modTime - sunsetMod) * nigthCoeff * 4)
  // }

  // sunPosition = Math.round(sunPosition)

  return [labels, sin];
}

function culkSunPosition(sunrise, sunset, curtime) {

  // curtime = '03:50'

  const sOnDay = 24 * 60 * 60;
  const allSteps = 96;
  
  const curtimeS = +curtime.split(':')[0] * 60 * 60 + +curtime.split(':')[1] * 60;

  const sunriseS = +sunrise.split(':')[0] * 60 * 60 + +sunrise.split(':')[1] * 60;
  const sunsetS = +sunset.split(':')[0] * 60 * 60 + +sunset.split(':')[1] * 60;

  const morningStep = sunriseS/allSteps*4
  const dayStep = (sunsetS - sunriseS)/allSteps*2;
  const nightStep = (sOnDay - sunsetS)/allSteps*4
  

  if (curtimeS >= sunsetS) {
      return Math.ceil(allSteps / 4 * 3 + (curtimeS - sunsetS) / nightStep);
  }
  if (curtimeS >= sunriseS) {
      return Math.floor(allSteps / 4 + (curtimeS - sunriseS) / dayStep);
  }
  return Math.round(curtimeS / morningStep);
}

function culkTrueNoon(offset, lon) {
  let trueNoon = 12 + ((offset/3600) - lon / 15)
  trueNoon = Math.floor(trueNoon) + ':' + (trueNoon % 1 * 0.6 * 100).toFixed()
  return trueNoon
}