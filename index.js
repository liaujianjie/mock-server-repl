const { startReplWithFunctions } = require("./repl");
const { AppsManager } = require("./manager");
const e = require("express");

startReplWithFunctions({
  listen(port) {
    AppsManager.shared.createApp(port);
    console.log(`Listening on port ${port}`);
  },
  kill(port) {
    AppsManager.shared.killApp(port);
    console.log(`Stopped listening on port ${port}`);
  },
  list() {
    const ports = [...AppsManager.shared.apps.keys()].join(", ");
    if (ports.length === 0) {
      console.log(`Not listening on any ports.`);
    } else {
      console.log(`Listening at ports ${ports}.`);
    }
  },
});
