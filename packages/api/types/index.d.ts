import { Request } from 'express'

export interface PaginationType {
    page: number
    limit: number
    sort_order?: 'asc' | 'desc'
    sort_by?: string
    filters?: { [k: string]: any }
}

export interface ModRequest extends Request {
    user: any
    file: any
}
