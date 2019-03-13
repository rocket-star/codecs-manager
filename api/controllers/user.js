const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const log = require('../../log')

const User = require('../models/user')

exports.signup = (req, res, next) => {
  User.find({
    email: req.body.email
  })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'Mail already exists'
        })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            sendError(err, res)
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            })
            user
              .save()
              .then(result => {
                log.info(result)
                res.status(201).json({
                  message: 'User created'
                })
              })
              .catch(err => {
                sendError(err, res)
              })
          }
        })
      }
    })
}

exports.login = (req, res, next) => {
  User.find({
    email: req.body.email
  })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Auth failed'
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed'
          })
        }
        if (result) {
          const token = jwt.sign({
            email: user[0].email,
            userId: user[0]._id
          },
          process.env.JWT_KEY, {
            expiresIn: '1h'
          }
          )
          return res.status(200).json({
            message: 'Auth successful',
            token: token
          })
        }
        res.status(401).json({
          message: 'Auth failed'
        })
      })
    })
    .catch(err => {
      sendError(err, res)
    })
}

exports.delete = (req, res, next) => {
  User.remove({
    _id: req.params.userId
  })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'User deleted'
      })
    })
    .catch(err => {
      sendError(err, res)
    })
}

function sendError (err, res) {
  log.info(err)
  res.status(500).json({
    error: err
  })
}
