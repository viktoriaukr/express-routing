const express = require("express");
const ExpressError = require("./expressError");
const fs = require("fs");
const { mean, median, mode, isNumber } = require("./node");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/mean", (req, res, next) => {
  if (!req.query.nums) {
    throw new ExpressError(
      "Provided input is not valid, please enter only numbers followed by commas"
    );
  }
  let q = req.query.nums.split(",");
  let nums = isNumber(q);
  if (nums instanceof Error) {
    throw new ExpressError(nums.msg);
  }

  let avg = {
    operation: "mean",
    value: mean(nums),
  };
  return res.send(avg);
});

app.get("/median", (req, res, next) => {
  if (!req.query.nums) {
    throw new ExpressError(
      "Provided input is not valid, please enter only numbers followed by commas"
    );
  }
  let q = req.query.nums.split(",");
  let nums = isNumber(q);
  if (nums instanceof Error) {
    throw new ExpressError(nums.msg);
  }
  let mid = {
    operation: "median",
    value: median(nums),
  };
  return res.send(mid);
});

app.get("/mode", (req, res, next) => {
  if (!req.query.nums) {
    throw new ExpressError(
      "Provided input is not valid, please enter only numbers followed by commas"
    );
  }
  let q = req.query.nums.split(",");
  let nums = isNumber(q);
  if (nums instanceof Error) {
    throw new ExpressError(nums.msg);
  }
  let mf = {
    operation: "mode",
    value: mode(nums),
  };
  return res.send(mf);
});

app.get("/all", (req, res, next) => {
  if (!req.query.nums) {
    throw new ExpressError(
      "Provided input is not valid, please enter only numbers followed by commas"
    );
  }
  let q = req.query.nums.split(",");
  let nums = isNumber(q);
  if (nums instanceof Error) {
    throw new ExpressError(nums.msg);
  }

  let result = {
    operation: "all",
    mean: mean(nums),
    median: median(nums),
    mode: mode(nums),
  };
  let save = req.query.save;
  if (save === "true") {
    fs.writeFileSync("results.json", JSON.stringify(result));
  }
  return res.send(result);
});
app.use((req, res, next) => {
  const e = new ExpressError("Page Not Found", 404);
  next(e);
});

// Error handler
app.use(function (err, req, res, next) {
  let status = err.status || 500;
  let message = err.msg;

  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(3000, function () {
  console.log("listening on port 3000");
});
