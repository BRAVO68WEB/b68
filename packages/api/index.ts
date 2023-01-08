import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'

import { hgqlInit } from './helpers'
import routes from './routes'
import { errorHandler, notFoundHandler } from './libs'
import pkg from './package.json' assert { type: 'json' }
import configStore from './configs'

export const app: express.Application = express()

hgqlInit()

const isDev: boolean = process.env.NODE_ENV == 'production'
console.log(isDev ? '🚀 Production Mode' : '🚀 Development Mode')
const configs = new configStore(isDev)
const configKeys: any = await configs.getConfigStore()

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

app.use('/health', (req, res) => {
    return res.status(200).json({
        app: pkg.name,
        request_ip: req.ip,
        uptime: process.uptime(),
        hrtime: process.hrtime(),
    })
})

console.log('☄', 'Base Route', '/')
app.use('/', routes)

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(process.env.PORT, async () => {
    console.log(`\nServer running on port ${process.env.PORT}`)
})

export { configKeys }
