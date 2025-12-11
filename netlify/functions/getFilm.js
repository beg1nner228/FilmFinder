import fetch from "node-fetch";

export async function handler(event, context) {
  const API_URL = "https://api.example.com/films";
  const API_KEY = process.env.API_KEY;  // <-- токен из Netlify ENV

  const query = event.queryStringParameters.q || "";

  try {
    const response = await fetch(`${API_URL}?search=${query}&api_key=${API_KEY}`);

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error", details: err.message })
    };
  }
}
