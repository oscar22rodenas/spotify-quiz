// services/spotifyService.js
const fetch = require('node-fetch');
const { getToken } = require('../utils/tokenManager');

const FIELDS = 'name,description,tracks.items(added_at,track(name,artists(name),duration_ms,album(release_date)))';

exports.extractPlaylistId = (url) => {
  // Primero validamos que sea una URL de Spotify válida
  const isValidSpotifyUrl = /^https:\/\/open\.spotify\.com\/playlist\/[a-zA-Z0-9]{22}(\?.*)?$/.test(url);
  
  if (!isValidSpotifyUrl) {
    return null;
  }
  
  // Extraemos el ID con la regexp mejorada
  const match = url.match(/playlist\/([a-zA-Z0-9]{22})/);
  return match ? match[1] : null;
};

exports.getPlaylistTracks = async (playlistId) => {
const token = await getToken();
const url = `https://api.spotify.com/v1/playlists/${playlistId}?fields=${FIELDS}`;
const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
console.log('⏱ Spotify responded:', res.status);
if (!res.ok) throw Object.assign(new Error('Playlist no encontrada'), { status: res.status });
const json = await res.json();
return json.tracks.items.map(item => ({
name: item.track.name,
artists: item.track.artists.map(a => a.name),
durationMs: item.track.duration_ms,
releaseDate: item.track.album.release_date,
addedAt: item.added_at
}));
};