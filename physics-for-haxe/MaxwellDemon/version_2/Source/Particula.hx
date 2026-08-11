package;

import echo.Body;
import echo.math.Vector2;

/**
 * CAMBIO vs versión original:
 * update() implementaba condiciones de frontera PERIÓDICAS (si la
 * partícula sale por un lado, reaparece teletransportada por el
 * lado opuesto). Eso competía directamente con Boundary.hx, que
 * sugiere una caja rígida con rebote elástico. Con wraparound activo,
 * una partícula "caliente" separada a la izquierda por el demonio
 * podía reaparecer instantáneamente a la derecha, deshaciendo el
 * trabajo de separación.
 *
 * Ahora que Boundary.hx genera paredes reales, update() ya no
 * teletransporta: solo actúa como salvaguarda anti-túnel numérico
 * (si a alta velocidad la partícula llegara a atravesar una pared en
 * un único step, se recoloca dentro de la caja sin alterar su
 * velocidad, en vez de perderla o reflejarla artificialmente).
 *
 * CORRECCIÓN ADICIONAL 1: se quitó `import echo.data.ShapeType` (ese
 * módulo no existe; el enum vive en echo.data.Types) y se usa CIRCLE
 * sin calificar — Haxe lo resuelve por el tipo esperado del campo
 * `shape.type`, sin necesidad de import.
 *
 * CORRECCIÓN ADICIONAL 2: `material` no es un campo de ShapeOptions,
 * es un campo de BodyOptions. En la versión original estaba anidado
 * dentro del shape (`shapes: [{ ..., material: {...} }]`), lo cual
 * ni siquiera compila contra la librería real. Se movió un nivel
 * arriba, al Body.
 */
class Particula {
  public var body:Body;
  public var esCaliente:Bool;
  public var velocidadInicial:Float;
  private static inline final RADIO:Float = 5;

  public function new(x:Float, y:Float, velocidad:Float, esCaliente:Bool) {
    this.esCaliente = esCaliente;
    this.velocidadInicial = velocidad;

    body = new Body({
      x: x,
      y: y,
      material: {
        elasticity: 0.8,
        density: 0.5
      },
      shapes: [{
        type: CIRCLE,
        radius: RADIO
      }]
    });

    body.velocity = new Vector2(
      (Math.random() * 2 - 1) * velocidad,
      (Math.random() * 2 - 1) * velocidad
    );
  }

  public function update():Void {
    // Salvaguarda anti-túnel: no es un mecanismo de frontera activo,
    // solo evita que una partícula muy rápida "escape" del contenedor
    // por un paso de integración demasiado grande.
    if (body.x < RADIO) body.x = RADIO;
    else if (body.x > Main.world.width - RADIO) body.x = Main.world.width - RADIO;

    if (body.y < RADIO) body.y = RADIO;
    else if (body.y > Main.world.height - RADIO) body.y = Main.world.height - RADIO;
  }
}
