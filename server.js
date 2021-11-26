// IMPORTS
const express = require("express");
const cors = require("cors");
const https = require("https");
const fs = require("fs")

// DEFINING ENVIRONMENT CONFIG
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

//OPTIONS
const options = {
    key: fs.readFileSync("./certs/private-key.pem"),
    cert: fs.readFileSync("./certs/public-cert.pem")
};

// ROUTES
const slackRouter = require("./routes/api/slack");
app.use('/squadcast/middleware', slackRouter);
const emailRouter = require("./routes/api/email");
app.use('/squadcast/middleware', emailRouter);
const trelloRouter = require("./routes/api/trello");
app.use('/squadcast/middleware', trelloRouter);

// HTTPS SERVER
const port = process.env.PORT;
// https.createServer(options, app).listen(port, () => {
//     console.log("Squadcast - Slack - Event Hooks - HTTPS Server is running on port:" + port);
// });

app.listen(port, () =>{});