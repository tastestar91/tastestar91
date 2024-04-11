const tf = require("@tensorflow/tfjs");
const tfn = require("@tensorflow/tfjs-node");

console.log("여기");
// Define your time series data
const timeSeriesData = [1, 2, 3, 10, 5, 6, 7, 4, 3, 2, 1];

// Convert the data to a TensorFlow tensor
const dataTensor = tf.tensor1d(timeSeriesData);

// Normalize the data (optional)
const min = dataTensor.min();
const max = dataTensor.max();
const normalizedData = dataTensor.sub(min).div(max.sub(min));

// Define a model architecture
const model = tf.sequential();
model.add(tf.layers.dense({ units: 10, inputShape: [1] }));
model.add(tf.layers.dense({ units: 1 }));

// Compile the model
model.compile({ optimizer: "adam", loss: "meanSquaredError" });

// Train the model
const epochs = 100;
const batchSize = 5;
const trainData = normalizedData.expandDims(1);
const trainLabels = normalizedData.slice(batchSize);
model.fit(trainData, trainLabels, { epochs, batchSize });

// Predict the time series data
const predictedData = model.predict(trainData).flatten();

// Calculate the residuals (prediction errors)
const residuals = trainLabels.sub(predictedData);

// Set the threshold for outlier detection
const threshold = 0.2;

// Find the indices of outliers
const outlierIndices = residuals.greater(threshold).logicalOr(residuals.less(-threshold)).nonZero().dataSync();

// Output the detected outliers
console.log("Detected Outliers:");
outlierIndices.forEach((index) => {
  console.log(`Index: ${index}, Value: ${timeSeriesData[index]}`);
});
