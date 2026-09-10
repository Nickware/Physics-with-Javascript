import openfl.display.Sprite;
import openfl.events.Event;
import openfl.Lib;

class Main extends Sprite {
	private static inline var WIDTH:Float = 800;
	private static inline var HEIGHT:Float = 600;
	private static inline var FLOOR_Y:Float = 500;
	private static inline var GRAVITY:Float = 600;
	private static inline var RESTITUTION:Float = 0.8;
	private static inline var MAX_DT:Float = 0.05;

	private var vx:Float = 120;
	private var vy:Float = 0;
	private var ball:Ball;
	private var previousTime:Int;

	public function new() {
		super();
		initialize();
	}

	private function initialize():Void {
		ball = new Ball();
		addChild(ball);
		ball.x = 50;
		ball.y = 75;

		graphics.lineStyle(2, 0x333333);
		graphics.moveTo(0, FLOOR_Y);
		graphics.lineTo(WIDTH, FLOOR_Y);
		graphics.moveTo(0, 0);
		graphics.lineTo(0, HEIGHT);
		graphics.moveTo(WIDTH, 0);
		graphics.lineTo(WIDTH, HEIGHT);

		previousTime = Lib.getTimer();
		addEventListener(Event.ENTER_FRAME, onEachTimestep);
	}

	private function onEachTimestep(event:Event):Void {
		var currentTime = Lib.getTimer();
		var dt = (currentTime - previousTime) / 1000;
		previousTime = currentTime;
		dt = Math.min(dt, MAX_DT);

		vy += GRAVITY * dt;
		ball.x += vx * dt;
		ball.y += vy * dt;

		if (ball.y + ball.radius >= FLOOR_Y) {
			ball.y = FLOOR_Y - ball.radius;
			vy *= -RESTITUTION;
		}

		if (ball.x - ball.radius <= 0) {
			ball.x = ball.radius;
			vx = Math.abs(vx);
		} else if (ball.x + ball.radius >= WIDTH) {
			ball.x = WIDTH - ball.radius;
			vx = -Math.abs(vx);
		}
	}
}
		