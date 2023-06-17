import { v2, auth } from 'osu-api-extended'
import { configKeys } from '../'

const config = configKeys

export default class Osu {
    constructor() {
        auth.login_lazer(config.OSU_USERNAME!, config.OSU_PASSWORD!)
    }

    public async getOsuSelf() {
        const data = await v2.user.me.details('osu')
        return data
    }

    public async bestScoresSelf() {
        const data = await v2.user.scores.category(15227110, 'best', {})
        return data
    }

    public async recentScoresSelf() {
        const data = await v2.user.scores.category(15227110, 'recent', {})
        return data
    }

    public async favouriteBeatmapsSelf() {
        const data = await v2.user.beatmaps.most_played(15227110, {
            limit: 10,
        })
        return data
    }
}
