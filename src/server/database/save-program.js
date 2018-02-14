const AWS = require("../../aws_conf");
const ddb = new AWS.DynamoDB.DocumentClient();

function addItem(UserId, ProgramName, ProgramJSON) {
  return ddb.put({
    TableName: 'McIlroyPrograms',
    Item: {
      UserId,
      ProgramName,
      Expansion: ProgramJSON
    }
  }).promise();
}

module.exports = addItem;
