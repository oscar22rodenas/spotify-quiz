// backend/app.js
const express = require('express');
const quizRoutes = require('./routes/quiz');
require('dotenv').config();

const app = express();
app.use(express.json());

// Rutas
app.use('/api/quiz', quizRoutes);

// Error handler
app.use((err, req, res, next) => {
console.error(err);
res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));