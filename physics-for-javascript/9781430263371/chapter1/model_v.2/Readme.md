# Simulación de Bola rebotando

Una sencilla pero efectiva simulación de una bola que rebota dentro de un lienzo (`<canvas>`), aplicando principios básicos de física como **gravedad**, **rebote con amortiguación** y **colisiones con los bordes**.

## Características

- **Gravedad constante**: la bola cae hacia abajo de forma natural.
- **Rebotes realistas**: pierde energía en cada colisión (tanto en el suelo como en las paredes laterales).
- **Movimiento continuo**: actualizado a **60 cuadros por segundo (FPS)** para una animación suave.
- **Detección de colisiones**: evita que la bola salga del lienzo, rebotando en los cuatro bordes.

> **Corrección clave**: a diferencia de versiones iniciales, **ya no hay "envoltura" horizontal** (wrap-around). La bola rebota coherentemente en todas las direcciones, respetando el sentido común físico.

---

## Cómo usarlo

1. **Incluye un elemento `<canvas>` en tu HTML** con `id="canvas"`:
   
   ```html
   <canvas id="canvas" width="800" height="400"></canvas>
   ```
   
2. **Asegúrate de que el script se ejecute después de que la página cargue** (el `window.onload = init` ya lo maneja).

3. **Personaliza fácilmente**:
   
   - Cambia `radius` para ajustar el tamaño de la bola.
   - Modifica `color` para cambiar su color.
   - Ajusta `g` para simular gravedad más fuerte o más débil.
   - Cambia `vx` y `vy` para alterar la velocidad inicial.

---

## Limitaciones (y oportunidades de mejora)

- **No incluye fricción con el suelo**: la bola puede deslizarse eternamente sobre la superficie si no hay colisiones verticales.  
  *(En una versión avanzada, se recomienda añadir fricción horizontal cuando la bola está en contacto con el suelo para lograr un reposo realista).*

- **No hay fricción del aire**: la velocidad horizontal no decae en el aire (solo en rebotes).

> **Consejo**: para una simulación más realista, considera agregar un pequeño factor de fricción continua (`vx *= 0.999`) y un umbral de "reposo" para detener la bola cuando su velocidad sea casi nula.

---

## Ejemplo mínimo completo

```html
<!DOCTYPE html>
<html>
<head>
  <title>Bola Rebotando</title>
</head>
<body>
  <canvas id="canvas" width="800" height="400" style="border:1px solid #000;"></canvas>
  <script>
    // Pegar aquí el código proporcionado
  </script>
</body>
</html>
```

---

## Propósito

Este script es ideal para:
- Aprender los fundamentos de animación y física en 2D con HTML5 Canvas.
- Servir como base para juegos simples (como Pong, pinball o simulaciones educativas).
- Entender cómo modelar colisiones, gravedad y energía en entornos interactivos.
