// config/spotifyConfig.js
module.exports = {
fields: 'name,description,tracks.items(added_at,track(name,artists(name),duration_ms,album(release_date)))'
};

