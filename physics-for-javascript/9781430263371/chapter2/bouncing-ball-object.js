//Este script en JavaScript dibuja y anima una pelota en movimiento dentro de un elemento <canvas>, aplicándole un comportamiento físico sencillo. Al iniciar, 
//se crea un objeto Ball con un radio, color y posición inicial definidos, además de una velocidad horizontal constante. Una función programada para ejecutarse 60 veces por segundo actualiza la posición del objeto en el lienzo, generando una animación fluida.

//El código simula la acción de la gravedad mediante una aceleración vertical (g = 0.1) que hace que la pelota caiga y rebote al tocar el borde inferior del lienzo, perdiendo parte de su velocidad en cada impacto. 
// Cuando la pelota sale por el borde derecho, reaparece por el lado izquierdo, creando un efecto de movimiento continuo. De esta manera, combina física básica con animación gráfica para lograr una simulación simple pero visualmente atractiva.

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d'); 

var g = 0.1;
var radius = 20;
var color = "#0000ff";
var ball;
 
window.onload = init; 
 
function init() {
  ball = new Ball(radius,color);
  ball.x = 50;
  ball.y = 50;
  ball.vx = 2;
  ball.vy = 0;
  ball.draw(context);
  setInterval(onEachStep, 1000/60); // 60 fps
};
 
function onEachStep() {
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
  context.clearRect(0, 0, canvas.width, canvas.height);  
  ball.draw(context); 
};
 
