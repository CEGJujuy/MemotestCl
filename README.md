# Juego de Memoria - MemoTest

Un juego clasico de emparejar cartas desarrollado con JavaScript vanilla y Vite. Encuentra todos los pares en el menor tiempo y con la menor cantidad de intentos posibles.

## Descripcion del Proyecto

Aplicacion web interactiva que implementa el clasico juego de memoria donde el jugador debe voltear cartas y encontrar parejas identicas. El juego cuenta con un sistema de puntuacion basado en intentos realizados y tiempo transcurrido.

### Caracteristicas Principales

- **Interfaz adaptable**: Diseno responsivo que se ajusta a dispositivos moviles, tablets y escritorio
- **Sistema de estadisticas en tiempo real**:
  - Contador de pares encontrados
  - Numero de intentos realizados
  - Temporizador cronometrico
- **Mecanica de juego fluida**: Animaciones suaves al voltear cartas y encontrar pares
- **Reinicio rapido**: Opcion para comenzar una nueva partida en cualquier momento
- **Modal de victoria**: Pantalla final con resumen de estadisticas al completar el juego
- **Iconos visuales**: Emojis coloridos para hacer el juego mas atractivo

### Tecnologias Utilizadas

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript ES6+ (Vanilla)
- Vite (Build tool)

## Instalacion

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd memotest-cl
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar servidor de desarrollo:
```bash
npm run dev
```

4. Construir para produccion:
```bash
npm run build
```

## Como Jugar

1. Al cargar el juego, las 16 cartas se mezclan aleatoriamente
2. Haz clic en una carta para voltearla y revelar el emoji
3. Haz clic en una segunda carta para intentar encontrar su par
4. Si las cartas coinciden, permanecen volteadas y se marcan en verde
5. Si no coinciden, se voltean nuevamente despues de un segundo
6. Continua hasta encontrar todos los 8 pares
7. Al finalizar, podras ver tus estadisticas y jugar nuevamente

## Estructura del Proyecto

```
memotest-cl/
├── index.html          # Estructura HTML principal
├── style.css           # Estilos y animaciones
├── main.js             # Logica del juego
├── package.json        # Dependencias y scripts
└── README.md           # Documentacion
```

## Autor

**Cesar Eduardo Gonzalez**
Analista en Sistemas

- Email: gonzalezeduardo_31@hotmail.com
- Telefono: +54 3884 858-907

## Licencia

Este proyecto es de codigo abierto y esta disponible bajo la licencia MIT.
