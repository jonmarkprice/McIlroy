const AWS = require("aws-sdk");

AWS.config.region = process.env.AWS_REGION;

if (process.env.DEPLOYMENT === "local") {
  AWS.config.endpoint = "http://localhost:8000";
}

module.exports = AWS;
