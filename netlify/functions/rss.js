// netlify/functions/rss.js

export const handler = async (event) => {
  // Grab the podcast feed URL from your React app's request
  const targetUrl = event.queryStringParameters.url;

  if (!targetUrl) {
    return { statusCode: 400, body: "Missing 'url' parameter" };
  }

  try {
    // Fetch the XML from the podcast host (e.g., Simplecast, Megaphone)
    const response = await fetch(targetUrl, {
      headers: {
        // Pretend to be a browser so podcast hosts don't block the request
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    
    const xmlText = await response.text();

    // Send the clean XML back to your React app
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/xml',
        'Access-Control-Allow-Origin': '*', // This solves the CORS issue!
      },
      body: xmlText,
    };
  } catch (error) {
    console.error('Function Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch RSS feed' }),
    };
  }
};
