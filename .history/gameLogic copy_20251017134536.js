/*
Cuando pasamos a una arquitectura de microservicios, queremos separar responsabilidades:
gameLogic.js ya no debe encargarse del tiempo ni de la comunicación, sino solo de la lógica.

En el nuevo diseño:
gameLogic.js se convierte en un módulo puro de funciones → recibe un estado y devuelve un estado nuevo.
index.js (o el frontend, o un servicio aparte) se encarga del ciclo de actualización (loop) y de emitir los datos al cliente.
*/

let timer = 0;
const BAR_WIDTH = 10;
const BAR_HEIGHT = 100;
const BALL_SIZE = 10;
//width="900" height="490"
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
		// apartir de ahora estas linieas deben inicializarse aqui
		// y no como variables globales porque el estado se maneja
		// de forma externa y se pasa como parámetro a las funciones.
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
	/*
		Quitamos esas líneas porque ya no queremos que gameLogic.js
		controle ni el tiempo ni la comunicación.
		Solo debe encargarse de la lógica de actualización del juego.
		clientEmit(tableStatus);
		if (game)
			setTimeout(updateState, 1000 / 60); // 60 FPS */

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

	/*
	  if (left_bar_y < 0) {
		left_bar_y = 0;
	}
	else if (left_bar_y + bar_height > canvas_height) {
		left_bar_y = - bar_height;
	}

	if (right_bar_y < 0) {
		right_bar_y = 0;
	}
	else if (right_bar_y + bar_height > canvas_height) {
		right_bar_y = canvas_height - bar_height;
	}
	*/

	//rebote con barra izquierda
	if (ball_x <= left_bar_x + bar_width &&
		ball_y + ball_size >= left_bar_y &&
		ball_y <= left_bar_y + bar_height) {
		ball_dx = Math.abs(ball_dx); // Rebota a la derecha y pintamos la barra
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
	if (player === 1) {
		if (key === "w") state.left_bar_y -= 10;
		if (key === "s") state.left_bar_y += 10;
	} else {
		if (key === "o") state.right_bar_y -= 10;
		if (key === "l") state.right_bar_y += 10;
	}
	return state;
}

module.exports = { createInitialState, updateBall, listenPlayer };
