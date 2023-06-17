import { Router } from 'express'
import { makeResponse } from '../../../libs'

const router = Router()

router.get('/', (_req, res) => {
    res.send(makeResponse({ message: 'Hello World!' }))
})

router.all('/err', async (_req, _res, next) => {
    try {
        throw new Error('This is an error')
    } catch (err) {
        next(err)
    }
})

export default router
