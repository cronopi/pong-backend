const BAR_WIDTH = 10;
const BAR_HEIGHT = 100;
const BALL_SIZE = 10;
//width="900" height="490"
const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 490;
const MARGIN_TO_BAR = 40;
const LEFT_BAR_X = MARGIN_TO_BAR;
const RIGHT_BAR_X = CANVAS_WIDTH - MARGIN_TO_BAR - BAR_WIDTH;
let timer;
let left_bar_y;
let right_bar_y;
let ball_x;
let ball_y;
let ball_dx;
let ball_dy;
let game;

function initGame() {
	console.log('iniciando el juego');
	timer = 0;
	left_bar_y = (CANVAS_HEIGHT / 2) - (BAR_HEIGHT / 2);
	right_bar_y = (CANVAS_HEIGHT / 2) - (BAR_HEIGHT / 2);
	ball_x = (CANVAS_WIDTH / 2) - (BALL_SIZE / 2);
	ball_y = (CANVAS_HEIGHT / 2) - (BALL_SIZE / 2);
	ball_dx = 2;
	ball_dy = 2;
	game = true;
	updateState();
	updateTimer();
}

function updateState() {
	updateBall();
	if (game)
		setTimeout(updateState, 1000);
}

function updateBall() {
	ball_x += ball_dx;
	ball_y += ball_dy;

	// termina el juego si choca con los bordes izquierdo o derecho
	if (ball_x <= 0 || ball_x + BALL_SIZE >= CANVAS_WIDTH)
		game = false;

	if (left_bar_y < 0) {
		left_bar_y = 0;
	}
	else if (left_bar_y + BAR_HEIGHT > CANVAS_HEIGHT) {
		left_bar_y = - BAR_HEIGHT;
	}

	if (right_bar_y < 0) {
		right_bar_y = 0;
	}
	else if (right_bar_y + BAR_HEIGHT > CANVAS_HEIGHT) {
		right_bar_y = CANVAS_HEIGHT - BAR_HEIGHT;
	}

	//rebote con borde superior o inferior
	if (ball_y <= 0 || ball_y + BALL_SIZE >= CANVAS_HEIGHT)
		ball_dy = -ball_dy;

	//rebote con barra izquierda
	if (ball_x <= LEFT_BAR_X + BAR_WIDTH &&
		ball_y + BALL_SIZE >= left_bar_y &&
		ball_y <= left_bar_y + BAR_HEIGHT) {
		ball_dx = Math.abs(ball_dx); // Rebota a la derecha y pintamos la barra
	}
	// Colisión con barra derecha
	if (ball_x + BALL_SIZE >= RIGHT_BAR_X &&
		ball_y + BALL_SIZE >= right_bar_y &&
		ball_y <= right_bar_y + BAR_HEIGHT) {
		ball_dx = -Math.abs(ball_dx); // Rebota a la izquierda y pintamos la barra
	}
}

function updateTimer() {
	timer++;
	setTimeout(updateTimer, 1000);
}

function getState() {
	return {
		bar_width: BAR_WIDTH,
		bar_height: BAR_HEIGHT,
		ball_size: BALL_SIZE,
		canvas_width: CANVAS_WIDTH,
		canvas_height: CANVAS_HEIGHT,
		left_bar_x: LEFT_BAR_X,
		right_bar_x: RIGHT_BAR_X,
		left_bar_y: left_bar_y,
		right_bar_y: right_bar_y,
		ball_x: ball_x,
		ball_y: ball_y,
		timer: timer,
		game: game
	}
}

function MovePlayer(player, key) {
	console.log(player, key);
	if (player === 1) {
		if (key === "w") left_bar_y -= 10;
		if (key === "s") left_bar_y += 10;
	} else {
		if (key === "o") right_bar_y -= 10;
		if (key === "l") right_bar_y += 10;
	}
}
