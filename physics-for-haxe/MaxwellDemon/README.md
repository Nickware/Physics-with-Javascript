# Simulación del Demonio de Maxwell: Termodinámica e Información

## **Objetivo Principal**  
Desarrollar una simulación interactiva que:  
 **Replique el experimento mental** de Maxwell (1871): separación de partículas "calientes" (rápidas) y "frías" (lentas) en una caja.  
 **La simulación se enmarca en las leyes termodinámicas**:  
   - La **entropía total** (sistema + demonio) nunca disminuye (`ΔS_total ≥ 0`).  
   - El demonio **consume energía** al medir/actuar (Landauer, 1961).  
 **Visualice el trade-off**: Orden en el gas ↔ Energía consumida por el demonio.  

---

## **Componentes Clave**  
| Elemento               | Descripción                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| **Caja**               | Área cerrada con condiciones periódicas (partículas no escapan).            |
| **Partículas**         | Moléculas con velocidades aleatorias (`rojas = calientes`, `azules = frías`). |
| **Demonio (Puerta)**   | - **Mide** velocidad de partículas. <br> - **Abre/cierra** selectivamente.  |
| **Termodinámica**      | - Cálculo de entropía en tiempo real. <br> - Energía consumida por medición (`kT ln(2)`). |

---

## **Resultados Esperados**  
1. **A corto plazo**:  
   - Las partículas se mezclan aleatoriamente (entropía alta).  
2. **Con demonio activo**:  
   - Separación progresiva (↓ entropía del gas).  
   - ↑ Energía consumida por el demonio (`ΔS_demonio` compensa `ΔS_gas`).  
3. **Estado final (`t → ∞`)**:
   - Partículas completamente separadas.  
   - Máxima energía consumida (`E = n * kT ln(2)`).  

---

## **Base Teórica**  
- **Maxwell (1871)**: Idea original del demonio.  
- **Szilárd (1929)**: Vincula información y entropía.  
- **Landauer (1961)**: Coste energético del borrado de información.  
- **Bennett (1982)**: Memoria del demonio como fuente de entropía.  

---

## **Implementación Técnica**  
```haxe
// Pseudocódigo clave
class Demonio {
  var energiaConsumida:Float;
  function medirParticula() {
    energiaConsumida += k * Math.log(2); // Landauer
  }
}
