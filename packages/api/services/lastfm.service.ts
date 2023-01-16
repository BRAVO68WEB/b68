import axiosInstance from '../helpers/axios_client'
import { configKeys } from '../'

const config = configKeys

export default class LastfmService {
    public current = async () => {
        const { data } = await axiosInstance.get(
            `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=Bravo68web&api_key=${config.LASTFM_API_KEY}&format=json&limit=1`
        )
        return data
    }
    public user = async () => {
        const { data } = await axiosInstance.get(
            `https://ws.audioscrobbler.com/2.0/?method=user.getInfo&user=Bravo68web&api_key=${config.LASTFM_API_KEY}&format=json&limit=1`
        )
        return data
    }

    public loved = async () => {
        const { data } = await axiosInstance.get(
            `https://ws.audioscrobbler.com/2.0/?method=user.getLovedTracks&user=Bravo68web&api_key=${config.LASTFM_API_KEY}&format=json&limit=1`
        )
        return data
    }

    public top = async () => {
        const { data } = await axiosInstance.get(
            `https://ws.audioscrobbler.com/2.0/?method=user.getTopTracks&user=Bravo68web&api_key=${config.LASTFM_API_KEY}&format=json&limit=1`
        )
        return data
    }
}
