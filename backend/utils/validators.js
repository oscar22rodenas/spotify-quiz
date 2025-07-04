// utils/validators.js
exports.validateSpotifyUrl = (url) => {
return /^https:\/\/open\.spotify\.com\/playlist\/[a-zA-Z0-9]{22}(\?.*)?$/.test(url)
};