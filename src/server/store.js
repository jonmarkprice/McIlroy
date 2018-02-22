const dbg = require("debug")("ds:store");
const { Store } = require("express-session");
const AWS = require("../aws_conf");

// Can use DocumentClient with Map. Otherwise, won't work.
const ddb = new AWS.DynamoDB.DocumentClient();

function noop() {return};

class DynamoDBStore extends Store {
  constructor(options = {}, callback) {
    dbg("Creating store with options: %o.", options);
    super(); 
    this.table = options.table; // Required // TODO enforce
  }

  destroy(sid, callback) {
    dbg("Destroying session %s", sid);
    const params = {
      TableName: this.table,
      Key: {id: sid}
    };
    const fn = callback || noop; // Allow undefined callback.
    ddb.delete(params, function(err, result) {
      if (err) {
        fn(err);
      } else {
        dbg("Session destroyed.");
        fn(null);
      }
    });
  }

  get(sid, callback) {
    dbg("Getting session %s", sid);
    const params = {
      TableName: this.table,
      Key: {id: sid} 
      // projection expression?
    };
    ddb.get(params, function(err, result) {
      if (err) {
        console.error("*** Session store Get failed. ***")
        callback(err);
      } else if (Object.keys(result).length == 0) {
        dbg("Session not found.");
        callback(null, null);
      } else {
        dbg("Retrieved from session database: %O", result);
        callback(null, result.Item.session);
      }
    });
  }

  set(sid, session, callback) {
    dbg("Setting session %s, with: %O", sid, session);
    const params = {
      TableName: this.table,
      Item: {
        id: sid,
        session: session // map
      }
    };
    ddb.put(params, function(err, result) {
      if (err) {
        console.error("*** Session store Set failed. ***");
        callback(err);
      } else {
        dbg("Session set.");
        callback(null); // return anything?
      }
    });
  }

  // touch(sid, session, callback) // recommended 
}

module.exports = DynamoDBStore;

