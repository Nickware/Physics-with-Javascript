# Haze

Es un lenguaje de programación de alto nivel, fuertemente tipado y multiplataforma que se destaca por su capacidad de compilar a múltiples lenguajes objetivo. 
Fue creado por Nicolas Cannasse en 2005 y desde entonces ha ganado popularidad, especialmente en el desarrollo de juegos y aplicaciones web.

---

### Características principales de Haxe

1. **Multiplataforma (Cross-platform)**
   - Haxe puede compilar a varios lenguajes destino:
     - JavaScript
     - Python
     - PHP
     - C++
     - Java
     - C#
     - Flash/ActionScript (obsoleto, pero aún soportado)
     - Neko (una máquina virtual ligera, también creada por Cannasse)
   - Esto significa que puede escribir código una vez y ejecutarlo en múltiples plataformas.

2. **Tipado estático con inferencia de tipos**
   - Haxe tiene un sistema de tipos estático, lo que ayuda a detectar errores en tiempo de compilación.
   - Soporta **inferencia de tipos**, por lo que no necesita declarar tipos explícitamente en muchos casos.

3. **Sintaxis familiar**
   - La sintaxis es similar a ActionScript, JavaScript o Java, lo que la hace fácil de aprender para desarrolladores con experiencia en lenguajes C-like.

4. **Macros y metaprogramación**
   - Una de las características más potentes de Haxe son las **macros**, que permiten ejecutar código en tiempo de compilación.
   - Esto permite generar código, hacer validaciones, optimizaciones o incluso crear DSLs (lenguajes específicos de dominio).

5. **Haxe Standard Library**
   - Viene con una biblioteca estándar bien diseñada que funciona en todos los targets.
   - Incluye manejo de colecciones, cadenas, archivos, red, etc.

6. **Open Source**
   - Haxe es completamente gratuito y de código abierto, con una comunidad activa.

---

### ¿Para qué se usa Haxe?

1. **Desarrollo de juegos**
   - Es muy popular gracias a **OpenFL** y **Kha**, frameworks que permiten crear juegos 2D/3D multiplataforma.
   - **OpenFL** imita la API de Flash, lo que facilita la migración de proyectos Flash a plataformas modernas.
   - **Flixel**, **Stencyl** y **Heaps** son motores de juego basados en Haxe.

2. **Aplicaciones web**
   - Se puede compilar Haxe a JavaScript para aplicaciones frontend.
   - Frameworks como **hxWidgets** o integración con React (vía **hxgenjs**) permiten el desarrollo web moderno.

3. **Servidores y aplicaciones de backend**
   - Compilación a PHP, Python, C#, Java o Node.js permite usar Haxe en el backend.

4. **Aplicaciones móviles y de escritorio**
   - Con OpenFL o Kha, puede compilar para iOS, Android, Windows, macOS, Linux, etc.

---

### Ejemplo de código en Haxe

```haxe
class Main {
    static function main() {
        var nombre = "Haxe";
        trace("¡Hola, $nombre! Compila a múltiples plataformas.");
    }
}
```

Este código se puede compilar a JavaScript, Python, C++, etc., y funcionará en todos ellos.

---

### Herramientas y ecosistema

- **Haxe Compiler**: El compilador principal (`haxe`).
- **Haxelib**: El gestor de paquetes oficial de Haxe, similar a npm o pip.
- **Visual Studio Code + Haxe Extension**: Excelente soporte para desarrollo.
- **Lime**: Herramienta de bajo nivel que maneja compilación y recursos.
- **OpenFL**: Framework de alto nivel para desarrollo de juegos y apps (similar a Flash).
- **Heaps.io**: Motor de juegos moderno y de alto rendimiento.

---

### Ventajas

- Código reutilizable en múltiples plataformas.
- Alto rendimiento (especialmente cuando compila a C++ o JavaScript optimizado).
- Gran capacidad de metaprogramación.
- Comunidad dedicada, especialmente en el ámbito de juegos.

### Desventajas

- Menos popular que otros lenguajes (menos recursos, menos desarrolladores).
- Curva de aprendizaje si no se está familiarizado con macros o metaprogramación.
- Algunos targets están más maduros que otros (por ejemplo, C++ y JS están muy bien soportados, otros menos).

---

### Conclusión

Haxe es una opción poderosa si buscas escribir código una vez y desplegarlo en múltiples plataformas, especialmente en el desarrollo de juegos o aplicaciones que requieran alta portabilidad. Aunque no es tan mainstream como JavaScript o Python, ofrece un nivel de flexibilidad y control que pocos lenguajes pueden igualar.

# Instalar Haxe paso a paso en Linux

Paso a paso cómo instalar, configurar y ejecutar Haxe en Ubuntu o Debian, junto con OpenFL para poder desarrollar aplicaciones y juegos (como el ejemplo de la pelota que rebota) y compilarlos para múltiples plataformas (HTML5, Linux, etc.).

---

## 1. Instalar Haxe

Haxe se puede instalar desde los repositorios oficiales o desde el repositorio más actualizado de Haxe.

### Opción recomendada: Usar el repositorio oficial de Haxe (más actualizado)

```bash
# 1. Agregar la llave GPG
sudo apt-get update
sudo apt-get install -y curl
curl https://haxe.org/download/key.asc | gpg --dearmor | sudo tee /usr/share/keyrings/haxe.gpg > /dev/null

# 2. Agregar el repositorio de Haxe
echo "deb [signed-by=/usr/share/keyrings/haxe.gpg] https://haxe.org/website-content/downloads/latest/linux debian main" | sudo tee /etc/apt/sources.list.d/haxe.list

# 3. Actualizar e instalar Haxe y Neko (opcional)
sudo apt-get update
sudo apt-get install -y haxe
```

> Esto instala **Haxe** y también `haxelib` (el gestor de librerías).

---

## 2. Crear carpeta para haxelib (bibliotecas locales)

```bash
sudo mkdir -p /usr/lib/haxe/lib
sudo chown -R $USER:$USER /usr/lib/haxe
```

O si prefiere usar una carpeta personal:

```bash
mkdir ~/haxelib
export HAXELIB_ROOT=~/haxelib
echo 'export HAXELIB_ROOT=~/haxelib' >> ~/.bashrc
```

> `haxelib` usará esta carpeta para instalar librerías como OpenFL.

---

## 3. Instalar OpenFL y Lime (para gráficos y multimedia)

OpenFL es el equivalente moderno de Flash en Haxe. Lime es su capa inferior.

```bash
haxelib install openfl
haxelib install lime
```

Luego, instalar las herramientas globales:

```bash
haxelib run openfl setup
haxelib run lime setup
```

> Esto puede pedirte confirmar rutas, solo presiona Enter para aceptar valores predeterminados.

---

## 4. Configurar acceso a lime y openfl desde terminal

Para poder usar `openfl` y `lime` directamente en la terminal, crear alias o enlázalos:

```bash
haxelib run openfl setup -install
haxelib run lime setup -install
```

O agregar al PATH:

```bash
echo 'export PATH="$PATH:$HOME/.haxelib/bin"' >> ~/.bashrc
source ~/.bashrc
```

> Ahora podrá usar `openfl` y `lime` como comandos globales.

---

## 5. Probar la instalación

Crear un pequeño programa Haxe:

### `Hello.hx`
```haxe
class Hello {
    static function main() {
        trace("¡Hola desde Haxe!");
    }
}
```

Compilar y ejecutar:

```bash
haxe -main Hello -js hello.js
node hello.js
```

> Deberá ver: `Hello.hx:3: ¡Hola desde Haxe!`

---

## 6. Crear un proyecto OpenFL (como el ejemplo de la pelota)

### 6.1. Crear proyecto

```bash
openfl create project BouncingBall
cd BouncingBall
```

### 6.2. Reemplazar `Source/Main.hx` con el código

Editar `Source/Main.hx` y pega el código del ejemplo de **BouncingBall** que se compartió antes.

> Asegurarse de tener también `Ball.hx` en la misma carpeta `Source/`.

---

## 7. Compilar y ejecutar

### 🔹 A HTML5 (navegador)

```bash
openfl build html5
openfl run html5
```

Abrir navegador en `bin/html5/index.html`.

> Puede usar `openfl test html5` para abrirlo automáticamente.

### 🔹 A Linux (nativo)

```bash
openfl build linux
openfl run linux
```

> Necesita tener compiladores C++ y dependencias gráficas. Si falla:

```bash
sudo apt-get install -y build-essential libgl1-mesa-dev libx11-dev libxrandr-dev libxinerama-dev libxcursor-dev libxi-dev libopenal-dev libudev-dev
```

Luego, vuelva a intentar `openfl run linux`.

---

## 8. (Opcional) Instalar Visual Studio Code con soporte Haxe

Para una mejor experiencia de desarrollo:

```bash
sudo snap install --classic code
```

Luego abrir VS Code e instalar las extensiones:
- **Haxe** (por Nicolas Cannasse)
- **OpenFL** (opcional)
- **CodeLLDB** (si depuras)

---

## Resumen de comandos útiles

| Comando | Descripción |
|--------|-------------|
| `haxelib list` | Muestra librerías instaladas |
| `haxelib install openfl` | Instalar OpenFL |
| `openfl create project Nombre` | Crea nuevo proyecto |
| `openfl build html5` | Compilar a navegador |
| `openfl run linux` | Compilar y ejecutar en Linux |
| `openfl test windows` | Para Windows (necesitas Wine o máquina cruzada) |

---

## Solución de problemas comunes

### "Command not found: openfl"
```bash
haxelib run openfl setup
source ~/.bashrc
```

### Error al compilar a Linux
Instalar las dependencias gráficas (ver paso 7).

### Problemas con rutas
Ejecutar:
```bash
haxelib run lime setup
haxelib run openfl setup
```

---

## En resumen

Ahora se tiene:
- Haxe instalado
- OpenFL y Lime listos
- Capacidad de crear juegos 2D
- Soporte multiplataforma (HTML5, Linux, etc.)

Puede empezar a desarrollar juegos como si estuviera desarrollando en Flash, pero moderno y sin plugins.
