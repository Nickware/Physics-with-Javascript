# Proyecto airplane — Flash CS4+ / capítulo 16

Este directorio contiene una simulación tridimensional de vuelo incluida en el capítulo 16 de *Physics for Flash Games, Animation, and Simulations*.

Es una demostración didáctica de cuerpo rígido, aerodinámica simplificada y controles de vuelo. No representa un modelo aerodinámico cuantitativamente válido para diseño real de aeronaves.

## Navegación

- [README principal del repositorio](../../../../README.md)
- [README de physics-for-flash](../../../README.md)
- [Tecnologías de transición desde Adobe Flash](../../../docs/README.md)
- [Entornos heredados y migración](../../../docs/entornos-heredados-y-migracion.md)

## Archivos principales

- `Airplane.as`: punto de entrada; crea la geometría, la pista y el avión.
- `AirplaneMover.as`: controla fuerzas, torques, estados de vuelo, teclado e interfaz.
- `Road.as`: dibuja la pista como un rectángulo con bandas.
- `Airplane.fla`: fuente visual y de timeline.
- `Airplane.swf`: artefacto compilado histórico.
- `README.pdf`: documentación original incluida con el proyecto.
- `com/physicscodes/`: clases compartidas para movimiento, fuerzas, partículas, cuerpos rígidos y geometría 3D.

## Arquitectura

La jerarquía principal es:

```text
Mover3D
  └── ForcerRB3D
        └── AirplaneMover
              └── PolyhedronRB
                    └── RigidBody3D
                          └── Particle3D
```

### `Airplane.as`

Es el punto de entrada:

- Crea el poliedro del avión.
- Define su centro de masa, masa y momentos de inercia.
- Construye la pista mediante `Road.as`.
- Inicializa `AirplaneMover` y su temporizador.

Parámetros principales:

- Masa: `30000`.
- Momento de inercia vectorial: `(300000, 100000, 200000)`.
- Distancia focal: `200`.
- Posición inicial: centro de masa `(400, 600, 0)`.
- Velocidad lineal y angular iniciales nulas.

### `AirplaneMover.as`

Contiene prácticamente toda la lógica física:

- Gravedad.
- Arrastre cuadrático.
- Empuje.
- Sustentación del ala.
- Sustentación y torque de elevadores.
- Sustentación y torque de alerones.
- Sustentación y torque del timón.
- Amortiguamiento angular.
- Velocidad, posición, altitud y controles.

### `PolyhedronRB.as`

Representa el avión como poliedro:

- Aplica rotaciones incrementales con `Matrix3D`.
- Calcula los ejes locales `ix`, `iy` e `iz`.
- Transforma vértices en coordenadas locales y mundiales.
- Realiza proyección perspectiva.
- Ordena caras por profundidad.
- Dibuja el poliedro sobre el `Stage`.

### `Road.as`

Dibuja una pista rectangular gris con marcas blancas. No implementa una colisión física completa ni fricción de aterrizaje.

## Parámetros físicos

### Avión

- Masa: `30000`.
- Área principal del ala: `150`.
- Área del timón vertical: `20`.
- Área del estabilizador horizontal: `6`.
- Área de cada alerón: `4`.
- Distancia cola–centro de masa: `35`.
- Distancia alerón–centro de masa: `9`.

### Ambiente

- Gravedad: `10`.
- Densidad del aire: `1.0`.
- Altura de tierra: `600` píxeles.
- Amortiguamiento angular: `0.2`.

### Aerodinámica

- Coeficiente de arrastre: `1`.
- Derivada lineal del coeficiente de sustentación: `5`.
- Ángulo fijo del ala: `10°`.
- Sustentación limitada aproximadamente a `20°`.
- Empuje máximo: `300000`.
- Incremento de empuje: `10000`.

## Superficies de control

El avión calcula dos ángulos aerodinámicos:

- `alpha`: ángulo de ataque entre la velocidad proyectada en el plano `xy` y el eje longitudinal `ix`.
- `beta`: ángulo lateral entre la velocidad proyectada en el plano `xz` y el eje `ix`.

Las superficies controlan:

- Elevadores: pitch.
- Alerones: roll.
- Timón: yaw.
- Empuje: aceleración a lo largo del eje longitudinal.

## Controles de teclado

| Tecla | Función |
|---|---|
| Flecha arriba | Aumentar elevadores |
| Flecha abajo | Disminuir elevadores |
| Flecha izquierda | Desviar alerones en una dirección |
| Flecha derecha | Desviar alerones en la dirección opuesta |
| Control | Aumentar timón en una dirección |
| Shift | Aumentar timón en la dirección opuesta |
| Espacio | Aumentar empuje |
| Caps Lock + Espacio | Reducir empuje |

Los controles actualizan campos `TextField` dentro del Stage con elevadores, alerones, timón y empuje.

## Integración temporal

`Mover3D` utiliza `flash.utils.Timer` y `flash.utils.getTimer()` para calcular `dt` en segundos:

```text
posición += velocidad × dt
velocidad += aceleración × dt
velocidad angular += aceleración angular × dt
```

En `ForcerRB3D`:

```text
aceleración lineal = fuerza / masa
aceleración angular = torque / momento de inercia
```

La simulación usa una integración explícita de Euler. No utiliza paso fijo ni un integrador Runge-Kutta.

## Renderizado 3D

`PolyhedronRB.updatePolyhedron()`:

1. Añade rotaciones incrementales a `Matrix3D`.
2. Obtiene los ejes locales del avión.
3. Transforma los vértices.
4. Aplica proyección perspectiva basada en `_fl`.
5. Ordena las caras por profundidad.
6. Dibuja las caras visibles en el contenedor gráfico.

Esta proyección se realiza mediante gráficos 2D de Flash, no mediante un motor 3D moderno.

## Limitaciones técnicas

- No existe una colisión tridimensional completa con la pista.
- La posición por debajo del suelo solo elimina o cancela parcialmente la gravedad.
- La densidad del aire permanece constante.
- Los coeficientes de sustentación son lineales y limitados de forma simplificada.
- El arrastre no modela una envolvente aerodinámica completa.
- Los momentos de inercia son aproximados.
- Se asume una matriz de inercia diagonal.
- El Euler explícito puede acumular error o depender del rendimiento.
- El paso temporal depende del reloj real y no está fijado.
- No se modelan stall, aterrizaje completo, efecto suelo ni pérdida dinámica.
- No existe validación física automatizada.
- La escena mezcla coordenadas visuales, píxeles y parámetros físicos simplificados.

## Comparación con la versión JavaScript

Existe una implementación equivalente en `physics-for-javascript/9781430263371/chapter16/airplane.js`.

La versión JavaScript utiliza:

- Three.js y WebGL.
- Un cubo 3D en lugar del poliedro de Flash.
- Quaterniones para orientar el avión.
- Una cámara fija o que sigue al avión.
- Controles adicionales para cámara y pausa.
- Convenciones de coordenadas diferentes respecto a Flash.
- Un término giroscópico en la actualización angular.

La versión Flash y la versión JavaScript no deben compararse únicamente por su apariencia: pueden diferir en unidades, eje vertical, orientaciones iniciales, coeficientes y tratamiento del tiempo.

## Estrategia de migración

### Ruta recomendada

La ruta más apropiada para conservar el carácter didáctico es **TypeScript + Three.js**:

- Three.js sustituye `PolyhedronRB` y `Matrix3D`.
- TypeScript separa las ecuaciones de la presentación.
- Una clase de avión representa estado, masa, orientación e inercia.
- Las funciones aerodinámicas se extraen en módulos independientes.
- El renderer utiliza `requestAnimationFrame`.

**Haxe + OpenFL** es una alternativa si se desea conservar más directamente la estructura AS3.

### Arquitectura propuesta

```text
physics/
  vectors
  airplane-state
  aerodynamics
  rigid-body

scene/
  mesh
  runway
  camera
  text

input/
  keyboard
  reset
  pause

app/
  fixed-timestep loop
```

## Prueba piloto

Migrar el proyecto por etapas:

1. Extraer vectores y funciones de fuerza sin renderizado.
2. Crear el modelo con velocidad, empuje y gravedad.
3. Añadir arrastre.
4. Añadir sustentación.
5. Añadir control de superficies.
6. Añadir torques y rotación.
7. Reconstruir la pista y el modelo 3D.
8. Añadir cámara, interfaz y controles.

Casos mínimos:

- Velocidad cero: sin sustentación ni arrastre.
- Empuje cero y gravedad activa: caída controlada.
- Empuje igual al arrastre y sustentación igual al peso: vuelo constante aproximado.
- Elevador neutro: sin torque longitudinal.
- Alerones neutros: sin torque de roll.
- Timón neutro: sin torque de yaw.
- `dt = 0`: el estado no debe modificarse.
- `dt` grande: rechazar o limitar el salto temporal.

## Criterios de aceptación

Una migración debería cumplir:

- Controles equivalentes al original.
- Pausa y reinicio explícitos.
- Paso fijo o paso limitado documentado.
- Orientación estable sin números inválidos.
- Sustentación y arrastre reproducibles mediante pruebas.
- Colisión o interacción consistente con la pista.
- Sin dependencia de Flash Player.
- Diferencias visuales y numéricas documentadas.
- Referencias explícitas a `Airplane.as`, `AirplaneMover.as` y `PolyhedronRB.as`.

## Riesgos

- Las convenciones de coordenadas pueden invertir pitch, roll o yaw.
- Euler explícito puede ser menos estable que un integrador moderno.
- Los coeficientes históricos no están necesariamente calibrados.
- El poliedro puede requerir reconstruir vértices y caras.
- El `.fla` puede depender de configuraciones antiguas.
- El `.swf` no debe ejecutarse en navegadores modernos.
- Las unidades visuales históricas pueden confundirse con metros reales.
