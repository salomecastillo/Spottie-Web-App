const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const OpenAI = require('openai');

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// === Endpoint to scan a message ===
app.post('/api/scan', async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ error: 'No message provided.' });
  }

  try {
    const prompt = `You are a scam detector. Analyze the message below and respond in the following format:

Verdict: Scam or Not a Scam  
Explanation: (a short explanation)  

Message:  
"${message}"`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const aiResponse = completion.choices[0].message.content.trim();
    console.log('🧠 AI Raw Response:\n', aiResponse);

    const verdictMatch = aiResponse.match(/Verdict:\s*(.*)/i);
    const explanationMatch = aiResponse.match(/Explanation:\s*([\s\S]*)/i);

    const verdict = verdictMatch ? verdictMatch[1].trim() : 'Unknown';
    const explanation = explanationMatch ? explanationMatch[1].trim() : 'No explanation found.';

    res.json({ verdict, explanation });
  } catch (error) {
    console.error('OpenAI Error:', error.message);
    res.status(500).json({ error: 'Failed to scan message.' });
  }
});

// === Serve React frontend in production ===
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../frontend/spottie-frontend/build');
  app.use(express.static(buildPath));

  // Catch-all route to serve index.html (for React Router)
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
