const express = require('express')

var router = express.Router()

const { shorten } = require('../controllers/saveUrl')

router.post(
    '/shorten',
    shorten
)

module.exports = router