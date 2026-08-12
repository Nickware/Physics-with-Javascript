package;

import echo.Body;

class Boundary {
  public var body:Body;
  
  public function new(width:Float, height:Float) {
    body = new Body({
      x: width/2,
      y: height/2,
      shape: { // Usamos shape (singular) en lugar de shapes
        type: "rect", 
        width: width,
        height: height
      },
      material: { elasticity: 1.0 }, // Configuración separada
      kinematic: true
    });
    
    Main.world.add(body);
  }
}