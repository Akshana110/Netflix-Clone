// netlify/functions/tmdb.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const API_KEY = process.env.TMDB_API_KEY;
  const BASE_URL = 'https://api.themoviedb.org/3';
  const { genre } = event.queryStringParameters;

  if (!API_KEY) {
    console.error("Missing TMDB API key");
    return { statusCode: 500, body: JSON.stringify({ error: "Missing TMDB API key" }) };
  }

  try {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre}`);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error("TMDB Fetch Error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
