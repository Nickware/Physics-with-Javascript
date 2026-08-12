# Demonio de Maxwell — Haxe/OpenFL + echo

Simulación interactiva del experimento mental de Maxwell (1871): partículas
"calientes" (rápidas) y "frías" (lentas) en una caja 2D, con una puerta que
un demonio puede abrir o cerrar para separarlas selectivamente, pagando por
cada medición el costo de Landauer (`k·ln 2` por bit).

## Qué cambió respecto a la versión original

| Archivo | Versión original | Versión corregida | Por qué |
|---|---|---|---|
| `Boundary.hx` | Un único `Body` kinemático del tamaño de toda la caja (`width x height`) | Cuatro paredes delgadas (arriba, abajo, izquierda, derecha) | La versión original no era una "pared": era un sólido macizo ocupando todo el mundo. No delimitaba un contenedor hueco. |
| `Particula.hx` | `update()` implementaba fronteras **periódicas** (wraparound: al salir por un borde, reaparece por el opuesto) | `update()` ya no teletransporta; solo aplica un clamp de seguridad anti-túnel | El wraparound competía con las paredes rígidas de `Boundary`, y sobre todo deshacía el trabajo del demonio: una partícula separada podía reaparecer del otro lado instantáneamente. |
| `Main.hx` (`crearPuerta`) | `demonio.medirParticula(p)` se llamaba en cada frame que la partícula seguía tocando la puerta | Se agregó `enContactoConPuerta:Map<Particula,Bool>` para contar la energía **una sola vez por cruce** | La API de colisión de echo 4.2.3 dispara el callback en cada frame de solapamiento (equivalente al `stay` de las versiones más recientes de echo), no solo al iniciar el contacto. Sin este control, `energiaConsumida` se inflaba artificialmente. |
| `Main.hx` (`calcularEntropia`) | Sin aclaración | Se documentó que es un **proxy** (`Σ v²·ln(v) / N`), no la entropía de Shannon/Boltzmann formal | Para que no se compare directamente contra el `E = n·kT·ln(2)` teórico sin más contexto. |
| `Demonio.hx` | — | Sin cambios funcionales | La fórmula de Landauer ya estaba bien implementada; el problema era la frecuencia de llamado, no la fórmula. |

## Estructura del proyecto

```
demonio-maxwell-haxe/
├── README.md
├── project.xml          (agregalo si no lo tenés — ver más abajo)
└── source/
    ├── Boundary.hx
    ├── Demonio.hx
    ├── Main.hx
    └── Particula.hx
```

## Requisitos

- [Haxe](https://haxe.org/download/) 4.2+
- [OpenFL](https://www.openfl.org/) y [Lime](https://lib.haxe.org/p/lime/)
- La librería de física [`echo`](https://github.com/AustinEast/echo)

## Paso a paso para ejecutar

1. **Instalar Haxe** (si no lo tenés): descargalo desde haxe.org/download y
   verificá con:
   ```bash
   haxe -version
   ```

2. **Instalar Lime, OpenFL y echo** vía haxelib:
   ```bash
   haxelib install lime
   haxelib install openfl
   haxelib install echo
   haxelib run lime setup
   ```

3. **Crear (o completar) el archivo de proyecto** `project.xml` en la raíz
   del proyecto, al mismo nivel que `source/`. Si ya tenés uno, solo
   confirmá que incluya la librería `echo`:
   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <project>
       <meta title="Demonio de Maxwell" package="com.demonio.maxwell" version="1.0.0" />
       <app main="Main" path="export" file="demonio" />

       <source path="source" />

       <haxelib name="openfl" />
       <haxelib name="echo" />

       <window width="800" height="600" fps="60" background="#ffffff" />

       <assets path="assets" if="assets" />
   </project>
   ```

4. **Compilar y correr** (target HTML5 es el más simple para probar rápido):
   ```bash
   openfl test html5
   ```
   Alternativas según lo que necesites:
   ```bash
   openfl test neko     # más liviano para debug rápido
   openfl test windows  # o linux/mac según tu SO
   ```

5. **Interactuar con la simulación**: el botón verde en la parte inferior
   (350,550) alterna la puerta entre abierta (rojo) y cerrada (verde). Con
   la puerta abierta, cada partícula caliente que la toca es empujada hacia
   la izquierda y cada fría hacia la derecha, mientras el texto superior
   izquierdo muestra la entropía (proxy) y la energía acumulada por el
   demonio en julios.

## Notas para seguir iterando

- Si en algún momento aumentás mucho el número de partículas o la
  velocidad inicial, revisá el `UMBRAL_SALIDA` en `Main.hx`: si es
  demasiado chico, una partícula rápida podría "rebotar" en la zona de
  detección y contarse dos veces en cruces sucesivos muy cercanos.
- La entropía proxy no tiene unidades físicas reales; si más adelante
  querés compararla con el resultado teórico del documento
  (`E = n·kT·ln(2)`), conviene reemplazarla por un histograma de
  velocidades y calcular entropía de Shannon real sobre esa distribución
  — el mismo enfoque que ya usás en la versión CUDA del proyecto
  (`analizar_metricas.py`, entropía de Shannon por frame).
