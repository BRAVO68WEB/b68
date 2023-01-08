import axios from '../helpers/axios_client'

export default class DiscordService {
    public activity = async () => {
        const { data } = await axios.get(
            `https://api.lanyard.rest/v1/users/457039372009865226`
        )
        return data.data
    }

    public banner = async () => {
        const { data } = await axios.get(
            `https://lanyard-profile-readme.vercel.app/api/457039372009865226`
        )
        return data
    }
}
