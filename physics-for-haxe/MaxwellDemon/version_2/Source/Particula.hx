package;

import echo.Body;
import echo.math.Vector2;
import echo.data.ShapeType;

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
      shapes: [{
        type: ShapeType.CIRCLE,
        radius: RADIO,
        material: {
          elasticity: 0.8,
          density: 0.5
        }
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
