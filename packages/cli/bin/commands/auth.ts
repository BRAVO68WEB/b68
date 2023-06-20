import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import axios from 'axios'
import APIURL from '../../api.config'
import { conf } from '../app'

export const signin = async () => {
    console.log('Open the link below in your browser to sign in')
    console.log(APIURL + '/auth/signin/cli')
    const app = new Hono()
    app.get('/signin/callback', async (req) => {
        try {
            const query = req.req.query() as {
                session_state: string
                code: string
            }

            const {
                data: authData,
            }: {
                data: {
                    data: {
                        access_token: string
                    }
                }
                message: string
                error: boolean
            } = await axios.get(
                APIURL +
                    '/auth/signin/callback/cli?session_state=' +
                    query.session_state +
                    '&code=' +
                    query.code
            )

            const {
                data: apikeyData,
            }: {
                data: {
                    data: {
                        api_key: string
                    }
                }
            } = await axios({
                method: 'put',
                baseURL: APIURL + '/auth/key',
                headers: {
                    Authorization: 'Bearer ' + authData.data.access_token,
                },
            })
            await conf.set('apikey', apikeyData.data.api_key)
            setTimeout(() => {
                process.exit(0)
            }, 5000)
            return req.text('OK!')
        } catch (e) {
            console.log(e)
            return req.text('Error!')
        }
    })

    serve({
        fetch: app.fetch,
        port: 8787,
    })
}

export const verifyAuth = async () => {
    const apikey = await conf.get('apikey')

    if (!apikey) {
        console.log('You need to sign in first')
        return
    }

    try {
        const { data } = await axios({
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:4038/auth/key/verify',
            headers: {
                'x-api-key': apikey,
            },
        })

        console.log(data.data)
    } catch (e) {
        console.log(e)
    }
}
