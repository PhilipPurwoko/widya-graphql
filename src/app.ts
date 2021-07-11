import { fastify, FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import mercurius from 'mercurius'
import { schema } from './graphql/schema'
import { resolvers } from './graphql/resolvers'

const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({ 'logger': false })

app.register(mercurius, {
    schema,
    resolvers,
    graphiql: true
})

app.setNotFoundHandler((_req: FastifyRequest, res: FastifyReply) => {
    res.send({
        'error': {
            'code': 404,
            'text': 'Not Found'
        }
    })
})

app.setErrorHandler((err: FastifyError, _req: FastifyRequest, res: FastifyReply) => {
    console.log(err)
    res.send({
        'error': {
            'code': 500,
            'text': 'Server Error'
        }
    })
})

app.listen(3000, (err: Error, address: string) => {
    console.log(`Server is now listening on ${address}`)
    if (err) throw err
})