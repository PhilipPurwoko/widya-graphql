import { fastify, FastifyInstance } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'

const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({ 'logger': true })

app.get('/', (_req, res) => {
    res.send('hello world')
})

app.listen(3000, (err, address) => {
    console.log(`Server is now listening on ${address}`)
    if (err) throw err
})