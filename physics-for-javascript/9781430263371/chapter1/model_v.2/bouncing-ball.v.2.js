var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d'); 

    var radius = 20;
    var color = "#0000ff";
    var g = 0.1; // aceleración por gravedad
    var x = 50;  // posición horizontal inicial
    var y = 50;  // posición vertical inicial
    var vx = 2;  // velocidad horizontal inicial
    var vy = 0;  // velocidad vertical inicial

    window.onload = init; 

    function init() {
      setInterval(onEachStep, 1000/60); // 60 fps
    }

    function onEachStep() {
      // Aplicar física
      vy += g;           // gravedad afecta velocidad vertical
      x += vx;           // actualizar posición horizontal
      y += vy;           // actualizar posición vertical

      // Rebote en el suelo
      if (y > canvas.height - radius) {
        y = canvas.height - radius;
        vy *= -0.8;      // rebote con pérdida de energía
      }

      // Rebote en la pared derecha
      if (x > canvas.width - radius) {
        x = canvas.width - radius;
        vx *= -0.8;      // rebote horizontal con amortiguación
      }

      // Rebote en la pared izquierda
      if (x < radius) {
        x = radius;
        vx *= -0.8;
      }

      // Dibujar
      drawBall();
    }

    function drawBall() {
      context.clearRect(0, 0, canvas.width, canvas.height); 
      context.fillStyle = color;
      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI, true);
      context.closePath();
      context.fill();
    }