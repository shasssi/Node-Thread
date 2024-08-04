import { parentPort } from "worker_threads";

// processing cpu intensive job - processing image, looping over an large array

let counter = 0;
for (let i = 0; i < 20_000_000_000; i++) {
  counter++;
}

parentPort.postMessage(counter);
