export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send("Missing 'url' parameter");
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const xmlText = await response.text();

    res.setHeader("Content-Type", "text/xml");
    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.status(200).send(xmlText);
  } catch (error) {
    console.error("Function Error:", error);

    return res.status(500).json({
      error: "Failed to fetch RSS feed",
    });
  }
}
