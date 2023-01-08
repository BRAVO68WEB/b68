import axiosInstance from '../helpers/axios_client'
import spotifyAccessToken from '../helpers/spotify_provider'
import { configKeys } from '../'

const config = configKeys

export default class Spotify {
    private clientID: string = config.SPOTIFY_CLIENT_ID!
    private clientSecret: string = config.SPOTIFY_CLIENT_SECRET!

    public loginAuth = async () => {
        // let state = crypto.getRandomValues(new Uint32Array(1));
        const data =
            `https://accounts.spotify.com/authorize?client_id=` +
            this.clientID +
            `&response_type=code&redirect_uri=http://localhost:9000/dev/spotify/callback&scope=user-follow-read,user-library-read,user-read-recently-played,user-top-read,user-read-email,user-read-currently-playing`
        return data
    }

    public loginAuthCallback = async (code: string) => {
        const { data } = await axiosInstance.post(
            'https://accounts.spotify.com/api/token',
            `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:9000/dev/spotify/callback`,
            {
                auth: {
                    username: this.clientID,
                    password: this.clientSecret,
                },
            }
        )
        return data
    }

    public getSpotifyTopSongs = async () => {
        const data = await axiosInstance.get(
            'https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term',
            {
                headers: {
                    Authorization: `Bearer ${spotifyAccessToken()}`,
                },
            }
        )

        return data.data
    }
}
