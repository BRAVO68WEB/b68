import { configKeys } from '..'
import axios from '../helpers/axios_client'
import DiscordBotClient from '../helpers/discord_bot.factory'

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

    public profile = async () => {
        return DiscordBotClient.getUser(configKeys.DISCORD_SELF_ID)
    }

    public presence = async () => {
        return DiscordBotClient.getPresence()
    }
}
