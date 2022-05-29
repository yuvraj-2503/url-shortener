const express = require('express')

const db = require('./db/connection')

db.once('open', () => {
    console.log('DB Connected.')
}).on('error' , () => console.log('Connection failed.'))

const app = express()

app.use(express.json({
    extended : false
}))

app.use('/', require('./routes/redirect'))
app.use('/api/url', require('./routes/saveUrl'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})

