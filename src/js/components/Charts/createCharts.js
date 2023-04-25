import chartConfigs from "../../chartConfigs";
import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, Filler, Legend, BarController, BarElement} from "chart.js";
// import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';
import getData from "../../services";
import { getTimeWithUtcOffset } from "../../utils";

const getCurrentDate = () => { // переписать
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const currentDate = `${year}-${(month + 1) < 10 ? `0${(month + 1)}` : (month + 1)}-${day < 10 ? `0${day}` : day}`;
    return currentDate;
}

const {tempChartConfig, moiChartConfig, windChartConfig, pressureChartConfig, sunChartConfig, sunriseConfig, sunsetConfig, trueNoonConfig} = chartConfigs();
const {getWeather} = getData();

Chart.register(annotationPlugin, ChartDataLabels, LineController, LineElement, PointElement, CategoryScale, LinearScale, Filler, Legend, BarController, BarElement);

Chart.defaults.color = '#000';
Chart.defaults.font.size = 16;
Chart.defaults.plugins.datalabels.align = 'end';

let tempChart;
let moiChart;
let windChart;
let pressureChart;
let sunChart;

export function createCharts(location, root, day = getCurrentDate()) {

  const {lat, lon, timezone} = location

  const myChart = root.querySelector('#myChart'),
        myChartMoi = root.querySelector('#myChartMoi'),
        myChartWind = root.querySelector('#myChartWind'),
        myChartPressure = root.querySelector('#myChartPressure'),
        myChartSun = root.querySelector('#myChartSun'),
        loading = root.querySelectorAll('.loadingChart');

        loading.forEach(el => el.style.display = 'block')

    getWeather(lat, lon, timezone, day).then((res) => {

        loading.forEach(el => el.style.display = 'none')

        if (document.documentElement.clientWidth <= 600) {
          Chart.defaults.font.size = 10;
          const chartContainer = document.querySelectorAll('.chart-container');
          const sunChartContainer = document.querySelector('.sunChart-container');
          console.log(sunChartContainer)
          sunChartContainer.style.cssText = `height:${document.documentElement.clientWidth * 0.7}px; width: ${document.documentElement.clientWidth - 30}px;`
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
        
        // if (!moiChart) {
        //   moiChartConfig.data.labels = res.dailyTime;
        //   moiChartConfig.data.datasets[0].data = res.dailyMoi;
        //   moiChartConfig.options.plugins.subtitle.text = day;
        //   moiChart = new Chart(myChartMoi, moiChartConfig);
        // } else {
        //     function addData(chart, label, data, day) {
        //       chart.data.labels = label;
        //       chart.data.datasets[0].data = data;
        //       chart.options.plugins.subtitle.text = day;
        //       chart.update('active');
        //     }
        //     addData(moiChart, res.dailyTime, res.dailyMoi, day);
        // }

        if (!windChart) {
          windChartConfig.data.labels = res.dailyTime;
          windChartConfig.data.datasets[0].data = res.dailyWind.map(el => el + 2.5);
          windChartConfig.data.datasets[1].data = res.dailyWind;
          windChartConfig.data.datasets[0].rotation = res.dailyWindDir
          windChartConfig.options.plugins.subtitle.text = day + ' Wind';
          windChart = new Chart(myChartWind, windChartConfig);

        } else {
            function addData(chart, label, data, rotation, day) {
              chart.data.labels = label;
              chart.data.datasets[0].data = data.map(el => el + 2.5);
              chart.data.datasets[0].rotation = rotation;
              windChartConfig.data.datasets[1].data = data;
              chart.options.plugins.subtitle.text = day + ' Wind';
              chart.update('active');
            }
            addData(windChart, res.dailyTime, res.dailyWind, res.dailyWindDir, day);
        }

        // if (!pressureChart) {
        //   pressureChartConfig.data.labels = res.dailyTime;
        //   pressureChartConfig.data.datasets[0].data =  res.dailyPressure;
        //   pressureChartConfig.options.plugins.subtitle.text = day;
        //   pressureChart = new Chart(myChartPressure, pressureChartConfig);
        // } else {
        //     function addData(chart, label, data, day) {
        //       chart.data.labels = label;
        //       chart.data.datasets[0].data = data;
        //       chart.options.plugins.subtitle.text = day;
        //       chart.update('active');
        //     }
        //     addData(pressureChart, res.dailyTime, res.dailyPressure, day);
        // }

        const {modTime, time} = getTimeWithUtcOffset(res.utcOffset)

        const sunCalk = (sunrise, sunset) => {
          let labels = []
          let sin = []

          const step = Math.PI / 48
          
          for (let i = -Math.PI / 2; i < 1.5*Math.PI; i+= step) {
              labels.push(''+i.toFixed(10));
              sin.push(Math.sin(i).toFixed(10));
          }
          
          // const modTime = 5.8

          const sunriseMod = (+sunrise.slice(0, 2) + (+sunrise.slice(3, 5) * (10/6))/100)
          const sunsetMod = (+sunset.slice(0, 2) + (+sunset.slice(3, 5) * (10/6))/100)

          const dayDuration = Math.abs(sunsetMod - sunriseMod)
          const nigthDuration = 24 - dayDuration


          const nigthCoeff = (48 / nigthDuration) / 4
          const dayCoeff = (48 / dayDuration) / 4

          let sunPosition
          if (modTime <= sunriseMod) {
            sunPosition = modTime * nigthCoeff * 4
          } else if (modTime > sunriseMod && modTime <= sunsetMod) {
            sunPosition = 24 + ((modTime - sunriseMod) * dayCoeff * 4)
          } else if (modTime > sunsetMod) {
            sunPosition = 72 + ((modTime - sunsetMod) * nigthCoeff * 4)
          }

          sunPosition = Math.round(sunPosition)

          console.log('SUNPOS', sunPosition)

          return [labels, sin, sunPosition];
        }

        const sunrise = '06:19';
        const sunset = '19:49';
        const curtime = '13:05'; // Для тестов


        console.log('COUNTER', getCounter(sunrise, sunset, curtime));

function getCounter(sunrise, sunset, curtime) {
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
    return curtimeS / morningStep;
}



        const [labels, sin] = sunCalk(res.sunrise, res.sunset)
        // console.log(labels, sin)

        const sunPosition = getCounter(res.sunrise, res.sunset, time)

        let sun = document.createElement('img');
        sun.src = 'sun.png';

        let trueNoon = 12 + ((res.utcOffset/3600) - lon / 15)
        trueNoon = Math.floor(trueNoon) + ':' + (trueNoon % 1 * 0.6 * 100).toFixed()

        const shift = sunPosition < 24 || sunPosition > 72 ? 2 : 0

        if (!sunChart) {
          sunriseConfig.label.content = res.sunrise;
          sunsetConfig.label.content = res.sunset;
          trueNoonConfig.label.content = trueNoon;
          sunChartConfig.data.labels = labels;
          sunChartConfig.data.datasets[0].data = sin; // sinus
          sunChartConfig.data.datasets[1].data = sin.slice(0, sunPosition + 1);
          sunChartConfig.data.datasets[2].data = new Array(labels.length).fill(0) // горизонт
          sunChartConfig.data.datasets[3].data = sin.map(el => +el + 0.20 + '').slice(0, sunPosition + 1) 
          
          if (sunPosition > 1) {
            sunChartConfig.data.datasets[3].pointStyle[sunPosition - shift] = sun
          }

          sunChart = new Chart(myChartSun, sunChartConfig);
        } else {
            function addData(chart) {
              sunriseConfig.label.content = res.sunrise;
              sunsetConfig.label.content = res.sunset;
              trueNoonConfig.label.content = trueNoon;
              chart.data.datasets[1].data = sin.slice(0, sunPosition + 1)
              sunChartConfig.data.datasets[3].data = sin.map(el => +el + 0.20 + '').slice(0, Math.floor(sunPosition + 1));
              chart.data.datasets[3].data = sin.map(el => +el + 0.20 + '').slice(0, Math.floor(sunPosition + 1))
              chart.data.datasets[3].pointStyle = []
              if (sunPosition > 1) {
                sunChartConfig.data.datasets[3].pointStyle[sunPosition - shift] = sun
              }

              chart.update()
            }
            addData(sunChart);
        }
    })
}