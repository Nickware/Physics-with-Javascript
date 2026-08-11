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

  // CAMBIO vs versión original: `Body` de echo nunca tuvo un campo
  // `onCollide` (no existe en el código fuente de la librería, en
  // ninguna versión publicada). La forma real de escuchar colisiones
  // es `world.listen(a, b, { enter, stay, exit })`. Usamos `enter`,
  // que dispara UNA sola vez al iniciar el contacto -> esto resuelve
  // el doble conteo de energía de forma nativa, sin necesidad de un
  // Map de debounce manual como en el intento anterior.
  //
  // Por eso también se invierte el orden: crearParticulas() debe
  // correr ANTES de crearPuerta(), porque el listener necesita la
  // lista de Bodies de las partículas para armarse.
  public function new() {
    super();
    inicializarMundo();
    crearUI();
    crearCaja();
    crearParticulas(20);
    crearPuerta();
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
        type: RECT,
        width: 10,
        height: world.height - 100
      },
      material: { elasticity: 0.5 },
      kinematic: true
    });

    world.add(puerta);

    // Un único listener cubre la puerta contra TODAS las partículas
    // (BodyOrBodies acepta un Body o un Array<Body>). `enter` se
    // dispara una sola vez por cruce, así que no hace falta
    // debounce manual: la propia librería ya evita el doble conteo.
    var cuerpos = [for (p in Main.particulas) p.body];
    world.listen(puerta, cuerpos, {
      enter: function(a:Body, b:Body, data) {
        if (!puertaAbierta) return;
        for (p in Main.particulas) {
          if (p.body == b) {
            var fuerza = p.esCaliente ? -150 : 150;
            b.velocity.x = fuerza;
            demonio.medirParticula(p);
            break;
          }
        }
      }
    });
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
