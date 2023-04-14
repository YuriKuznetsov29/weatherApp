export function getChartsTemplate() {
    return `<div class="chart__inner">
    <div class="container">
        <div class="chartWrapper">
            <div class="chart-container">
                <canvas class="chart" id="myChart" ></canvas>
            </div>
        </div>
    </div>
</div>

<div class="chart__inner">
    <div class="container">
        <div class="chartWrapper">
            <div class="chart-container">
                <canvas class="chart" id="myChartMoi" ></canvas>
            </div>
        </div>
    </div>
</div>

<div class="chart__inner">
    <div class="container">
        <div class="chartWrapper">
            <div class="chart-container">
                <canvas class="chart" id="myChartWind" ></canvas>
            </div>
        </div>
    </div>
</div>
<div class="chart__inner">
    <div class="container">
        <div class="chartWrapper">
            <div class="chart-container">
                <canvas class="chart" id="myChartPressure" ></canvas>
            </div>
        </div>
    </div>
</div>
<div class="chart__inner">
    <div class="container">
        <div class="chartWrapper">
            <div class="chart-container">
                <canvas class="chart" id="myChartSun" >
                </canvas>
                <div class="text">Horizon</div>
            </div>
        </div>
    </div>
</div>`
}