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
Descripción precisa de cada uno de esos trabajos fundamentales en la intersección entre **física, información y termodinámica**, junto con sus referencias completas (en la medida disponible y estandarizada):

---

###  **James Clerk Maxwell (1871)**  
**Contribución**: Idea original del *"demonio de Maxwell"*  
**Referencia principal**:  
- Maxwell, J. C. (1871). *Theory of Heat*. Longmans, Green & Co.  
  - En el Capítulo XXII ("Limitations of the Second Law of Thermodynamics"), Maxwell describe un "ser inteligente" que puede separar moléculas calientes y frías sin realizar trabajo, aparentemente violando la segunda ley de la termodinámica.

>  Este fue el origen conceptual: un experimento mental que cuestionó el carácter absoluto de la segunda ley al introducir un observador que manipula información microscópica.

---

###  **Leó Szilárd (1929)**  
**Contribución**: Vinculó por primera vez **información** y **entropía termodinámica**, mostrando que obtener información reduce la entropía.  
**Referencia**:  
- Szilárd, L. (1929). "Über die Entropieverminderung in einem thermodynamischen System bei Eingriffen intelligenter Wesen" (*On the Reduction of Entropy in a Thermodynamic System by Interventions of Intelligent Beings*).  
  *Zeitschrift für Physik*, **53**(11–12), 840–856.  
  DOI: [10.1007/BF01341281](https://doi.org/10.1007/BF01341281)

>  Szilárd analizó una versión simplificada del demonio (con una sola molécula) y demostró que la **medición** (adquisición de 1 bit de información) permite extraer trabajo. Fue el primero en asociar **1 bit de información** con un cambio en entropía: \( \Delta S = k \ln 2 \).

---

###  **Rolf Landauer (1961)**  
**Contribución**: Principio de **disipación mínima al borrar información**.  
**Referencia**:  
- Landauer, R. (1961). "Irreversibility and Heat Generation in the Computing Process".  
  *IBM Journal of Research and Development*, **5**(3), 183–191.  
  DOI: [10.1147/rd.53.0183](https://doi.org/10.1147/rd.53.0183)

>  Formuló el principio de **Landauer**: *Borrar un bit de información en un sistema disipativo requiere al menos \( kT \ln 2 \) de energía en forma de calor*.  
> Esto estableció un puente físico entre computación y termodinámica.

---

###  **Charles H. Bennett (1982)**  
**Contribución**: Resolvió la paradoja del demonio usando Landauer: **la memoria del demonio genera entropía al borrarse**.  
**Referencia**:  
- Bennett, C. H. (1982). "The Thermodynamics of Computation — A Review".  
  *International Journal of Theoretical Physics*, **21**, 905–940.  
  DOI: [10.1007/BF02084158](https://doi.org/10.1007/BF02084158)

>  Bennett argumentó que el demonio debe almacenar información sobre las moléculas. Cuando su memoria se llena, debe **borrarla**, lo cual —según Landauer— disipa \( kT \ln 2 \) por bit, aumentando la entropía del entorno.  
>  Así, la segunda ley se salva: el costo está en el **borrado**, no en la medición.

---

##  Visión conjunta (cronológica)

| Año | Científico | Concepto clave |
|-----|-----------|----------------|
| 1871 | Maxwell | Experimento mental: el demonio desafía la 2ª ley |
| 1929 | Szilárd | Medir 1 bit permite extraer trabajo → información es física |
| 1961 | Landauer | Borrar 1 bit cuesta \( kT \ln 2 \) → información tiene costo energético |
| 1982 | Bennett | El demonio no viola la 2ª ley porque su memoria debe borrarse |

---

Este hilo conceptual sentó las bases de la **termodinámica de la información**, un campo activo hoy en día en física, computación cuántica e incluso biología.

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
