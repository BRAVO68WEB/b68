import fs from 'fs'
import { parse as parseFile } from 'envfile'

type IconfigStore = 'development' | 'production'

interface IConfigKeys {
    PORT: string | number
    NODE_ENV: string
    HASURA_GRAPHQL_ADMIN_SECRET: string
    HASURA_GRAPHQL_ENDPOINT: string
    SAFE_TOKEN: string
    GH_TOKEN: string
    HASHNODE_API_KEY: string
    LASTFM_API_KEY: string
    OSU_API_KEY: string
    OSU_USERNAME: string
    OSU_PASSWORD: string
    YT_API_KEY: string
    TWITTER_API_KEY: string
    TWITTER_API_SECRET: string
    SPOTIFY_CLIENT_ID: string
    SPOTIFY_CLIENT_SECRET: string
    S3_CLIENT_ID: string
    S3_CLIENT_SECRET: string
    S3_BUCKET_NAME: string
    S3_BUCKET_REGION: string
    S3_BUCKET_ENDPOINT: string
    S3_BUCKET_URL: string
    S3_BUCKET_FOLDER: string
    MAL_CLIENT_ID: string
    MAL_CLIENT_SECRET: string
    AWS_ACCESS_KEY_ID: string
    AWS_SECRET_ACCESS_KEY: string
    AWS_REGION: string
}

export default class ConfigStoreFactory {
    public configStoreType: IconfigStore

    constructor(isProd: boolean = false) {
        if (isProd) {
            this.configStoreType = 'production'
        } else {
            this.configStoreType = 'development'
        }
    }

    public async getConfigStore() {
        if (this.configStoreType === 'development') {
            const envContent = await fs.readFileSync(`./.env`, 'utf8')
            const env: Partial<IConfigKeys> = await parseFile(envContent)
            return env
        } else {
            let reqEnvContent: any = await fs.readFileSync(
                './.env.example',
                'utf8'
            )
            reqEnvContent = reqEnvContent.replaceAll('=', '')
            reqEnvContent = reqEnvContent.split('\n')
            let missingKeys: string[] = []
            let env: Partial<IConfigKeys> = {}
            for (const line of reqEnvContent) {
                if (!process.env[line]) {
                    missingKeys.push(line)
                } else env[line] = process.env[line]
            }
            if (missingKeys.length > 0) {
                throw new Error(`Missing keys: ${missingKeys}`)
            }
            return env
        }
    }
}
