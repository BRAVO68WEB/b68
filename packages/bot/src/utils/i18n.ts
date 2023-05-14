import i18n from 'i18n'
import path, { join } from 'path'
import config from '../../config/music.json'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

i18n.configure({
    locales: ['en'],
    directory: join(__dirname, '../..', 'locales'),
    defaultLocale: 'en',
    retryInDefaultLocale: true,
    objectNotation: true,
    register: global,

    logWarnFn: function (msg: any) {
        console.log(msg)
    },

    logErrorFn: function (msg: any) {
        console.log(msg)
    },

    missingKeyFn: function (_locale: any, value: any) {
        return value
    },

    mustacheConfig: {
        tags: ['{{', '}}'],
        disable: false,
    },
})

i18n.setLocale(config.LOCALE)

export { i18n }
