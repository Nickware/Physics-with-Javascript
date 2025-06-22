package;

import openfl.display.Sprite;
import openfl.events.Event;
import openfl.events.MouseEvent;
import echo.Body;
import echo.World;
import echo.math.Vector2;

class Main extends Sprite {
  public static var world:World; // Reemplazando space de Nape
  private var particulas:Array<Particula> = [];
  private var puertaAbierta:Bool = false;
  private var temperaturaIzq:Float = 0;
  private var temperaturaDer:Float = 0;
  
  public function new() {
    super();
    inicializarFisica();
    crearUI();
    iniciarSimulacion();
  }
  
  // tamaño del area de simulación
  private function inicializarFisica():Void {
  world = new World({
    width: 800,  // Ancho
    height: 600, // Alto
    gravity_x: 0, 
    gravity_y: 0
    });
  }
  
  private function crearUI():Void {
    // Dibujar cámaras
    graphics.lineStyle(2, 0x000000);
    graphics.drawRect(50, 50, 300, 300); // Cámara izquierda
    graphics.drawRect(400, 50, 300, 300); // Cámara derecha
    
    // Botón para abrir/cerrar puerta
    var botonPuerta = new Sprite();
    botonPuerta.graphics.beginFill(0x00FF00);
    botonPuerta.graphics.drawRect(350, 175, 50, 50);
    botonPuerta.addEventListener(MouseEvent.CLICK, togglePuerta);
    addChild(botonPuerta);
  }
  
  private function togglePuerta(e:MouseEvent):Void {
    puertaAbierta = !puertaAbierta;
    // Este bloque debe ser completado. Añadir lógica para habilitar/deshabilitar colisiones en la puerta
  }
  
  private function iniciarSimulacion():Void {
    // Crear partículas iniciales
    for (i in 0...20) {
      var velocidad = Math.random() * 4 + 2; // 2-6 unidades/seg
      var esCaliente = (velocidad > 4);
      var particula = new Particula(
        Math.random() * 250 + 100, // Posición X aleatoria en cámara izquierda
        Math.random() * 250 + 100, // Posición Y aleatoria
        velocidad,
        esCaliente
      );
      particulas.push(particula);
    }
    
    addEventListener(Event.ENTER_FRAME, actualizar);
  }
  
  private function actualizar(e:Event):Void {
    world.step(1/60); // Actualizar física 
    
    // Calcular temperaturas
    temperaturaIzq = calcularTemperatura(true);
    temperaturaDer = calcularTemperatura(false);
    
    // Dibujar partículas
    graphics.clear();
    for (particula in particulas) {
      graphics.beginFill(particula.esCaliente ? 0xFF0000 : 0x0000FF);
      graphics.drawCircle(particula.body.x, particula.body.y, 5);
    }
  }
  
  private function calcularTemperatura(izquierda:Bool):Float {
    var suma = 0.0;
    var contador = 0;
    
    for (particula in particulas) {
      if ((izquierda && particula.body.x < 350) || (!izquierda && particula.body.x >= 350)) {
        suma += particula.body.velocity.length * particula.body.velocity.length; // lengthSquared
        contador++;
      }
    }
    
    return (contador > 0) ? suma / contador : 0;
  }
}
