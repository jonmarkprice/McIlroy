const AWS = require("../../aws_conf");
const ddb = new AWS.DynamoDB.DocumentClient();

function deleteItem(UserId, ProgramName) {
  console.log("UserId, ProgramName, and ProgramJSON");
  console.log(UserId)
  console.log(ProgramName)

  return ddb.delete({
    TableName: 'McIlroyPrograms',
    Key: {UserId, ProgramName}
  }).promise();
}

module.exports = deleteItem;
