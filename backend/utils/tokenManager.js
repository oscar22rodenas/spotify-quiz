// utils/tokenManager.js
// Cache simple en memoria con bloqueo para prevenir race conditions.
let token = null;
let expiresAt = 0;
let tokenPromise = null; // Variable para almacenar la promesa de la petición en curso.
const fetch = require('node-fetch');

exports.getToken = async () => {
  const now = Date.now();
  // Si el token es válido, lo retornamos inmediatamente.
  if (token && now < expiresAt - 60000) {
    return token;
  }

  // Si hay una petición de token en curso, no iniciamos una nueva.
  // En su lugar, esperamos a que la petición existente termine y retornamos su resultado.
  if (tokenPromise) {
    return tokenPromise;
  }

  // Si no hay token válido ni petición en curso, iniciamos una nueva.
  // Guardamos la promesa en nuestra variable de bloqueo.
  tokenPromise = fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=client_credentials&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`
  }).then(async (resp) => {
    if (!resp.ok) {
      // Si la respuesta no es OK, lanzamos un error.
      const errorBody = await resp.json().catch(() => ({ message: 'Failed to get new token' }));
      throw new Error(errorBody.error_description || 'Spotify token request failed');
    }
    const data = await resp.json();
    token = data.access_token;
    expiresAt = Date.now() + (data.expires_in * 1000);
    return token;
  }).finally(() => {
    // Ya sea que la promesa se resuelva o se rechace, limpiamos la variable de bloqueo
    // para que la siguiente petición pueda iniciar un nuevo ciclo si es necesario.
    tokenPromise = null;
  });

  return tokenPromise;
};