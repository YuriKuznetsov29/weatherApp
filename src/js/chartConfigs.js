import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
    CHART_COLORS
} from './constants'

let arrow = document.createElement('img');
arrow.src = '/src/images/arrow.png';

const chartConfigs = () => {
    const tempChartConfig = {
        type: 'line',
        color: '#fff',
        data: {
            // labels: res.dailyTime,
            datasets: [{
                label: 'Temperature',
                //   data: res.dailyTemp,
                fill: 'start',
                backgroundColor: CHART_COLORS.blue,
                borderColor: CHART_COLORS.red,
                color: '#fff',
                tension: 0.1,
                datalabels: {
                    align: 'end',
                    // anchor: 'end'
                }    
            }]
        },
        options: {
            // responsive: false,
            maintainAspectRatio: false,
            scales: {
                y: {
                    // display: false,
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
                datalabels: {
                    padding: 10,
                },
                subtitle: {
                    display: true,
                    // text: day,
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
    const moiChartConfig = {
        type: 'line',
        color: '#fff',
        data: {
            // labels: res.dailyTime,
            datasets: [{
                label: 'Moisture',
                fill: 'start',
                backgroundColor: CHART_COLORS.purple,
                borderColor: CHART_COLORS.green,
                color: '#fff',
                tension: 0.1,
                // hidden: true
                pointHitRadius: 5,
            }, ]
        },
        options: {
            // responsive: false,
            maintainAspectRatio: false,
            scales: {
                y: {
                    // display: false,
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
                    // text: day,
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
    const windChartConfig = {
        type: 'line',
        color: '#fff',
        data: {
            // labels: res.dailyTime,
            datasets: [{
                label: 'Wind',
                // data: res.dailyWind,
                // fill: 'start',
                // backgroundColor: CHART_COLORS.yellow,
                borderColor: CHART_COLORS.orange,
                color: '#fff',
                tension: 0.1,
                // hidden: true,
                pointHitRadius: 10,
                // rotation: res.dailyWindDir,
                pointStyle: [arrow],
                borderWidth: 0,
                
            },
            {   
                type: 'bar',
                label: 'Wind',
                // data: res.dailyWind,
                fill: 'start',
                backgroundColor: CHART_COLORS.blue,
                // borderColor: CHART_COLORS.orange,
                color: '#fff',
                tension: 0.1,
                // hidden: true,
                pointHitRadius: 10,
                // rotation: res.dailyWindDir,
                pointStyle: [arrow],
            }, ]
        },
        options: {
            // responsive: false,
            maintainAspectRatio: false,
            showAllTooltips: true,
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
                    // text: day,
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
    const pressureChartConfig = {
        type: 'line',
        color: '#fff',
        data: {
            // labels: res.dailyTime,
            datasets: [{
                label: 'Pressure',
                // data: res.dailyPressure,
                fill: 'start',
                backgroundColor: CHART_COLORS.green,
                borderColor: CHART_COLORS.orange,
                color: '#fff',
                tension: 0.1,
                // hidden: true
                pointHitRadius: 5,
            }, ]
        },
        options: {
            // responsive: false,
            maintainAspectRatio: false,
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
                    // text: day,
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

    const sunCalk = () => {
        let labels = [];
        let sin = [];
        let sunrise = '06:48';

        let coefficient = (6.5 - (+sunrise.slice(0, 2) + (+sunrise.slice(3, 5) * (10/6))/100)) * 0.25
        console.log(coefficient)
        
        for (let i = -Math.PI / 2; i <= 1.5*Math.PI; i+=Math.PI/48) {
            labels.push(''+i.toFixed(10));
            sin.push(Math.sin(i).toFixed(10));
           }


           sin = sin.map(el => +el * 0.3 + coefficient)

           console.log(sin)


        return [labels, sin];
    }
    
    const sunChartConfig = {
        type: 'line',
        color: '#fff',
        data: {
            // labels: sunCalk()[0],
            datasets: [
                {
                    label: 'Sunrise / Sunset',
                    // data: sunCalk()[1],
                    fill: false,
                    backgroundColor: CHART_COLORS.yellow,
                    borderColor: CHART_COLORS.orange,
                    color: '#fff',
                    tension: 0.1,
                    // hidden: true
                    pointStyle: false,
                },
                {
                    label: 'Sunrise / Sunset',
                    // data: sunCalk()[1].slice(0, 25), // 6:30 18:30
                    fill: 'origin',
                    backgroundColor: CHART_COLORS.yellow,
                    borderColor: CHART_COLORS.orange,
                    color: '#fff',
                    tension: 0.1,
                    // hidden: true
                    pointStyle: [    '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, arrow],
                },
                {
                    label: 'Sunrise / Sunset',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                    fill: false,
                    backgroundColor: CHART_COLORS.yellow,
                    borderColor: CHART_COLORS.grey,
                    color: '#fff',
                    tension: 0.1,
                    // hidden: true
                    pointStyle: false,
                },
                {
                    label: 'Sunrise / Sunset',
                    data: [],
                    fill: false,
                    backgroundColor: CHART_COLORS.yellow,
                    borderColor: CHART_COLORS.grey,
                    color: '#fff',
                    tension: 0.1,
                    // hidden: true
                    pointStyle: false,
                }, 
        ]
        },
        options: {
            // responsive: false,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            elements: {
                point: {
                    display: false,
                },
            },
            scales: {
                y: {
                    min: -1.5,
                    max: 1.5,
                    beginAtZero: true,
                    // min: 0,
                    grid: {
                        display: false,
                    }
                },
                x: {
                    // min: 0,
                    // max: 20,
                    grid: {
                        display: false,
                    }
                }
            },
            plugins: {
                subtitle: {
                    display: true,
                    // text: day,
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
                },
                tooltip: {
                    enabled: false,
                },
                datalabels: {
                    display: false,
                }
            },
        }
    }

    return {
        tempChartConfig,
        moiChartConfig,
        windChartConfig,
        pressureChartConfig,
        sunChartConfig
    }
}

export default chartConfigs;