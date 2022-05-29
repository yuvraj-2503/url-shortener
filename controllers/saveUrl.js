const express = require('express')
const validUrl = require('valid-url')
const shortid = require('shortid')

const Url = require('../db/url')

const BASE_URL = 'http://localhost:3000'

exports.shorten = async (req, res) => {
    const { longUrl } = req.body

    if(!validUrl.isUri(BASE_URL)){
        return res.status(401).json({
            'statusCode' : 401,
            'developerMessage' : 'Invalid Base URL.',
            'result' : null
        })
    }

    if(!validUrl.isUri(longUrl)){
        return res.status(401).json({
            'statusCode' : 401,
            'developerMessage' : 'Invalid URL.',
            'result' : null
        })
    }

    const urlCode = shortid.generate()

    let url = await Url.findOne({ longUrl })

    if(url){
        return res.status(400).json({
            'statusCode' : 400,
            'developerMessage' : 'URL already shortened.',
            'result' : url
        })
    }else{
        const shortUrl = BASE_URL + '/' + urlCode

        url = new Url({
            urlCode, longUrl, shortUrl, date : new Date() 
        })

        await url.save()

        return res.status(200).json({
            'statusCode' : 200,
            'developerMessage' : 'Url shortened.',
            'result' : url
        })
    }

}