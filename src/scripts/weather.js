// Weather widget for Gentelella Admin Dashboard
export function initializeWeatherWidget() {
    const weatherContainer = document.getElementById('weatherWidget');
    if (!weatherContainer) return;

    // Sample weather data (in a real app, this would come from an API)
    const weatherData = {
        location: 'New York, NY',
        temperature: 72,
        condition: 'Sunny',
        humidity: 65,
        windSpeed: 8,
        icon: 'wi-day-sunny'
    };

    renderWeatherWidget(weatherContainer, weatherData);
}

function renderWeatherWidget(container, data) {
    container.innerHTML = `
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">
                    <i class="fa fa-cloud"></i> Weather
                </h5>
                <small class="text-muted">${data.location}</small>
            </div>
            <div class="card-body text-center">
                <div class="weather-main mb-3">
                    <i class="wi ${data.icon} weather-icon"></i>
                    <div class="temperature">
                        <span class="temp-value">${data.temperature}</span>
                        <span class="temp-unit">°F</span>
                    </div>
                    <div class="condition">${data.condition}</div>
                </div>
                <div class="weather-details row text-center">
                    <div class="col-6">
                        <div class="detail-item">
                            <i class="wi wi-humidity"></i>
                            <div class="detail-value">${data.humidity}%</div>
                            <small class="text-muted">Humidity</small>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="detail-item">
                            <i class="wi wi-strong-wind"></i>
                            <div class="detail-value">${data.windSpeed} mph</div>
                            <small class="text-muted">Wind</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to update weather data (can be called periodically)
export function updateWeatherData() {
    // In a real application, you would fetch data from a weather API
    // For demo purposes, we'll simulate changing weather
    const weatherContainer = document.getElementById('weatherWidget');
    if (!weatherContainer) return;

    // Simulate weather change
    const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'];
    const icons = ['wi-day-sunny', 'wi-cloudy', 'wi-rain', 'wi-day-cloudy'];
    const randomIndex = Math.floor(Math.random() * conditions.length);

    const updatedData = {
        location: 'New York, NY',
        temperature: Math.floor(Math.random() * 30) + 60, // 60-90°F
        condition: conditions[randomIndex],
        humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
        windSpeed: Math.floor(Math.random() * 15) + 5, // 5-20 mph
        icon: icons[randomIndex]
    };

    renderWeatherWidget(weatherContainer, updatedData);
}

// Function to create weather forecast
export function createWeatherForecast() {
    const forecastData = [
        { day: 'Today', high: 75, low: 65, icon: 'wi-day-sunny' },
        { day: 'Tomorrow', high: 78, low: 68, icon: 'wi-day-cloudy' },
        { day: 'Wed', high: 72, low: 62, icon: 'wi-rain' },
        { day: 'Thu', high: 70, low: 60, icon: 'wi-day-sunny' },
        { day: 'Fri', high: 73, low: 63, icon: 'wi-cloudy' }
    ];

    const forecastHTML = forecastData.map(day => `
        <div class="forecast-day text-center">
            <div class="day-name">${day.day}</div>
            <i class="wi ${day.icon} forecast-icon"></i>
            <div class="forecast-temp">
                <span class="high">${day.high}°</span>
                <span class="low text-muted">${day.low}°</span>
            </div>
        </div>
    `).join('');

    return `<div class="weather-forecast">${forecastHTML}</div>`;
}
