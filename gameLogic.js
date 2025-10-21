const BAR_WIDTH = 10;
const BAR_HEIGHT = 100;
const BALL_SIZE = 10;
const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 490;
const MARGIN_TO_BAR = 40;

function createInitialState() {
	return {
		bar_width: BAR_WIDTH,
		bar_height: BAR_HEIGHT,
		ball_size: BALL_SIZE,
		canvas_width: CANVAS_WIDTH,
		canvas_height: CANVAS_HEIGHT,
		left_bar_x: MARGIN_TO_BAR,
		right_bar_x: CANVAS_WIDTH - MARGIN_TO_BAR - BAR_WIDTH,
		left_bar_y: (CANVAS_HEIGHT / 2) - (BAR_HEIGHT / 2),
		right_bar_y: (CANVAS_HEIGHT / 2) - (BAR_HEIGHT / 2),
		ball_x: (CANVAS_WIDTH / 2) - (BALL_SIZE / 2),
		ball_y: (CANVAS_HEIGHT / 2) - (BALL_SIZE / 2),
		ball_dx: 2,
		ball_dy: 2,
		timer: 0,
		game: true
	}
}

function updateBall(state) {

	let { ball_x, ball_y, ball_dx, ball_dy, left_bar_x, left_bar_y,
		right_bar_x, right_bar_y, ball_size, bar_height, bar_width,
		canvas_width, canvas_height, game } = state;

	ball_x += ball_dx;
	ball_y += ball_dy;

	// termina el juego si choca con los bordes izquierdo o derecho
	if (ball_x <= 0 || ball_x + ball_size >= canvas_width)
		game = false;

	//rebote con borde superior o inferior
	if (ball_y <= 0 || ball_y + ball_size >= canvas_height)
		ball_dy = -ball_dy;

	//rebote con barra izquierda
	if (ball_x <= left_bar_x + bar_width &&
		ball_y + ball_size >= left_bar_y &&
		ball_y <= left_bar_y + bar_height) {
		ball_dx = Math.abs(ball_dx);
	}
	// Colisión con barra derecha
	if (ball_x + ball_size >= right_bar_x &&
		ball_y + ball_size >= right_bar_y &&
		ball_y <= right_bar_y + bar_height) {
		ball_dx = -Math.abs(ball_dx); // Rebota a la izquierda y pintamos la barra
	}
	return { ...state, ball_x, ball_y, ball_dx, ball_dy, game };
}

function movePlayer(state, player, key) {
	let { left_bar_y, right_bar_y, bar_height, canvas_height } = state;

	if (player === 1) {
		if (key === "w") left_bar_y = Math.max(0, left_bar_y - 10);
		if (key === "s") left_bar_y = Math.min(canvas_height - bar_height, left_bar_y + 10);
	} else {
		if (key === "o") right_bar_y = Math.max(0, right_bar_y - 10);
		if (key === "l") right_bar_y = Math.min(canvas_height - bar_height, right_bar_y + 10);
	}

	return { ...state, left_bar_y, right_bar_y };
}

module.exports = { createInitialState, updateBall, movePlayer };
