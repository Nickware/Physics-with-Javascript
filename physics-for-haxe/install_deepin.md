# Entorno de Desarrollo Haxe en Deepin 25 mediante Distrobox (Debian)

Este repositorio documenta el procedimiento para aislar el compilador **Haxe** y su gestor de librerías **Haxelib** dentro de un búnker de rendimiento basado en **Debian (Bookworm)** utilizando **Distrobox**. Esto permite compilar proyectos de manera nativa sin contaminar las librerías del sistema anfitrión Deepin 25.

---

## Arquitectura del Sistema

El compilador reside de forma segura dentro del contenedor, pero sus comandos se "proyectan" hacia el anfitrión mediante enlaces simbólicos automatizados por Distrobox. Las librerías descargadas se almacenan en el almacenamiento físico real (`/home`).

---

## Guía de Instalación Paso a Paso

### 1. Preparación del Contenedor
Si aún no has creado el contenedor de desarrollo basado en Debian, ejecútalo en la terminal de Deepin:

```bash
distrobox create -i debian:bookworm -n haxe-env
```

### 2. Instalación de Haxe dentro del contenedor
Entra al entorno aislado e instala Haxe a través del gestor de paquetes de Debian:

```bash
# Entrar al búnker
distrobox enter haxe-env

# Actualizar repositorios e instalar Haxe
sudo apt update
sudo apt install haxe -y

# Verificar la ruta interna de los binarios
which haxe
which haxelib

# Salir del contenedor
exit
```
### 3. Exportación de Binarios al Anfitrión (Deepin)
Para que el entorno gráfico de Deepin y tus editores de código (como VS Code o VSCodium) reconozcan los comandos de Haxe, ejecuta lo siguiente desde la terminal nativa del anfitrión:
```bash
distrobox-export --bin /usr/bin/haxe --export-path ~/.local/bin
distrobox-export --bin /usr/bin/haxelib --export-path ~/.local/bin
```
### 4. Configuración del Entorno de Usuario (.bashrc)
Asegura el enrutamiento del almacenamiento de paquetes local creando la variable HAXELIB_ROOT. Agrega estas líneas al final de tu archivo ~/.bashrc en el anfitrión:
```bash
# Crear el directorio físico para los paquetes de Haxe
mkdir -p ~/haxelib

# Configurar variables de entorno en Deepin
echo 'export HAXELIB_ROOT=~/haxelib' >> ~/.bashrc
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc

# Recargar la configuración del entorno
source ~/.bashrc
```

### 5. Inicialización de Haxelib
Vincula el gestor de paquetes exportado con la ruta física que acabamos de definir ejecutando directamente en Deepin:
```bash
haxelib setup ~/haxelib
```

## Prueba de Control (Hola Mundo)
Para verificar que el acoplamiento entre el anfitrión y el contenedor es transparente y funcional, crea una estructura de pruebas:

### 1. Crea el archivo de código fuente Main.hx:
```bash
class Main {
    static public function main() {
        trace("¡Hola Mundo desde Haxe en Distrobox!");
    }
}
```
### 2. Crea el script de compilación automatizada build.hxml en la misma ubicación:
```bash
-cp .
-main Main
--interp
```
### 3. Ejecuta la compilación desde la terminal de Deepin:
```bash
haxe build.hxml
```
Salida esperada:
```bash
Main.hx:3: ¡Hola Mundo desde Haxe en Distrobox!
```
