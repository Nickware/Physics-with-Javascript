package; 

import nape.phys.Body;
import nape.phys.BodyType;
import nape.geom.Vec2;
import nape.shape.Circle;

class Particula extends Body
{
    public var esCaliente:Bool; // Particula rapida (roja) o lenta (azul)
    
    public function new() {x:Float, y:Float, esCaliente:Bool)
    {
        super(BodyType.DYNAMIC);
        
        this.esCaliente = esCaliente;
        
        // Configurar cuerpo físico

        var radio = 5.0;
        var color = esCaliente ? 0xFF0000 : 0x0000FF; // Rojo para caliente, azul para frío
        shapes.add(new Circle(radio));
        position.setxy(x, y);
        velocity.set(Vec2.weak(velocidad, 0));

        // Propiedades Físicas
        space.Main.space; // Refencia al espacio fisico global
    }
    
}