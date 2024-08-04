import express from "express";
import cors from "cors";
import cluster from "cluster";
import os from "os";
import { Worker } from "node:worker_threads";

const app = express();
const PORT = 8000;
const THREAD_COUNT = 4;

app.use(cors());

if (cluster.isPrimary) {
  console.log("cluster isPrimary", cluster.isPrimary);
  console.log("cluster isWorkder", cluster.isWorker);
  console.log("cpu", os.cpus().length);
  console.log("cpu", os.availableParallelism());
  os.cpus().map((osInfo) => {
    cluster.fork();
  });
} else {
  const createWorker = () => {
    return new Promise((resolve, reject) => {
      const worker = new Worker("./multiple-worker.js", {
        workerData: {
          threadCount: THREAD_COUNT,
        },
      });
      worker.on("message", (data) => {
        console.log(`Received message from worker: ${data}`);
        resolve(data);
      });
      worker.on("error", (err) => {
        console.log(`Error message from worker: ${err}`);
        reject(err);
      });
    });
  };

  app.get("/blocking_multiple_worker", async (req, res) => {
    const workerPromises = [];
    for (let i = 0; i < THREAD_COUNT; i++) {
      workerPromises.push(createWorker());
    }
    console.log(workerPromises);
    const data = await Promise.all(workerPromises);
    const counter = data[0] + data[1] + data[2] + data[3];
    res.status(200).json({ counter: `${counter}  pid : ${process.pid}` });
  });

  app.get("/blocking_no_worker", (req, res) => {
    let counter = 0;
    for (let i = 0; i < 20_000_000_000; i++) {
      counter++;
    }
    res.status(200).json({ counter: `${counter}  pid : ${process.pid}` });
  });

  app.get("/blocking_single_worker", (req, res) => {
    const worker = new Worker("./multiple-worker.js", {
      workerData: {
        threadCount: THREAD_COUNT,
      },
    });
    worker.on("message", (data) => {
      console.log(`Received message from worker: ${data}`);
      res.status(200).json({ counter: `${data}  pid : ${process.pid}` });
    });
    worker.on("error", (err) => {
      console.log(`Error message from worker: ${err}`);
      res.status(200).json({ Error: `${err}  pid : ${process.pid}` });
    });
  });

  app.get("/nonblocking", (req, res) => {
    res.status(200).json({ msg: `hello pid : ${process.pid}` });
  });

  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT} & pid ${process.pid}`);
  });
}
