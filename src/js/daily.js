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
      myChartSun = document.getElementById('myChartSun'),
      inputDay = document.querySelector('.day__input'),
      inputDateBtn = document.querySelector('.enterBtn'),
      dayErrorMessage = document.querySelector('.day__errorMessage'),
      nextDayBtn = document.querySelector('.day__next'),
      previousDayBtn = document.querySelector('.day__previous'),
      burger = document.querySelector('.burger'),
      nav = document.querySelector('.nav');

const {getWeather} = getData();
const {tempChartConfig, moiChartConfig, windChartConfig, pressureChartConfig, sunChartConfig} = chartConfigs();





burger.addEventListener('click', () => {
    if (nav.style.display === 'none') {
      nav.style.display = 'block';
    } else {
      nav.style.display = 'none';
    }
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
Chart.defaults.plugins.datalabels.align = 'end';
console.log(Chart.defaults)

let tempChart;
let moiChart;
let windChart;
let pressureChart;
let sunChart;



const getWeatherOnCity = (lat, lon, day = getCurrentDate()) => {
    getWeather(lat, lon, day).then((res) => {

        if (document.documentElement.clientWidth <= 600) {
          // chartConfig.options.plugins.subtitle.font.size = 12;
          // chartConfig.options.plugins.legend.labels.font.size = 12;
          // Chart.defaults.options.plugins.subtitle.font.size = 12;
          // Chart.defaults.options.plugins.legend.labels.font.size = 12;
          // tempChart.options.scales.y.display = 'fals e';
          // console.log(tempChart.options.scales.y.display)
          tempChartConfig.options.scales.y.display = false;
          moiChartConfig.options.scales.y.display = false;
          windChartConfig.options.scales.y.display = false;
          pressureChartConfig.options.scales.y.display = false;
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
          // if (document.documentElement.clientWidth <= 600) {
          //   tempChartConfig.options.scales.y.display = false;
          // }
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
          windChartConfig.data.datasets[1].data = res.dailyWind;
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

        const sunCalk = (sunrise) => {
          let labels = [];
          let sin = [];
          // let sunrise = '06:48';
  
          let coefficient = (6.5 - (+sunrise.slice(0, 2) + (+sunrise.slice(3, 5) * (10/6))/100)) * 0.25;
          
          for (let i = -Math.PI / 2; i <= 1.5*Math.PI; i+=Math.PI/48) {
              labels.push(''+i.toFixed(10));
              sin.push(Math.sin(i).toFixed(10));
             }
  
             sin = sin.map(el => +el + coefficient)
  
            //  console.log(sin)
  
          return [labels, sin];
        }

        // const sunCalkk = (sunrise, sunset) => {
        //   let labels = [];
        //   let sin = [];
        //   // let sunrise = '06:48';
  
        //   let coefficient = (6.5 - (+sunrise.slice(0, 2) + (+sunrise.slice(3, 5) * (10/6))/100)) * 0.25;
        //   console.log((+sunset.slice(0, 2) + (+sunset.slice(3, 5) * (10/6))/100))

        //   console.log( Math.PI / ((+sunrise.slice(0, 2) + (+sunrise.slice(3, 5) * (10/6))/100) - (+sunset.slice(0, 2) + (+sunset.slice(3, 5) * (10/6))/100)) )

        //   const step = Math.PI / ((+sunrise.slice(0, 2) + (+sunrise.slice(3, 5) * (10/6))/100) - (+sunset.slice(0, 2) + (+sunset.slice(3, 5) * (10/6))/100))
          
        //   for (let i = -Math.PI / 2; i < 1.5*Math.PI; i += step ) {
        //       labels.push(''+i.toFixed(10));
        //       sin.push(Math.sin(i).toFixed(10));
        //      }
  
        //      sin = sin.map(el => +el + coefficient)
  
        //      console.log(sin)
  
        //   return [labels, sin];
        // }

        // sunCalkk(res.sunrise, res.sunset)


        const date = new Date();
        const time = date.getHours() + (date.getMinutes() * (10/6)/100)
        console.log(time)

        if (!sunChart) {
          console.log(res.dailyTime)
          sunChartConfig.data.labels = sunCalk(res.sunrise)[0];
          sunChartConfig.data.datasets[0].data =  sunCalk(res.sunrise)[1];
          sunChartConfig.data.datasets[1].data =  sunCalk(res.sunrise)[1].slice(0, Math.floor(time * 4));
          sunChartConfig.options.plugins.subtitle.text = day;
          sunChart = new Chart(myChartSun, sunChartConfig);
          const ctx = myChartSun.getContext("2d");
                ctx.font = "48px serif";
                ctx.color = "#fff";
                ctx.fillText("Hello world", 50, 100);

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



