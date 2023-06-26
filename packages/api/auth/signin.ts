import { authClient } from '../helpers/auth_client'
import { generators } from 'openid-client'
import { configKeys } from '..'

const code_verifier = generators.codeVerifier()
const code_challenge = generators.codeChallenge(code_verifier)

export const signon = () => {
    const authurl = authClient.authorizationUrl({
        scope: 'email profile openid roles',
        code_challenge,
        code_challenge_method: 'S256',
        client_id: configKeys.KEYCLOAK_CLIENT_ID,
        redirect_uri: configKeys.KEYCLOAK_REDIRECT_URI,
    })

    return {
        authurl,
    }
}

export const signonCLI = () => {
    const authurl = authClient.authorizationUrl({
        scope: 'email profile openid roles',
        code_challenge,
        code_challenge_method: 'S256',
        client_id: configKeys.KEYCLOAK_CLIENT_ID,
        redirect_uri: 'http://localhost:8787/signin/callback',
    })

    return {
        authurl,
    }
}

export const signonApp = () => {
    const authurl = authClient.authorizationUrl({
        scope: 'email profile openid roles',
        code_challenge,
        code_challenge_method: 'S256',
        client_id: configKeys.KEYCLOAK_CLIENT_ID,
        redirect_uri: 'b68-admin://callback',
    })

    return {
        authurl,
    }
}

export { code_challenge, code_verifier }
