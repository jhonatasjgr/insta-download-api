import fastify from 'fastify';
import cors from '@fastify/cors'; 
import { fetchPostJson } from './src/index.js';

const app = fastify();

const PORT = process.env.PORT || 3000;

app.register(cors, {
  origin: 'https://jhonatasjgr.github.io'
});

app.get('/', async (request, reply) => {
    reply.send('/download/?url=Link-do-video-instagram');
});

app.get('/download/', async (request, reply) => {
    const { url } = request.query;

    console.log("--> GET /download", url, new Date().toLocaleString())

    if (!url) reply.send({ error: 'forneça uma URL do instagram' });
    let resultado = await fetchPostJson(url);
    reply.send({ ...resultado });
});

const start = async () => {
    try {
        await app.listen({ host: '0.0.0.0', port: PORT });
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();