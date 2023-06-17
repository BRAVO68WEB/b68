import { Router } from 'express'

const router = Router()

router.use('/', (req, res) => {
    return res.status(200).json({
        status: 'OK',
        app: 'B68 API',
        request_ip: req.ip,
        uptime: process.uptime(),
        hrtime: process.hrtime(),
    })
})

export default router
