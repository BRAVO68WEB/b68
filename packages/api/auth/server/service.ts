import axios from 'axios'
import { configKeys } from '../..'
import qs from 'qs'

export default class ServiceAccount {
    public serviceAccount = async () => {
        const rdata = qs.stringify({
            grant_type: 'client_credentials',
        })

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${configKeys.KEYCLOAK_AUTH_SERVER_URL}/realms/${configKeys.KEYCLOAK_REALM}/protocol/openid-connect/token`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${Buffer.from(
                    `${configKeys.KEYCLOAK_CLIENT_ID}:${configKeys.KEYCLOAK_CLIENT_SECRET}`
                ).toString('base64')}`,
            },
            data: rdata,
        }

        const { data } = await axios(config)

        return {
            service_creds: data.access_token,
        }
    }

    public fetchUser = async (token: string, userSub: string) => {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${configKeys.KEYCLOAK_AUTH_SERVER_URL}/admin/realms/${configKeys.KEYCLOAK_REALM}/users/${userSub}`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }

        const { data } = await axios(config)
        return data
    }
}
