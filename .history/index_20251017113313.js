const fastify = require('fastify')();

//importar game.logic.js
fastify.get('/', async (request, reply) => {
	return { saludo: '¡Hola mundo!' };
});

fastify.post('/update', async (req) => {
	const { state } = req.body; // el cliente o un servicio de estado manda el estado actual
	const newState = updateBall(state);
	return newState;
});

const start = async () => {
	try {
		await fastify.listen({ port: 3000 });
		console.log('Servidor iniciado en http://localhost:3000');
	} catch (error) {
		console.error('Error al iniciar el servidor:', error);
		process.exit(1);
	}
};

start();
