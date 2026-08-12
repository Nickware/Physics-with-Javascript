package;

import openfl.display.Sprite;
import openfl.events.Event;
import openfl.events.MouseEvent;
import openfl.text.TextField;
import echo.Body;
import echo.World;
import echo.math.Vector2;
import echo.util.Debug;

class Main extends Sprite {
  public static var world:World;
  public static var caja:Boundary; // Cambiado a público estático
  public static var particulas:Array<Particula>;
  private var puerta:Body;
  private var demonio = new Demonio(); // Inicialización directa
  private var puertaAbierta:Bool = false;
  private var infoText:TextField;

  public function new() {
    super();
    inicializarMundo();
    crearUI();
    crearCaja();
    crearPuerta();
    crearParticulas(20);
    addEventListener(Event.ENTER_FRAME, actualizar);
  }

  private function inicializarMundo():Void {
    world = new World({
      width: 800,
      height: 600,
      gravity_x: 0,
      gravity_y: 0
    });
  }

  private function crearUI():Void {
    var boton = new Sprite();
    boton.graphics.beginFill(0x00FF00);
    boton.graphics.drawRect(350, 550, 100, 30);
    boton.addEventListener(MouseEvent.CLICK, function(_) {
      puertaAbierta = !puertaAbierta;
      boton.graphics.clear();
      boton.graphics.beginFill(puertaAbierta ? 0xFF0000 : 0x00FF00);
      boton.graphics.drawRect(350, 550, 100, 30);
    });
    addChild(boton);

    infoText = new TextField();
    infoText.x = 10;
    infoText.y = 10;
    infoText.width = 300;
    addChild(infoText);
  }

  private function crearCaja():Void {
    caja = new Boundary(world.width, world.height);
  }

  private function crearPuerta():Void {
  puerta = new Body({
    x: world.width / 2,
    y: world.height / 2,
    shape: {
      type: "rect",
      width: 10,
      height: world.height - 100
    },
    material: { elasticity: 0.5 },
    kinematic: true
  });
  
  world.add(puerta);

  // Sistema de colisiones para Echo 4.2.3
  puerta.onCollide = function(other:Body) {
    for (p in Main.particulas) {
      if (p.body == other) {
        if (puertaAbierta) {
          var fuerza = p.esCaliente ? -150 : 150;
          other.velocity.x = fuerza;
          demonio.medirParticula(p);
        }
        break;
      }
    }
  };
}

  private function calcularEntropia():Float {
    var sum = 0.0;
    for (p in particulas) {
      var v = p.body.velocity.length;
      sum += v * v * (v > 0 ? Math.log(v) : 0);
    }
    return sum / particulas.length;
  }

  private function actualizar(e:Event):Void {
    world.step(1/60);
    
    graphics.clear();
    graphics.lineStyle(2, 0x000000);
    graphics.drawRect(0, 0, world.width, world.height);

    for (p in particulas) {
      p.update();
      graphics.beginFill(p.esCaliente ? 0xFF0000 : 0x0000FF);
      graphics.drawCircle(p.body.x, p.body.y, 5);
    }

    var entropia = calcularEntropia();
    infoText.text = 'Entropía: ${formatNum(entropia, 2)}\nEnergía demonio: ${formatNum(demonio.energiaConsumida, 2)} J';
  }

  private function formatNum(value:Float, decimals:Int):String {
    var mult = Math.pow(10, decimals);
    return Std.string(Math.round(value * mult) / mult);
  }
}