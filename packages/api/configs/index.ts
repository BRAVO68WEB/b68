import fs from 'fs'
import { parse as parseFile } from 'envfile'
import { Issuer } from 'openid-client'

const keyCloakIssuer: Issuer = await Issuer.discover(
    process.env.KEYCLOAK_AUTH_SERVER_URL +
        '/realms/' +
        process.env.KEYCLOAK_REALM
)
console.log('🔐 Connected to Keycloak')

type IconfigStore = 'development' | 'production'

export interface IConfigKeys {
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
    PUBLIC_KEY: string
    PRIVATE_KEY: string
    KEYCLOAK_ISSUER: Issuer
    KEYCLOAK_CLIENT_ID: string
    KEYCLOAK_CLIENT_SECRET: string
    KEYCLOAK_REDIRECT_URI: string
    KEYCLOAK_AUTH_SERVER_URL: string
    KEYCLOAK_REALM: string
    R2_CLIENT_ID: string
    R2_CLIENT_SECRET: string
    R2_BUCKET_NAME: string
    R2_BUCKET_REGION: string
    R2_BUCKET_ENDPOINT: string
    R2_BUCKET_URL: string
    R2_BUCKET_FOLDER: string
    DISCORD_BOT_TOKEN: string
    DISCORD_BOT_CLIENT_ID: number
    DISCORD_BOT_CLIENT_SECRET: string
    DISCORD_SERVER_ID: number
    DISCORD_WEBHOOK_URL: string
    DISCORD_SELF_ID: number
    GITLAB_PAT: string
}

export default class ConfigStoreFactory {
    public configStoreType: IconfigStore

    constructor(isProd = false) {
        if (isProd) {
            this.configStoreType = 'production'
        } else {
            this.configStoreType = 'development'
        }
    }

    public async getConfigStore() {
        const publicKEY = fs.readFileSync('./jwtRS256.key', 'utf8')
        const privateKEY = fs.readFileSync('./jwtRS256.key.pub', 'utf8')
        if (this.configStoreType === 'development') {
            const envContent = await fs.readFileSync(`./.env`, 'utf8')
            const env: Partial<IConfigKeys> = await parseFile(envContent)
            env.PUBLIC_KEY = publicKEY
            env.PRIVATE_KEY = privateKEY
            env.KEYCLOAK_ISSUER = keyCloakIssuer
            return env
        } else {
            let reqEnvContent: any = await fs.readFileSync(
                './.env.example',
                'utf8'
            )
            reqEnvContent = reqEnvContent.replaceAll('=', '')
            reqEnvContent = reqEnvContent.split('\n')
            const missingKeys: string[] = []
            const env: Partial<IConfigKeys> = {}
            env.PUBLIC_KEY = publicKEY
            env.PRIVATE_KEY = privateKEY
            env.KEYCLOAK_ISSUER = keyCloakIssuer
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
