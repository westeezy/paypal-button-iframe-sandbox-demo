const express = require("express");


const mainPort = process.env.EXPRESS_PORT ?? 3434;
const mainExpressApp = { app: express(), port: mainPort };

mainExpressApp.app.set("view engine", "ejs");

let iframeHost = "https://fly.io/test";

if (process.env.ENVIRONMENT === "LOCAL") {
    const iframeExpressApp = { app: express(), port: 4000 };
    iframeExpressApp.app.use("/public", express.static("public"));
    iframeHost = `http://localhost:${iframeExpressApp.port}`;

    iframeExpressApp.app.listen(iframeExpressApp.port, () => {
      console.log(`Static file server started at http://localhost:${iframeExpressApp.port}/`);
    });
}

mainExpressApp.app.get('/', (req, res) => {
  res.render('index', { iframeHost });
});

mainExpressApp.app.listen(mainExpressApp.port, () => {
  console.log(`Server started at http://localhost:${mainExpressApp.port}/`);
});
