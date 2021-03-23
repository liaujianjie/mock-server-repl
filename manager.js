const express = require("express");

exports.AppsManager = class AppsManager {
  static shared = new AppsManager();

  apps = new Map();

  getApp(port) {
    validatePort(port);

    return this.apps.get(port);
  }

  createApp(port) {
    validatePort(port);

    if (this.getApp(port)) {
      throw new Error(`Already listening on port ${port}.`);
    }

    const app = express();
    app.get("*", (req, res) => {
      res.status(200).json({
        port,
        path: req.path,
      });
    });
    const server = app.listen(port, () => {
      // Don't log here because it is async and prints ugly :-(
      // console.log(`Listening on port ${port}.`);
    });
    this.apps.set(port, server);
  }

  killApp(port) {
    validatePort(port);

    const app = this.getApp(port);
    if (!app) {
      throw new Error(`Not listening on port ${port}.`);
    }

    app.close();

    this.apps.delete(port);
  }
};

function validatePort(port) {
  if (typeof port !== "number") {
    throw new PortValidationError();
  }
  if (!Number.isInteger(port)) {
    throw new PortValidationError();
  }
  if (port < 0 || port > 65353) {
    throw new PortValidationError();
  }
}

class PortValidationError extends Error {
  constructor() {
    super("Port must be an integer between 0 to 65353 inclusive.");
  }
}
