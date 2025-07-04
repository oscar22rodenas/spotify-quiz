// services/quizService.js
const { v4: uuidv4 } = require('uuid');

exports.createQuestions = (tracks, count = 10) => {
  const sample = tracks.sort(() => 0.5 - Math.random()).slice(0, count);

  return sample.map(track => {
    const types = ['artist', 'duration', 'release_year', 'added_date'];
    const type = types[Math.floor(Math.random() * types.length)];

    let question;
    let correct;
    let pool;

    switch (type) {
      case 'artist':
        question = `¿Quién es el artista de la canción "${track.name}"?`;
        correct = track.artists[0]; // solo primer artista como string
        pool = tracks.map(t => t.artists[0]);
        break;

      case 'duration':
        question = `¿Cuál es la duración aproximada de "${track.name}"?`;
        correct = formatDuration(track.durationMs);
        pool = tracks.map(t => formatDuration(t.durationMs));
        break;

      case 'release_year':
        question = `¿En qué año se lanzó la canción de "${track.name}"?`;
        correct = track.releaseDate.slice(0, 4);
        pool = tracks.map(t => t.releaseDate.slice(0, 4));
        break;

      case 'added_date':
        question = `¿En qué fecha agregaste "${track.name}" a tu playlist?`;
        correct = track.addedAt.split('T')[0];
        // Pool con fechas únicas distintas de la correcta
      pool = Array.from(new Set(
        tracks
          .map(t => t.addedAt?.split('T')[0])
          .filter(date => date && date !== correct)
      ));
      // Si hay menos de 3 distractores, generamos fechas cercanas
      if (pool.length < 3) {
        pool = pool.concat(generateNearbyDates(correct, 3 - pool.length));
      }
        break;
    }
    console.log(`▷ Generando pregunta: ${question}`);
    console.log(`   - Tipo: ${type}`);
    console.log(`   - Respuesta correcta: ${correct}`);
    console.log(`   - Pool de respuestas: ${pool.join(', ')}`);
    // ⚠️ Generamos opciones y localizamos la correcta
    const options = quizOptions(correct, pool);
    const correctAnswerIndex = options.indexOf(correct);
    console.log(`   - Opciones: ${options.join(', ')}`);
    console.log(`   - Respuesta correcta index: ${correctAnswerIndex}`);
    

    return {
      id: uuidv4(),
      type,
      question,
      options,
      correctAnswer: correctAnswerIndex
    };
  });
};

function quizOptions(correct, pool) {
  const set = new Set([correct]);
  while (set.size < 4) {
    const pick = pool[Math.floor(Math.random() * pool.length)];
    set.add(pick);
  }
  const arr = Array.from(set);
  return arr.sort(() => 0.5 - Math.random());
}

/**
 * Genera fechas plausibles alrededor de una fecha base (±30 días).
 */
function generateNearbyDates(baseDateStr, needed) {
  const base = new Date(baseDateStr);
  const dates = new Set();
  while (dates.size < needed) {
    const offset = (Math.floor(Math.random() * 61) - 30) * 24 * 3600 * 1000;
    const d = new Date(base.getTime() + offset);
    const iso = d.toISOString().split('T')[0];
    if (iso !== baseDateStr) dates.add(iso);
  }
  return Array.from(dates);
}


function formatDuration(ms) {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}
