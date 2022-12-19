import { GraphQLClient } from 'graphql-request'

export let client = new GraphQLClient('')

export const hgqlInit = () => {
    console.log('\n🚀 GraphQL Client Initialized')

    let HASURA_URL: string = process.env.HASURA_GRAPHQL_ENDPOINT || ''
    HASURA_URL += HASURA_URL.endsWith('/') ? 'v1/graphql' : '/v1/graphql'
    const HASURA_ADMIN: string = process.env.HASURA_GRAPHQL_ADMIN_SECRET || ''

    client = new GraphQLClient(HASURA_URL, {
        headers: {
            'x-hasura-admin-secret': HASURA_ADMIN,
        },
    })
}
