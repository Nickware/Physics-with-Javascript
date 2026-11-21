# Physics for Flash

Este directorio contiene el código fuente y los recursos publicados junto al libro *Physics for Flash Games, Animation, and Simulations*, de Adrian Dobre y Dev Ramtal (Apress, 2011). Su finalidad es conservar ejemplos didácticos de física computacional escritos para Adobe Flash: movimiento, fuerzas, colisiones, partículas, cuerpos rígidos y otros temas organizados por capítulos.

Este repositorio es un archivo histórico y educativo. No contiene una biblioteca moderna de física ni debe considerarse una plataforma de producción.

## Contenido del repositorio

- [`FlashBuilder/`](FlashBuilder/): proyectos organizados por capítulo para Flash Builder/Eclipse. Incluye fuentes ActionScript, archivos de proyecto y una carpeta `.metadata/` generada por el IDE.
- [`FlashCS3/`](FlashCS3/): versiones de los ejemplos para Adobe Flash CS3, organizadas en carpetas `ch1_code/` a `ch16_code/`.
- [`FlashCS4+/`](FlashCS4+/): variantes adaptadas a Flash CS4 y versiones posteriores, organizadas en las mismas carpetas por capítulo.
- [`9781430236740.jpg`](9781430236740.jpg): portada del libro.
- [`LICENSE.txt`](LICENSE.txt): condiciones de licencia del código publicado.
- [`contributing.md`](contributing.md): instrucciones originales de contribución.
- [`docs/entornos-heredados-y-migracion.md`](docs/entornos-heredados-y-migracion.md): inventario ampliado, hoja de ruta y metodología de migración.

Los archivos principales son:

- `.as`: clases y scripts de ActionScript.
- `.fla`: fuentes visuales y timelines editables.
- `.swf`: artefactos compilados y exportados.
- Archivos de proyecto del IDE: metadatos, rutas y configuración necesarios para reconstruir una variante histórica.

Las carpetas CS3, CS4+ y Flash Builder pueden representar implementaciones distintas o dependientes de SDK e IDE específicos. Deben tratarse como familias históricas separadas, no como variantes necesariamente intercambiables.

## Estado heredado de Flash

ActionScript evolucionó desde versiones de tipado flexible hasta ActionScript 3.0, una plataforma orientada a clases y eventos que se utilizaba con Flash Player y Adobe AIR. Adobe Flash Player dejó de tener soporte oficial el 31 de diciembre de 2020, y los navegadores modernos ya no ejecutan archivos `.swf`.

Por ello:

- Los archivos `.swf` no deben ejecutarse en navegadores modernos.
- Los proyectos `.fla` requieren versiones históricas compatibles de Adobe Flash Professional/Animate.
- Flash Builder y sus SDK asociados deben considerarse un entorno de archivo.
- Las exportaciones, librerías, códecs y servicios externos pueden estar retirados o resultar incompatibles.

No se recomienda instalar Flash Player en un navegador normal actual. Cualquier ejecución histórica debería aislarse en una máquina virtual o entorno controlado sin datos sensibles.

## Cómo examinar o ejecutar los ejemplos

### Examinar el código

Los archivos `.as` pueden abrirse directamente en cualquier editor de texto. Muchos ejemplos relacionan clases físicas, objetos visuales y eventos del timeline, por lo que conviene revisar también el `.fla` correspondiente y los recursos usados por el proyecto.

Para ubicar un tema:

1. Selecciona una familia: `FlashBuilder`, `FlashCS3` o `FlashCS4+`.
2. Abre la carpeta del capítulo que corresponda.
3. Busca la clase `.as`, el archivo `.fla` o el artefacto `.swf` principal.
4. Conserva las rutas relativas y los recursos asociados.

### Abrir una fuente visual

Los archivos `.fla` requieren un IDE histórico compatible. Antes de abrirlos:

- Comprueba la versión de Flash/Animate utilizada por el proyecto.
- Revisa rutas relativas y bibliotecas enlazadas.
- Haz una copia antes de convertir o guardar con una versión moderna.
- No reemplaces el proyecto original al exportarlo.

### Compilar proyectos

Los proyectos históricos pueden requerir una combinación concreta de Flash Builder, SDK de ActionScript, JDK y sistema operativo. Los metadatos de `FlashBuilder/.metadata/` son información local del IDE y no deben interpretarse como configuración portable.

No existe en este repositorio un proceso único y moderno de compilación válido para todos los ejemplos. Las dependencias, SDK y versiones deben documentarse por proyecto antes de intentar una ejecución.

### Ver un resultado `.swf`

Los navegadores actuales no ofrecen soporte para `.swf`. El archivo puede conservarse como referencia visual o como artefacto histórico, pero no debe considerarse una demo ejecutable compatible con plataformas modernas.

Para migraciones o propuestas de ejecución actual, consulta la [guía de entornos heredados y migración](docs/entornos-heredados-y-migracion.md).

## Procedencia y alcance

Este repositorio acompaña a *Physics for Flash Games, Animation, and Simulations* (Adrian Dobre y Dev Ramtal, Apress, 2011). La versión `v1.0` corresponde al código publicado en el libro, sin correcciones ni actualizaciones posteriores.

La portada incluida es `9781430236740.jpg`. Los archivos pertenecen a un conjunto educativo publicado por Apress y pueden contener recursos, nombres o rutas propios de la edición original.

## Limitaciones y licencias

El archivo [`LICENSE.txt`](LICENSE.txt) establece una licencia de freeware con las siguientes restricciones principales:

- Copyright de Adrian Dobre y Dev Ramtal.
- Uso personal, copia y modificación dentro de límites de distribución gratuita y uso justo.
- Modificaciones y correcciones son alentadas para beneficio de otros usuarios.
- No se permite reutilizar, modificar o redistribuir el software con fines comerciales.
- Tampoco se permite reutilizarlo en materiales educativos como libros o artículos sin autorización previa.
- El software se proporciona sin garantía.

Antes de reutilizar código o recursos, conserva el aviso de licencia y verifica por separado cualquier contenido visual o multimedia que pudiera tener derechos distintos.

## Migración y contribuciones

La migración de los ejemplos debe comenzar por modelar y probar la física antes de reconstruir timelines o interfaces modernas. Las opciones incluyen Haxe/OpenFL, Apache Royale, HTML/Canvas, JavaScript/TypeScript y motores como Phaser, PixiJS o Godot.

La estrategia completa, junto con criterios de aceptación, pruebas, riesgos y hoja de ruta, se encuentra en [`docs/entornos-heredados-y-migracion.md`](docs/entornos-heredados-y-migracion.md).

Las contribuciones deben seguir [`contributing.md`](contributing.md). Conserva el código publicado, describe claramente las correcciones y evita sustituir silenciosamente los archivos históricos por implementaciones modernas.
