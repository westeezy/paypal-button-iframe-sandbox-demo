const express = require("express");

const mainPort = process.env.EXPRESS_PORT ?? 3434;
const mainExpressApp = { app: express(), port: mainPort };

mainExpressApp.app.set("view engine", "ejs");

const localhostIframeAppPort = 4000;

function getIframeSettings(htmlPage = "iframe-v6.html") {
  if (process.env.ENVIRONMENT === "LOCAL") {
    return {
      origin: `http://localhost:${localhostIframeAppPort}`,
      url: `http://localhost:${localhostIframeAppPort}/public/${htmlPage}`
    };
  } else {
    return {
      origin: "https://www.gregjopa.com",
      url: `https://www.gregjopa.com/paypal-button-iframe-sandbox-demo/${htmlPage}`
    };
  }
}

if (process.env.ENVIRONMENT === "LOCAL") {
  const iframeExpressApp = { app: express(), port: localhostIframeAppPort };
  iframeExpressApp.app.use("/public", express.static("docs"));
  iframeExpressApp.app.listen(localhostIframeAppPort, () => {
    // console.log(`Static file server started at http://localhost:${localhostIframeAppPort}/`);
  });
}

mainExpressApp.app.get('/', (req, res) => {
  res.render('index', { iframeSettings: getIframeSettings("iframe-v6.html") });
});

mainExpressApp.app.get('/render-your-own-buttons', (req, res) => {
  res.render('render-your-own-buttons', { iframeSettings: getIframeSettings("iframe-v6-flows-only.html") });
});


mainExpressApp.app.listen(mainExpressApp.port, () => {
  console.log(`Start here: http://localhost:${mainExpressApp.port}/`);
});
