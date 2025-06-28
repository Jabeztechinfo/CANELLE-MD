const fetch = require('node-fetch');

// Sleep for given milliseconds
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// Pick random item from an array
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Fetch a file as a Buffer
const fetchBuffer = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch: ' + res.statusText);
    return await res.buffer();
  } catch (e) {
    console.error('❌ fetchBuffer error:', e);
    return null;
  }
};

// Format uptime into hh:mm:ss
const formatUptime = (ms) => {
  const s = Math.floor(ms / 1000) % 60;
  const m = Math.floor(ms / 60000) % 60;
  const h = Math.floor(ms / 3600000);
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':');
};

module.exports = {
  sleep,
  pickRandom,
  fetchBuffer,
  formatUptime,
};
