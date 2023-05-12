import UploaderService from '../data/uploader.service'
import { configKeys } from '..'

const uploaderService = new UploaderService(configKeys.S3_BUCKET_NAME, 'r2')

export default class Uploader {
    public uploadS = async (file: any) => {
        await uploaderService.uploadFile(
            configKeys.S3_BUCKET_FOLDER,
            file.newName,
            file.buffer,
            file.mimetype,
            'public-read'
        )
        return {
            url:
                configKeys.S3_BUCKET_URL +
                '/' +
                configKeys.S3_BUCKET_NAME +
                '/' +
                configKeys.S3_BUCKET_FOLDER +
                '/' +
                file.newName,
        }
    }
}
