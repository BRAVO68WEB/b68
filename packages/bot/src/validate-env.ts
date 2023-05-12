import { z } from 'zod'

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        // eslint-disable-next-line
        interface ProcessEnv extends z.infer<typeof ZodEnvironmentVariables> {}
    }
}

const ZodEnvironmentVariables = z.object({
    TOKEN: z.string(),
    CLIENT_ID: z.string(),
    DEV_GUILD_ID: z.string().optional(),
    PORT: z.string().optional(),
    HASURA_GRAPHQL_ADMIN_SECRET: z.string(),
    HASURA_GRAPHQL_ENDPOINT: z.string(),
})

ZodEnvironmentVariables.parse(process.env)

console.log('✅ Environment variables verified!')
