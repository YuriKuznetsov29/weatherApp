import chartConfigs from "../../chartConfigs";
import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, Filler, Legend} from "chart.js";
// import Chart from 'chart.js/auto';
// import { Chart, BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip} from 'chart.js';
// import { Chart, registerables} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';
import getData from "../../services";


const myChart = document.getElementById('myChart'),
      myChartMoi = document.getElementById('myChartMoi'),
      myChartWind = document.getElementById('myChartWind'),
      myChartPressure = document.getElementById('myChartPressure'),
      myChartSun = document.getElementById('myChartSun');

const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const currentDate = `${year}-${(month + 1) < 10 ? `0${(month + 1)}` : (month + 1)}-${day < 10 ? `0${day}` : day}`;
    return currentDate;
  }

const {tempChartConfig, moiChartConfig, windChartConfig, pressureChartConfig, sunChartConfig, sunriseConfig, sunsetConfig} = chartConfigs();
const {getWeather} = getData();

Chart.register(annotationPlugin, ChartDataLabels, LineController, LineElement, PointElement, CategoryScale, LinearScale, Filler, Legend);
// Chart.register(annotationPlugin);
// Chart.register(ChartDataLabels);

Chart.defaults.color = '#fff';
Chart.defaults.font.size = 16;
Chart.defaults.plugins.datalabels.align = 'end';


// Chart.register(ChartDataLabels);
// Chart.defaults.plugins.title.color = '#fff';
// Chart.defaults.plugins.legend.color = '#fff';
// Chart.defaults.backgroundColor = '#fff';


let tempChart;
let moiChart;
let windChart;
let pressureChart;
let sunChart;

export function createCharts(location, day = getCurrentDate()) {

    const {lat, lon} = location
    // debugger
    console.log('DEBUGGGGGGG')

// Chart.register(Chart, BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip, annotationPlugin, ChartDataLabels);



    const myChart = document.getElementById('myChart'),
          myChartMoi = document.getElementById('myChartMoi'),
          myChartWind = document.getElementById('myChartWind'),
          myChartPressure = document.getElementById('myChartPressure'),
          myChartSun = document.getElementById('myChartSun');

    getWeather(lat, lon, day).then((res) => {

        if (document.documentElement.clientWidth <= 600) {
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

        // if (!windChart) {
        //   windChartConfig.data.labels = res.dailyTime;
        //   windChartConfig.data.datasets[0].data = res.dailyWind.map(el => el + 2.5);
        //   windChartConfig.data.datasets[1].data = res.dailyWind;
        //   windChartConfig.data.datasets[0].rotation = res.dailyWindDir
        //   windChartConfig.options.plugins.subtitle.text = day + ' Wind';
        //   windChart = new Chart(myChartWind, windChartConfig);

        // } else {
        //     function addData(chart, label, data, rotation, day) {
        //       chart.data.labels = label;
        //       chart.data.datasets[0].data = data.map(el => el + 2.5);
        //       chart.data.datasets[0].rotation = rotation;
        //       windChartConfig.data.datasets[1].data = data;
        //       chart.options.plugins.subtitle.text = day + ' Wind';
        //       chart.update('active');
        //     }
        //     addData(windChart, res.dailyTime, res.dailyWind, res.dailyWindDir, day);
        // }

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

        const sunCalk = (sunrise, sunset) => {
          let labels = [];
          let sin = [];
          // let coefficient = (6.5 - (+sunrise.slice(0, 2) + (+sunrise.slice(3, 5) * (10/6))/100)) * 0.25;
          const step = Math.PI / ((+sunset.slice(0, 2) + (+sunset.slice(3, 5) * (10/6))/100) - (+sunrise.slice(0, 2) + (+sunrise.slice(3, 5) * (10/6))/100))
          
          for (let i = -Math.PI / 2; i <= 1.5*Math.PI; i+= (step / 4)) {
              labels.push(''+i.toFixed(10));
              sin.push(Math.sin(i).toFixed(10));
             }
  
          return [labels, sin];
        }

        const [labels, sin] = sunCalk(res.sunrise, res.sunset)

        const date = new Date();
        const time = date.getHours() + (date.getMinutes() * (10/6)/100);

        let sun = document.createElement('img');
        sun.src = 'sun.png';

        // if (!sunChart) {
        //   sunriseConfig.label.content = res.sunrise;
        //   sunsetConfig.label.content = res.sunset;
        //   sunChartConfig.data.labels = labels;
        //   sunChartConfig.data.datasets[0].data = sin;
        //   sunChartConfig.data.datasets[1].data = sin.slice(0, Math.floor(time * 4));
        //   sunChartConfig.data.datasets[2].data = new Array(114).fill(0)
        //   sunChartConfig.data.datasets[3].data = sin.map(el => +el + 0.20 + '').slice(0, Math.floor((time * 4) - 2));
        //   sunChartConfig.data.datasets[3].pointStyle[sunChartConfig.data.datasets[3].data.length - 1] = sun;
        //   sunChartConfig.options.plugins.subtitle.text = `${day}\n` + 'Sunrise / Sunset';
        //   sunChart = new Chart(myChartSun, sunChartConfig);
        // } else {
        //     function addData(chart, label, data, day) {
        //       chart.data.labels = label;
        //       chart.data.datasets[0].data = data;
        //       chart.options.plugins.subtitle.text = day;
        //       chart.update('active');
        //     }
        //     addData(pressureChart, res.dailyTime, res.dailyPressure, day);
        // }
    })
}

