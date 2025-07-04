// utils/tokenManager.js
// Cache simple en memoria
let token = null;
let expiresAt = 0;
const fetch = require('node-fetch');

exports.getToken = async () => {
const now = Date.now();
if (token && now < expiresAt - 60000) return token;

const resp = await fetch('https://accounts.spotify.com/api/token', {
method: 'POST',
headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
body: `grant_type=client_credentials&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`
});
const data = await resp.json();
token = data.access_token;
expiresAt = now + (data.expires_in * 1000);
return token;
};