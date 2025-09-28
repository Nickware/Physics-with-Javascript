# Simulación de Bola rebotando con fricción

Una simulación interactiva de una bola en caída libre que **rebota, se desliza y finalmente se detiene** gracias a una modelación física coherente con el mundo real. Incluye **gravedad, fricción del aire, fricción con el suelo, amortiguación en rebotes y detección de reposo**.

---

## Características principales

- **Gravedad constante**: la bola acelera hacia abajo de forma natural.
- **Rebotes amortiguados**: pierde energía en cada colisión gracias al *coeficiente de restitución* (`restitution = 0.8`).
- **Fricción del aire**: reduce suavemente la velocidad en el aire (`friction = 0.99`).
- **Fricción con el suelo**: cuando la bola toca la superficie, su velocidad horizontal disminuye más rápido (`groundFriction = 0.95`).
- **Detección de reposo**: si la velocidad es muy baja y está en el suelo, **se detiene completamente**, evitando movimientos infinitesimales.
- **Colisiones en los cuatro bordes**: rebota coherentemente en paredes izquierda, derecha y suelo.
- **Animación a 60 FPS**: suave y fluida.

**¡Nada se mueve para siempre!** La bola se detiene como lo haría en la vida real.

---

## Cómo usarlo

1. **Agrega un `<canvas>` en tu HTML** con `id="canvas"`:
   
   ```html
   <canvas id="canvas" width="800" height="400"></canvas>
   ```
   
2. **Incluye este script** después del elemento canvas o dentro de un bloque `<script>` al final del `<body>`.

3. **Personaliza fácilmente**:
   - `radius`: tamaño de la bola.
   - `color`: color de relleno (formato CSS válido).
   - `g`: intensidad de la gravedad.
   - `friction` / `groundFriction`: ajusta la resistencia del aire y del suelo.
   - `restitution`: controla cuán "elástico" es el rebote (1 = rebote perfecto, 0 = sin rebote).
   - `vx`, `vy`: velocidad inicial.

---

## Ejemplo mínimo completo

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title># Bola rebotando con fricción <title>
  <style>
    canvas { border: 1px solid #333; background: #f9f9f9; }
  </style>
</head>
<body>
  <canvas id="canvas" width="800" height="400"></canvas>
  <script>
    // Pegar aquí el código proporcionado
  </script>
</body>
</html>
```

---

## Conceptos físicos implementados

| Concepto                  | Implementación                                             |
| ------------------------- | ---------------------------------------------------------- |
| **Gravedad**              | `vy += g` en cada fotograma                                |
| **Fricción del aire**     | `vx *= friction; vy *= friction`                           |
| **Fricción con el suelo** | `vx *= groundFriction` cuando `isOnGround === true`        |
| **Rebote inelástico**     | `vy *= -restitution` al tocar el suelo                     |
| **Reposo físico**         | Velocidades cercanas a cero se anulan si están en el suelo |

---

## ¿Por qué es diferente?

A diferencia de simulaciones básicas que hacen rebotar una bola eternamente, **esta versión respeta el sentido común físico**:
> *"En el mundo real, los objetos se detienen por fricción y pérdida de energía. Aquí también."*

Ideal para:
- Proyectos educativos de física.
- Prototipos de juegos 2D realistas.
- Aprender animación y dinámica en HTML5 Canvas.

---

## Ideas para extender

- Añadir arrastre con el mouse para lanzar la bola.
- Soportar múltiples bolas con colisiones entre ellas.
- Agregar viento o fuerzas externas.
- Incluir rotación visual al rodar.
