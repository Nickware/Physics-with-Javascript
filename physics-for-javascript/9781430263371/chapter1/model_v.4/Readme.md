# Simulación de diferentes tipos de bolas rebotando

Una simulación avanzada de una bola que **rebota, se desliza y se detiene de forma realista**, donde **el comportamiento físico depende del material seleccionado**.  

---

##  Características

-  **Gravedad realista**.
-  **Fricción del aire y con el suelo**.
-  **Coeficiente de restitución (COR) por material** — ¡cada bola rebota como lo haría en la vida real!
-  **Detección de reposo**: la bola se detiene completamente cuando su energía es mínima.
-  **Interfaz interactiva**: elige entre 5 materiales predefinidos.
-  **Colores y parámetros físicos adaptados al material**.
-  **Animación suave a 60 FPS**.

---

##  Materiales disponibles

| Material                | Coef. de Restitución | Comportamiento                               |
| ----------------------- | -------------------- | -------------------------------------------- |
| **Bola de tenis**       | ~0.75                | Rebota bien, se desliza poco, fricción media |
| **Bola de billar**      | ~0.92                | Rebota mucho, casi sin pérdida de energía    |
| **Bola de bolos**       | ~0.15                | Casi no rebota, se detiene rápido            |
| **Balón de baloncesto** | ~0.82                | Rebote alto, fricción moderada               |
| **Bola de golf**        | ~0.78                | Rebote elástico, baja fricción con el suelo  |

> Los valores están basados en mediciones reales aproximadas en superficies duras.

---

##  Cómo usarlo

1. **Copia el HTML completo** (abajo) en un archivo `.html`.
2. **Ábrelo en tu navegador**.
3. **Selecciona un material** del menú desplegable.
4. **Observa cómo cambia el comportamiento físico** de la bola.

> No se requieren dependencias externas. Solo HTML5, CSS y JavaScript puro.

---

##  ¿Por qué es educativo?

Este modelo enseña conceptos clave de física:
- Energía cinética y potencial
- Pérdida de energía en colisiones inelásticas
- Fricción estática y dinámica
- Propiedades materiales en dinámica

Ideal para clases de física, desarrollo de juegos o prototipado de simulaciones.

---

##  Extensible

Se puede añadir una **bola de acero**, una **pelota de ping-pong** o una **piedra**  
Solo es agregar una nueva entrada en el objeto `materials` con sus propiedades físicas.

---

## Resultado esperado

Al cambiar de material:
- La **bola de bolos** cae y apenas rebota → se detiene casi al instante.
- La **bola de billar** rebota muchas veces con poca pérdida de altura.
- La **bola de tenis** tiene un comportamiento intermedio, con buen rebote pero fricción notable.
- El **balón de baloncesto** rebota alto y se desliza un poco antes de detenerse.
- La **bola de golf** rebota con elasticidad y rueda más lejos.

---

## Referencias (valores aproximados)

- Coeficientes de restitución basados en pruebas estándar (ASTM, ITF, USGA).
- Fricción ajustada empíricamente para efectos visuales creíbles.
