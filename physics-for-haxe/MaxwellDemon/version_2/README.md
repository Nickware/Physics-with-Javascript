# Demonio de Maxwell — Haxe/OpenFL + Echo

Simulación interactiva del experimento mental de Maxwell (1871): partículas
"calientes" (rápidas) y "frías" (lentas) en una caja 2D, con una puerta que
un demonio puede abrir o cerrar para separarlas selectivamente. Esta versión
usa el costo mínimo de Landauer (`k_B·T·ln 2`) como aproximación educativa al
costo de borrar un bit de información.

Esta es la versión mantenida del proyecto. La medición visible distingue entre
separación espacial y mezcla de tipos; no pretende ser una simulación
termodinámica cuantitativamente validada.

## Modelo y métricas

Esta tabla mezcla dos rondas de corrección: la conceptual (frontera y
doble conteo) y la de compilación real, encontrada al clonar el código
fuente de `echo` (AustinEast/echo, release 4.2.9) y compilar estos
scripts contra él directamente.

| Archivo | Versión original | Versión corregida | Por qué |
|---|---|---|---|
| `Boundary.hx` | Un único `Body` kinemático del tamaño de toda la caja (`width x height`) | Cuatro paredes delgadas (arriba, abajo, izquierda, derecha) | La versión original no era una "pared": era un sólido macizo ocupando todo el mundo. No delimitaba un contenedor hueco. |
| `Boundary.hx` / `Main.hx` (shapes) | `type: "rect"` (string) | `type: RECT` (enum, sin comillas) | `ShapeType` es un `enum abstract` (`echo.data.Types`), no un string. Haxe lo resuelve por inferencia de tipo — pasar `"rect"` da el error real de compilación `String should be Null<echo.data.ShapeType>`. |
| `Particula.hx` (import) | `import echo.data.ShapeType;` | import eliminado | Ese módulo no existe en la librería. El enum vive en `echo.data.Types`, y no hace falta importarlo para usar `CIRCLE`/`RECT` sin calificar. |
| `Particula.hx` (shape) | `material` anidado dentro de `shapes: [{ ... material: {...} }]` | `material` movido al nivel del `Body` | `ShapeOptions` no tiene campo `material` — es un campo de `BodyOptions`. Esto tampoco compilaba contra la librería real. |
| `Particula.hx` (`update`) | `update()` implementaba fronteras **periódicas** (wraparound: al salir por un borde, reaparece por el opuesto) | `update()` ya no teletransporta; solo aplica un clamp de seguridad anti-túnel | El wraparound competía con las paredes rígidas de `Boundary`, y deshacía el trabajo del demonio: una partícula separada podía reaparecer del otro lado instantáneamente. |
| `Main.hx` (`crearPuerta`) | `puerta.onCollide = function(other:Body) {...}` | `world.listen(puerta, cuerpos, { enter: ... })` | `Body` **nunca tuvo** un campo `onCollide` en el código fuente de echo — no existe en ninguna versión publicada. La forma real de escuchar colisiones es `World.listen`/`Echo.listen`. Usar el callback `enter` (dispara una sola vez al iniciar el contacto, a diferencia de `stay`) resuelve el doble conteo de forma nativa, sin necesidad de un `Map` de debounce manual. |
| `Main.hx` (orden de creación) | `crearPuerta()` antes que `crearParticulas()` | `crearParticulas()` antes que `crearPuerta()` | El listener de la puerta necesita el arreglo de `Body` de las partículas ya creado para poder escucharlas. |
| `Main.hx` (métricas) | Proxy cinético `Σ v²·ln(v) / N` | Separación correcta y entropía condicional de mezcla | Permite observar si cada mitad contiene principalmente el tipo esperado. |
| `Demonio.hx` | `k·ln(2)` sin temperatura | `k_B·T·ln(2)` por medición aceptada | Hace explícita la temperatura y la unidad energética de la aproximación. |

**Verificación**: el proyecto se compila con Haxe 4.3.6, OpenFL 9.5.2,
Lime 8.3.2 y Echo 4.2.9 mediante:

```bash
haxelib run openfl build html5
```

La versión anterior de esta implementación se compiló con `haxe` 4.3.3
contra el código fuente real de `echo` (clonado directamente del
repositorio, release 4.2.9) más stubs mínimos de OpenFL, y compilan
sin errores. Esto confirma que los tipos y la API usada son correctos
para la versión actual de la librería — no elimina la posibilidad de
que tu proyecto use una versión fijada distinta de `echo` en
`haxelib.json`, así que si seguís viendo errores de tipo, confirmá con
`haxelib list` qué versión de echo tenés instalada.

## Estructura del proyecto

Los comandos de esta guía deben ejecutarse desde
`physics-for-haxe/MaxwellDemon/version_2/`.

```
demonio-maxwell-haxe/
├── README.md
├── project.xml
└── Source/
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

2. **Instalar Lime, OpenFL y Echo** vía haxelib:
   ```bash
   haxelib install lime
   haxelib install openfl
   haxelib install echo
   haxelib run lime setup
   ```

3. El proyecto ya incluye `project.xml`, la carpeta `Source` y un recurso
   `Assets/placeholder.txt`; no es necesario crearlos manualmente.

4. **Compilar y correr** (target HTML5 es el más simple para probar rápido):
   ```bash
   haxelib run openfl test html5
   ```
   Alternativas según lo que necesites:
   ```bash
   openfl test neko     # más liviano para debug rápido
   openfl test windows  # o linux/mac según tu SO
   ```

5. **Interactuar con la simulación**: el botón inferior alterna la puerta
   entre abierta y cerrada. Al abrirla se retira el obstáculo físico; los
   cruces se clasifican y las partículas que entran al lado incorrecto se
   devuelven al lado esperado. El panel muestra separación correcta,
   entropía condicional de mezcla en bits, conteos, mediciones y energía.

## Notas y límites del modelo

- La separación correcta es la proporción de partículas calientes a la
   izquierda y frías a la derecha. Una separación de 100% representa el estado
   objetivo de esta demo.
- La entropía mostrada es la entropía condicional de la etiqueta caliente/fría
   dado el lado de la caja. Se expresa en bits: 0 significa lados puros y 1
   significa mezcla máxima dentro de los lados ocupados.
- El costo de Landauer se contabiliza por cada cruce aceptado, como
   aproximación pedagógica. En física, el costo mínimo se asocia al borrado
   irreversible de información, no a toda medición.
- `dt` se calcula con el reloj y se limita a 50 ms para evitar saltos grandes
   cuando la ventana pierde el foco.
- Los archivos generados de `Export/html5` pueden cambiar al compilar y no
   deben sustituir al código fuente como referencia principal.
