/// <reference path='../node_modules/parameter/index.js' />
const createError = require('http-errors')
const Parameter = require('parameter')
module.exports = function (app, translate) {
  let parameter
  if (typeof (translate) === 'function') {
    parameter = new Parameter({
      translate
    })
  } else {
    parameter = new Parameter()
  }
  app.request.verifyParams = function (rules, params) {
    if (!rules) return
    if (!params) {
      params = ['GET', 'HEAD'].includes(this.method.toUpperCase()) ? this.query : this.body
    }
    const errors = parameter.validate(rules, params)
    if (!errors) {
      return
    }
    throw createError(422, 'Validation Failed', {
      code: 'INVALID_PARAM',
      errors: errors,
      params: params
    })
  }

  return function verifyParams (req, res, next) {
    try {
      next()
    } catch (err) {
      if (err.code === 'INVALID_PARAM') {
        return res.status(422).json({
          message: err.message,
          errors: err.errors,
          params: err.params
        }).end()
      }
      throw err
    }
  }
}
