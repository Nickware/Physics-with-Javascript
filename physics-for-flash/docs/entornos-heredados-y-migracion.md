# Entornos heredados y metodología de migración

Este documento describe cómo preservar, ejecutar y migrar los ejemplos de ActionScript incluidos en `physics-for-flash/`. El contenido original del repositorio se conserva como archivo histórico y referencia educativa, no como una plataforma activa de producción.

> Adobe Flash Player dejó de tener soporte el 31 de diciembre de 2020. Los navegadores modernos no ejecutan `.swf`, por lo que las demostraciones requieren entornos heredados controlados o una migración documentada.

## Inventario de tecnologías y formatos heredados

| Tecnología o formato | Uso en el repositorio | Estado actual |
|---|---|---|
| ActionScript 3.0 | Mayoría del código orientado a clases y eventos | Heredado, sin ejecución web nativa moderna |
| ActionScript 2.0 | Ejemplos antiguos o elementos de timeline | Altamente heredado; requiere clasificación por proyecto |
| Adobe Flash Player | Runtime original de los archivos `.swf` | Retirado desde 2020 |
| Adobe AIR | Aplicaciones escritas para el runtime Flash | Solo viable en entornos mantenidos específicamente |
| Adobe Flash Professional | Edición de `.fla`, timelines y arte de ejemplo | Requiere herramientas históricas autorizadas |
| Flash Builder / Eclipse | Compilación y administración de proyectos AS3 | Entorno de IDE histórico |
| SWF / FLV / video Flash | Artefactos compilados y recursos multimedia | Sin soporte general en navegadores modernos |
| `.as` | Clases y scripts de ActionScript | Fuente heredada; AS2 y AS3 deben separarse |
| `.fla` | Fuentes visuales y de animación | Dependen de Adobe Flash/Animate |
| `.swf` | Binarios compilados | Referencia o artefacto histórico |

Antes de ejecutar o migrar una carpeta, conviene comprobar sus rutas, librerías, versiones del SDK, dependencias externas y recursos incluidos.

## Contenido de las carpetas Flash

- `FlashBuilder/`: proyectos para Flash Builder. Contiene fuentes `.as`, archivos de proyecto y, cuando están disponibles, artefactos compilados.
- `FlashCS3/`: ejemplos organizados por capítulos para Adobe Flash CS3.
- `FlashCS4+/`: variantes adaptadas a versiones posteriores de Adobe Flash Professional.
- `*.as`: clases y scripts de ActionScript utilizados por los ejemplos.
- `*.fla`: fuentes visuales y timelines editables en Adobe Flash Professional o Adobe Animate.
- `*.swf`: resultados compilados conservados como referencia o para capturar el comportamiento original.
- `9781430236740.jpg`: portada de la edición acompañante.
- [`contributing.md`](../contributing.md): condiciones originales de contribución.

Las variantes CS3, CS4+ y Flash Builder pueden diferir. Deben tratarse como familias históricas independientes, no como una sola implementación garantizada compatible.

## Hoja de ruta por fases

### Fase 0 — preservación

- Mantener el repositorio original como fuente de verdad.
- Inventariar archivos `.fla`, `.as`, `.swf` y recursos asociados.
- Registrar versiones conocidas de Flash Professional, Flash Builder, SDK y sistema operativo.
- Separar fuentes editables de artefactos regenerables.
- Capturar imágenes o vídeos de cada demostración antes de perder el entorno ejecutable.

### Fase 1 — clasificación

- Identificar ejemplos AS2 y AS3.
- Determinar cuáles usan únicamente física, UI, audio, vídeo o APIs externas.
- Clasificarlos por complejidad: aislado, con recursos locales, con timeline o con dependencias externas.
- Documentar controles, valores físicos, estado inicial y comportamiento esperado.

### Fase 2 — entorno de archivo controlado

- Crear una máquina virtual o contenedor por combinación probada de SO, IDE y SDK.
- No ejecutar `.swf` desconocidos en equipos con datos sensibles.
- Registrar comandos de compilación y exportación conocidos.
- Exportar snapshots reproducibles de proyectos que todavía puedan abrirse.
- Usar hashes y control de versiones para verificar artefactos binarios.

### Fase 3 — migración incremental

- Migrar primero las clases puras de física y geometría.
- Crear pruebas con posiciones, velocidades, fuerzas, colisiones y valores límite conocidos.
- Continuar con Canvas 2D y controles interactivos.
- Migrar la capa visual y los timelines después de fijar el modelo físico.
- Añadir WebGL únicamente cuando el capítulo realmente lo requiera.

### Fase 4 — sustitución permanente

- Publicar versiones HTML/JavaScript independientes de cada demostración migrada.
- Archivar los proyectos originales sin eliminarlos.
- Vincular cada ejemplo moderno con su fuente heredada equivalente.
- Documentar diferencias deliberadas de precisión o integración temporal.

## Metodología de migración

### Inventario y selección

Priorizar ejemplos con bajo acoplamiento visual: vectores, integradores, gravedad, proyectiles, resortes, colisiones y partículas. Migrar más tarde elementos dependientes de timelines, códecs, vídeo o interfaces complejas.

Para cada ejemplo se debe registrar:

- Clase o archivo principal.
- Versión de ActionScript.
- Dependencias.
- Controles de usuario.
- Variables físicas relevantes.
- Estado inicial y comportamiento esperado.
- Captura o referencia visual.

### Pruebas de comportamiento

No basta con que una simulación se vea similar. Conviene extraer invariantes y casos límite:

- Conservación o pérdida esperada de energía.
- Rebotes y normal/tangente de colisiones.
- Integración con paso fijo o dependiente del tiempo.
- Valores iniciales cero, negativos y extremos.
- Comportamiento al cambiar tamaño o resolución.
- Objetos superpuestos o fuera del escenario.

Cuando no pueda ejecutarse el binario original, conservar capturas, valores de referencia y el código fuente como especificación.

### Separación de modelo y presentación

Una migración robusta separa:

```text
modelo físico → estado numérico → adaptación de entrada → renderizado
```

El modelo moderno no debería mezclar física directamente con el DOM o Canvas. Esto permite probar las ecuaciones sin navegador y reutilizar el modelo en Canvas, SVG o WebGL.

### Estrategias alternativas

#### Conversión directa

**Haxe + OpenFL** puede preservar parte de la estructura AS3 y la API orientada a gráficos. **Apache Royale** permite mantener ActionScript/MXML y generar JavaScript/HTML5. Ambas opciones son apropiadas cuando existe mucho código AS3 o UI asociada que conviene conservar.

#### Reescritura web

HTML, Canvas, JavaScript o TypeScript ofrecen mejor mantenimiento y compatibilidad moderna. Es apropiado para demostraciones didácticas que no necesitan conservar archivos `.fla`.

#### Reimplementación en motores modernos

Phaser, PixiJS, Godot o Construct pueden simplificar entrada, audio, partículas y renderizado. Puede cambiar el comportamiento si sustituyen también las ecuaciones o el bucle de integración física.

#### Aplicaciones de escritorio

Adobe AIR, un runtime administrado o una tecnología nativa solo debe considerarse si existen requisitos estrictos de ejecución fuera del navegador. Esta opción debe mantenerse aislada y documentada.

## Criterios de aceptación

Una migración debe cumplir:

- Misma entrada inicial y controles principales.
- Comportamiento visual equivalente dentro de tolerancias documentadas.
- Casos numéricos fijados mediante pruebas.
- Recursos locales verificables.
- Sin fallos de consola ni peticiones a servicios retirados.
- Documentación de diferencias deliberadas frente al original.

Una nueva versión debe incluir:

1. Captura o descripción del comportamiento original.
2. Referencia al archivo `.as`, `.fla` o `.swf` equivalente.
3. Separación explícita entre física y presentación.
4. Pruebas de regresión para los cálculos principales.
5. Instrucciones para ejecutar la demostración moderna.
6. Lista de diferencias conocidas respecto al original.

## Riesgos y precauciones

- **SWF no confiables:** no ejecutar contenidos de origen desconocido en entornos con datos sensibles.
- **Dependencias retiradas:** las APIs de red, servicios, códecs y reproductores antiguos pueden haber desaparecido.
- **Plugins obsoletos:** no instalar Adobe Flash Player como complemento normal de un navegador moderno.
- **Diferencias numéricas:** Canvas, JavaScript y motores modernos pueden usar unidades de tiempo y precisión distintas.
- **Licencias:** preservar el material no elimina las condiciones de distribución o reutilización.
- **Arte de terceros:** los recursos dentro de `.fla` pueden tener licencias distintas del código fuente.
- **Pérdida de timeline:** reconstruir visualmente una animación puede requerir nuevas coordenadas y decisiones manuales.
- **Seguridad:** aislar cualquier ejecución histórica y desactivar funciones innecesarias de red, certificados o scripts de terceros.

## Contribuciones

Las contribuciones deben seguir las condiciones existentes en [`contributing.md`](../contributing.md). Los cambios deben conservar las fuentes originales y añadir migraciones modernas como archivos o carpetas separadas sin sustituir silenciosamente el material publicado.
