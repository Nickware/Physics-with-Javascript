# Physics for Flash

## Navegación

- [README principal del repositorio](../README.md)
- [Tecnologías de transición desde Adobe Flash](docs/README.md)
- [Entornos heredados y metodología de migración](docs/entornos-heredados-y-migracion.md)
- [Contribuciones](contributing.md)

Este directorio contiene el código fuente y los recursos publicados junto al libro *Physics for Flash Games, Animation, and Simulations*, de Adrian Dobre y Dev Ramtal (Apress, 2011). Conserva ejemplos didácticos de física computacional escritos para Adobe Flash: movimiento, fuerzas, colisiones, partículas, cuerpos rígidos y otros temas organizados por capítulos.

Este repositorio es un archivo histórico y educativo. No contiene una biblioteca moderna de física ni debe considerarse una plataforma de producción.

## Contenido del repositorio

- [`FlashBuilder/`](FlashBuilder/): proyectos organizados por capítulo para Flash Builder/Eclipse.
- [`FlashCS3/`](FlashCS3/): versiones para Adobe Flash CS3, organizadas en carpetas `ch1_code/` a `ch16_code/`.
- [`FlashCS4+/`](FlashCS4+/): variantes para Flash CS4 y versiones posteriores.
- [`9781430236740.jpg`](9781430236740.jpg): portada del libro.
- [`LICENSE.txt`](LICENSE.txt): condiciones de licencia.
- [`contributing.md`](contributing.md): instrucciones originales de contribución.
- [`docs/entornos-heredados-y-migracion.md`](docs/entornos-heredados-y-migracion.md): hoja de ruta y metodología de migración.
- [`docs/README.md`](docs/README.md): tecnologías de transición desde Adobe Flash.

Los archivos principales son:

- `.as`: clases y scripts de ActionScript.
- `.fla`: fuentes visuales y timelines editables.
- `.swf`: artefactos compilados.
- Archivos de proyecto del IDE: configuración y metadatos históricos.

Las variantes CS3, CS4+ y Flash Builder pueden representar implementaciones distintas. Trátalas como familias históricas separadas.

## Estado heredado de Flash

Adobe Flash Player dejó de tener soporte oficial el 31 de diciembre de 2020 y los navegadores modernos ya no ejecutan archivos `.swf`. Por ello:

- Los archivos `.swf` no pueden considerarse demos ejecutables modernas.
- Los archivos `.fla` requieren un IDE histórico compatible.
- Flash Builder y sus SDK deben tratarse como entornos de archivo.
- Códecs, librerías y servicios externos pueden estar retirados.

No se recomienda instalar Flash Player en un navegador normal actual. Cualquier ejecución histórica debe aislarse en una máquina virtual o entorno controlado.

## Cómo examinar o ejecutar

### Código fuente

Los archivos `.as` pueden abrirse directamente en cualquier editor de texto. Revisa también el `.fla`, los recursos asociados y las rutas relativas.

1. Selecciona `FlashBuilder`, `FlashCS3` o `FlashCS4+`.
2. Abre la carpeta del capítulo correspondiente.
3. Busca la clase `.as`, el archivo `.fla` o el artefacto `.swf` principal.
4. Conserva rutas y recursos asociados.

### Proyecto visual

Los archivos `.fla` requieren una versión histórica compatible de Flash Professional/Animate. Antes de abrirlos, haz una copia y documenta la versión del IDE y del SDK utilizados.

Los metadatos de `FlashBuilder/.metadata/` son locales al IDE y no deben considerarse configuración portable.

### Compilación

No existe un proceso único y moderno de compilación válido para todos los ejemplos. Pueden requerir una combinación concreta de Flash Builder, SDK de ActionScript, JDK y sistema operativo.

### Archivos SWF

Los navegadores modernos no ofrecen soporte para `.swf`. Conserva estos archivos como referencia visual o artefacto histórico, pero no como una demostración ejecutable actual.

## Procedencia y alcance

Este repositorio acompaña a *Physics for Flash Games, Animation, and Simulations* (Adrian Dobre y Dev Ramtal, Apress, 2011). La versión `v1.0` corresponde al código publicado en el libro sin correcciones posteriores.

## Limitaciones y licencias

La licencia [`LICENSE.txt`](LICENSE.txt) establece:

- Copyright de Adrian Dobre y Dev Ramtal.
- Uso personal, copia y modificación dentro de distribución gratuita y uso justo.
- Modificaciones y correcciones permitidas para beneficio de otros usuarios.
- Prohibición de uso comercial y prohibición de reutilización en materiales educativos como libros o artículos sin permiso previo.
- Software proporcionado sin garantía.

Antes de reutilizar recursos visuales o multimedia, verifica por separado sus derechos.

## Migración y contribuciones

Una migración debe separar la física del renderizado y probar primero el modelo numérico. Las opciones incluyen Haxe/OpenFL, Apache Royale, HTML/Canvas, JavaScript/TypeScript y motores como PixiJS, Phaser, Three.js o Godot.

Consulta:

- [`docs/README.md`](docs/README.md): comparación de tecnologías para transitar desde Adobe Flash.
- [`docs/entornos-heredados-y-migracion.md`](docs/entornos-heredados-y-migracion.md): pruebas, riesgos y hoja de ruta.
- [`contributing.md`](contributing.md): instrucciones de contribución.

Conserva los archivos originales y evita sustituirlos silenciosamente por implementaciones modernas.
