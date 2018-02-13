const AWS = require("../src/aws_conf");
const ddb = new AWS.DynamoDB();

const params = {
  TableName: "EBUsers",
  KeySchema: [
    { AttributeName: "UserId", KeyType: "HASH" }
  ],
  AttributeDefinitions: [
    { AttributeName: "UserId", AttributeType: "S" }
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
