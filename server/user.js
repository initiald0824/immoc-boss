const express = require('express');
const utils = require('utility');
const model = require('./model');
const Router = express.Router();
const User = model.getModel('user');

const _filter = { 'pwd': 0, '__v': 0 };

Router.get('/info', function(req, res) {
  const { userId } = req.cookies;
  if (!userId) {
    return res.json({code: 1});
  }
  User.findOne({'_id': userId}, _filter, function(err, doc) {
    if (err) {
      return res.json({code: 1, msg: '后端出错'});
    }
    if (doc) {
      return res.json({code: 0, data: doc});
    }
  })
});

Router.post('/register', function(req, res) {
  const { user, pwd, type } = req.body;
  User.findOne({user: user}, function(err, doc) {
    if (doc) {
      return res.json({code: 1, msg: '用户名重复'});
    }
    const userModel = new User({user, type, pwd: md5Pwd(pwd)});
    userModel.save(function(err, doc) {
      if (err) {
        return res.json({code: 1, msg: '后端报错'})
      }
      const { user, type, _id } = doc;
      res.cookie('userId', _id);
      return res.json({code: 0, data: {user, type, _id}});
    });
  })
});

Router.get('/list', function(req, res) {
  User.find({}, function(err, doc) {
    return res.json(doc);
  });
});

Router.post('/login', function(req, res) {
  const {user, pwd} = req.body;
  User.findOne({user: user, pwd: md5Pwd(pwd)}, _filter, function(err, doc) {
    if (!doc) {
      return res.json({code: 1, msg: '用户名或密码错误'});
    }
    res.cookie('userId', doc._id);
    return res.json({code: 0, data: doc});
  });
});

function md5Pwd(pwd) {
  const salt = 'imooc boss';
  return utils.md5(utils.md5(pwd+salt));
}

module.exports = Router;
