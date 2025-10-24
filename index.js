const fastify = require('fastify')();
const { createInitialState, updateBall, movePlayer } = require('./gameLogic');

(async () => {
	await fastify.register(require('@fastify/cors'), { origin: true });

	// 🔹 Endpoint raíz
	fastify.get('/', async () => ({ message: 'Microservicio Pong activo' }));

	// Inicia el juego
	fastify.post('/init', async () => initGame());

	// 🔹 Devuelve el estado actual
	fastify.get('/state', async () => getState());

	// 🔹 Mueve un jugador
	fastify.post('/move', async (req) => {
		const { player, key } = req.body;
		movePlayer(player, key);
	});

	// 🔹 Reinicia el juego
	fastify.post('/reset', async () => initGame());

	// 🔹 Inicia el servidor
	try {
		await fastify.listen({ port: 3000 });
		console.log('✅ Servidor iniciado en http://localhost:3000');
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
})();
