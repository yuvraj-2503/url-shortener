const express = require('express')
const { redirect } = require('../controllers/redirect')

var router = express.Router()

router.get(
    '/:urlCode',
    redirect
)

module.exports = router