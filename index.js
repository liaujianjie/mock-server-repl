const express = require("express");
const app = express();

const PORTS = [1111, 2222, 3333, 4444];

PORTS.forEach((port) => {
  app.get("*", (req, res) => {
    res.status(200).json({
      port,
      path: req.path,
    });
  });
  app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
  });
});
