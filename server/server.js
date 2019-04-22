const express = require('express');
const mongoose = require('mongoose');
const app = express();

const DB_URL = 'mongodb://localhost:27017/imooc';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function() {
  console.log('mongo connect success');
});

const User = mongoose.model('user', new mongoose.Schema({
  user: {type: String, require: true},
  age: {type: Number, require: true}
}));

// User.create({
//   user: 'xiaohua',
//   age: 12
// }, function(err, doc) {
//   if (!err) {
//     console.log(doc);
//   } else {
//     console.log(err);
//   }
// });

app.get('/delete', function(err, res) {
  User.remove({age: 18}, function(err, doc) {
    if (!err) {
      console.log(doc);
    }
  });
});


app.get('/', function(req, res) {
  res.send('<h1>hello, world</h1>')
});

app.get('/data', function(req, res) {
  User.findOne({}, function(err, doc){
    return res.json(doc);
  });
});

app.listen(9003, function() {
  console.log('Node app start at port 9093');
});

