import openfl.display.Sprite;

class Ball extends Sprite {
	public var radius(default, null):Float;

	public function new(radius:Float = 15) {
		super();
		this.radius = radius;
		graphics.beginFill(0xFF0000);
		graphics.drawCircle(0, 0, radius);
		graphics.endFill();
	}
}