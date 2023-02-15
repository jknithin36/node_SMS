const unirest = require("unirest");
const express = require("express");

const app = express();

app.use(express.json());

app.post("/send-sms", (req, res) => {
  const smsDetails = req.body;
  const recipients = smsDetails.recipients;

  var req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");
  req.headers({
    authorization: "YOUR-API_KEY",

    "Content-Type": "application/x-www-form-urlencoded",
  });
  req.form({
    sender_id: "YOUR_SENDER_ID",
    message: "YOUR_SENDER_MESSAGE",
    variables_values: "YOUR VALUES",
    route: "dlt",
    numbers: recipients,
  });
  req.end(function (response) {
    if (response.error) {
      console.log(response.error);
      return res.status(500).json({
        message: "Error sending SMS",
      });
    }
    console.log(response.body);
    return res.status(200).json({
      message: "SMS sent successfully",
    });
  });
});

app.listen(5000, () => {
  console.log("App is listening on port 5000");
});
