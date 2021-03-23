const repl = require("repl");

exports.startReplWithFunctions = function (functions = {}) {
  const server = repl.start({ prompt: "\n> " });

  Object.keys(functions).forEach((functionName) => {
    server.context[functionName] = function (...args) {
      // Enhance functions here...
      functions[functionName](...args);
    };
  });

  server.context.quit = function () {
    console.log("Goodbyes are never easy.");
    process.exit(0);
  };
  server.context.exit = server.context.quit;
};
