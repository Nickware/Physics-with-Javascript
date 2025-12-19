// === CONFIGURACIÓN DEL CANVAS ===
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// === PROPIEDADES FÍSICAS POR MATERIAL ===
const materials = {
  tennis: {
    name: "Bola de tenis",
    restitution: 0.75,
    groundFriction: 0.85,
    airFriction: 0.992,
    color: "#00ff00ff"
  },
  billiard: {
    name: "Bola de billar",
    restitution: 0.92,
    groundFriction: 0.97,
    airFriction: 0.998,
    color: "#0000ff"
  },
  bowling: {
    name: "Bola de bolos",
    restitution: 0.15,
    groundFriction: 0.70,
    airFriction: 0.999,
    color: "#333333"
  },
  basketball: {
    name: "Balón de baloncesto",
    restitution: 0.82,
    groundFriction: 0.80,
    airFriction: 0.990,
    color: "#e74c3c"
  },
  golf: {
    name: "Bola de golf",
    restitution: 0.78,
    groundFriction: 0.90,
    airFriction: 0.995,
    color: "#f5860eff"
  }
};

// === VARIABLES DE SIMULACIÓN ===
let radius = 20;
let g = 0.1; // gravedad
let x = 50;
let y = 50;
let vx = 3;
let vy = 0;
let color = materials.tennis.color;
let restitution = materials.tennis.restitution;
let friction = materials.tennis.airFriction;
let groundFriction = materials.tennis.groundFriction;
let isOnGround = false;

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', () => {
  const materialSelect = document.getElementById('materialSelect');

  materialSelect.addEventListener('change', (e) => {
    const mat = materials[e.target.value];
    restitution = mat.restitution;
    groundFriction = mat.groundFriction;
    friction = mat.airFriction;
    color = mat.color;
    // Reiniciar para observar claramente el nuevo comportamiento
    x = 50;
    y = 50;
    vx = 3;
    vy = 0;
  });

  // Iniciar la simulación
  setInterval(onEachStep, 1000 / 60); // 60 FPS
});

// === BUCLE DE ANIMACIÓN ===
function onEachStep() {
  // Aplicar gravedad
  vy += g;

  // Fricción del aire (siempre activa)
  vx *= friction;
  vy *= friction;

  // Actualizar posición
  x += vx;
  y += vy;

  // Reiniciar estado de contacto
  isOnGround = false;

  // Rebote en el suelo
  if (y > canvas.height - radius) {
    y = canvas.height - radius;
    vy *= -restitution;
    isOnGround = true;
  }

  // Rebote en pared derecha
  if (x > canvas.width - radius) {
    x = canvas.width - radius;
    vx *= -restitution;
  }

  // Rebote en pared izquierda
  if (x < radius) {
    x = radius;
    vx *= -restitution;
  }

  // Fricción adicional si está en el suelo
  if (isOnGround) {
    vx *= groundFriction;
  }

  // Umbral de reposo: detener si la velocidad es muy baja y está en el suelo
  if (isOnGround && Math.abs(vx) < 0.03) vx = 0;
  if (isOnGround && Math.abs(vy) < 0.03) vy = 0;

  // Dibujar
  drawBall();
}

// === RENDERIZADO ===
function drawBall() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
}