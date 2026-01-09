# 🎵 Spotify Quiz

![Astro](https://img.shields.io/badge/Astro-Framework-orange)
![Vue](https://img.shields.io/badge/Vue-3-green)
![Node](https://img.shields.io/badge/Node.js-Backend-green)
![TypeScript](https://img.shields.io/badge/TypeScript-Learning-blue)

Aplicación web **full-stack** que genera un quiz musical personalizado a partir de playlists públicas de Spotify. Permite poner a prueba el conocimiento musical del usuario mediante preguntas sobre artistas, canciones, años de lanzamiento y más.

🌐 **Demo en producción**
👉 [https://spotifyquiz.vercel.app](https://spotifyquiz.vercel.app)

---

## 📋 Sobre el proyecto

Este proyecto nace de mi interés por combinar dos cosas que me motivan especialmente: la música y el desarrollo web. La idea es sencilla: el usuario introduce la URL de una playlist pública de Spotify y la aplicación genera automáticamente 10 preguntas aleatorias basadas en las canciones de esa lista.

Es un proyecto personal desarrollado desde cero con dos objetivos principales:

* Aprender y practicar tecnologías que no había utilizado antes (TypeScript, Express, Pinia)
* Construir un proyecto funcional de principio a fin, desde la idea inicial hasta el despliegue en producción

### ¿Qué hace exactamente?

* El usuario introduce la URL de una playlist pública de Spotify
* El backend consulta la Spotify Web API para obtener información de las canciones
* Se generan preguntas aleatorias sobre artistas, duración, año de lanzamiento, etc.
* El usuario responde las 10 preguntas y obtiene una puntuación final
* Los resultados pueden compartirse en redes sociales

---

## 👀 ¿Para quién es este proyecto?

Este proyecto forma parte de mi portfolio personal y está orientado a optar a mi **primer empleo como desarrollador junior**. El objetivo es mostrar mi capacidad para aprender nuevas tecnologías, integrar APIs reales y desarrollar una aplicación completa y funcional.

---

## 🛠️ Tecnologías utilizadas

### Frontend

* **Astro** – Framework principal del proyecto
* **Vue 3** – Componentes interactivos
* **TypeScript** – Primer contacto con tipado estático en un proyecto real
* **Tailwind CSS** – Estilos y diseño responsive
* **Pinia** – Gestión de estado global (primera experiencia)
* **Lucide Icons** – Iconografía

### Backend

* **Node.js + Express** – Primera experiencia creando una API REST en Node.js
* **node-fetch** – Consultas a la Spotify Web API
* **dotenv** – Gestión de variables de entorno
* **CORS** – Configuración de peticiones cruzadas

### Otros

* **Vercel** – Despliegue y hosting
* **Spotify Web API** – Obtención de datos de playlists y canciones

---

## 🏗️ Arquitectura del proyecto

El proyecto está dividido en dos partes independientes:

### Backend (`/backend`)

API REST sencilla que actúa como intermediario entre el frontend y Spotify:

* Recibe la URL de la playlist
* Obtiene un token de acceso usando credenciales de aplicación
* Consulta los datos de la playlist
* Genera preguntas aleatorias basadas en la información obtenida
* Devuelve el quiz al frontend

**Ruta principal:**

* `POST /api/quiz` – Genera un nuevo quiz a partir de una URL de playlist

### Frontend (`/frontend`)

SPA multipágina construida con Astro:

* `/` – Landing page con formulario para introducir la URL de Spotify
* `/quiz` – Interfaz para responder las preguntas
* `/results` – Puntuación final y resultados

**Flujo de datos:**

* El usuario envía la URL desde el formulario
* El frontend hace una petición al backend
* Las preguntas se almacenan en un store global con Pinia
* El usuario responde el quiz navegando entre preguntas
* Al finalizar, se calculan y muestran los resultados

---

## 🎯 Lo que he aprendido

Este proyecto ha sido principalmente una oportunidad de aprendizaje práctico.

### Tecnologías nuevas o en profundización

* **TypeScript**: Primer uso en un proyecto real. Me ha permitido entender mejor el valor del tipado estático, el autocompletado y la detección temprana de errores.
* **Express**: Venía de usar Laravel (PHP) y quería probar una alternativa más ligera dentro del ecosistema JavaScript.
* **Pinia**: Primer contacto con gestión de estado global. He conseguido persistir datos entre páginas usando `sessionStorage`.
* **Arquitectura cliente-servidor**: Separar frontend y backend me ha ayudado a entender mejor la comunicación entre ambas partes.

### Decisiones técnicas

* **Astro**: Elegido por su rendimiento y por permitir combinar contenido estático con componentes interactivos.
* **Vue**: Utilizado únicamente en las partes que requieren interactividad (formularios, quiz, resultados).
* **Despliegue separado**: Frontend y backend desplegados en Vercel, lo que me obligó a aprender sobre CORS y variables de entorno.

---

## 🤖 Uso de IA como herramienta

Durante el desarrollo he utilizado herramientas de IA como apoyo al aprendizaje:

* Generación de estructura inicial del proyecto
* Comprensión de conceptos nuevos (TypeScript, Express, Pinia)
* Resolución de errores técnicos complejos
* Optimización de código repetitivo

La IA ha sido una **herramienta de apoyo**, no un sustituto. He revisado y adaptado el código generado, asegurándome de entender el flujo general y el propósito de cada parte, aunque algunas implementaciones complejas requieren todavía más profundidad por mi parte.

---

## 🚀 Mejoras futuras

El proyecto es funcional, pero tiene margen de mejora:

* Autenticación con Spotify para acceder a playlists privadas
* Nuevos tipos de preguntas (género musical, popularidad, etc.)
* Ranking global de puntuaciones
* Tests unitarios y de integración
* Optimización del bundle del frontend
* Mejor manejo de errores y feedback al usuario
* Mejora de accesibilidad (contraste, navegación por teclado)

---

## 📦 Instalación y ejecución local

### Requisitos previos

* Node.js 18+
* Cuenta de desarrollador en Spotify

### Backend

```bash
cd backend
npm install
```

Crear archivo `.env`:

```env
SPOTIFY_CLIENT_ID=tu_client_id
SPOTIFY_CLIENT_SECRET=tu_client_secret
PORT=3000
```

Ejecutar servidor:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Crear archivo `.env`:

```env
PUBLIC_API_URL=http://localhost:3000
```

Ejecutar servidor:

```bash
npm run dev
```

---

👨‍💻 Autor

Óscar Ródenas
Junior Web Developer (DAW)

🌐 Portfolio: https://portfolio-oscarrodenas.vercel.app/

💼 LinkedIn: https://www.linkedin.com/in/oscar-rodenas/

🐙 GitHub: https://github.com/oscar22rodenas

📧 Email: oscarrodenaslujan@gmail.com

---

## 📝 Licencia

Este proyecto está disponible bajo la licencia MIT.

---

## 🙏 Agradecimientos

* Spotify Web API por facilitar el acceso a datos musicales
* Comunidad de desarrolladores y documentación técnica
* Herramientas de IA que me han ayudado a aprender más rápido

> Nota: Este es un proyecto personal de aprendizaje. Las sugerencias y mejoras son siempre bienvenidas.
