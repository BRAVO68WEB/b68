import axios from 'axios'
import qs from 'qs'

let data = qs.stringify({
    grant_type: 'refresh_token',
    refresh_token: `${process.env.SPOTIFY_REFRESH_TOKEN}`,
})

let config = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        Authorization:
            `Basic ` +
            Buffer.from(
                `${process.env.SPOTIFY_CLIENT_ID!}:${process.env
                    .SPOTIFY_CLIENT_SECRET!}`
            ).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data,
}

let accessToken = ''

let getAccessToken = async () => {
    axios(config)
        .then(function (result) {
            accessToken = result.data.access_token
            console.log('Initail Generation !!')
        })
        .catch(function (error) {
            console.log(error)
        })
    setInterval(() => {
        axios(config)
            .then(function (result) {
                accessToken = result.data.access_token
            })
            .catch(function (error) {
                console.log(error)
            })
        console.log('Token regenerated')
    }, 3600000)
}
if (process.env.NODE_ENV !== 'production') {
    accessToken =
        'ascawqw3efwsedve45gedrfwe34rwefrwsedgvbxxxxxxxxxxxxxxxxxxxxxxxx'
    console.log('🤞', 'Spotify Token not generated')
} else {
    getAccessToken()
}

export default () => {
    return accessToken
}
