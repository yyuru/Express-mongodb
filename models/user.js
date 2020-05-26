const mongoose = require('mongoose')
const moment = require('moment')

const { Schema, model } = mongoose

const user = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true, select: false },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'male',
    required: true
  },
  locations: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    select: false
  },
  _ctime: {
    type: String,
    default: moment().format('YYYY-MM-DD HH:mm:ss.SSS')
  }
})

module.exports = model('User', user)
