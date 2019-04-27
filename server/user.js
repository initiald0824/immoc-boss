const express = require('express');
const model = require('./model');
const Router = express.Router();
const User = model.getModel('user');

Router.get('/info', function(req, res) {
  return res.json({code: 1});
});

Router.post('/register', function(req, res) {
  const { user, pwd, type } = req.body.data;
  User.findOne({user: user}, function(err, doc) {
    if (doc) {
      return res.json({code: 1, msg: '用户名重复'});
    }
    User.create({user, pwd, type}, function(err, doc) {
      if (err) {
        return res.json({code: 1, msg: '后端报错'})
      }
      return res.json({code: 0})
    });
  })
});

Router.get('/list', function(req, res) {
  User.find({}, function(err, doc) {
    return res.json(doc);
  });
});

module.exports = Router;
