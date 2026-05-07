import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
   {
  name: 'local-rss-proxy',
  configureServer(server) {
    server.middlewares.use('/api/rss', async (req, res, next) => {
      
      // 1. THE TRICK: Always set CORS headers FIRST. 
      // Now, if it crashes, the browser will show the real error, not a fake CORS error.
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      
      if (req.method === 'OPTIONS') {
        res.end();
        return;
      }

      const urlParam = new URL(String(req?.url), `http://${req.headers.host}`).searchParams.get('url');
      if (!urlParam) return next();

      try {
        // 2. Fetch with heavy spoofing and redirect following
        const response = await fetch(urlParam, {
          method: 'GET',
          redirect: 'follow', // Critical for podcast feeds that moved to new hosts
          headers: { 
            // Spoof a modern Mac/Chrome browser to bypass Cloudflare/Host blocks
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            // Tell the server we specifically want XML
            'Accept': 'application/rss+xml, application/rdf+xml;q=0.8, application/xml;q=0.6, text/xml;q=0.4, */*;q=0.1'
          }
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const xml = await response.text();

        res.setHeader('Content-Type', 'text/xml');
        res.end(xml);
        
      } catch (error: any) {
        console.error('Proxy Error for URL:', urlParam, '->', error.message);
        res.statusCode = 500;
        // Now this error will actually show up in your frontend console!
        res.end(`Proxy failed: ${error.message}`); 
      }
    });
  }
} ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
 server: {
    proxy: {
      // Your existing Top Charts proxy
      '/apple-api': {
        target: 'https://rss.marketingtools.apple.com',
        changeOrigin: true, 
        rewrite: (path) => path.replace(/^\/apple-api/, ''), 
      },
      // 👇 ADD THIS NEW PROXY FOR ITUNES LOOKUP
      '/itunes-api': {
        target: 'https://itunes.apple.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/itunes-api/, ''),
      },
    },
  },})
