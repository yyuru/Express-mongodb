const express = require('express')
const router = express.Router()
const {
  create
} = require('../controllers/userCtrl')
/**
 * @api {POST} /api/users/create
 * @apiDescription Create new user
 * @apiVersion 1.0.0
 * @apiName CreateUser
 * @apiGroup users
 * @apiPermission admin
 * @apiHeader {String} Authorization
 * @apiParam {String} name
 * @apiSuccess (Created 201) {String} name
 * @apiError (Conflict 409 ) Conflict UserName Exisit
*/
router.post('/create', create)

module.exports = router
