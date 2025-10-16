const fastify = require('fastify')();

fastify.get('/', async (request, reply) => {
	return { saludo: '¡Hola mundo!' };
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
