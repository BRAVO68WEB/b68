import path from 'path'
import { readdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import { Router } from 'express'

const router = Router()

const isCompiled = path.extname(__filename) === '.js'
const thisFileName = path.basename(__filename)

const loadRoutes = async (dirPath: string, prefix = '/') => {
    readdirSync(dirPath, {
        withFileTypes: true,
    }).forEach(async (f) => {
        // console.log(f)
        if (f.isFile()) {
            if (f.name == thisFileName) return

            const isRouteMod = f.name.endsWith(
                `.routes.${isCompiled ? 'js' : 'ts'}`
            )
            if (isRouteMod) {
                const route = f.name.replace(
                    `.routes.${isCompiled ? 'js' : 'ts'}`,
                    ''
                )
                const modRoute = path.join(prefix, route)
                console.log('🛰️ ', 'Loaded', modRoute)

                const mod = await import(path.join(baseDir, prefix + f.name))
                router.use(modRoute, mod.default)
            }
        } else if (f.isDirectory()) {
            await loadRoutes(
                path.resolve(dirPath, f.name),
                prefix + f.name + '/'
            )
        }
    })
}

let baseDir = path.dirname(__filename)
baseDir = path.resolve(baseDir)

loadRoutes(baseDir)

router.get('/', function (req, res) {
    res.render('pages/index')
})

router.get('/favicon.ico', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', 'favicon.ico'))
})

export default router
