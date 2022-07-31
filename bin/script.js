#! /usr/bin/env node
const { join } = require("path");

var shell = require("shelljs");
var jsonPath = join(__dirname, "..", "index.js");

const sleepCommand = process.argv[2];
const sleepArgument = process.argv[3];

const webhookUrlCommand = process.argv[4];
const webHookUrlArgument = process.argv[5];

const urlRegex = new RegExp(
  "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
);

if (sleepCommand && sleepCommand !== "--sleep") {
  console.error(
    "\x1b[31m",
    `\nError: There is no command ${sleepCommand} found.\n`
  );
  console.log(
    "\x1b[32m",
    `Supported commands: \n--sleep : sleep time in ms\n--webhook-url : webhook url from slack app.`
  );
  shell.exit();
}
if (sleepCommand && sleepCommand === "--sleep") {
  const sleepTime = parseInt(sleepArgument);
  if (!sleepTime) {
    console.log(
      "\x1b[31m",
      `\nError: Not a valid argument for command --sleep.`
    );
    shell.exit();
  } else if (sleepTime < 500) {
    console.error("\x1b[31m", `\nError: The minimum sleep time is 500 ms.`);
    shell.exit();
  }
}

if (webhookUrlCommand && webhookUrlCommand !== "--webhook-url") {
  console.error(
    "\x1b[31m",
    `\nError: There is no command ${webhookUrlCommand} found.\n`
  );
  console.log(
    "\x1b[32m",
    `Supported commands: \n--sleep : sleep time in ms\n--webhook-url : webhook url from slack app.`
  );
  shell.exit();
}
if (
  webhookUrlCommand &&
  webhookUrlCommand === "--webhook-url" &&
  (!webHookUrlArgument || !urlRegex.test(webHookUrlArgument))
) {
  console.log(
    "\x1b[31m",
    `\nError: Not a valid argument for command --webhook-url.`
  );
  shell.exit();
}

if (sleepCommand && sleepArgument && webhookUrlCommand && webHookUrlArgument) {
  shell.exec(
    `node ${jsonPath} --${sleepCommand} ${sleepArgument} --${webhookUrlCommand} ${webHookUrlArgument}`
  );
}

shell.exit();
