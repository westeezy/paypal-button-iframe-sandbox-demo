const express = require("express");


const mainPort = process.env.EXPRESS_PORT ?? 3434;
const mainExpressApp = { app: express(), port: mainPort };

mainExpressApp.app.set("view engine", "ejs");

const iframeSettings = {
  origin: "https://www.gregjopa.com",
  url: "https://www.gregjopa.com/paypal-button-iframe-sandbox-demo/iframe.html"
};

if (process.env.ENVIRONMENT === "LOCAL") {
    const iframeExpressApp = { app: express(), port: 4000 };
    iframeExpressApp.app.use("/public", express.static("docs"));
    iframeSettings.origin = `http://localhost:${iframeExpressApp.port}`;
    iframeSettings.url = `http://localhost:${iframeExpressApp.port}/public/iframe-v6.html`;

    iframeExpressApp.app.listen(iframeExpressApp.port, () => {
      // console.log(`Static file server started at http://localhost:${iframeExpressApp.port}/`);
    });
}

mainExpressApp.app.get('/', (req, res) => {
  res.render('index', { iframeSettings });
});

mainExpressApp.app.listen(mainExpressApp.port, () => {
  console.log(`Start here: http://localhost:${mainExpressApp.port}/`);
});
