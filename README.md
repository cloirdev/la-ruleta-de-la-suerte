# 🎡 La Ruleta de la Suerte

Una recreación interactiva del popular juego de televisión "La Ruleta de la Suerte", desarrollada con React y animaciones modernas.

[![Demo en Vivo](https://img.shields.io/badge/Demo-En%20Vivo-green?style=for-the-badge)](https://cloirdev.github.io/la-ruleta-de-la-suerte/)
[![React](https://img.shields.io/badge/React-19.1-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.1-purple?style=for-the-badge&logo=vite)](https://vitejs.dev/)

## 📋 Descripción

Este proyecto es una versión digital del famoso juego de televisión donde los jugadores giran una ruleta, adivinan letras y resuelven frases misteriosas para ganar puntos. Incluye todas las mecánicas clásicas del juego: gajos especiales, comodines, ronda del bote y emocionante ronda final.

## ✨ Características

### 🎮 Mecánicas de Juego
- **Sistema de 3 jugadores** con turnos alternados
- **8 rondas regulares** + ronda del bote + ronda final
- **Ruleta interactiva** con sistema de carga de potencia
- **Panel de letras animado** que revela las frases progresivamente
- **Sistema de pistas** para ayudar a resolver los paneles

### 🎁 Gajos Especiales
- **Comodín**: Salva tu turno cuando fallas
- **Supercomodín**: Salva tu turno o evita la quiebra
- **Doble Letra**: Adivina una segunda consonante
- **3x100**: Adivina 3 consonantes a 100 puntos cada una
- **Ayuda Final**: Bonus para la ronda final
- **Me Lo Quedo / Se Lo Doy**: Roba o regala puntos y gajos
- **Pierde Turno / Quiebra**: ¡Cuidado con estas casillas!

### 🏆 Ronda Final
- El jugador con más puntos accede a la ronda final
- Sistema de ayudas para elegir letras adicionales
- Temporizador de 20 segundos (+ tiempo extra si tienes ayudas)
- Ruleta de premios especial

### 🎨 Diseño y UX
- Interfaz moderna con gradientes y animaciones suaves
- Animaciones con **GSAP** en la pantalla de inicio
- Transiciones fluidas con **Framer Motion**
- Diseño totalmente **responsive**
- Feedback visual en todas las acciones

## 🛠️ Tecnologías Utilizadas

- **React 19.1** - Framework de interfaz de usuario
- **Vite 7.1** - Build tool y dev server
- **GSAP 3.13** - Animaciones de la landing page
- **Framer Motion 12** - Animaciones de la ruleta
- **Tailwind CSS 4.1** - Utilidades de estilos
- **CSS Modules** - Estilos componetizados
- **React Context API** - Gestión de estado global
- **Custom Hooks** - Lógica de juego reutilizable

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18 o superior
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/cloirdev/la-ruleta-de-la-suerte.git

# Navegar al directorio
cd la-ruleta-de-la-suerte

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción
npm run build        # Crea el build de producción
npm run preview      # Previsualiza el build localmente

# Deploy
npm run deploy       # Despliega a GitHub Pages

# Calidad de código
npm run lint         # Ejecuta ESLint
```

## 🎯 Cómo Jugar

### Inicio del Juego
1. Introduce los nombres de los 3 concursantes
2. Comienza la primera ronda

### Durante el Juego
1. **Gira la ruleta** haciendo clic en ella
2. Carga la potencia del giro (el medidor sube y baja)
3. Suelta para girar
4. Según dónde caiga:
   - **Número**: Adivina una consonante y gana puntos × veces que aparece
   - **Gajo especial**: Sigue las instrucciones específicas
   - **Pierde Turno**: Pasa el turno (puedes salvarlo con comodín)
   - **Quiebra**: Pierdes puntos y gajos (salvable con supercomodín)
5. **Compra vocales** por 50 puntos después de adivinar una consonante
6. **Resuelve el panel** cuando creas saber la respuesta

### Ronda del Bote (Ronda 8)
- Funciona igual que las rondas normales
- Si caes en "BOTE" y resuelves el panel, ¡te llevas todos los puntos acumulados!

### Ronda Final
1. Solo participa el jugador con más puntos
2. Gira la ruleta de premios
3. Elige tus ayudas (si tienes gajos de ayuda final)
4. Selecciona letras adicionales (3 consonantes + 1 vocal base)
5. ¡Tienes 20 segundos para resolver el panel y ganar el premio!

## 📂 Estructura del Proyecto

```
la-ruleta-de-la-suerte/
├── public/              # Assets estáticos
├── src/
│   ├── components/      # Componentes de React
│   │   ├── game/       # Componentes específicos del juego
│   │   ├── LandingPage.jsx
│   │   ├── Wheel.jsx
│   │   ├── PuzzlePanel.jsx
│   │   └── ...
│   ├── context/        # Context API (estado global)
│   ├── data/           # Datos del juego (frases, ruletas)
│   ├── hooks/          # Custom hooks
│   ├── styles/         # Archivos CSS
│   ├── utils/          # Funciones auxiliares
│   ├── constants/      # Constantes del juego
│   ├── App.jsx         # Componente principal
│   └── main.jsx        # Punto de entrada
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Personalización

### Añadir Frases
Edita `src/data/phrases.js` y `src/data/finalPhrases.js`:

```javascript
export const phrases = [
  {
    text: "TU FRASE AQUI",
    hint: "Tu pista aquí"
  },
  // ... más frases
];
```

### Modificar Premios de la Ruleta
Edita `src/data/wheelData.js` para cambiar los premios por ronda.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👤 Autor

**CLope**

- GitHub: [@cloirdev](https://github.com/cloirdev)

## 🙏 Agradecimientos

- Inspirado en el programa de televisión "La Ruleta de la Suerte"
- Iconos y assets de código abierto
- Comunidad de React y Vite

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!

🎮 [Juega ahora](https://cloirdev.github.io/la-ruleta-de-la-suerte/)
