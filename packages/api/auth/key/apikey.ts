import crypto from 'node:crypto'
import { client } from '../../helpers'
import { gql } from 'graphql-request'

export class APIKey {
    public generateKey(): string {
        const key = crypto.randomBytes(32).toString('hex')
        return key
    }

    public async fetchKeyS(userSub: string): Promise<any> {
        const initQuery = gql`
            query findUser($userSub: uuid!) {
                apikey_by_pk(user_id: $userSub) {
                    api_key
                    user_id
                    created_at
                    updated_at
                }
            }
        `
        const data: any = await client.request(initQuery, { userSub })
        return data.apikey_by_pk
    }

    public async createKeyS(userSub: string): Promise<any> {
        const serchKey = await this.fetchKeyS(userSub)
        const key = this.generateKey()
        if (serchKey) {
            const updateQuery = gql`
                mutation updateApiKey($userSub: uuid!, $key: String!) {
                    update_apikey_by_pk(
                        pk_columns: { user_id: $userSub }
                        _set: { api_key: $key }
                    ) {
                        api_key
                        user_id
                        created_at
                        updated_at
                    }
                }
            `
            const data: any = await client.request(updateQuery, {
                userSub,
                key,
            })
            return data.update_apikey_by_pk
        }
        const createQuery = gql`
            mutation insertApiKey($userSub: uuid!, $key: String!) {
                insert_apikey_one(
                    object: { user_id: $userSub, api_key: $key }
                ) {
                    api_key
                    user_id
                    created_at
                    updated_at
                }
            }
        `
        const data: any = await client.request(createQuery, { userSub, key })
        return data.insert_apikey_one
    }

    public async deleteKeyS(userSub: string): Promise<any> {
        const deleteQuery = gql`
            mutation deleteApiKey($userSub: uuid!) {
                delete_apikey_by_pk(user_id: $userSub) {
                    user_id
                    created_at
                    updated_at
                }
            }
        `
        const data: any = await client.request(deleteQuery, { userSub })
        return data.delete_apikey_by_pk
    }

    public async validateKeyS(key: string): Promise<any> {
        const validateQuery = gql`
            query validateKey($key: String!) {
                apikey(where: { api_key: { _eq: $key } }) {
                    created_at
                    updated_at
                    user_id
                }
            }
        `

        const data: any = await client.request(validateQuery, { key })

        if (data.apikey.length === 0) {
            return {
                isValid: false,
            }
        } else {
            return {
                isValid: true,
                userSub: data.apikey[0].user_id,
            }
        }
    }
}
