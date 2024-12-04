
function getRealTimeData() {
    return {
        soil_moisture: (Math.random() * 100).toFixed(2),
        nutrient_level: (Math.random() * 10).toFixed(2),
        temperature: (Math.random() * 30 + 10).toFixed(2),
        weather: "Sunny with a slight chance of rain",
        recommendation: "Irrigation required in 3 days.",
        predicted_demand: (Math.random() * 500).toFixed(0),
        crop_price: (Math.random() * 5 + 1).toFixed(2)
    };
}

// Simulate AI Model for Demand Forecasting using TensorFlow.js
async function predictCropDemand() {
    // Simple Linear Regression for prediction (use historical data in a real-world scenario)
    const model = await tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

    // Mock training data (in a real application, you'd use historical data for training)
    const inputs = tf.tensor2d([1, 2, 3, 4, 5], [5, 1]);
    const outputs = tf.tensor2d([200, 250, 300, 350, 400], [5, 1]);

    // Train the model
    await model.fit(inputs, outputs, { epochs: 100 });

    // Predict the crop demand for the next period (e.g., month 6)
    const prediction = model.predict(tf.tensor2d([6], [1, 1]));
    const predictedDemand = prediction.dataSync()[0].toFixed(0);

    return predictedDemand;
}

// Fetch data and update the UI
function updateUI() {
    const data = getRealTimeData();

    document.getElementById('soil_moisture').innerText = data.soil_moisture;
    document.getElementById('nutrient_level').innerText = data.nutrient_level;
    document.getElementById('temperature').innerText = data.temperature;
    document.getElementById('weather').innerText = data.weather;
    document.getElementById('recommendation').innerText = data.recommendation;
    document.getElementById('predicted_demand').innerText = data.predicted_demand;
    document.getElementById('crop_price').innerText = data.crop_price;
}

// Call the functions to populate the data
async function loadData() {
    updateUI();
    const predictedDemand = await predictCropDemand();
    document.getElementById('predicted_demand').innerText = predictedDemand;
}

// Update data every 5 seconds (simulating real-time data fetching)
setInterval(loadData, 5000);
loadData(); // initial load