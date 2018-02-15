const AWS = require("../../aws_conf");
const ddb = new AWS.DynamoDB.DocumentClient();

const dbg = require("debug")("database:fetch-programs");

module.exports = function (UserId) {
  dbg("UserId: %s", UserId);
  dbg(typeof UserId);

  // need to specify which columns we want?
  const params = {
    TableName: process.env.PROGRAMS_TABLE,
    KeyConditionExpression: 'UserId = :user',
    ExpressionAttributeValues: {
      ':user': UserId //{S: UserId}
    }
    // 
  };
  return ddb.query(params).promise();
};

