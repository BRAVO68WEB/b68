import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'

import { hgqlInit } from './helpers'
import cacheClient from './helpers/cache.factory'
import routes from './routes'
import { errorHandler, notFoundHandler } from './libs'
import pkg from './package.json' assert { type: 'json' }
import configStore, { IConfigKeys } from './configs'
import discordBotConnect from './helpers/discord_bot_client'

export const app: express.Application = express()

console.log('🚀', '@b68/api', 'v' + pkg.version)

hgqlInit()
cacheClient.init()

const isDev: boolean = process.env.NODE_ENV == 'production'
console.log(isDev ? '🚀 Production Mode' : '👷 Development Mode')
const configs = new configStore(isDev)
const configKeys: IConfigKeys = (await configs.getConfigStore()) as IConfigKeys

discordBotConnect()

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.set('view engine', 'ejs')
app.set('trust proxy', true)

console.log('☄ ', 'Base Route', '/')

app.use('/', routes)

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(configKeys.PORT, async () => {
    console.log(`\n🌈 Server running on port ${configKeys.PORT}`)
})

export { configKeys }
