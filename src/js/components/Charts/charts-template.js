export function getChartsTemplate() {
    return `<div class="chart__inner">
    <div class="container" id="chartContainer">
            <div class="chartTitle">Температура</div>
            <div class="chartWrapper">
                <div class="loadingChart">
                    <div class="gradient"></div>
                </div>
                <div class="chart-container">
                    <canvas class="chart" id="myChart" ></canvas>
                </div>
            </div>
        </div>
    </div>

    <div class="chart__inner">
        <div class="container" id="chartContainer">
            <div class="chartTitle">Ветер</div>
            <div class="loadingChart">
                <div class="gradient"></div>
            </div>
            <div class="chartWrapper">
                <div class="chart-container">
                    <canvas class="chart" id="myChartWind" ></canvas>
                </div>
            </div>
        </div>
    </div>

    <div class="chart__inner">
        <div class="container" id="chartContainer">
            <div class="chartTitle">Восход и закат солнца</div>
            <div class="loadingChart">
                <div class="gradient"></div>
            </div>
            <div class="chartWrapper">
                <div class="sunChart-container">
                    <canvas class="chart" id="myChartSun" >
                    </canvas>
                    <div class="text">Horizon</div>
                </div>
            </div>
        </div>
    </div>`
}