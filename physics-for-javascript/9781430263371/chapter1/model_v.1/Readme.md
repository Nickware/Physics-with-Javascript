# Simulación de una pelota rebotando 

Este es un programa en JavaScript que simula una pelota rebotando dentro de un lienzo HTML5. Usa la API del elemento `<canvas>` para dibujar y actualizar el movimiento de la pelota en tiempo real, aplicando física básica (gravedad, velocidad y rebote). A continuación se explica el funcionamiento paso a paso:

***

### 1. Configuración inicial del contexto gráfico

```javascript
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
```

Estas líneas obtienen una referencia al elemento `<canvas>` en el documento HTML y su contexto 2D, que es el área donde se dibuja la animación. Sin el contexto, no se pueden representar figuras.

***

### 2. Definición de variables físicas y visuales

```javascript
var radius = 20;
var color = "#0000ff";
var g = 0.1; // gravedad simulada
var x = 50;  
var y = 50;  
var vx = 2;  // velocidad horizontal
var vy = 0;  // velocidad vertical
```

- `radius` define el tamaño del círculo.  
- `color` indica su color (en este caso, azul).  
- `g` representa la aceleración de la gravedad.  
- `x` y `y` son las posiciones iniciales.  
- `vx` y `vy` son las velocidades horizontal y vertical.

Cada “frame” de la animación actualizará `x`, `y`, `vx` y `vy` según las reglas físicas.

***

### 3. Bucle principal de animación

```javascript
window.onload = init; 
 
function init() {
  setInterval(onEachStep, 1000/60); // ejecuta 60 veces por segundo
};
```

Cuando carga la ventana, se ejecuta `init()`, que inicia un **bucle temporal de 60 fotogramas por segundo**. Cada ciclo llama a `onEachStep()`, responsable de mover y redibujar la pelota.

***

### 4. Cálculo del movimiento y rebote

```javascript
function onEachStep() {
  vy += g; // incremento de velocidad vertical por efecto de la gravedad
  x += vx; // movimiento horizontal
  y += vy; // movimiento vertical

  if (y > canvas.height - radius){ // rebote con el suelo
    y = canvas.height - radius;
    vy *= -0.8; // invierte dirección y reduce velocidad (simula pérdida de energía)
  }
  if (x > canvas.width + radius){ // si la bola sale a la derecha
    x = -radius; // reaparece desde la izquierda
  }
  drawBall();
};
```

- `vy += g` aplica la gravedad.  
- Si la pelota toca el suelo (`y > canvas.height - radius`), se invierte `vy` y se multiplica por `-0.8` para perder energía en el rebote.  
- Si cruza el borde derecho, reaparece a la izquierda (`x = -radius`), creando un movimiento cíclico.  
- Finalmente, se llama a `drawBall()` para visualizar la nueva posición.

***

### 5. Dibujo de la pelota

```javascript
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
```

- `clearRect()` limpia todo el lienzo antes de dibujar el siguiente frame.  
- `arc()` dibuja un círculo con centro `(x, y)` y radio `radius`.  
- `fill()` lo rellena del color especificado.  

El uso del `with(context)` simplifica la escritura, permitiendo llamar directamente a los métodos del contexto 2D.

***

### 6. Resultado general

El resultado es una animación fluida de una **pelota azul cayendo, rebotando y desplazándose horizontalmente** en el lienzo. Cada rebote reduce la altura máxima por la fricción simulada (`vy *= -0.8`), haciendo que tarde en quedar en reposo si la fricción fuera menor.

***

### 7. Sugerencias de mejora

- Sustituir `setInterval()` por `requestAnimationFrame()` para una animación más eficiente y sincronizada con la pantalla.[2][4]
- Añadir colisiones laterales para que la pelota rebote también en los bordes verticales.  
- Incorporar controles de usuario o múltiples pelotas para hacerlo más interactivo.  

En resumen, este script es un **modelo básico de animación física en 2D** que aplica leyes simples de movimiento y rebote usando el lienzo HTML y el motor de JavaScript del navegador.[4][6][2]

[1](https://www.youtube.com/watch?v=YYmM7IrhSBs)
[2](https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Bounce_off_the_walls)
[3](https://www.youtube.com/watch?v=o8LUdd7L8fw)
[4](https://www.geeksforgeeks.org/javascript/how-to-build-a-bounce-ball-with-html-and-javascript/)
[5](https://dev.to/jimjohnsonui/javascript-animation-with-canvas-497a)
[6](https://www.linkedin.com/pulse/html5-canvas-bouncing-ball-animation-game-javascript)
[7](https://github.com/bholzer/Bouncing-Ball-Animation-Tutorial)
[8](https://www.youtube.com/watch?v=-HHFKpps7fQ)
