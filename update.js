// update.js

// Sample data for alerts (simulating real-time updates)
const alertsData = [
    {
        category: 'weather',
        message: 'Heavy rainfall warning for [Region] in the next 24 hours.',
        timestamp: new Date(),
    },
    {
        category: 'disaster',
        message: 'Locust swarm reported in [Region]. Take precautionary measures.',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    },
    {
        category: 'market',
        message: 'Price of wheat increased by 5% in [Market].',
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    },
    {
        category: 'policy',
        message: 'New subsidy announced for [Crop] farmers in [Region].',
        timestamp: new Date(Date.now() - 10800000), // 3 hours ago
    }
];

// Sample data for market insights (simulating AI-driven updates)
const marketData = {
    wheat: {
        prices: [
            { timestamp: new Date(Date.now() - 86400000), price: 2000 }, // 1 day ago
            { timestamp: new Date(Date.now() - 43200000), price: 2100 }, // 12 hours ago
            { timestamp: new Date(), price: 2200 }, // Current price
        ],
        demand: 'High',
        region: '[Region]'
    },
    rice: {
        prices: [
            { timestamp: new Date(Date.now() - 86400000), price: 1500 },
            { timestamp: new Date(Date.now() - 43200000), price: 1550 },
            { timestamp: new Date(), price: 1600 },
        ],
        demand: 'Moderate',
        region: '[Region]'
    },
    maize: {
        prices: [
            { timestamp: new Date(Date.now() - 86400000), price: 1200 },
            { timestamp: new Date(Date.now() - 43200000), price: 1250 },
            { timestamp: new Date(), price: 1300 },
        ],
        demand: 'Very High',
        region: '[Region]'
    },
    soybean: {
        prices: [
            { timestamp: new Date(Date.now() - 86400000), price: 4000 },
            { timestamp: new Date(Date.now() - 43200000), price: 4100 },
            { timestamp: new Date(), price: 4200 },
        ],
        demand: 'Low',
        region: '[Region]'
    },
    cotton: {
        prices: [
            { timestamp: new Date(Date.now() - 86400000), price: 5000 },
            { timestamp: new Date(Date.now() - 43200000), price: 5100 },
            { timestamp: new Date(), price: 5200 },
        ],
        demand: 'Medium',
        region: '[Region]'
    },
    barley: {
        prices: [
            { timestamp: new Date(Date.now() - 86400000), price: 1800 },
            { timestamp: new Date(Date.now() - 43200000), price: 1850 },
            { timestamp: new Date(), price: 1900 },
        ],
        demand: 'High',
        region: '[Region]'
    },
    sugarcane: {
        prices: [
            { timestamp: new Date(Date.now() - 86400000), price: 2500 },
            { timestamp: new Date(Date.now() - 43200000), price: 2600 },
            { timestamp: new Date(), price: 2700 },
        ],
        demand: 'Moderate',
        region: '[Region]'
    },
    corn: {
        prices: [
            { timestamp: new Date(Date.now() - 86400000), price: 1300 },
            { timestamp: new Date(Date.now() - 43200000), price: 1350 },
            { timestamp: new Date(), price: 1400 },
        ],
        demand: 'Very High',
        region: '[Region]'
    },
    vegetables: {
        prices: [
            { timestamp: new Date(Date.now() - 86400000), price: 3000 },
            { timestamp: new Date(Date.now() - 43200000), price: 3100 },
            { timestamp: new Date(), price: 3200 },
        ],
        demand: 'Low',
        region: '[Region]'
    },
    fruits: {
        prices: [
            { timestamp: new Date(Date.now() - 86400000), price: 4500 },
            { timestamp: new Date(Date.now() - 43200000), price: 4600 },
            { timestamp: new Date(), price: 4700 },
        ],
        demand: 'Medium',
        region: '[Region]'
    }
};

// Function to display market insights (line graphs for prices)
function displayMarketInsights() {
    const productGraphs = document.getElementById('product-graphs');
    if (!productGraphs) {
        console.error('Error: Product graphs element not found.');
        return;
    }

    productGraphs.innerHTML = ''; // Clear previous graphs

    if (Object.keys(marketData).length === 0) {
        productGraphs.innerHTML = '<p>No market data available at the moment.</p>';
        return;
    }

    Object.keys(marketData).forEach(crop => {
        const cropDiv = document.createElement('div');
        cropDiv.innerHTML = `
            <h3>${crop.toUpperCase()}</h3>
            <canvas id="${crop}-chart"></canvas>
        `;
        productGraphs.appendChild(cropDiv);

        // Create a line chart using Chart.js
        new Chart(document.getElementById(`${crop}-chart`), {
            type: 'line',
            data: {
                labels: marketData[crop].prices.map(item => item.timestamp.toLocaleTimeString()),
                datasets: [{
                    label: 'Price (INR)',
                    data: marketData[crop].prices.map(item => item.price),
                    borderColor: '#4CAF50',
                    fill: false
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'hour'
                        },
                        title: {
                            display: true,
                            text: 'Time'
                        }
                    },
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Price (INR)'
                        }
                    }
                }
            }
        });
    });

    // Add the demand bar graph
    createDemandBarGraph();
    createMarketTrendBarGraph(); // Call the new function
}

// Function to create a bar graph for product demand
function createDemandBarGraph() {
    const ctx = document.getElementById('demand-bar-chart').getContext('2d');

    // Extract product names and demand values
    const productNames = Object.keys(marketData).map(crop => crop.toUpperCase());
    const productDemand = Object.values(marketData).map(crop => {
        switch (crop.demand.toLowerCase()) {
            case 'very high': return 90;
            case 'high': return 80;
            case 'medium': return 60;
            case 'moderate': return 50;
            case 'low': return 40;
            default: return 50;
        }
    });

    // Create the bar chart using Chart.js
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productNames, // X-axis labels
            datasets: [{
                label: 'Demand (in %)',
                data: productDemand, // Y-axis data
                backgroundColor: [
                    '#4CAF50', '#FF9800', '#2196F3', '#FFC107', '#9C27B0',
                    '#8BC34A', '#FF5722', '#00BCD4', '#CDDC39', '#673AB7'
                ],
                borderColor: [
                    '#388E3C', '#F57C00', '#1976D2', '#FFA000', '#7B1FA2',
                    '#689F38', '#E64A19', '#0097A7', '#AFB42B', '#512DA8'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Agricultural Products'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Demand (in %)'
                    }
                }
            }
        }
    });
}

function createMarketTrendBarGraph() {
    const ctx = document.getElementById('market-trend-bar-chart').getContext('2d');
    const productNames = Object.keys(marketData).map(crop => crop.toUpperCase());
    const latestPrices = Object.values(marketData).map(crop => crop.prices[crop.prices.length - 1].price);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productNames,
            datasets: [{
                label: 'Latest Price (INR)',
                data: latestPrices,
                backgroundColor: 'green'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 500000,
                    },
                    title: {
                        display: true,
                        text: 'Price (INR)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Agricultural Products'
                    }
                }
            }
        }
    });
}

// Function to display alerts in the notification bar
function displayAlerts(filteredAlerts = null) {
    const alertList = document.getElementById('alert-list');
    if (!alertList) {
        console.error('Error: Alert list element not found.');
        return;
    }

    alertList.innerHTML = ''; // Clear previous alerts

    const alertsToDisplay = filteredAlerts || alertsData;

    if (alertsToDisplay.length === 0) {
        alertList.innerHTML = '<p>No alerts available at the moment.</p>';
        return;
    }

    // Sort alerts by timestamp (newest first)
    alertsToDisplay.sort((a, b) => b.timestamp - a.timestamp);

    // Prioritize weather and disaster alerts
    const prioritizedAlerts = alertsToDisplay.filter(alert => alert.category === 'weather' || alert.category === 'disaster');
    const otherAlerts = alertsToDisplay.filter(alert => alert.category !== 'weather' && alert.category !== 'disaster');

    // Combine prioritized and other alerts
    const allAlerts = [...prioritizedAlerts, ...otherAlerts];

    // Display each alert
    allAlerts.forEach(alert => {
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('alert', alert.category); // Add category as a class for styling
        alertDiv.innerHTML = `
            <p><strong>${alert.category.toUpperCase()}:</strong> ${alert.message}</p>
            <p class="timestamp">${formatTimestamp(alert.timestamp)}</p>
        `;
        alertList.appendChild(alertDiv);
    });
}

// Helper function to format timestamps
function formatTimestamp(timestamp) {
    return `${timestamp.toLocaleTimeString()} - ${timestamp.toLocaleDateString()}`;
}

// Function to initialize alert settings modal
function initializeAlertSettings() {
    const alertSettingsButton = document.getElementById('alert-settings');
    const alertSettingsModal = document.createElement('div');
    alertSettingsModal.id = 'alert-settings-modal';
    alertSettingsModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Alert Settings</h2>
            <label><input type="checkbox" id="weather-alerts" checked> Weather Alerts</label><br>
            <label><input type="checkbox" id="disaster-alerts" checked> Disaster Alerts</label><br>
            <label><input type="checkbox" id="market-alerts" checked> Market Alerts</label><br>
            <label><input type="checkbox" id="policy-alerts" checked> Policy Alerts</label><br>
            <label>Location: <input type="text" id="alert-location" placeholder="Enter location"></label><br>
            <label>Crop: <input type="text" id="alert-crop" placeholder="Enter crop"></label><br>
            <label>Delivery:
                <select id="alert-delivery">
                    <option value="push">Push</option>
                    <option value="sms">SMS</option>
                    <option value="email">Email</option>
                </select>
            </label><br>
            <button id="save-alert-settings">Save</button>
        </div>
    `;
    document.body.appendChild(alertSettingsModal);

    const closeModal = alertSettingsModal.querySelector('.close-modal');
    const saveAlertSettings = alertSettingsModal.querySelector('#save-alert-settings');

    alertSettingsButton.addEventListener('click', () => {
        alertSettingsModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        alertSettingsModal.style.display = 'none';
    });

    saveAlertSettings.addEventListener('click', () => {
        // Save alert settings
        const weatherAlerts = document.getElementById('weather-alerts').checked;
        const disasterAlerts = document.getElementById('disaster-alerts').checked;
        const marketAlerts = document.getElementById('market-alerts').checked;
        const policyAlerts = document.getElementById('policy-alerts').checked;
        const alertLocation = document.getElementById('alert-location').value;
        const alertCrop = document.getElementById('alert-crop').value;
        const alertDelivery = document.getElementById('alert-delivery').value;

        // Filter alerts based on user settings
        const filteredAlerts = alertsData.filter(alert => {
            if (alert.category === 'weather' && !weatherAlerts) return false;
            if (alert.category === 'disaster' && !disasterAlerts) return false;
            if (alert.category === 'market' && !marketAlerts) return false;
            if (alert.category === 'policy' && !policyAlerts) return false;

            // Add logic to filter by location and crop if needed
            return true;
        });

        // Update alert display
        displayAlerts(filteredAlerts);

        alertSettingsModal.style.display = 'none';
    });
}

// Initialize market insights and alerts on page load
document.addEventListener('DOMContentLoaded', () => {
    displayMarketInsights();
    displayAlerts();
    initializeAlertSettings();
});
