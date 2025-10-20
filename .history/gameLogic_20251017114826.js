let timer = 0;
const BAR_WIDTH = 10;
const BAR_HEIGHT = 100;
const BALL_SIZE = 10;
//width="900" height="490"
const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 490;
const MARGIN_TO_BAR = 40;

/* let left_bar_y = (CANVAS_HEIGHT / 2) - (BAR_HEIGHT / 2);
let right_bar_y = (CANVAS_HEIGHT / 2) - (BAR_HEIGHT / 2);
const left_bar_x = MARGIN_TO_BAR;
const right_bar_x = CANVAS_WIDTH - MARGIN_TO_BAR - BAR_WIDTH;
let ball_x = (CANVAS_WIDTH / 2) - (BALL_SIZE / 2);
let ball_y = (CANVAS_HEIGHT / 2) - (BALL_SIZE / 2);

let ball_dx = 2;
let ball_dy = 2;
let game = true; */

function updateState() {
	updateBall();

	tableStatus = {
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
	clientEmit(tableStatus);
	if (game)
		setTimeout(updateState, 1000 / 60); // 60 FPS

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
	if (ball_x <= left_bar_x + BAR_WIDTH &&
		ball_y + BALL_SIZE >= left_bar_y &&
		ball_y <= left_bar_y + BAR_HEIGHT) {
		ball_dx = Math.abs(ball_dx); // Rebota a la derecha y pintamos la barra
	}
	// Colisión con barra derecha
	if (ball_x + BALL_SIZE >= right_bar_x &&
		ball_y + BALL_SIZE >= right_bar_y &&
		ball_y <= right_bar_y + BAR_HEIGHT) {
		ball_dx = -Math.abs(ball_dx); // Rebota a la izquierda y pintamos la barra
	}
}

function listenPlayer(player, key) {
	if (player === 1) {
		if (key === "w") left_bar_y -= 10;
		if (key === "s") left_bar_y += 10;
	} else {
		if (key === "o") right_bar_y -= 10;
		if (key === "l") right_bar_y += 10;
	}
}

function updateTimer() {
	timer++;
	setTimeout(updateTimer, 1000);
}

updateState();
updateTimer();
