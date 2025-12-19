//Este script en JavaScript crea una animación interactiva dentro de un elemento <canvas> donde una pelota azul puede moverse y rebotar bajo el efecto de la gravedad simulada. 
//	Al iniciar, se define un objeto Ball con posición, velocidad, tamaño y color. La función principal onEachStep actualiza en cada ciclo la posición de la pelota aplicando una aceleración vertical hacia abajo (g = 0.1) 
//	y gestionando las colisiones con el borde inferior del lienzo, haciendo que rebote y pierda parte de su energía.

//Además, el script permite la interacción del usuario con el ratón: al presionar y arrastrar dentro del lienzo, la pelota sigue el movimiento del cursor, y al soltarla, vuelve a moverse libremente bajo la gravedad. 
//Esto se logra mediante los eventos mousedown, mousemove y mouseup, que activan o desactivan el arrastre. El resultado es una simulación sencilla y visualmente clara de un objeto sometido a la gravedad con comportamiento físico básico.

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d'); 

var g = 0.1;
var radius = 20;
var color = "#0000ff";
var ball;
var isDragging = false;
 
window.onload = init; 
 
function init() {
  ball = new Ball(radius,color);
  ball.x = 50;
  ball.y = canvas.height - radius;
  ball.vx = 0;
  ball.vy = 0;
  ball.draw(context);
  
  canvas.addEventListener('mousedown', function () {
	canvas.addEventListener('mousemove',onDrag,false);
	canvas.addEventListener('mouseup',onDrop,false);
  }, false);
  setInterval(onEachStep, 1000/60); 
};
 
function onDrag(evt){
	isDragging = true;
	ball.x = evt.clientX;
	ball.y = evt.clientY;	
}

function onDrop(){
	isDragging = false;
	canvas.removeEventListener('mousemove',onDrag,false);
	canvas.removeEventListener('mouseup',onDrop,false);	
}

function onEachStep() {
	if (isDragging==false){
		ball.vy += g; 
		ball.x += ball.vx; 
		ball.y += ball.vy; 
 
		if (ball.y > canvas.height - radius){ 
			ball.y = canvas.height - radius; 
			ball.vy *= -0.8; 
		}
		if (ball.x > canvas.width + radius){ 
			ball.x = -radius; 
		}
	}
	context.clearRect(0, 0, canvas.width, canvas.height);  
	ball.draw(context); 
};
 
