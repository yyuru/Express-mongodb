const User = require('../models/user')

class UserController {
  async create (req, res, next) {
    try {
      // 验证参数
      req.verifyParams({
        name: { type: 'string', required: true },
        password: { type: 'string', required: true }
      })
      // 校验用户名是否存在
      const { name } = req.body
      const user = await User.findOne({ name })
      if (user) {
        res.status(409)
        res.json({
          success: false,
          message: '用户已经存在'
        })
      } else {
        const userCreated = await new User(req.body).save()
        res.status(201)
        res.json(userCreated)
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UserController()
