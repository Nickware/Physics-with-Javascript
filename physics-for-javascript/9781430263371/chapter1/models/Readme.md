

# Mejoras Físicas Sugeridas

1. **Rotación/Spin de la bola** - La bola no rota sobre sí misma
2. **Efecto Magnus** - Sin curvatura por rotación (importante en golf y tenis)
3. **Fricción por rodamiento** - No hay diferencia entre deslizamiento y rodamiento
4. **Resistencia del aire (drag) realista** - Actual es muy simplificado
5. **Colisiones entre múltiples bolas** - Solo rebota con paredes
6. **Deformación elástica variable** - El coeficiente de restitución no varía por velocidad
7. **Velocidad terminal** - La bola cae sin límite de velocidad máxima
8. **Límite superior (techo)** - Solo hay paredes laterales y suelo
9. **Fuerzas externas** - Sin viento ni fuerzas adicionales
10. **Ángulo de impacto en colisiones** - Solo rebotes perpendiculares
11. **Energía cinética visualizada** - No hay representación de energía
12. **Pérdida de energía por deformación** - No hay amortiguamiento no-elástico
13. **Textura/rugosidad de la superficie** - No afecta la fricción del suelo
14. **Movimiento parabólico mejorado** - Física simplificada
15. **Rebote en ángulo** - Solo rebotes verticales/horizontales puros

## Mejoras Físicas Ordenadas por Complejidad (Menor → Mayor)

### **Fase 1: Básico (implementación trivial)**
1. **Límite superior (techo)** - Detectar colisión en y < radio
2. **Velocidad terminal** - Limitar vy máximo durante caída
3. **Energía cinética visualizada** - Mostrar E_c = ½m(vx² + vy²) en pantalla

### **Fase 2: Simple (pocas líneas de código)**
4. **Umbral de reposo mejorado** - Detener rotación si energía < umbral
5. **Textura/rugosidad de superficie** - Variar groundFriction por material
6. **Pérdida de energía por deformación** - Amortiguamiento adicional en cada rebote

### **Fase 3: Medio (geometría y trigonometría)**
7. **Ángulo de impacto en colisiones** - Calcular ángulo de rebote realista
8. **Rotación/Spin de la bola** - Agregar velocidad angular (ω)
9. **Fricción por rodamiento** - Diferenciar vx entre deslizamiento y rodamiento

### **Fase 4: Medio-Alto (ecuaciones dinámicas)**
10. **Deformación elástica variable** - Variar restitución según velocidad de impacto
11. **Resistencia del aire (drag) realista** - Implementar F_drag = ½ρ A C_d v²
12. **Relación rotación-velocidad** - Acoplar ω con vx (rodadura sin deslizamiento)

### **Fase 5: Complejo (sistemas integrados)**
13. **Efecto Magnus** - Fuerza perpendicular por rotación + velocidad
14. **Fuerzas externas** - Sistema modular de viento y fuerzas parametrizables
15. **Colisiones entre múltiples bolas** - Detector de colisiones O(n²) + conservación momentum
