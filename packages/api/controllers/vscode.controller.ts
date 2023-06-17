import VSCodeService from '../services/vscode.service'
import { Request, Response } from 'express'

export default class VSCodeController extends VSCodeService {
    public fetchList = async (_req: Request, res: Response) => {
        const data = this.list()
        return res.send(data)
    }
}
