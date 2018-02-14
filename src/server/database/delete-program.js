const AWS = require("../../aws_conf");
const ddb = new AWS.DynamoDB.DocumentClient();

function deleteItem(UserId, ProgramName) {
 return ddb.delete({
    TableName: 'McIlroyPrograms',
    Key: {UserId, ProgramName}
  }).promise();
}

module.exports = deleteItem;
