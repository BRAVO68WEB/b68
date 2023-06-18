import { NextFunction, Response } from 'express'
import { ModRequest } from '../../types'
import { CustomError } from '../../libs/error'
import { APIKey } from './apikey'
import ServiceAccount from '../server/service'

export const serviceAccount = new ServiceAccount()

export const keyware = async (
    req: ModRequest | any,
    _res: Response,
    next: NextFunction
) => {
    const authClient = new APIKey()
    try {
        const authHeader = req.headers?.['x-api-key']
        if (!authHeader) {
            throw new Error('No x-api-key header found !!')
        }
        const decoded = await authClient.validateKeyS(authHeader)

        if (!decoded.isValid) {
            throw new Error('Invalid token')
        }

        const { service_creds } = await serviceAccount.serviceAccount()
        const user = await serviceAccount.fetchUser(
            service_creds,
            decoded.userSub
        )

        if (!user) {
            throw new Error('No user')
        }

        const { attributes } = user
        if (attributes) {
            Object.keys(attributes).forEach((key) => {
                user[key] = attributes[key][0]
            })
        }

        req.user = {
            userData: user,
            tokenData: decoded,
        }

        next()
    } catch (err: any) {
        next(
            new CustomError({
                message: err.message,
                statusCode: 401,
            })
        )
    }
}
