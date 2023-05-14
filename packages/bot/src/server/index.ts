import fastify from 'fastify'
import { bot } from '../index'

const server = fastify()

server.get('/', () => {
    return bot.client.user?.username + ' is ready !!'
})

await server.listen({
    port: Number(process.env.PORT ?? '3000'),
    host: '0.0.0.0',
})
