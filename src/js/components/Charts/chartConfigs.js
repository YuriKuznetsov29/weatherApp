import {CHART_COLORS} from '../../constants'

let arrow = document.createElement('img');
arrow.src = 'arrow-up-bold.svg';

const chartConfigs = () => {
    const tempChartConfig = {
        type: 'line',
        color: '#fff',
        data: {
            datasets: [{
                label: 'Temperature',
                fill: 'start',
                backgroundColor: CHART_COLORS.blue,
                borderColor: CHART_COLORS.red,
                color: '#fff',
                tension: 0.1,
                datalabels: {
                    align: 'end',
                }    
            }]
        },
        options: {
            maintainAspectRatio: false,
            layout: {
                padding: 15
            },
            scales: {
                y: {
                    display: false,
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
                    display: false,
                    labels: {
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
            datasets: [{
                borderColor: CHART_COLORS.orange,
                color: '#fff',
                tension: 0.1,
                pointHitRadius: 10,
                pointStyle: [arrow],
                borderWidth: 0,
                datalabels: {
                    display: false,
                }
            },
            {   
                type: 'bar',
                label: 'Wind',
                fill: 'start',
                backgroundColor: CHART_COLORS.blue,
                color: '#fff',
                tension: 0.1,
                pointHitRadius: 10,
                datalabels: {
                    anchor: 'end'
                }
            }, ]
        },
        options: {
            maintainAspectRatio: false,
            showAllTooltips: true,
            scales: {
                y: {
                    display: false,
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
                    font: {
                        size: 24
                    },
                },
                legend: {
                    display: false,
                    labels: {
                        font: {
                            size: 24
                        }
                    },
                    
                },
                tooltip: {
                    enabled: false,
                },
            },
        }
    }

    const annotation1 = {
        type: 'line',
        borderColor: 'black',
        borderWidth: 0,
        label: {
          backgroundColor: 'rgba(0, 0, 0, 0.0)',
          color: '#000',
          content: 'Горизонт',
          display: true
        },
        yScaleID: 'y',
        yMax: 0.15,
	    yMin:  0.15,

        xScaleID: 'x',
        xMax: 95,
	    xMin: 95,
    };

    const sunriseConfig = {
        type: 'line',
        borderColor: 'black',
        borderWidth: 0,
        label: {
          backgroundColor: 'rgba(0, 0, 0, 0.0)',
          color: '#000',
          content: '6:00',
          display: true
        },
        yScaleID: 'y',
        yMax: -0.9,
	    yMin: -0.9,

        xScaleID: 'x',
        xMax: 20,
	    xMin:  20,
    };

    const annotation3 = {
        type: 'line',
        borderColor: 'black',
        borderWidth: 0,
        label: {
          backgroundColor: 'rgba(0, 0, 0, 0.0)',
          color: '#000',
          content: 'Рассвет',
          display: true
        },
        yScaleID: 'y',
        yMax: -0.8,
	    yMin: -0.8,

        xScaleID: 'x',
        xMax: 20,
	    xMin:  20,
    };

    const annotation4 = {
        type: 'line',
        borderColor: 'black',
        borderWidth: 0,
        label: {
          backgroundColor: 'rgba(0, 0, 0, 0.0)',
          color: '#000',
          content: 'Истинный полдень',
          display: true
        },
        yScaleID: 'y',
        yMax: -0.8,
	    yMin: -0.8,

        xScaleID: 'x',
        xMax: 48,
	    xMin: 48,
    };

    const trueNoonConfig = {
        type: 'line',
        borderColor: 'black',
        borderWidth: 0,
        label: {
          backgroundColor: 'rgba(0, 0, 0, 0.0)',
          color: '#000',
          content: '12:00',
          display: true
        },
        yScaleID: 'y',
        yMax: -0.9,
	    yMin: -0.9,

        xScaleID: 'x',
        xMax: 48,
	    xMin: 48,
    };

    const sunsetConfig = {
        type: 'line',
        borderColor: 'black',
        borderWidth: 0,
        label: {
          backgroundColor: 'rgba(0, 0, 0, 0.0)',
          color: '#000',
          content: '18:00',
          display: true
        },

        yScaleID: 'y',
        yMax: -0.9,
	    yMin: -0.9,

        xScaleID: 'x',
        xMax: 75,
	    xMin:  75,
    };

    const annotation5 = {
        type: 'line',
        borderColor: 'black',
        borderWidth: 0,
        label: {
          backgroundColor: 'rgba(0, 0, 0, 0.0)',
          color: '#000',
          content: 'Закат',
          display: true
        },

        yScaleID: 'y',
        yMax: -0.8,
	    yMin: -0.8,

        xScaleID: 'x',
        xMax: 75,
	    xMin:  75,
    };

    const sunChartConfig = {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Sunrise / Sunset',
                    fill: false,
                    backgroundColor: CHART_COLORS.yellow,
                    borderColor: CHART_COLORS.orange,
                    color: '#fff',
                    tension: 0.1,
                    pointStyle: false,
                },
                {
                    label: 'Sunrise / Sunset',
                    fill: {
                        target: 'origin',
                        above: CHART_COLORS.yellow,  
                        below: CHART_COLORS.purple,    
                      },
                    backgroundColor: CHART_COLORS.yellow,
                    borderColor: CHART_COLORS.orange,
                    color: '#fff',
                    tension: 0.1,
                    
                },
                {
                    label: 'Sunrise / Sunset',
                    data: [],
                    fill: false,
                    backgroundColor: CHART_COLORS.yellow,
                    borderColor: CHART_COLORS.grey,
                    color: '#fff',
                    tension: 0.1,
                    pointStyle: false,
                },
                {
                    label: 'Sunrise / Sunset',
                    fill: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.0)',
                    borderColor: 'rgba(0, 0, 0, 0.0)',
                    color: '#fff',
                    tension: 0.1,
                    borderWidth: 3,
                    pointStyle: [],
                    pointHitRadius: 0
                }, 
        ]
        },
        options: {
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            hover: {mode: null},
            elements: {
                point: {
                    display: false,
                    borderWidth: 0,
                    radius: 1,
                    hitRadius: -1,
                    hoverRadius: 0,
                    howerBorderWidth: 0,
                    hover: false
                },
            },
            scales: {
                y: {
                    min: -1.5,
                    max: 1.5,
                    display: false,
                    beginAtZero: true,
                    grid: {
                        display: false,
                    }
                },
                x: {
                    display: false,
                    grid: {
                        display: false,
                    }
                }
            },
            plugins: {
                subtitle: {
                    display: true,
                    font: {
                        size: 24
                    },
                    
                },
                legend: {
                    display: false,

                    labels: {
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
                },
                annotation: {
                    annotations: {
                        annotation1,
                        sunriseConfig,
                        annotation3,
                        sunsetConfig,
                        annotation5,
                        annotation4,
                        trueNoonConfig
                    }
                }
            },
        }
    }

    return {
        tempChartConfig,
        windChartConfig,
        sunChartConfig,
        sunriseConfig,
        sunsetConfig,
        trueNoonConfig
    }
}

export default chartConfigs;