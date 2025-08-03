package;

class Demonio {
  public var energiaConsumida:Float = 0;
  private static final k:Float = 1.38e-23; // Constante de Boltzmann como estática

  public function new() {}

  public function medirParticula(p:Particula):Void {
    energiaConsumida += k * Math.log(2);
  }
}