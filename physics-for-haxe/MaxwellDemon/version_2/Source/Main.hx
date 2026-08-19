package;

import openfl.display.Sprite;
import openfl.events.Event;
import openfl.events.MouseEvent;
import openfl.text.TextField;
import openfl.Lib;
import echo.Body;
import echo.World;

class Main extends Sprite {
  private static inline var WIDTH:Float = 800;
  private static inline var HEIGHT:Float = 600;
  private static inline var MAX_DT:Float = 0.05;
  private static inline var PARTICLE_COUNT:Int = 20;
  private static inline var DOOR_X:Float = WIDTH / 2;

  public static var world:World;
  public static var caja:Boundary;
  public static var particulas:Array<Particula>;

  private var puerta:Body;
  private var demonio:Demonio;
  private var puertaAbierta:Bool = false;
  private var infoText:TextField;
  private var buttonLabel:TextField;
  private var previousTime:Int;
  private var separacion:Float = 0;
  private var entropiaBits:Float = 0;
  private var calientesIzquierda:Int = 0;
  private var friasDerecha:Int = 0;

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
    demonio = new Demonio(300);
    crearParticulas(PARTICLE_COUNT);
    crearPuerta();
    previousTime = Lib.getTimer();
    addEventListener(Event.ENTER_FRAME, actualizar);
  }

  private function inicializarMundo():Void {
    world = new World({
      width: WIDTH,
      height: HEIGHT,
      gravity_x: 0,
      gravity_y: 0
    });
  }

  private function crearUI():Void {
    var boton = new Sprite();
    boton.graphics.beginFill(0x00AA00);
    boton.graphics.drawRect(350, 550, 100, 30);
    boton.addEventListener(MouseEvent.CLICK, function(_) {
      setPuertaAbierta(!puertaAbierta, boton);
    });
    addChild(boton);

    buttonLabel = new TextField();
    buttonLabel.x = 350;
    buttonLabel.y = 555;
    buttonLabel.width = 100;
    buttonLabel.height = 24;
    buttonLabel.text = "Abrir puerta";
    buttonLabel.selectable = false;
    addChild(buttonLabel);

    infoText = new TextField();
    infoText.x = 10;
    infoText.y = 10;
    infoText.width = 500;
    infoText.height = 100;
    infoText.selectable = false;
    addChild(infoText);
  }

  private function crearCaja():Void {
    caja = new Boundary(world.width, world.height);
  }

  private function crearPuerta():Void {
    puerta = new Body({
      x: DOOR_X,
      y: world.height / 2,
      shape: { type: RECT, width: 10, height: world.height - 100 },
      material: { elasticity: 0.5 },
      kinematic: true
    });
    world.add(puerta);
  }

  private function setPuertaAbierta(abierta:Bool, boton:Sprite):Void {
    puertaAbierta = abierta;
    if (puertaAbierta) {
      world.remove(puerta);
    } else {
      world.add(puerta);
    }
    boton.graphics.clear();
    boton.graphics.beginFill(puertaAbierta ? 0xCC0000 : 0x00AA00);
    boton.graphics.drawRect(350, 550, 100, 30);
    buttonLabel.text = puertaAbierta ? "Cerrar puerta" : "Abrir puerta";
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

  private function actualizarMetricas():Void {
    var calientesDerecha = 0;
    var friasIzquierda = 0;
    calientesIzquierda = 0;
    friasDerecha = 0;

    for (p in particulas) {
      var estaIzquierda = p.body.x < DOOR_X;
      if (p.esCaliente) {
        if (estaIzquierda) calientesIzquierda++ else calientesDerecha++;
      } else if (estaIzquierda) {
        friasIzquierda++;
      } else {
        friasDerecha++;
      }
    }

    separacion = (calientesIzquierda + friasDerecha) / particulas.length;
    entropiaBits = entropiaCondicional(
      calientesIzquierda,
      friasIzquierda,
      calientesDerecha,
      friasDerecha
    );
  }

  private function entropiaCondicional(
    calientesIzquierda:Int,
    friasIzquierda:Int,
    calientesDerecha:Int,
    friasDerecha:Int
  ):Float {
    var total = particulas.length;
    var entropia = 0.0;
    entropia += entropiaLado(calientesIzquierda, friasIzquierda) / total;
    entropia += entropiaLado(calientesDerecha, friasDerecha) / total;
    return entropia / Math.log(2);
  }

  private function entropiaLado(calientes:Int, frias:Int):Float {
    var total = calientes + frias;
    if (total == 0) return 0;
    var resultado = 0.0;
    if (calientes > 0) {
      var pCalientes = calientes / total;
      resultado -= pCalientes * Math.log(pCalientes);
    }
    if (frias > 0) {
      var pFrias = frias / total;
      resultado -= pFrias * Math.log(pFrias);
    }
    return resultado;
  }

  private function actualizar(e:Event):Void {
    var currentTime = Lib.getTimer();
    var dt = Math.min((currentTime - previousTime) / 1000, MAX_DT);
    previousTime = currentTime;
    if (dt <= 0) dt = 1 / 60;
    for (p in particulas) p.previousX = p.body.x;
    world.step(dt);

    graphics.clear();
    graphics.lineStyle(2, 0x000000);
    graphics.drawRect(0, 0, world.width, world.height);
    graphics.lineStyle(1, 0xAAAAAA);
    graphics.moveTo(DOOR_X, 0);
    graphics.lineTo(DOOR_X, HEIGHT);

    for (p in particulas) {
      p.update();
      if (puertaAbierta && p.cruzo(DOOR_X)) controlPostCruce(p);
      graphics.beginFill(p.esCaliente ? 0xFF0000 : 0x0000FF);
      graphics.drawCircle(p.body.x, p.body.y, 5);
    }

    if (!puertaAbierta) {
      graphics.lineStyle(3, 0x444444);
      graphics.drawRect(DOOR_X - 5, 50, 10, HEIGHT - 100);
    }

    actualizarMetricas();
    infoText.text = 'Separación correcta: ${formatNum(separacion * 100, 1)}%\n' +
      'Entropía de mezcla: ${formatNum(entropiaBits, 3)} bits\n' +
      'Calientes izquierda: $calientesIzquierda | Frías derecha: $friasDerecha\n' +
      'Mediciones: ${demonio.mediciones} | Energía: ${demonio.energiaConsumida} J';
  }

  private function controlPostCruce(p:Particula):Void {
    var ladoCorrecto = p.esCaliente ? p.body.x < DOOR_X : p.body.x >= DOOR_X;
    if (ladoCorrecto) {
      demonio.medirParticula(p);
      return;
    }
    p.body.x = p.esCaliente ? DOOR_X - 12 : DOOR_X + 12;
    p.body.velocity.x = p.esCaliente ? -Math.abs(p.body.velocity.x) : Math.abs(p.body.velocity.x);
  }

  private function formatNum(value:Float, decimals:Int):String {
    var mult = Math.pow(10, decimals);
    return Std.string(Math.round(value * mult) / mult);
  }
}
