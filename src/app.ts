import { fastify, FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import { PORT } from './util/env'
import { loadSchemaFiles } from 'mercurius-codegen/dist/schema'
import cors from 'fastify-cors'
import path from 'path'
import mercurius from 'mercurius'
import resolvers from './graphql/resolvers'

const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({ 'logger': false })
const schema: string[] = loadSchemaFiles(path.join(__dirname, 'graphql', 'schema.gql')).schema

app.register(cors)
app.register(mercurius, {
    schema: schema,
    resolvers: resolvers,
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

app.listen(PORT, (err: Error, address: string) => {
    console.log(`Server is now listening on ${address}`)
    if (err) throw err
})