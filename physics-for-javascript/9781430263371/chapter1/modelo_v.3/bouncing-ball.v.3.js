var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d'); 

    var radius = 20;
    var color = "#0000ff";
    var g = 0.1;           // aceleración por gravedad
    var friction = 0.99;   // fricción del aire (ligeramente reduce velocidad en el aire)
    var groundFriction = 0.95; // fricción mayor cuando está en el suelo
    var restitution = 0.8; // coeficiente de restitución (amortiguación en rebotes)
    var x = 50;            // posición horizontal inicial
    var y = 50;            // posición vertical inicial
    var vx = 2;            // velocidad horizontal inicial
    var vy = 0;            // velocidad vertical inicial

    var isOnGround = false; // para detectar si está en contacto con el suelo

    window.onload = init; 

    function init() {
      setInterval(onEachStep, 1000/60); // 60 fps
    }

    function onEachStep() {
      // Aplicar gravedad
      vy += g;

      // Aplicar fricción del aire (siempre, incluso en el aire)
      vx *= friction;
      vy *= friction;

      // Actualizar posición
      x += vx;
      y += vy;

      // Detectar si está en el suelo
      isOnGround = false;

      // Rebote en el suelo
      if (y > canvas.height - radius) {
        y = canvas.height - radius;
        vy *= -restitution; // rebote con pérdida de energía
        isOnGround = true;
      }

      // Rebote en la pared derecha
      if (x > canvas.width - radius) {
        x = canvas.width - radius;
        vx *= -restitution;
      }

      // Rebote en la pared izquierda
      if (x < radius) {
        x = radius;
        vx *= -restitution;
      }

      // Aplicar fricción extra si está en el suelo (simula arrastre con la superficie)
      if (isOnGround) {
        vx *= groundFriction;
      }

      // Umbral de "reposo": si la velocidad es muy pequeña, detenerla por completo
      if (Math.abs(vx) < 0.05 && isOnGround) {
        vx = 0;
      }
      if (Math.abs(vy) < 0.05 && isOnGround) {
        vy = 0;
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