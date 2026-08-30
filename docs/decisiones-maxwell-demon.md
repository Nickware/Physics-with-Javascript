# Decisiones técnicas: MaxwellDemon

## Propósito

Este documento conserva el estado de la simulación Haxe/OpenFL ubicada en
`physics-for-haxe/MaxwellDemon/version_2/` y define el rediseño necesario para
acercarla al experimento mental del demonio de Maxwell.

La implementación actual debe describirse como una **visualización educativa
de separación de partículas**, no como una simulación termodinámica completa.

## Estado actual

`version_2` compila con Haxe, OpenFL, Lime y Echo. La ejecución HTML5 se inicia
con:

```bash
cd physics-for-haxe/MaxwellDemon/version_2
haxelib run openfl test html5
```

La versión actual incluye:

- Partículas rojas y azules, clasificadas como calientes y frías.
- Una caja 2D con cuatro paredes físicas.
- Una puerta central que puede retirarse o reincorporarse al mundo físico.
- Velocidades iniciales mayores para partículas calientes.
- Medición de separación espacial por lados de la caja.
- Entropía condicional de la etiqueta caliente/fría dado el lado, expresada en bits.
- Un contador de mediciones y un coste de Landauer aproximado mediante
  `k_B * T * ln(2)`.
- Un paso de tiempo basado en el reloj, limitado para evitar saltos grandes.

Estas métricas son útiles para observar la demo, pero todavía no constituyen un
modelo físico completo del demonio de Maxwell.

## Diferencias principales

### 1. Las partículas no nacen de una distribución térmica

Actualmente cada partícula recibe aleatoriamente una etiqueta caliente o fría y
una velocidad inicial fija según esa etiqueta. Esto produce dos categorías
visuales, pero no dos estados térmicos derivados de una distribución de
velocidades.

Falta:

- Definir una temperatura para el gas.
- Generar velocidades a partir de una distribución de Maxwell-Boltzmann o de
  una aproximación compatible con la simulación 2D.
- Relacionar energía cinética, masa y temperatura.
- Permitir que las colisiones redistribuyan energía de forma controlada.

### 2. El demonio no mide la velocidad de forma explícita

La lógica actual conoce de antemano si una partícula es caliente o fría y la
corrige después de cruzar. El demonio no observa una velocidad, una dirección ni
un umbral de decisión.

Falta:

- Medir la velocidad normal de la partícula cuando se acerca a la puerta.
- Usar un umbral definido por la temperatura o por la velocidad térmica.
- Tomar una decisión basada únicamente en la información disponible en ese
  instante.
- Registrar el resultado de la medición, incluso cuando la puerta decide no
  abrirse.

### 3. La puerta todavía no implementa la regla del demonio

La puerta actual puede estar abierta o cerrada globalmente. Cuando está abierta,
la simulación corrige los cruces que terminan en el lado incorrecto. Esa
corrección modifica directamente la posición y la velocidad, por lo que puede
introducir energía artificial.

Falta:

- Una regla direccional: por ejemplo, abrir para partículas rápidas que van al
  lado frío y para partículas lentas que van al lado caliente.
- Una puerta que permanezca cerrada para decisiones desfavorables.
- Una interacción de contacto que no teletransporte ni reposicione partículas.
- Un balance explícito de la energía aplicada por la puerta.

### 4. La memoria del demonio no existe

El contador de mediciones no representa una memoria. No se almacenan bits,
resultados, capacidad de memoria ni estados que deban reiniciarse.

Falta:

- Una memoria con capacidad limitada.
- Registros de medición que indiquen velocidad, dirección y decisión.
- Un contador de memoria ocupada.
- Un estado de memoria llena que impida seguir midiendo o fuerce un borrado.

### 5. El coste de Landauer está simplificado

La implementación suma `k_B * T * ln(2)` por medición aceptada. Esta es una
aproximación pedagógica, pero el principio de Landauer se refiere al coste
mínimo del borrado irreversible de un bit, no a toda medición.

Falta separar las magnitudes:

- Energía de medición.
- Energía de actuación de la puerta.
- Bits almacenados.
- Bits borrados.
- Energía mínima de borrado.
- Calor disipado al entorno.

La energía de Landauer debe calcularse como:

$$
E_{\mathrm{Landauer}} = k_B T \ln 2
$$

por bit borrado, bajo las condiciones ideales del principio.

### 6. La entropía mostrada no es la entropía total del sistema

La entropía condicional actual mide la mezcla de etiquetas respecto al lado de
la caja. Es una métrica útil para saber si la separación visual mejora, pero no
incluye todas las variables del gas, la memoria ni el entorno.

Falta distinguir:

- Entropía de mezcla espacial.
- Entropía de la distribución de velocidades.
- Entropía de la memoria del demonio.
- Entropía producida por el borrado.
- Entropía total del sistema y del entorno.

La interfaz debe etiquetar la métrica actual como entropía de mezcla o entropía
condicional, no como entropía termodinámica absoluta.

## Rediseño propuesto

El rediseño debe hacerse por etapas. Cada etapa debe compilar y conservar una
métrica observable antes de añadir la siguiente.

### Etapa 1: estado físico base

- Mantener una masa común y una temperatura inicial definida.
- Generar velocidades con una distribución térmica reproducible mediante una
  semilla opcional.
- Separar posición, velocidad, masa y energía cinética en el modelo de
  `Particula`.
- Calcular la energía cinética:

  $$
  K = \frac{1}{2} m v^2
  $$

- Mostrar energía total del gas y temperatura estimada.

Criterio de aceptación: sin demonio activo, la distribución de velocidades no
separa artificialmente las partículas en dos grupos fijos y la energía total se
conserva dentro del error numérico esperado.

### Etapa 2: medición explícita

Crear un objeto de medición del demonio que, al detectar una partícula próxima
a la puerta, registre:

- Velocidad normal a la puerta.
- Módulo de la velocidad.
- Dirección del movimiento.
- Energía cinética.
- Resultado de la decisión.
- Coste de almacenamiento del resultado.

La medición no debe cambiar por sí misma la posición ni la velocidad de la
partícula.

Criterio de aceptación: cada evento de contacto tiene como máximo una medición
registrada y el registro indica claramente qué información observó el demonio.

### Etapa 3: regla selectiva de la puerta

Definir una regla documentada, por ejemplo:

- Si una partícula rápida se mueve hacia el lado frío, abrir.
- Si una partícula lenta se mueve hacia el lado caliente, abrir.
- En los demás casos, mantener cerrada.

El umbral debe depender de una velocidad térmica o de una energía cinética de
referencia, no de la etiqueta de color.

Criterio de aceptación: la puerta decide usando velocidad y dirección; cambiar
el color o la etiqueta visual sin cambiar la velocidad no cambia la decisión.

### Etapa 4: memoria y borrado

Implementar una memoria conceptual del demonio:

- Cada decisión consume un bit o un número documentado de bits.
- La memoria tiene capacidad limitada.
- El botón de borrado reinicia los registros.
- El borrado incrementa la energía disipada en al menos
  `k_B * T * ln(2)` por bit borrado.

El borrado debe ser una acción separada de medir y de abrir la puerta.

Criterio de aceptación: medir no incrementa automáticamente la energía de
Landauer; borrar memoria sí incrementa el coste según el número de bits
borrados.

### Etapa 5: balance de entropía y energía

Mostrar por separado:

- Entropía de mezcla del gas.
- Entropía de velocidad del gas.
- Información almacenada.
- Bits borrados.
- Energía aplicada por la puerta.
- Energía disipada por borrado.
- Entropía total estimada.

La interfaz debe evitar afirmar que la segunda ley queda demostrada por una
métrica parcial. Debe indicar qué términos son exactos dentro del modelo y
cuáles son aproximaciones educativas.

Criterio de aceptación: una ejecución con demonio activo puede reducir una
métrica del gas, pero el balance completo incluye la información almacenada y
el coste asociado al borrado.

## Decisiones de implementación

- Mantener Haxe/OpenFL y Echo mientras sean suficientes para la simulación 2D.
- Mantener `version_2` como la única versión fuente; no reintroducir ramas
  paralelas para correcciones experimentales.
- Mantener `dt` limitado y documentar el integrador utilizado.
- Evitar reposicionar o invertir velocidades directamente como mecanismo
  principal de control de la puerta.
- Usar nombres separados para `entropiaMezcla`, `entropiaVelocidad` y
  `entropiaTotal`.
- Mantener la representación visual como apoyo, no como sustituto de las
  magnitudes físicas.
- Versionar el código fuente y la configuración; tratar los archivos generados
  de `Export/html5` como artefactos de compilación.

## Preguntas abiertas

- ¿Se simulará un gas de una sola temperatura o dos reservorios térmicos?
- ¿La puerta tendrá una anchura finita y una ventana de detección?
- ¿La medición será determinista o tendrá ruido?
- ¿Se modelarán colisiones partícula-partícula con conservación de momento?
- ¿Qué definición operativa de entropía se mostrará como principal?
- ¿La memoria se limitará a un bit por decisión o se almacenará información
  adicional sobre la velocidad?

## Estado de las etapas

- [x] Caja con paredes físicas.
- [x] Puerta que puede retirarse del mundo.
- [x] Separación espacial visible.
- [x] Entropía condicional de mezcla como métrica parcial.
- [x] Paso de tiempo basado en reloj y limitado.
- [ ] Distribución de Maxwell-Boltzmann.
- [ ] Medición explícita de velocidad y dirección.
- [ ] Regla selectiva basada en un umbral físico.
- [ ] Memoria del demonio.
- [ ] Borrado separado de la medición.
- [ ] Balance completo de entropía y energía.
