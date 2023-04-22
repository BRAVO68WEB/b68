import { configKeys } from '..'

const { KEYCLOAK_ISSUER } = configKeys

const authConfig = {
    client_id: configKeys.KEYCLOAK_CLIENT_ID,
    'auth-server-url':
        configKeys.KEYCLOAK_AUTH_SERVER_URL +
        '/realms/' +
        configKeys.KEYCLOAK_REALM,
    'ssl-required': 'all',
    resource: configKeys.KEYCLOAK_CLIENT_ID,
    credentials: {
        'secret-jwt': { secret: configKeys.KEYCLOAK_CLIENT_SECRET },
    },
    'confidential-port': 0,
    redirect_uri: configKeys.KEYCLOAK_REDIRECT_URI,
    client_secret: configKeys.KEYCLOAK_CLIENT_SECRET,
    default_max_age: 3600000,
}

const authClient = new KEYCLOAK_ISSUER.Client(authConfig)

export { authClient }
