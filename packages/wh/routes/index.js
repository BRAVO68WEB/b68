const { Router } = require('express')
const test = require('../modules/test')
const gh = require('../modules/gh')

const router = Router()

router.get('/test', test)
router.get('/gh', gh)

module.exports = router
