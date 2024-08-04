import { parentPort, workerData } from "node:worker_threads";

// https://medium.com/@gautamappu0/maximizing-node-js-performance-exploring-the-potential-of-worker-threads-79941c1aa258

function processCpuIntensive(threadCount) {
  try {
    // Simulate processing of the prompt
    console.log("Worker thread processing prompt threadCount:", threadCount);

    let counter = 0;
    for (let i = 0; i < 20_000_000_000 / threadCount; i++) {
      counter++;
    }
    // Send a message back to the main thread with the processed prompt
    parentPort.postMessage(counter);
  } catch (error) {
    // Handle errors gracefully
    console.error("Error processing prompt:", error);
    // Send an error message back to the main thread
    parentPort.postMessage({ error: error.message });
  }
}

// Invoke the function to process the prompt received from the main thread
workerData.threadCount && processCpuIntensive(workerData.threadCount);
