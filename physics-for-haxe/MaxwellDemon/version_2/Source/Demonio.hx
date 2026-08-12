package;

/**
 * Sin cambios respecto a la versión original: la fórmula de Landauer
 * (k * ln 2 por bit medido) está bien implementada. El problema no
 * estaba acá, sino en CUÁNTAS VECES se llamaba a medirParticula()
 * por cada cruce real de partícula -> eso se corrigió en Main.hx.
 */
class Demonio {
  public var energiaConsumida:Float = 0;
  private static final k:Float = 1.38e-23; // Constante de Boltzmann

  public function new() {}

  public function medirParticula(p:Particula):Void {
    energiaConsumida += k * Math.log(2);
  }
}
