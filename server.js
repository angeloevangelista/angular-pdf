const express = require("express");
const path = require("path");

const appName = process.env.npm_package_name;
const appPort = process.env.PORT || 8080;
const app = express();

app.use(express.static(`${__dirname}/dist/${appName}`));

app.get("/*", (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/${appName}/index.html`));
});

app.listen(appPort, () =>
  console.log(`🚀 ${appName} is running at http://127.0.0.1:${appPort}`)
);
