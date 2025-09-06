// Charts initialization for Gentelella Admin Dashboard
import Chart from 'chart.js/auto';
import * as echarts from 'echarts';

export function initializeCharts() {
    // Chart.js - Sales Overview Chart
    const salesChartCanvas = document.getElementById('salesChart');
    if (salesChartCanvas) {
        const salesChart = new Chart(salesChartCanvas, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Sales',
                    data: [1200, 1900, 3000, 5000, 2000, 3000, 4500, 4000, 3500, 6000, 5500, 7000],
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Monthly Sales Overview'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Sales: $${context.parsed.y.toLocaleString()}`;
                            }
                        }
                    },
                    legend: {
                        onClick: function(e, legendItem) {
                            // Custom legend click handler
                            const index = legendItem.datasetIndex;
                            const chart = this.chart;
                            const meta = chart.getDatasetMeta(index);

                            // Toggle dataset visibility
                            meta.hidden = meta.hidden === null ? !chart.data.datasets[index].hidden : null;

                            // Update the chart
                            chart.update();

                            // Show notification
                            showChartNotification(`${legendItem.text} ${meta.hidden ? 'hidden' : 'shown'}`);
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                },
                onClick: (event, elements) => {
                    if (elements.length > 0) {
                        const element = elements[0];
                        const dataIndex = element.index;
                        const datasetIndex = element.datasetIndex;
                        const value = event.chart.data.datasets[datasetIndex].data[dataIndex];

                        showChartNotification(`Clicked on ${event.chart.data.labels[dataIndex]}: $${value.toLocaleString()}`);
                    }
                }
            }
        });
    }

    // Chart.js - Traffic Sources Pie Chart
    const trafficChartCanvas = document.getElementById('trafficChart');
    if (trafficChartCanvas) {
        const trafficChart = new Chart(trafficChartCanvas, {
            type: 'doughnut',
            data: {
                labels: ['Direct', 'Social Media', 'Email', 'Search', 'Referral'],
                datasets: [{
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(153, 102, 255)'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // ECharts - Additional chart examples
    initializeECharts();
}

function initializeECharts() {
    // ECharts example - Bar chart
    const barChartDom = document.getElementById('echarts-bar');
    if (barChartDom) {
        const barChart = echarts.init(barChartDom);
        const option = {
            title: {
                text: 'ECharts Bar Chart'
            },
            tooltip: {},
            legend: {
                data: ['Sales']
            },
            xAxis: {
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {},
            series: [{
                name: 'Sales',
                type: 'bar',
                data: [120, 200, 150, 80, 70, 110, 130]
            }]
        };
        barChart.setOption(option);
    }

    // ECharts example - Area chart
    const areaChartDom = document.getElementById('echarts-area');
    if (areaChartDom) {
        const areaChart = echarts.init(areaChartDom);
        const option = {
            title: {
                text: 'ECharts Area Chart'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330],
                type: 'line',
                areaStyle: {}
            }]
        };
        areaChart.setOption(option);
    }
}

// Chart notification system
function showChartNotification(message) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.chart-notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'alert alert-info alert-dismissible fade show chart-notification';
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    notification.innerHTML = `
        <i class="fa fa-chart-line me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 150);
        }
    }, 3000);
}

// Function to update chart data dynamically
export function updateChartData(chartId, newData, newLabels = null) {
    const canvas = document.getElementById(chartId);
    if (!canvas) return;

    const chart = Chart.getChart(canvas);
    if (!chart) return;

    if (newLabels) {
        chart.data.labels = newLabels;
    }

    chart.data.datasets.forEach((dataset, index) => {
        if (newData[index]) {
            dataset.data = newData[index];
        }
    });

    chart.update();
}

// Function to add data point to chart
export function addDataPoint(chartId, label, data) {
    const canvas = document.getElementById(chartId);
    if (!canvas) return;

    const chart = Chart.getChart(canvas);
    if (!chart) return;

    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset, index) => {
        dataset.data.push(data[index] || 0);
    });

    chart.update();
}

// Function to remove last data point from chart
export function removeLastDataPoint(chartId) {
    const canvas = document.getElementById(chartId);
    if (!canvas) return;

    const chart = Chart.getChart(canvas);
    if (!chart) return;

    chart.data.labels.pop();
    chart.data.datasets.forEach(dataset => {
        dataset.data.pop();
    });

    chart.update();
}

// Additional chart types can be added here
export function createCustomChart(chartType, elementId, data) {
    const element = document.getElementById(elementId);
    if (!element) return;

    switch (chartType) {
        case 'radar':
            return new Chart(element, {
                type: 'radar',
                data: data
            });
        case 'polarArea':
            return new Chart(element, {
                type: 'polarArea',
                data: data
            });
        default:
            console.warn(`Chart type ${chartType} not supported`);
            return null;
    }
}
