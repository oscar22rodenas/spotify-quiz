// controllers/quizController.js
const { validateSpotifyUrl } = require('../utils/validators');
const spotifyService = require('../services/spotifyService');
const quizService = require('../services/quizService');


exports.generateQuiz = async (req, res, next) => {
  try {
    const { playlistUrl } = req.body;
    console.log('▶️ generateQuiz START', playlistUrl);

    if (!validateSpotifyUrl(playlistUrl)) {
      return res.status(400).json({ error: 'URL de Spotify no válida' });
    }

    const playlistId = spotifyService.extractPlaylistId(playlistUrl);
    console.log('▷ playlistId:', playlistId);

    console.log('▷ Soliciting tracks from Spotify…');
    const data = await spotifyService.getPlaylistTracks(playlistId);
    console.log(`✅ Retrieved ${data.length} tracks`);

    console.log('▷ Generating questions…');
    const questions = quizService.createQuestions(data, 10);
    console.log(`✅ Generated ${questions.length} questions`);

    return res.json({ questions });
  } catch (err) {
    next(err);
  }
};

