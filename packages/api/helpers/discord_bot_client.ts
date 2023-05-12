import { GatewayDispatchEvents } from '@discordjs/core'

import DiscordBotClient from './discord_bot.factory'
import { configKeys } from '..'

export default async () => {
    DiscordBotClient.init()

    const DiscordBot = DiscordBotClient._client

    DiscordBot.on(GatewayDispatchEvents.PresenceUpdate, async ({ data }) => {
        if (data.user.id == String(configKeys.DISCORD_SELF_ID)) {
            DiscordBotClient.setPresence(data)
        }
    })

    const selfInfo = await DiscordBot.api.users.getCurrent()
    DiscordBot.once(GatewayDispatchEvents.Ready, async () => {
        console.log(
            '🔮 ' +
                selfInfo.username +
                '#' +
                selfInfo.discriminator +
                ' : Gateway Connected!'
        )
    })

    DiscordBotClient._gateway.connect()
}
