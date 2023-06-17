import { NextFunction, Response } from 'express'
import { authClient } from '../helpers/auth_client'
import { ModRequest } from '../types'
import { CustomError } from '../libs/error'

export const refresh = async (
    req: ModRequest | any,
    _res: Response,
    next: NextFunction
) => {
    try {
        const refreshToken: string = req.body?.refresh_token
        if (!refreshToken) {
            throw new Error('No refresh token provided !!')
        }
        const tokenData = await authClient.refresh(refreshToken)

        if (!tokenData) {
            throw new Error('No user')
        }

        return tokenData
    } catch (err) {
        next(
            new CustomError({
                message: 'Invalid refresh token',
                statusCode: 401,
            })
        )
    }
}
