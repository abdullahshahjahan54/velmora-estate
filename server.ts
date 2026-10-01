import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI SDK with server-side API key and User-Agent telemetry
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// System instruction for Velmora Estates AI Assistant
const VELMORA_SYSTEM_INSTRUCTION = `You are the Velmora AI Real Estate Assistant, an elite, professional, and courteous luxury real estate concierge for "Velmora Estates" (Tagline: "Find Your Place. Build Your Future.").
Velmora Estates represents premier luxury homes, contemporary villas, modern apartments, penthouses, commercial real estate, and residential plots across iconic locations including Beverly Hills, Manhattan, Miami Beach, London Mayfair, Aspen, Dubai Marina, and Dera Ismail Khan.

Your duties:
1. Help users discover properties according to their budget, preferred location, property type, and lifestyle desires.
2. Provide answers regarding real estate investments, rental properties, commercial properties, and property valuations.
3. Suggest scheduling a private property viewing or connecting with Velmora's senior property consultants (Eleanor Vance, Julian Sterling, Sophia Al-Mansoor, Marcus Thornton).
4. Maintain a sophisticated, luxury editorial tone: polite, concise, knowledgeable, and helpful.
5. If the user writes in English, Urdu, or any other language, respond fluently in that language.`;

// AI Assistant chat endpoint
app.post('/api/assistant/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required.' });
  }

  // If Gemini API is available, call gemini-3.8-flash
  if (ai) {
    try {
      // Build conversation context
      const formattedHistory = Array.isArray(history)
        ? history.map((item: any) => `${item.role === 'user' ? 'Client' : 'Velmora AI'}: ${item.content}`).join('\n')
        : '';

      const prompt = `${formattedHistory}\nClient: ${message}\nVelmora AI:`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: VELMORA_SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const reply = response.text || 'I would be delighted to assist you with our luxury real estate portfolio. How may I guide your property search today?';
      return res.json({ reply });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      // Let client fallback handle it
      return res.status(500).json({ error: 'Gemini request failed', details: err.message });
    }
  }

  // If no API key configured on server, return 503 so client uses intelligent local knowledge fallback
  return res.status(503).json({ error: 'No GEMINI_API_KEY configured' });
});

// Explicit sitemap.xml endpoint with application/xml header
app.get('/sitemap.xml', (_req, res) => {
  const sitemapPath = path.resolve(__dirname, 'public', 'sitemap.xml');
  res.header('Content-Type', 'application/xml');
  res.sendFile(sitemapPath);
});

// Explicit robots.txt endpoint
app.get('/robots.txt', (_req, res) => {
  const robotsPath = path.resolve(__dirname, 'public', 'robots.txt');
  res.header('Content-Type', 'text/plain');
  res.sendFile(robotsPath);
});

// Explicit Google Search Console verification file endpoint
app.get('/googlec7fa3181f2ab08ba.html', (_req, res) => {
  res.header('Content-Type', 'text/html');
  res.send('google-site-verification: googlec7fa3181f2ab08ba.html\n');
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Velmora Estates full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
