# Entornos heredados y metodología de migración

## Navegación

- [README principal del repositorio](../../README.md)
- [README de physics-for-flash](../README.md)
- [Tecnologías de transición desde Adobe Flash](README.md)

> Para comparar tecnologías aplicables a Flash Builder, Flash CS3 y Flash CS4+, consulta el [README de tecnologías de transición](README.md).

Este documento describe cómo preservar, ejecutar y migrar los ejemplos de ActionScript incluidos en `physics-for-flash/`. El contenido original se conserva como archivo histórico y referencia educativa, no como plataforma activa de producción.

## Inventario de tecnologías y formatos heredados

| Tecnología o formato | Uso en el repositorio | Estado actual |
|---|---|---|
| ActionScript 3.0 | Clases y eventos | Heredado, sin ejecución web nativa moderna |
| ActionScript 2.0 | Elementos antiguos o timelines | Altamente heredado; requiere clasificación |
| Adobe Flash Player | Runtime original de `.swf` | Retirado desde 2020 |
| Adobe AIR | Aplicaciones escritas para Flash | Solo viable en entornos mantenidos específicamente |
| Adobe Flash Professional | Edición de `.fla` y timelines | Requiere herramientas históricas autorizadas |
| Flash Builder / Eclipse | Compilación y administración AS3 | Entorno histórico |
| SWF / FLV / vídeo Flash | Artefactos y recursos multimedia | Sin soporte general moderno |
| `.as` | Clases y scripts | Fuente heredada; separar AS2 y AS3 |
| `.fla` | Arte visual y animación | Depende de Flash/Animate |
| `.swf` | Binarios compilados | Referencia o artefacto histórico |

## Contenido de las carpetas Flash

- `FlashBuilder/`: fuentes `.as`, archivos de proyecto y metadatos históricos.
- `FlashCS3/`: ejemplos organizados por capítulos `ch*_code/`.
- `FlashCS4+/`: variantes posteriores organizadas por capítulos.
- `*.as`: clases y scripts ActionScript.
- `*.fla`: fuentes visuales y timelines.
- `*.swf`: resultados compilados.
- `9781430236740.jpg`: portada de la edición acompañante.
- [`contributing.md`](../contributing.md): condiciones originales de contribución.

Las variantes pueden diferir y deben tratarse como familias históricas independientes.

## Hoja de ruta por fases

### Fase 0 — preservación

- Mantener el repositorio original como fuente de verdad.
- Inventariar archivos `.fla`, `.as`, `.swf` y recursos asociados.
- Registrar versiones conocidas de IDE, SDK y sistema operativo.
- Separar fuentes editables de artefactos regenerables.
- Capturar imágenes o vídeos antes de perder el entorno ejecutable.

### Fase 1 — clasificación

- Identificar ejemplos AS2 y AS3.
- Determinar cuáles usan física, UI, audio, vídeo o APIs externas.
- Clasificarlos por complejidad y dependencias.
- Documentar controles, estado inicial y comportamiento esperado.

### Fase 2 — entorno de archivo controlado

- Crear máquinas virtuales o contenedores por combinación probada de SO, IDE y SDK.
- No ejecutar `.swf` desconocidos en equipos con datos sensibles.
- Registrar comandos de compilación y exportación.
- Exportar snapshots reproducibles de proyectos que todavía puedan abrirse.
- Usar hashes y control de versiones para verificar binarios.

### Fase 3 — migración incremental

- Migrar primero las clases puras de física y geometría.
- Crear pruebas con posiciones, velocidades, fuerzas, colisiones y valores límite.
- Continuar con Canvas 2D y controles interactivos.
- Migrar la capa visual y los timelines después de fijar el modelo físico.
- Añadir WebGL únicamente cuando el capítulo lo requiera.

### Fase 4 — sustitución permanente

- Publicar versiones HTML/JavaScript independientes.
- Archivar los proyectos originales sin eliminarlos.
- Vincular cada ejemplo moderno con su fuente heredada equivalente.
- Documentar diferencias deliberadas de precisión o integración temporal.

## Metodología de migración

### Inventario y selección

Priorizar vectores, integradores, gravedad, proyectiles, resortes, colisiones y partículas. Migrar después timelines, códecs, vídeo e interfaces complejas.

Registrar para cada ejemplo:

- Clase o archivo principal.
- Versión de ActionScript.
- Dependencias.
- Controles de usuario.
- Variables físicas.
- Estado inicial y comportamiento esperado.
- Captura o referencia visual.

### Pruebas de comportamiento

Extraer invariantes y casos límite:

- Conservación o pérdida esperada de energía.
- Rebotes y normal/tangente de colisiones.
- Integración con paso fijo o dependiente del tiempo.
- Valores iniciales cero, negativos y extremos.
- Cambio de tamaño o resolución.
- Objetos superpuestos o fuera del escenario.

Cuando no pueda ejecutarse el binario original, conservar capturas, valores de referencia y código fuente como especificación.

### Separación de modelo y presentación

```text
modelo físico → estado numérico → adaptación de entrada → renderizado
```

El modelo moderno no debería mezclar física directamente con el DOM o Canvas. Esto permite probar ecuaciones y reutilizar el modelo en Canvas, SVG o WebGL.

### Estrategias alternativas

#### Conversión directa

Haxe + OpenFL puede preservar estructura AS3 y gráficos. Apache Royale puede mantener ActionScript/MXML y generar JavaScript/HTML5.

#### Reescritura web

HTML, Canvas, JavaScript o TypeScript ofrecen mantenimiento y compatibilidad modernos.

#### Motores modernos

Phaser, PixiJS, Three.js, Godot o Construct pueden simplificar entrada y renderizado, pero no deben sustituir las ecuaciones sin verificar su comportamiento.

#### Aplicaciones de escritorio

Adobe AIR, runtimes administrados o tecnología nativa solo deben considerarse si existen requisitos estrictos fuera del navegador.

## Criterios de aceptación

Una migración debe cumplir:

- Misma entrada inicial y controles principales.
- Comportamiento visual equivalente dentro de tolerancias documentadas.
- Casos numéricos fijados mediante pruebas.
- Recursos locales verificables.
- Sin fallos de consola ni peticiones a servicios retirados.
- Diferencias deliberadas documentadas.

Una nueva versión debe incluir:

1. Captura o descripción del original.
2. Referencia al archivo `.as`, `.fla` o `.swf` equivalente.
3. Separación entre física y presentación.
4. Pruebas de regresión numéricas.
5. Instrucciones de ejecución.
6. Lista de diferencias conocidas.

## Riesgos y precauciones

- **SWF no confiables:** aislar contenidos de origen desconocido.
- **Dependencias retiradas:** APIs, servicios, códecs y reproductores pueden haber desaparecido.
- **Plugins obsoletos:** no instalar Flash Player como complemento normal.
- **Diferencias numéricas:** unidades de tiempo y precisión pueden variar.
- **Licencias:** preservar el material no elimina restricciones de distribución o reutilización.
- **Arte de terceros:** los `.fla` pueden contener recursos con licencias distintas.
- **Pérdida de timeline:** reconstruir visualmente puede requerir decisiones manuales.
- **Seguridad:** desactivar red innecesaria y ejecutar el entorno histórico aislado.

## Contribuciones

Las contribuciones deben seguir [`contributing.md`](../contributing.md). Conservar las fuentes originales y añadir migraciones modernas como archivos o carpetas separadas.
