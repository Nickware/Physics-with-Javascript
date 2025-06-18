package;

import echo.Body;
import echo.math.Vector2;

class Particula {
  public var body:Body;
  public var esCaliente:Bool;
  
  public function new(x:Float, y:Float, velocidad:Float, esCaliente:Bool) {
    this.esCaliente = esCaliente;
    
    body = new Body({
      x: x,
      y: y,
      shape: { type: CIRCLE, radius: 5 },
      velocity: Vector2.from_angle(Math.random() * Math.PI * 2).normalize() * velocidad,
      material: { elasticity: 0.8 } // Rebote
    });
    
    Main.world.add(body); // Añadir al mundo físico
  }
}