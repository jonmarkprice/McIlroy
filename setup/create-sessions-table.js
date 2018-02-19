const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-2",
  endpoint: "http://localhost:8000"
});

const ddb = new AWS.DynamoDB();

const params = {
  TableName: "SessionTest",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" }
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};

ddb.createTable(params, function(err, data) {
  if (err) {
    console.error("Could not create table. Error: %O", err);
  } else {
    console.log("Created table!");
  }
});
