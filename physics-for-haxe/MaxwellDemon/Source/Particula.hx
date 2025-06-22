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
			shape: {type: CIRCLE, radius: 5},
			material: {elasticity: 0.8} // Rebote
		});

		// asignar velocidad aleatoria
		var angle = Math.random() * 2 * Math.PI; // Ángulo aleatorio
		body.velocity.x = Math.cos(angle) * velocidad; // Componente X
		body.velocity.y = Math.sin(angle) * velocidad; // Componente Y
		Main.world.add(body); // Añadir al mundo físico
	}
}