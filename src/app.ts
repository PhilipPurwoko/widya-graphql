import { fastify, FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import view from 'point-of-view'
import ejs from 'ejs'
import path from 'path'

const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify()

// Set View Engine
app.register(view, {
    root: path.join(__dirname, 'view'),
    viewExt: 'ejs',
    engine: {
        ejs: ejs
    }
})

app.get('/', (_req: FastifyRequest, res: FastifyReply) => {
    res.view('index')
})

app.setNotFoundHandler((_req: FastifyRequest, res: FastifyReply) => {
    res.view('404')
})

app.setErrorHandler((err: FastifyError, _req: FastifyRequest, res: FastifyReply) => {
    console.log(err)
    res.view('500')
})

app.listen(3000, (err: Error, address: string) => {
    console.log(`Server is now listening on ${address}`)
    if (err) throw err
})