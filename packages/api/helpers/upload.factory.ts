import { S3Client } from '@aws-sdk/client-s3'
import multer from 'multer'
import multerS3 from 'multer-s3'
import path from 'path'
import { nanoid } from 'napi-nanoid'
import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'

type UploadEnvironment = 's3' | 'safe' | 'local'
type napiNanoId = () => string

export default class LocalUploadFactory {
    private _upload: multer.Multer

    constructor() {
        this._upload = multer({
            storage: multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, path.join(__dirname, '..', 'uploads'))
                },
                filename: (req, file, cb) => {
                    cb(null, nanoid() + path.extname(file.originalname))
                },
            }),
        })
    }

    get upload() {
        return this._upload
    }
}

export class S3UploadFactory {
    private _upload: multer.Multer

    constructor(client: S3Client) {
        this._upload = multer({
            storage: multerS3({
                s3: client,
                bucket: process.env.AWS_BUCKET!,
                acl: 'public-read',
                key: (req, file, cb) => {
                    cb(null, nanoid() + path.extname(file.originalname))
                },
            }),
        })
    }

    get upload() {
        return this._upload
    }
}

export class SafeUploadFactory {
    // Safe is a http file upload service at https://safe.b68dev.xyz
    // Upload API at https://safe.b68dev.xyz/api/upload

    private _upload: multer.Multer

    constructor() {
        this._upload = multer({
            storage: multer.memoryStorage(),
        })
        this._upload.single('file')
    }

    get upload() {
        return this._upload
    }

    async uploadFile(file: any) {
        const form = new FormData()
        form.append('files[]', file.buffer, { filename: file.originalname })
        const { data } = await axios.post(
            'https://safe.b68dev.xyz/api/upload',
            form,
            {
                headers: {
                    token: process.env.SAFE_TOKEN!,
                    ...form.getHeaders(),
                },
            }
        )
        return data
    }
}

export class UploadFactory {
    private static _clientMode: UploadEnvironment
    private static _s3Client: S3Client
    private static _localClient: LocalUploadFactory
    private static _safeClient: SafeUploadFactory

    static get client() {
        return this._clientMode === 's3'
            ? this._s3Client
            : this._clientMode === 'safe'
            ? this._safeClient
            : this._localClient
    }

    static get env() {
        return this._clientMode
    }

    static init(forceEnv?: UploadEnvironment) {
        const env =
            forceEnv ||
            process.env.UPLOAD_ENV ||
            process.env.NODE_ENV ||
            'local'

        if (!['s3', 'local', 'safe'].includes(env))
            throw new Error(
                "Invalid Upload Environment, expected - ['s3', 'local', 'safe'], received - " +
                    env
            )

        this._clientMode = env as UploadEnvironment

        if (env === 'safe') {
            this._safeClient = new SafeUploadFactory()
        } else if (env === 's3') {
            this._s3Client = new S3Client({
                region: process.env.AWS_REGION,
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
                },
            })
        } else {
            this._localClient = new LocalUploadFactory()
        }
        console.log(`Upload Client initialized in '${env}' environment`)
    }
}
