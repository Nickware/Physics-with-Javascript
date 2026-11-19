# Physics with JavaScript, ActionScript and Haxe

## Índice del repositorio

- [JavaScript](physics-for-javascript/README.md)
- [Flash y ActionScript](physics-for-flash/README.md)
- [Tecnologías de transición desde Adobe Flash](physics-for-flash/docs/README.md)
- [Entornos heredados y migración](physics-for-flash/docs/entornos-heredados-y-migracion.md)
- [Haxe](physics-for-haxe/Readme.md)

Colección educativa de ejemplos de física computacional asociados a libros de Apress. El repositorio reúne implementaciones en JavaScript, ActionScript y Haxe para estudiar movimiento, fuerzas, colisiones, partículas, cuerpos rígidos y simulaciones 2D y 3D.

No es un motor de física ni un framework moderno: son proyectos independientes organizados según capítulos de los libros.

## Contenido

### JavaScript

El código de [Physics for JavaScript Games, Animation, and Simulations](physics-for-javascript/README.md) está en `physics-for-javascript/9781430263371/` y se organiza en los capítulos 1 a 16.

Incluye aproximadamente 143 páginas HTML, 277 archivos JavaScript y ejemplos con Canvas y Three.js.

Temas: movimiento, vectores, gravedad, proyectiles, colisiones, fuerzas, campos, órbitas, partículas, resortes, oscilaciones, cuerdas, telas, cuerpos rígidos, integración numérica y simulaciones 3D.

Ejemplos:

- [Pelotas rebotando](physics-for-javascript/9781430263371/chapter2/bouncing-balls.html)
- [Colisiones](physics-for-javascript/9781430263371/chapter11/ball-collision.html)
- [Resortes](physics-for-javascript/9781430263371/chapter14/springs.html)
- [Sistema solar 3D](physics-for-javascript/9781430263371/chapter16/solar-system.html)

### ActionScript y Flash

Consulta [Physics for Flash](physics-for-flash/README.md).

El directorio `physics-for-flash/` contiene variantes para FlashBuilder, Flash CS3 y Flash CS4+. Incluye archivos `.as`, proyectos de IDE, `.fla` y `.swf`.

La guía [Tecnologías de transición desde Adobe Flash](physics-for-flash/docs/README.md) compara alternativas modernas para las tres familias de fuentes.

La [guía de entornos heredados y migración](physics-for-flash/docs/entornos-heredados-y-migracion.md) describe preservación, pruebas y hoja de ruta.

Flash Player dejó de tener soporte el 31 de diciembre de 2020, por lo que estos ejemplos deben considerarse material histórico.

### Haxe

`physics-for-haxe/` contiene proyectos de Haxe/OpenFL, incluyendo [BouncingBall](physics-for-haxe/BouncingBall/Readme.md) y [MaxwellDemon](physics-for-haxe/MaxwellDemon/README.md).

Consulta [la guía de Haxe](physics-for-haxe/Readme.md) antes de compilar.

## Cómo ejecutar los ejemplos JavaScript

Los ejemplos son páginas HTML independientes y no requieren Node.js:

1. Entra en `physics-for-javascript/9781430263371/`.
2. Elige un capítulo y abre un archivo HTML.
3. Si el navegador bloquea recursos locales, inicia:

```bash
python3 -m http.server 8000
```

4. Abre `http://localhost:8000/` y navega hasta el ejemplo.

No hay `package.json`, proceso de build común ni suite principal de pruebas automatizadas.

## Requisitos y limitaciones

- Navegador moderno con Canvas y, en ejemplos 3D, WebGL.
- JavaScript procedente de un libro de 2014.
- Herramientas antiguas para ActionScript y Flash.
- Versiones compatibles de Haxe, OpenFL y Lime.
- Las simulaciones son ejemplos didácticos, no motores validados para producción.

## Referencias

Este repositorio acompaña principalmente a:

- [Physics for JavaScript Games, Animation, and Simulations](physics-for-javascript/README.md), Adrian Dobre y Dev Ramtal, Apress, 2014.
- [Physics for Flash Games, Animation, and Simulations](physics-for-flash/README.md), Adrian Dobre y Dev Ramtal, Apress, 2011.

Cada subproyecto contiene su propia licencia e instrucciones de contribución.
