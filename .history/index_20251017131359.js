const fastify = require('fastify')();
const { createInitialState, updateBall, movePlayer } = require('./gameLogic');

let gameState = createInitialState();

// Endpoint raíz
fastify.get('/', async () => ({ message: 'Microservicio Pong activo' }));

// Devuelve el estado actual
fastify.get('/state', async () => gameState);

// Actualiza la pelota (por ejemplo, lo llamas desde un frontend cada frame)
fastify.post('/update', async () => {
	gameState = updateBall(gameState);
	return gameState;
});

// Mueve un jugador
fastify.post('/move', async (req) => {
	const { player, key } = req.body;
	gameState = movePlayer(gameState, player, key);
	return gameState;
});

// Reinicia el juego
fastify.post('/reset', async () => {
	gameState = createInitialState();
	return gameState;
});

const start = async () => {
	try {
		await fastify.listen({ port: 3000 });
		console.log('Servidor iniciado en http://localhost:3000');
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

start();
