package;

import echo.Body;
import echo.math.Vector2;
import echo.data.ShapeType; // Importación necesaria

class Particula {
  public var body:Body;
  public var esCaliente:Bool;
  public var velocidadInicial:Float;

  public function new(x:Float, y:Float, velocidad:Float, esCaliente:Bool) {
    this.esCaliente = esCaliente;
    this.velocidadInicial = velocidad;

    // Configuración correcta usando ShapeType
    body = new Body({
      x: x,
      y: y,
      shapes: [{
        type: ShapeType.CIRCLE, // Usamos el enum directamente
        radius: 5,
        material: {
          elasticity: 0.8,
          density: 0.5
        }
      }]
    });

    // Configuración de velocidad
    body.velocity = new Vector2(
      (Math.random() * 2 - 1) * velocidad,
      (Math.random() * 2 - 1) * velocidad
    );
  }

  public function update():Void {
    // Sistema de bordes periódicos
    if (body.x < 0) body.x = Main.world.width;
    else if (body.x > Main.world.width) body.x = 0;
    if (body.y < 0) body.y = Main.world.height;
    else if (body.y > Main.world.height) body.y = 0;
  }
}