"use strict";
const aws = require("aws-sdk");
const ses = new aws.SES();

module.exports.handler = async (event) => {
  console.log(event.Records[0].body);

  let { to, subject, body } = JSON.parse(event.Records[0].body);

  var params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: { Text: { Data: body } },
      Subject: { Data: subject },
    },
    Source: "jdmkrd@gmail.com",
  };

  try {
    await ses.sendEmail(params).promise();
    console.log("Exit");
  } catch (error) {
    console.log(error);
  }
};
