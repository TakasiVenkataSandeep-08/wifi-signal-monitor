var shell = require("shelljs");

const sleepTime = parseInt(process.argv[3]);
const webhookUrl = process.argv[5];

setInterval(() => {
  const output = shell.exec(
    "/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -I | grep CtlRSSI | awk -F' '  '{ print $2 }'",
    { silent: true }
  );

  const { stderr, stdout } = output;
  const rssiStrength = parseInt(stdout);

  if (stderr) {
    console.log(`Exec error ${stderr}`);
  }

  if (rssiStrength < -67) {
    shell.exec(
      `curl -X POST -H 'Content-type: application/json' --data '{"text":"Hi there, your wifi signal :signal_strength: looks weak :small_red_triangle_down:"}' ${webhookUrl}`,
      { silent: true }
    );
  }
}, sleepTime);
