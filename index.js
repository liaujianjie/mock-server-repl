const express = require("express");

const PORTS = [1111, 2222, 3333, 4444];

PORTS.forEach((port) => {
  const app = express();
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
