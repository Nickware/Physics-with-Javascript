Este tipo de simulación se enmarca en la **mecánica clásica**, específicamente en la **dinámica de partículas** y las **simulaciones físicas discretizadas en el tiempo**. A continuación, se presenta la **base teórica, principios físicos, modelos matemáticos y referencias clave** que sustentan este tipo de simulaciones.

---

## Simulación del Rebote de una Partícula: Base Teórica

### 1. **Mecánica Newtoniana (F = ma)**  
La base fundamental es la **segunda ley de Newton**:

\[
\vec{F} = m \vec{a}
\]

En movimiento vertical (caída libre o rebote), la única fuerza significativa es la **gravedad**:

\[
F_g = mg \quad \Rightarrow \quad a = g
\]

> Esto implica una aceleración constante hacia abajo, lo que lleva a ecuaciones de movimiento parabólicas.

---

### 2. **Integración Numérica: Método de Euler Explícito**  
Como la simulación se ejecuta paso a paso en el tiempo (por ejemplo, en cada `ENTER_FRAME`), se usa una **integración numérica simple** para actualizar posición y velocidad.

El método más común (y usado en tu código) es el **método de Euler**:

```text
vy += g * dt      → actualización de velocidad
y  += vy * dt     → actualización de posición
```

Aunque en tu caso `dt = 1` (por simplicidad temporal), esto asume un paso de tiempo unitario entre fotogramas.

>  Este método es básico pero suficiente para simulaciones simples. Es inestable si `dt` es grande o si hay muchas colisiones.

---

### 3. **Modelo de Colisión Inelástica (Rebote con amortiguación)**  
Cuando la pelota choca con el suelo, no rebota perfectamente: pierde energía.

Esto se modela con el **coeficiente de restitución** (\( e \)):

\[
v_{\text{después}} = -e \cdot v_{\text{antes}}
\]

- Si \( e = 1 \): rebote perfectamente elástico (energía conservada).
- Si \( e < 1 \): rebote inelástico (pérdida de energía).
- En tu código: `vy *= -0.8` → \( e = 0.8 \)

 Este modelo proviene de la **mecánica del contacto** y la **física de impactos**.

---

### 4. **Sistemas Discretos de Tiempo Real (Game Loop / Frame-based Simulation)**  
La simulación ocurre dentro de un bucle de juego (`ENTER_FRAME`), donde el estado físico se actualiza por fotograma.

Esto pertenece al campo de:
- **Simulaciones en tiempo real**
- **Motor de física 2D simplificado**
- Usado en videojuegos, animaciones interactivas y visualizaciones educativas.

> Limitación: si el paso de tiempo `dt` no es constante, pueden ocurrir errores (como atravesar el suelo). Soluciones avanzadas usan **detención de colisiones continua** (CCD).

---

## Referencias Fundamentales

A continuación, las obras clave que establecieron estos conceptos:

---

### Isaac Newton (1687) – *Philosophiæ Naturalis Principia Mathematica*  
**Contribución**: Leyes del movimiento y gravitación universal.  
> Base de toda mecánica clásica. Sin ella, no hay caída libre ni trayectorias parabólicas.

- Newton, I. (1687). *Philosophiæ Naturalis Principia Mathematica*. Londres.

---

### Leonhard Euler (1768) – Métodos de integración numérica  
**Contribución**: Desarrollo del método de integración que lleva su nombre.  
> Primera aproximación sistemática a resolver ecuaciones diferenciales numéricamente.

- Euler, L. (1768). *Institutionum Calculi Integralis*.  
  → Introdujo métodos para integrar ecuaciones diferenciales ordinarias paso a paso.

---

### Paul M. Naghdi (1991) – Mecánica del continuo y colisiones  
**Contribución**: Formulación rigurosa de impactos y contacto mecánico.  
> El coeficiente de restitución fue formalizado en el siglo XIX, pero su tratamiento moderno viene de la mecánica del sólido deformable.

- Stronge, W. J. (2000). *Impact Mechanics*. Cambridge University Press.  
  → Excelente texto sobre cómo modelar rebotes, choques y disipación.

---

### David Baraff (1990s) – Física para gráficos y animación  
**Contribución**: Algoritmos para simulación física en computación gráfica.  
> Pionero en motores de física para animaciones (como en Pixar).

- Baraff, D. (1994). "Interactive Simulation of Rigid Body Dynamics in Computer Graphics".  
  *Computer Graphics Forum*, **13**(1), 255–267.  
  DOI: [10.1111/1467-8659.1310255](https://doi.org/10.1111/1467-8659.1310255)

> Su trabajo inspiró motores como Box2D, Matter.js, y los usados en juegos 2D.

---

### Erin Catto – Box2D (2007)  
**Contribución**: Motor de física 2D open-source ampliamente usado.  
> Implementa integración mejorada (Runge-Kutta, resolución de colisiones, manifolds, etc.).

- Catto, E. (2007). *Box2D: A 2D Physics Engine for Games*.  
  → https://box2d.org/

> Tu simulación es una versión minimalista de lo que Box2D hace con múltiples cuerpos, fricción, rotación, etc.

---

##  Visión Conjunta: De la física a la simulación

| Concepto | Origen físico | Implementación en simulación |
|--------|----------------|-------------------------------|
| Gravedad | Newton (1687) | `vy += g` |
| Movimiento | Cinemática clásica | `x += vx`, `y += vy` |
| Integración | Euler (1768) | Actualización por fotograma |
| Rebote | Coeficiente de restitución (Newton, Huygens) | `vy *= -e` |
| Tiempo discreto | Computación gráfica moderna | Bucle `ENTER_FRAME` |

---

## Aplicaciones actuales

Este tipo de simulaciones es base de:
- Videojuegos 2D (plataformas, puzzles)
- Animaciones interactivas (educación, arte digital)
- Modelado de sistemas granulares (arena, líquidos)
- Robótica y control de movimiento

---

## Conclusión

La simulación del rebote de una partícula, aunque simple en apariencia, descansa sobre una **base teórica profunda** que combina:

1. **Física clásica** (Newton),
2. **Matemáticas aplicadas** (Euler),
3. **Mecánica del impacto** (restitución),
4. **Computación gráfica** (tiempo discreto, motores de física).

Tu ejemplo —con gravedad, velocidad y rebote amortiguado— es un **prototipo didáctico perfecto** de cómo se simulan fenómenos físicos en entornos digitales.

## Simulación en Haxe que describe el rebote de una partícula

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
