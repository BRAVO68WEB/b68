import { makeResponse } from '../libs'
import TwitterService from '../services/twitter.service'

export default class TwitterController extends TwitterService {
    public getTweets = async (_req, res) => {
        try {
            const data = await this.getSelfUserTweets()
            res.send(data)
        } catch (err: any) {
            res.send(makeResponse(err.message, {}, 'Failed', true))
        }
    }

    public getProfile = async (_req, res) => {
        try {
            const data = await this.getSelfUserProfile()
            res.send(data)
        } catch (err: any) {
            res.send(makeResponse(err.message, {}, 'Failed', true))
        }
    }
}
