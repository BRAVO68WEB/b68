import fastify from 'fastify'
import client from '../bot'

const server = fastify()

server.get('/', () => {
    return client.user?.username + ' is ready !!'
})

await server.listen({
    port: Number(process.env.PORT ?? '3000'),
    host: '0.0.0.0',
})
