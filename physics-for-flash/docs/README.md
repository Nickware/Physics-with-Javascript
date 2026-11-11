# Tecnologías para la transición desde Flash Builder

## Navegación

- [README principal del repositorio](../../README.md)
- [README de physics-for-flash](../README.md)
- [Guía de entornos heredados y migración](entornos-heredados-y-migracion.md)

Este documento propone tecnologías actuales para migrar el código de [`FlashBuilder/`](../FlashBuilder/) sin perder el carácter didáctico de sus simulaciones físicas. La migración debe separar las ecuaciones, el estado, la entrada y el renderizado antes de reemplazar el runtime.

La estrategia completa y los criterios de aceptación aparecen en [`entornos-heredados-y-migracion.md`](entornos-heredados-y-migracion.md).

## Características de Flash Builder

Los proyectos contienen principalmente:

- Clases ActionScript 3 organizadas en paquetes como `motion`, `objects`, `forces` y `display`.
- Objetos con posición, velocidad, aceleración y fuerza.
- Ecuaciones propias de cada capítulo.
- Renderizado con objetos gráficos, vectores, texto y eventos.
- Archivos de proyecto heredados y metadatos locales de Eclipse/Flash Builder.
- Ejemplos 2D y 3D con modelos, cámaras y transformaciones propias.

Los metadatos de `.metadata/` no son portables. Las fuentes `.as` y el comportamiento observable deben utilizarse como especificación.

## Opciones tecnológicas

| Tecnología | Continuidad AS3 | Navegador | 2D | 3D | Complejidad | Uso recomendado |
|---|---:|---:|---:|---:|---:|---|
| Haxe + OpenFL | Alta | Sí | Sí | Sí | Media | Familias de código con estructura AS3 |
| TypeScript + Canvas | Media | Sí | Sí | No | Media | Primer objetivo para demos educativas |
| JavaScript + Canvas | Media-baja | Sí | Sí | No | Baja | Demos aisladas y prototipos |
| PixiJS | Baja | Sí | Sí | No | Media | Muchas partículas o sprites |
| Phaser | Baja | Sí | Sí | Limitado | Media | Juegos educativos 2D |
| Three.js | Baja | Sí | Sí | Sí | Media-alta | Ejemplos tridimensionales |
| Apache Royale | Alta | Sí | Sí | Limitado | Alta | Aplicaciones AS3/MXML grandes |
| Godot | Baja | Sí | Sí | Sí | Media-alta | Producto educativo completo |

### Haxe + OpenFL

Es la opción con mayor continuidad conceptual para código AS3. Haxe tiene una sintaxis similar y tipado estático; OpenFL ofrece gráficos y API inspiradas en Flash.

Ventajas:

- Conserva clases y jerarquías con cambios moderados.
- Puede exportar a HTML5 y otras plataformas.
- Permite migrar varias demos sin introducir otro paradigma.

Limitaciones:

- Las API Flash no tienen siempre equivalencia exacta.
- Timelines, eventos y recursos deben verificarse.
- Lime, OpenFL y el compilador requieren versiones compatibles.

Ya existe una base Haxe/OpenFL en [`physics-for-haxe/`](../../physics-for-haxe/).

### TypeScript + Canvas 2D

Es una opción recomendada para trasladar primero los capítulos 2D. Tipado y pruebas facilitan validar vectores, integradores, fuerzas y colisiones.

Arquitectura sugerida:

```text
src/
  physics/     ecuaciones e integradores
  scenes/      configuración de cada demostración
  view/        Canvas 2D
  input/       teclado y puntero
  tests/       casos numéricos y límites
```

Esta separación permite probar el modelo físico sin navegador y reutilizarlo entre capítulos.

### JavaScript + Canvas

Es apropiada para prototipos rápidos o una sola demostración. No necesita compilación ni dependencias, pero conviene evolucionar hacia módulos y TypeScript si crece el proyecto.

### PixiJS

PixiJS ofrece una escena gráfica moderna y buen rendimiento para sprites y partículas. Puede sustituir el renderizado 2D, pero no sustituye el motor físico ni debe contener las ecuaciones principales.

### Phaser

Phaser proporciona escenas, entrada, audio, sprites y ciclo de juego. Es apropiado si se desea una colección interactiva o un juego educativo.

El motor físico de Phaser no debe sustituir automáticamente las integraciones originales sin validar unidades, colisiones y pasos de tiempo.

### Three.js

Three.js permite reconstruir escenas 3D, cámaras, luces y transformaciones en el navegador. La migración debe comenzar por las ecuaciones vectoriales y luego construir la representación visual.

### Apache Royale

Apache Royale permite mantener parte del código ActionScript/MXML y compilarlo a HTML5/JavaScript. Es útil para aplicaciones grandes con una interfaz Flex considerable.

No convierte automáticamente API retiradas de Flash ni timelines y no es necesario para demos pequeñas.

### Godot

Godot puede utilizarse si los ejemplos se convertirán en una aplicación completa 2D/3D con escenas, entrada, audio y exportación multiplataforma. GDScript o C# pueden expresar la lógica moderna.

Puede cambiar el comportamiento si se sustituye la integración propia por el motor de física sin verificar el modelo.

## Mapeo de conceptos

| Concepto Flash | Alternativa moderna |
|---|---|
| `Sprite`, `MovieClip` | Entidades o nodos de escena |
| `Shape`, `Graphics` | Canvas, SVG, PixiJS o Three.js |
| `EventDispatcher`, `MouseEvent` | DOM Events, observadores o señales |
| `ENTER_FRAME` | `requestAnimationFrame` o loop del motor |
| Timeline | Máquina de estados, animación por claves o tween |
| `TextField` | DOM o UI del motor |
| `BitmapData` | Canvas, ImageBitmap o texturas |
| `Vector3D` y matrices | Librerías vectoriales o APIs 3D |
| `Mover`, `Forcer`, `Particle` | Clases puras de física en TypeScript |
| Metadatos del IDE | JSON, YAML o configuración de build |

## Estrategia por capas

```text
1. Extraer lógica física
2. Crear pruebas y valores de referencia
3. Migrar entrada y estado
4. Sustituir el renderizado
5. Reconstruir timelines y controles
6. Verificar paridad visual y numérica
```

### Capa física

Extraer vectores, fuerzas, integradores, colisiones y restricciones en módulos independientes. Esta capa no debe usar DOM, Canvas, PixiJS, Flash ni Godot.

### Capa de aplicación

Administrar estado inicial, pausa, reinicio, cambios de parámetros y escalado. El modelo físico debe recibir entradas sin depender del elemento visual.

### Capa de presentación

Implementar Canvas, SVG o WebGL después de fijar el comportamiento físico. Cada tecnología de presentación puede cambiar sin modificar las ecuaciones principales.

## Prueba piloto

Migrar primero una escena simple de `FlashBuilder/`, como una pelota rebotando o un movimiento parabólico.

Debe cumplir:

- Conserva estado inicial y controles principales.
- Usa paso fijo o documenta el paso dependiente del tiempo.
- Tiene pruebas para límites y colisiones.
- Permite pausar y reiniciar.
- Dibuja la escena con Canvas o SVG.
- No contiene dependencias de Flash en el modelo físico.
- Incluye valores de referencia obtenidos del original o reconstruidos desde el código.

Si la prueba pasa, los siguientes capítulos pueden reutilizar vectores, integradores y utilidades comunes.

## Documentación relacionada

- [Guía general de entornos heredados y migración](entornos-heredados-y-migracion.md).
- [Directrices de contribución](../contributing.md).
- [Proyecto Haxe existente](../../physics-for-haxe/).
- [Ejemplos JavaScript del repositorio](../../physics-for-javascript/).
