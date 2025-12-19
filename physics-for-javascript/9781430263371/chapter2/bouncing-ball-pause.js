// Bola que rebota con pausa al presionar el mouse
// Este código crea una animación simple de una pelota que rebota que se detiene cuando se presiona el mouse sobre el lienzo y se reanuda cuando se suelta el mouse.
// Configurar el lienzo y el contexto
// Definir propiedades de la bola y parámetros físicos.
// Inicializa la animación al cargar la ventana
// Iniciar y detener funciones de animación.
// Actualiza la posición de la pelota y maneja la lógica de rebote
// Dibuja la pelota en la lona.  


var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d'); 

var radius = 20;
var color = "#0000ff";
var g = 0.1; // acceleration due to gravity
var x = 50;  // initial horizontal position
var y = 50;  // initial vertical position
var vx = 2;  // initial horizontal speed
var vy = 0;  // initial vertical speed
 
window.onload = init; 
 
function init() {
  canvas.addEventListener('mousedown',stopAnim,false);
  canvas.addEventListener('mouseup',startAnim,false);  
  startAnim();
};
 
function startAnim() {
  interval = setInterval(onEachStep, 1000/60); // 60 fps
} 
 
function stopAnim() {
  clearInterval(interval);
} 
 
function onEachStep() {
  vy += g; // gravity increases the vertical speed
  x += vx; // horizontal speed increases horizontal position 
  y += vy; // vertical speed increases vertical position
 
  if (y > canvas.height - radius){ // if ball hits the ground
    y = canvas.height - radius; // reposition it at the ground
    vy *= -0.8; // then reverse and reduce its vertical speed
  }
  if (x > canvas.width + radius){ // if ball goes beyond canvas
    x = -radius; // wrap it around 
  }
  drawBall(); // draw the ball
};
 
function drawBall() {
    with (context){
        clearRect(0, 0, canvas.width, canvas.height); 
        fillStyle = color;
        beginPath();
        arc(x, y, radius, 0, 2*Math.PI, true);
        closePath();
        fill();
    };
};