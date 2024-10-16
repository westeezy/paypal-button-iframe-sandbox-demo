const express = require("express");

const mainPort = process.env.EXPRESS_PORT ?? 3434;
const mainExpressApp = { app: express(), port: mainPort };

mainExpressApp.app.set("view engine", "ejs");

const localhostIframeAppPort = 4000;

function getIframeSettings({ htmlPage = "iframe-v6.html" }) {
  if (process.env.ENVIRONMENT === "LOCAL") {
    const mainOrigin = `http://localhost:${mainPort}`;
    return {
      origin: `http://localhost:${localhostIframeAppPort}`,
      url: `http://localhost:${localhostIframeAppPort}/public/${htmlPage}?origin=${mainOrigin}`
    };
  } else {
    const mainOrigin = "https://iframe-sandbox-demo.fly.dev";
    return {
      origin: "https://www.gregjopa.com",
      url: `https://www.gregjopa.com/paypal-button-iframe-sandbox-demo/${htmlPage}?origin=${mainOrigin}`
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
  const iframeSettings = getIframeSettings({ htmlPage: "iframe-v6.html" });
  res.render('index', { iframeSettings });
});

mainExpressApp.app.get('/render-your-own-buttons', (req, res) => {
  const iframeSettings = getIframeSettings({ htmlPage: "iframe-v6-flows-only.html" });
  res.render('render-your-own-buttons', { iframeSettings });
});

mainExpressApp.app.get('/v6/auto-grow-iframe-modal-flow', (req, res) => {
  const iframeSettings = getIframeSettings({ htmlPage: "iframe-v6-modal-flow.html" });
  res.render('v6/auto-grow-iframe-modal-flow', { iframeSettings });
});

mainExpressApp.app.get('/v6/popup-overlay-disabled', (req, res) => {
  const iframeSettings = getIframeSettings({ htmlPage: "iframe-v6-popup-overlay-disabled.html" });
  res.render('v6/auto-grow-iframe-modal-flow', { iframeSettings });
});

mainExpressApp.app.get('/v6', (req, res) => {
  res.render('v6/index');
});

mainExpressApp.app.listen(mainExpressApp.port, () => {
  console.log(`Start here: http://localhost:${mainExpressApp.port}/`);
});
