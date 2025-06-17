package;

import openfl.display.Sprite;
import openfl.events.Event;
import openfl.events.MouseEvent;
import nape.space.Space;
import nape.phys.Body;
import nape.geom.Vec2;

class Main extends Sprite
{
	public static var space:Space;
	private var particulas:Array<Particula> = [];
	private var puertaAbierta:Bool = false;
	private var temperaturaIzq:Float = 0.0;
	private var temperaturaDer:Float = 0.0;

	public function new()
	{
		super();
		inicializarFisica();
		crearUI();
		inicializarSimulacion();
	}
}
