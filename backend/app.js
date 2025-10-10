// backend/app.js
const express = require('express');
const cors = require('cors');
const quizRoutes = require('./routes/quiz');
require('dotenv').config();

const app = express();
app.use(express.json());

// Configurar CORS
const allowedOrigins = [
  'http://localhost:4321',
  'https://spotify-quiz-frontend.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// Rutas
app.use('/api/quiz', quizRoutes);

// Error handler
app.use((err, req, res, next) => {
console.error(err);
res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));