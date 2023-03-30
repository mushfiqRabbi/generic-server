const express = require("express");
const cors = require("cors");
const fs = require("fs");

const ipcData = JSON.parse(fs.readFileSync("./ipcData.json", "utf8"));

const corsWhitelist = [
  "http://localhost:3000",
  "https://mushfiqrabbi.github.io",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (corsWhitelist.includes(origin)) {
      callback(null, origin);
    } else {
    }
  },
};

const ipcRouter = express.Router();

ipcRouter.get("/:category", cors(corsOptions), (req, res) => {
  const requestedData = ipcData[Number(req.params.category) - 1];
  if (req.query.yearly === "true") {
    res.json({
      ...requestedData,
      amount: requestedData.amount - requestedData.amount * 0.25,
    });
  } else {
    res.json(requestedData);
  }
});

const app = express();
const PORT = process.env.PORT || 5000;
app.use("/ipc", ipcRouter);

app.listen(PORT, () => {
  console.log(`generic server on port ${PORT}`);
});
