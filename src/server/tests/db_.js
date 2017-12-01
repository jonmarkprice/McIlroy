const mongoose = require( 'mongoose' );
const Schema   = mongoose.Schema;

const Todo = new Schema({
    user_id    : String,
    content    : String,
    updated_at : Date
});

mongoose.model( 'Todo', Todo );
mongoose.connect( 'mongodb://localhost/test' );

/////////////////////////////

const t1 = new Todo ({
  user_id: '001',
  content: 'just work...',
  updated_at: Date.now()
});

t1.save(function(err, todo) {
  if (err) return console.log(err);
  console.log('saved.');
});
