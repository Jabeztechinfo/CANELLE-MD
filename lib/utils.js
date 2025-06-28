const fetch = require('node-fetch');

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const fetchBuffer = async (url) => {
  const res = await fetch(url);
  const buf = await res.buffer();
  return buf;
};

module.exports = {
  sleep,
  pickRandom,
  fetchBuffer,
};
