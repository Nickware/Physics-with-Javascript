// === SIMULACIÓN DE UNA BOLA REBOTANDO CON MATERIALES PERSONALIZADOS ===
// Este código simula una bola rebotando en un canvas HTML5, con diferentes materiales que afectan su comportamiento físico.
// Puede seleccionar entre varios materiales (tenis, billar, bolos, baloncesto, golf) para ver cómo cambian las propiedades de rebote y fricción de la bola.
//  Cada material tiene su propia restitución (cuánto rebota), fricción en el suelo y fricción en el aire, lo que influye en la trayectoria y duración del movimiento de la bola.
// Para usarlo, simplemente abrir el archivo HTML que contiene este script en un navegador moderno, seleccionar un material del menú desplegable y observar cómo la bola reacciona de manera diferente según las propiedades físicas del material elegido.
// === AUTOR: ChatGPT ===
// === VERSIÓN: 4.0 ===
// === FECHA: 2024-06-01 ===
// === INSTRUCCIONES DE USO ===
// 1. Abrir el archivo HTML que contiene este script en un navegador moderno.
// 2. Seleccionar un material del menú desplegable para cambiar las propiedades físicas de la bola.
// 3. Observar cómo la bola reacciona de manera diferente según el material seleccionado, con variaciones en el rebote y la fricción.
// 4. Puede ajustar la velocidad inicial, la gravedad o el tamaño de la bola modificando las variables correspondientes en el código para experimentar con diferentes escenarios de simulación.
// === FIN DE LA CABECERA ===
// === CONFIGURACIÓN DEL CANVAS ===
// El canvas es el área de dibujo donde se simula la bola rebotando. Asegúrate de que el elemento canvas esté presente en tu HTML con el id 'canvas' para que este código funcione correctamente.

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// === PROPIEDADES FÍSICAS POR MATERIAL ===
// Cada material tiene propiedades específicas que afectan cómo la bola rebota y se mueve. La restitución determina cuánto rebota la bola, la fricción en el suelo afecta cómo se desacelera al estar en contacto con el suelo, y la fricción en el aire afecta cómo se desacelera mientras está en el aire. El color es simplemente para diferenciar visualmente los materiales.
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
// Estas variables controlan el estado de la bola en la simulación, incluyendo su posición, velocidad, tamaño y las propiedades físicas que se aplican a su movimiento. La gravedad es una constante que afecta cómo la bola cae hacia el suelo, mientras que el radio determina el tamaño de la bola en el canvas.
// Se pueden ajustar estas variables para experimentar con diferentes escenarios de simulación, como cambiar la velocidad inicial, la gravedad o el tamaño de la bola para ver cómo afecta su comportamiento.
// El estado de contacto con el suelo se utiliza para aplicar fricción adicional solo cuando la bola está en contacto con el suelo, lo que hace que la simulación sea más realista al permitir que la bola desacelere más rápidamente cuando está rodando en el suelo.

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
// Este bloque de código se ejecuta una vez que el DOM ha sido completamente cargado. Aquí se configura el evento para el menú desplegable de selección de material, que actualiza las propiedades físicas de la bola según el material seleccionado. También inicia el bucle de animación que actualiza la simulación a 60 cuadros por segundo, permitiendo que la bola se mueva y rebote de manera fluida en el canvas.
// Al cambiar el material, la bola se reinicia a su posición inicial con una velocidad inicial para que puedas observar claramente cómo las nuevas propiedades afectan su comportamiento. Esto permite comparar fácilmente los efectos de diferentes materiales en la simulación.
// Asegúrate de que el elemento select con id 'materialSelect' esté presente en tu HTML para que este código funcione correctamente, y que tenga opciones correspondientes a los materiales definidos en el objeto 'materials'.

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
  // El bucle de animación se ejecuta a 60 cuadros por segundo, lo que proporciona una simulación suave y realista del movimiento de la bola. En cada paso del bucle, se aplican las leyes de la física para actualizar la posición y velocidad de la bola, y luego se renderiza el nuevo estado en el canvas.
  // Puede ajustar la velocidad de actualización cambiando el valor en setInterval, pero ten en cuenta que una tasa de actualización más alta puede requerir más recursos del sistema y podría no ser necesaria para una simulación visualmente fluida.
  // El método setInterval se utiliza para llamar a la función onEachStep repetidamente a intervalos regulares, lo que permite que la simulación se ejecute de manera continua. Cada vez que se llama a onEachStep, se actualizan las propiedades físicas de la bola y se vuelve a dibujar en el canvas, creando la ilusión de movimiento.
  // Asegúrarse que el navegador soporte JavaScript moderno para que esta simulación funcione correctamente, y que el canvas esté configurado con un tamaño adecuado para observar el movimiento de la bola.

  setInterval(onEachStep, 1000 / 60); // 60 FPS
});

// === BUCLE DE ANIMACIÓN ===
// Esta función se ejecuta en cada paso del bucle de animación. Aquí se aplican las leyes de la física para actualizar la posición y velocidad de la bola, incluyendo la gravedad, la fricción del aire y la fricción en el suelo. También se manejan las colisiones con el suelo y las paredes, aplicando la restitución para simular el rebote. Finalmente, se llama a la función drawBall para renderizar el nuevo estado de la bola en el canvas.
// La función onEachStep es el corazón de la simulación, donde se calculan las nuevas posiciones y velocidades de la bola en función de las fuerzas que actúan sobre ella. La gravedad hace que la bola caiga hacia el suelo, mientras que la fricción del aire y del suelo desaceleran su movimiento. Las colisiones con el suelo y las paredes hacen que la bola rebote, y la restitución determina cuánto rebota en cada colisión.
// Asegúrarse de que el canvas esté configurado con un tamaño adecuado para observar el movimiento de la bola, y que el código esté correctamente vinculado a tu HTML para que esta función se ejecute correctamente en cada paso del bucle de animación.
// Puede experimentar con diferentes valores de gravedad, fricción y restitución para ver cómo afectan el comportamiento de la bola en la simulación, lo que te permitirá entender mejor las leyes de la física que rigen el movimiento de los objetos. Además, puede agregar más materiales o ajustar las propiedades de los materiales existentes para explorar una variedad aún mayor de comportamientos físicos en la simulación.

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