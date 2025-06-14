import openfl.display.Sprite;
import openfl.events.Event;

class Ball extends Sprite {

	public function new(radius:Float = 15) {
		super();
		graphics.beginFill(0xFF0000); // Red color
		graphics.drawCircle(0, 0, radius);
		graphics.endFill();
	}
}

	class Main extends Sprite {
		private var g:Float = 0.1; // Gravity
		private var vx:Float = 2; // Horizontal speed
		private var vy:Float = 0; // Vertical speed
		private var ball:Ball;

		public function new() {
			super();
			int();
		}

		private function int():Void {
			ball = new Ball();
			addChild(ball);
			ball.x = 50;
			ball.y = 75;
			addEventListener(Event.ENTER_FRAME, onEachTimestep);
		}

		private function onEachTimestep(event:Event):Void {
			// Velocity update
			// Apply gravity
			vy += g;
			// Update ball position
			ball.x += vx;
			ball.y += vy;

			if(ball.y > 350){
				// Bounce off the ground
				vy *= -0.8; // Reverse velocity and reduce speed
				// Reset position to prevent falling through the ground	
				ball.y = 350;				
			}
		}
	}
		