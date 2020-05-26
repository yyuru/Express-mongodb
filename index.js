const Express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const users = require('./routes/users')
const validate = require('./middleware/validate')
const connectStr = require('./config/config')
const mongoose = require('mongoose')
const moment = require('moment')
const RotatingFileStream = require('bunyan-rotating-file-stream')
const cors = require('cors')
const halmet = require('helmet')

const app = new Express()

// secure apps by setting various HTTP headers
app.use(halmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 日志配置
// TRACE = 10;
// DEBUG = 20;
// INFO = 30;
// WARN = 40;
// ERROR = 50;
// FATAL = 60;
// TODO Save differernt level Log in specific file
app.use(require('express-bunyan-logger')({
  name: 'logger',
  streams: [
    {
      name: 'Logger',
      stream: new RotatingFileStream({
        type: 'rotating-file',
        period: '1d',
        count: 10,
        path: `./logs/LOG-${moment().format('YYYYMMDD')}.log`

      })
    }
  ]
}))

// 连接数据库
mongoose.connect(
  connectStr,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {}
)

mongoose.connection.on('error', () => {})

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

app.use(validate(app))

// static file
app.use(Express.static(path.join(__dirname, 'public')))

app.use('/api/users', users)

module.exports = app
