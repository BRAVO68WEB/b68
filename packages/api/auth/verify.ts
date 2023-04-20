import { authClient } from '../helpers/auth_client'
import { code_verifier } from './check'

export default async (session_state: string, code: string) => {
    return authClient.callback(
        'http://localhost:4038/auth/signin/callback',
        { code_verifier, code, session_state, expires_in: '1d' },
        { code_verifier }
    )
}
