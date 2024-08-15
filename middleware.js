import express from "express";

const app = express();

const middleware1 = (req, res, next) => {
  req.test = "req change";
  console.log("middleware1");
  next();
};

const middleware2 = (req, res, next) => {
  console.log("middleware2");
  // throw new Error("error 2");
  next();
};

const middleware3 = (req, res, next) => {
  console.log("middleware3");
  next();
};

app.get("/", [middleware1, middleware2, middleware3], (req, res) => {
  console.log(req.test);
  res.send("Hello from api");
});

app.listen(8000, () => console.log("Server started"));
