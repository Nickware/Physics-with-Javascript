package;

class Demonio {
  public static inline var BOLTZMANN:Float = 1.380649e-23;
  public var energiaConsumida:Float = 0;
  public var mediciones:Int = 0;
  public var temperatura:Float;

  public function new(temperatura:Float) {
    this.temperatura = temperatura;
  }

  public function medirParticula(p:Particula):Void {
    energiaConsumida += BOLTZMANN * temperatura * Math.log(2);
    mediciones++;
  }
}
