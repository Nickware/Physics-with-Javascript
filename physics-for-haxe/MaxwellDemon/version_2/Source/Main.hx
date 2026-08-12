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
  public static var caja:Boundary;
  public static var particulas:Array<Particula>;

  private var puerta:Body;
  private var demonio = new Demonio();
  private var puertaAbierta:Bool = false;
  private var infoText:TextField;

  // CAMBIO vs versión original: antes onCollide sumaba energía en
  // CADA frame que la partícula seguía tocando la puerta (comportamiento
  // "stay" de echo), inflando el conteo. Ahora se registra qué
  // partículas ya fueron "medidas" en el cruce actual, y solo se
  // vuelve a contar cuando la partícula se aleja lo suficiente de la
  // puerta como para considerar que terminó ese cruce.
  private var enContactoConPuerta:Map<Particula, Bool> = new Map();
  private static inline final UMBRAL_SALIDA:Float = 20; // px desde el centro de la puerta

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
          if (puertaAbierta && !enContactoConPuerta.exists(p)) {
            var fuerza = p.esCaliente ? -150 : 150;
            other.velocity.x = fuerza;
            demonio.medirParticula(p);
            enContactoConPuerta.set(p, true);
          }
          break;
        }
      }
    };
  }

  private function crearParticulas(n:Int):Void {
    particulas = [];
    for (i in 0...n) {
      var x = Math.random() * world.width;
      var y = Math.random() * world.height;
      var esCaliente = Math.random() > 0.5;
      var velocidad = esCaliente ? 200 : 80;
      var p = new Particula(x, y, velocidad, esCaliente);
      world.add(p.body);
      particulas.push(p);
    }
  }

  private function liberarContactosLejanos():Void {
    var puertaX = world.width / 2;
    for (p in particulas) {
      if (enContactoConPuerta.exists(p) && Math.abs(p.body.x - puertaX) > UMBRAL_SALIDA) {
        enContactoConPuerta.remove(p);
      }
    }
  }

  // NOTA: esto es un proxy inspirado en el integrando de la función H
  // de Boltzmann (v^2 * ln v), NO la entropía de Shannon/Boltzmann
  // formal sobre una distribución. Sirve como indicador relativo de
  // "desorden" cinético, pero no es directamente comparable con el
  // E = n * kT * ln(2) teórico del documento de referencia.
  private function calcularEntropia():Float {
    var sum = 0.0;
    for (p in particulas) {
      var v = p.body.velocity.length;
      sum += v * v * (v > 0 ? Math.log(v) : 0);
    }
    return sum / particulas.length;
  }

  private function actualizar(e:Event):Void {
    world.step(1 / 60);
    liberarContactosLejanos();

    graphics.clear();
    graphics.lineStyle(2, 0x000000);
    graphics.drawRect(0, 0, world.width, world.height);

    for (p in particulas) {
      p.update();
      graphics.beginFill(p.esCaliente ? 0xFF0000 : 0x0000FF);
      graphics.drawCircle(p.body.x, p.body.y, 5);
    }

    var entropia = calcularEntropia();
    infoText.text = 'Entropía (proxy): ${formatNum(entropia, 2)}\nEnergía demonio: ${formatNum(demonio.energiaConsumida, 2)} J';
  }

  private function formatNum(value:Float, decimals:Int):String {
    var mult = Math.pow(10, decimals);
    return Std.string(Math.round(value * mult) / mult);
  }
}
