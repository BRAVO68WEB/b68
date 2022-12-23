const { Router } = require('express')
const test = require('../modules/test')

const router = Router()

router.get('/test', test)

module.exports = router
