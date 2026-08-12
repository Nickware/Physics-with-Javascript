package;

import echo.Body;

/**
 * CAMBIO vs versión original:
 * Antes, Boundary creaba UN solo Body kinemático del mismo tamaño que
 * el mundo entero (width x height) -> eso no es una "pared", es un
 * sólido que ocupa toda la caja, y las partículas terminarían
 * colisionando contra un bloque macizo en vez de rebotar en el borde.
 *
 * Ahora se generan CUATRO paredes delgadas (arriba, abajo, izquierda,
 * derecha) que sí delimitan un contenedor hueco. Esto es lo que hace
 * posible que Particula.update() deje de usar wraparound periódico y
 * en su lugar confíe en que echo resuelva el rebote físico contra
 * estas paredes (elasticity: 1.0).
 */
class Boundary {
  public var walls:Array<Body>;

  public function new(width:Float, height:Float, thickness:Float = 10) {
    walls = [];

    // Pared superior
    walls.push(crearPared(width / 2, thickness / 2, width, thickness));
    // Pared inferior
    walls.push(crearPared(width / 2, height - thickness / 2, width, thickness));
    // Pared izquierda
    walls.push(crearPared(thickness / 2, height / 2, thickness, height));
    // Pared derecha
    walls.push(crearPared(width - thickness / 2, height / 2, thickness, height));

    for (w in walls) Main.world.add(w);
  }

  private function crearPared(x:Float, y:Float, w:Float, h:Float):Body {
    return new Body({
      x: x,
      y: y,
      shape: {
        type: "rect",
        width: w,
        height: h
      },
      material: { elasticity: 1.0 },
      kinematic: true
    });
  }
}
