import express from "express";
import cors from "cors";
import cluster from "cluster";
import os from "os";

const app = express();
const PORT = 8000;

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
  app.get("/", (req, res) => {
    res.status(200).json({ msg: `hello pid : ${process.pid}` });
  });

  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT} & pid ${process.pid}`);
  });
}
