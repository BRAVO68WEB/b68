import { REST } from '@discordjs/rest'
import { WebSocketManager } from '@discordjs/ws'
import { GatewayIntentBits, Client } from '@discordjs/core'
import { configKeys } from '..'

export default class DiscordBotClient {
    public static _client: Client
    private static _rest: REST
    public static _gateway: WebSocketManager
    private static _currentPresence

    public static init() {
        this._rest = new REST({ version: '10' }).setToken(
            configKeys.DISCORD_BOT_TOKEN
        )
        this._gateway = new WebSocketManager({
            token: configKeys.DISCORD_BOT_TOKEN,
            intents: GatewayIntentBits.GuildPresences,
            rest: this._rest,
            shardCount: 1,
            shardIds: [0],
        })
        this._client = new Client({
            rest: this._rest,
            gateway: this._gateway,
        })
    }

    public static getPresence = async () => {
        return this._currentPresence
    }

    // public static getShard = async () => {
    //     return this._gateway.on(WebSocketShardEvents.Dispatch, (data) => {
    //         console.log(data)
    //     })
    // }

    public static setPresence = async (presence: any) => {
        this._currentPresence = presence
    }

    public static getUser = async (id: number) => {
        return this._client.rest.get(`/users/${id}`)
    }
}
