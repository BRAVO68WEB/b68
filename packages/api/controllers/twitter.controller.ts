import { makeResponse } from '../libs'
import TwitterService from '../services/twitter.service'

export default class TwitterController extends TwitterService {
    public getTweets = async (req, res) => {
        try {
            const data = await this.getSelfUserTweets()
            res.send(data)
        } catch (err: any) {
            res.send(makeResponse(err.message, {}, 'Failed', true))
        }
    }

    public getProfile = async (req, res) => {
        try {
            const data = await this.getSelfUserProfile()
            res.send(data)
        } catch (err: any) {
            res.send(makeResponse(err.message, {}, 'Failed', true))
        }
    }
}
