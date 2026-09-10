# Physics with JavaScript, ActionScript and Haxe

Colección educativa de ejemplos de física computacional asociados a libros de
Apress. El repositorio reúne implementaciones en JavaScript, ActionScript y
Haxe para estudiar movimiento, fuerzas, colisiones, partículas, cuerpos
rígidos y simulaciones 3D.

No es un motor de física ni un framework moderno: son proyectos y ejemplos
independientes, muchos de ellos organizados según los capítulos de los libros.

## Contenido

### JavaScript

El código de [Physics for JavaScript Games, Animation, and
Simulations](physics-for-javascript/README.md) está en
`physics-for-javascript/9781430263371/` y se organiza en los capítulos 1 a 16.
Incluye aproximadamente 143 páginas HTML, 277 archivos JavaScript y ejemplos
con Canvas y Three.js.

Los temas incluyen:

- Movimiento, vectores, gravedad y proyectiles.
- Colisiones entre partículas y con paredes.
- Fuerzas, campos, órbitas y sistemas de partículas.
- Resortes, oscilaciones, cuerdas y telas.
- Cuerpos rígidos, rotación e integración numérica.
- Simulaciones 3D, aviones, submarinos y sistemas solares.

Ejemplos para empezar:

- [Pelotas rebotando](physics-for-javascript/9781430263371/chapter2/bouncing-balls.html)
- [Colisiones](physics-for-javascript/9781430263371/chapter11/ball-collision.html)
- [Resortes](physics-for-javascript/9781430263371/chapter14/springs.html)
- [Sistema solar 3D](physics-for-javascript/9781430263371/chapter16/solar-system.html)

### ActionScript y Flash

`physics-for-flash/` contiene variantes para:

- FlashBuilder.
- Flash CS3.
- Flash CS4 y posteriores.

Estos proyectos incluyen archivos fuente `.as`, proyectos de IDE, archivos
`.fla` y algunas compilaciones `.swf`. Flash Player dejó de tener soporte
oficial el 31 de diciembre de 2020, por lo que estos ejemplos deben
considerarse código histórico o material para entornos heredados. Consulta
[su README](physics-for-flash/README.md) y
[las instrucciones de contribución](physics-for-flash/contributing.md).

### Haxe

`physics-for-haxe/` contiene proyectos de Haxe/OpenFL con exportaciones HTML5:

- [BouncingBall](physics-for-haxe/BouncingBall/Readme.md).
- [MaxwellDemon](physics-for-haxe/MaxwellDemon/README.md), con distintas
  versiones del proyecto.

Consulta [la guía de Haxe](physics-for-haxe/Readme.md) antes de instalar las
dependencias. Las versiones de Haxe, OpenFL y Lime deben comprobarse antes de
compilar, ya que estos proyectos no incluyen un gestor de dependencias común.

## Cómo ejecutar los ejemplos JavaScript

Los ejemplos son páginas HTML independientes y no requieren un proceso de
compilación de Node.js. Para probar uno:

1. Entra en `physics-for-javascript/9781430263371/`.
2. Elige un capítulo y abre uno de sus archivos HTML.
3. Si el navegador bloquea recursos locales, inicia un servidor HTTP sencillo
   desde la raíz del repositorio:

   ```bash
   python3 -m http.server 8000
   ```

4. Abre <http://localhost:8000/> y navega hasta el ejemplo elegido.

Los ejemplos usan JavaScript clásico y copias locales de sus recursos. No hay
`package.json`, un sistema de build común ni una suite de pruebas automatizada.

## Requisitos y limitaciones

- Navegador moderno con soporte para Canvas y, en los ejemplos 3D, WebGL.
- JavaScript procede de un libro publicado en 2014; algunas APIs o prácticas
  no representan el desarrollo web actual.
- ActionScript requiere herramientas antiguas de Adobe y no funciona en el
  Flash Player moderno.
- Haxe/OpenFL puede requerir versiones concretas del compilador y de Lime.
- Las simulaciones son ejemplos didácticos; no deben interpretarse como un
  motor físico validado para producción.

## Recomendaciones técnicas de mantenimiento

- Mantener separados el código fuente, las exportaciones y los archivos
  generados por los IDE.
- Añadir un `.gitignore` para metadatos como `FlashBuilder/.metadata`,
  archivos `.cache`, `.prefs`, logs y builds regenerables.
- Documentar la versión probada de Haxe, OpenFL, Lime y del navegador.
- Añadir una página de índice o una tabla por capítulo con enlaces a las demos.
- Verificar periódicamente las rutas de scripts y recursos de cada HTML.
- Incorporar comprobaciones automatizadas sencillas para detectar enlaces rotos
  y recursos faltantes.
- Mantener las licencias y las instrucciones de contribución de cada
  subproyecto junto a su código.

## Referencias

Este repositorio acompaña principalmente a:

- [Physics for JavaScript Games, Animation, and Simulations](physics-for-javascript/README.md),
  Adrian Dobre y Dev Ramtal, Apress, 2014.
- [Physics for Flash Games, Animation, and Simulations](physics-for-flash/README.md),
  Adrian Dobre y Dev Ramtal, Apress, 2011.

Cada subproyecto contiene su propia licencia y sus instrucciones de
contribución.
