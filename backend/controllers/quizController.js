// controllers/quizController.js
const { validateSpotifyUrl } = require('../utils/validators');
const spotifyService = require('../services/spotifyService');
const quizService = require('../services/quizService');


exports.generateQuiz = async (req, res, next) => {
  try {
    const { playlistUrl } = req.body;

    if (!validateSpotifyUrl(playlistUrl)) {
      return res.status(400).json({ error: 'URL de Spotify no válida' });
    }

    const playlistId = spotifyService.extractPlaylistId(playlistUrl);
    
    // Comprobar si es una playlist oficial de Spotify
    if (playlistId && playlistId.startsWith('37i9dQZ')) {
      return res.status(400).json({ 
        error: 'Las playlists oficiales de Spotify no son compatibles actualmente. Por favor, intenta con una playlist creada por un usuario.' 
      });
    }

    // Comprobar si es un enlace a una playlist privada
    if (playlistUrl.includes('?pt=') || playlistUrl.includes('&pt=')) {
      return res.status(400).json({ 
        error: 'Parece que el enlace es de una playlist privada. Por favor, asegúrate de que la playlist sea pública.' 
      });
    }

    const data = await spotifyService.getPlaylistTracks(playlistId);

    const questions = quizService.createQuestions(data, 10);

    return res.json({ questions });
  } catch (err) {
    next(err);
  }
};

