const AWS = require("../../aws_conf");
const ddb = new AWS.DynamoDB.DocumentClient();

function addItem(UserId, ProgramName, ProgramJSON) {
  console.log("UserId, ProgramName, and ProgramJSON");
  console.log(UserId)
  console.log(ProgramName)
  console.log(ProgramJSON)

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
