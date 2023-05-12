import { UploadFactory } from '../../helpers/upload.factory'
import { Router } from 'express'
import UploadController from '../../controllers/upload.controller'

const router = Router()
const uploadController = new UploadController()
const uploaderFactory = new UploadFactory()

router.post(
    '/',
    uploaderFactory
        .getUploader({
            mimeFilters: [
                'image/jpeg',
                'image/png',
                'image/gif',
                'application/json',
            ],
        })
        .single('file'),
    uploadController.upload as any
)
export default router
