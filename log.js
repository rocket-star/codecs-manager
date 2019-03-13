const bunyan = require('bunyan')

const log = bunyan.createLogger({
  name: 'codecs-manager',
  streams: [{
    level: 'info',
    stream: process.stdout
  }, {
    type: 'rotating-file',
    path: './log/codecs-manager.log',
    period: '1d',
    count: 3
  }]
})

module.exports = log
