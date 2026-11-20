# Tecnologías para la transición desde Adobe Flash

## Navegación

- [README principal del repositorio](../../README.md)
- [README de physics-for-flash](../README.md)
- [Guía de entornos heredados y migración](entornos-heredados-y-migracion.md)

Este documento propone tecnologías actuales para migrar las fuentes de [`FlashBuilder/`](../FlashBuilder/), [`FlashCS3/`](../FlashCS3/) y [`FlashCS4+/`](../FlashCS4+/) sin perder el carácter didáctico de sus simulaciones físicas. La migración debe separar las ecuaciones, el estado, la entrada y el renderizado antes de reemplazar el runtime.

La estrategia completa y los criterios de aceptación aparecen en [`entornos-heredados-y-migracion.md`](entornos-heredados-y-migracion.md).

## Características de las fuentes Flash

Las tres familias del repositorio contienen principalmente:

- Clases y scripts ActionScript.
- Objetos con posición, velocidad, aceleración y fuerza.
- Ecuaciones propias de cada capítulo.
- Renderizado con objetos gráficos, vectores, texto y timelines.
- Archivos `.fla` que pueden combinar arte visual, eventos y código enlazado.
- Artefactos `.swf` utilizados como referencia o resultado histórico.
- Ejemplos 2D y 3D con modelos, cámaras y transformaciones propias.

Diferencias por familia:

- `FlashBuilder/` incluye proyectos y metadatos de Eclipse/Flash Builder.
- `FlashCS3/` agrupa ejemplos bajo carpetas `ch*_code/` y contiene `.as`, `.fla` y `.swf` asociados.
- `FlashCS4+/` conserva la organización por capítulos, pero puede usar API, estructura de proyecto o timelines diferentes.

Los metadatos `.metadata/` no son portables. Las fuentes `.as`, `.fla` y el comportamiento observable deben utilizarse como especificación.

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

Es la opción con mayor continuidad conceptual para código AS3. Haxe ofrece tipado estático y una sintaxis cercana a ActionScript, mientras que OpenFL proporciona API inspiradas en Flash.

Ventajas: conserva clases y jerarquías, exporta a HTML5 y permite migrar varias demos con cambios moderados.

Limitaciones: las API Flash no tienen siempre equivalencia exacta y deben verificarse timelines, eventos, recursos y versiones de Lime/OpenFL.

Ya existe una base Haxe/OpenFL en [`physics-for-haxe/`](../../physics-for-haxe/).

### TypeScript + Canvas 2D

Recomendada como primera migración 2D. Tipado y pruebas facilitan validar vectores, integradores, fuerzas y colisiones.

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

Adecuada para prototipos rápidos o una sola demostración. No requiere compilación ni dependencias, pero conviene evolucionar hacia módulos y TypeScript si el proyecto crece.

### Adobe Animate como etapa intermedia

Animate puede publicar timelines y arte seleccionados como HTML5 Canvas/JavaScript. Es útil cuando el resultado visual `.fla` es más valioso que la lógica AS3, pero no convierte automáticamente las ecuaciones físicas ni elimina las dependencias de timelines.

Debe compararse con una reescritura si se necesita separar el modelo físico del código generado.

### PixiJS

PixiJS ofrece una escena gráfica moderna y buen rendimiento para sprites y partículas. Sustituye el renderizado 2D, pero no valida el modelo físico ni contiene por sí mismo las ecuaciones principales.

### Phaser

Phaser proporciona escenas, entrada, audio, sprites y ciclo de juego. Es apropiado para una colección interactiva o un juego educativo.

El motor físico no debe sustituir automáticamente las integraciones originales sin validar unidades, colisiones y pasos de tiempo.

### Three.js

Three.js permite reconstruir escenas 3D, cámaras, luces y transformaciones. La migración debe comenzar por las ecuaciones vectoriales y luego construir la representación visual.

### Apache Royale

Apache Royale mantiene parte del código ActionScript/MXML y compila a HTML5/JavaScript. Es útil para aplicaciones grandes con interfaces Flex importantes, pero no es necesario para demos físicas pequeñas ni convierte automáticamente API retiradas o timelines.

### Godot

Godot permite convertir los ejemplos en una aplicación completa 2D/3D con escenas, entrada, audio y exportación multiplataforma. GDScript o C# expresan la lógica moderna.

Sustituir la integración propia por el motor de física puede cambiar el comportamiento, por lo que debe hacerse tras fijar pruebas y valores de referencia.

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

Migrar primero una escena simple disponible en las tres familias, como `BouncingBall` o un movimiento parabólico. Conviene elegir primero la variante cuyo código sea más sencillo y comparar después CS3, CS4+ y Flash Builder.

Debe cumplir:

- Conservar estado inicial y controles principales.
- Usar paso fijo o documentar el paso dependiente del tiempo.
- Tener pruebas para límites y colisiones.
- Permitir pausar y reiniciar.
- Dibujar la escena con Canvas o SVG.
- No contener dependencias de Flash en el modelo físico.
- Incluir valores de referencia obtenidos del original o reconstruidos desde el código.

Si la prueba pasa, los siguientes capítulos pueden reutilizar vectores, integradores y utilidades comunes.

## Documentación relacionada

- [Guía general de entornos heredados y migración](entornos-heredados-y-migracion.md).
- [Directrices de contribución](../contributing.md).
- [Proyecto Haxe existente](../../physics-for-haxe/).
- [Ejemplos JavaScript del repositorio](../../physics-for-javascript/).
