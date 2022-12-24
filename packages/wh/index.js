const express = require('express')
const chalk = require('chalk')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')

const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false, limit: '50mb' }))
app.use(cors())
app.use(morgan('dev'))
app.use(helmet())

app.use('/', routes)

app.listen(5000, '0.0.0.0', () => {
    console.log(chalk.green('Server is running on port 5000'))
})
