## Simulación en Haxe que describe el rebote de una particula

Este script implementa una simulación sencilla de una **pelota que rebota** utilizando Haxe y OpenFL. A continuación se presenta un resumen estructurado de la propuesta:

### **Clases Principales**

#### 1. `Ball`

- **Hereda:** `Sprite`
- **Propósito:** Representa la pelota como un círculo rojo dibujado en pantalla.
- **Constructor:** Permite definir el radio (por defecto 15 píxeles).


#### 2. `Main`

- **Hereda:** `Sprite`
- **Propósito:** Controla la simulación física y la animación de la pelota.
- **Variables:**
    - `g`: gravedad (0.1)
    - `vx`: velocidad horizontal (2)
    - `vy`: velocidad vertical (inicialmente 0)
    - `ball`: instancia de la clase `Ball`


### **Lógica de la Simulación**

- **Inicialización (`int()`):**
    - Crea la pelota y la agrega al escenario.
    - Posiciona la pelota en `(x=50, y=75)`.
    - Registra un evento para actualizar la animación en cada fotograma (`Event.ENTER_FRAME`).
- **Animación y Física (`onEachTimestep`):**
    - **Actualiza velocidades:**
        - Suma la gravedad a la velocidad vertical (`vy`).
        - Actualiza la posición de la pelota en X e Y usando `vx` y `vy`.
    - **Rebote:**
        - Si la pelota supera el límite inferior (`y > 350`):
            - Invierte y reduce la velocidad vertical (`vy *= -0.8`), simulando pérdida de energía.
            - Reposiciona la pelota justo en el "suelo" (`y = 350`) para evitar que atraviese el borde.


### **Resumen del Funcionamiento**

- Simula una pelota que se mueve horizontalmente y cae bajo la acción de la gravedad.
- Al tocar el suelo, rebota perdiendo parte de su energía vertical.
- El proceso se repite en cada fotograma, creando una animación continua.


### **Notas**

- El script es una buena base para aprender animación y física básica en Haxe/OpenFL.
