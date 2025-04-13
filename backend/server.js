const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { OpenAI } = require('openai'); // Import OpenAI directly

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// === OpenAI Setup ===
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// === Scan Endpoint ===
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
    const verdict = aiResponse.match(/Verdict:\s*(.*)/i)?.[1]?.trim() || 'Unknown';
    const explanation = aiResponse.match(/Explanation:\s*([\s\S]*)/i)?.[1]?.trim() || 'No explanation found.';

    res.json({ verdict, explanation });
  } catch (err) {
    console.error('OpenAI error:', err);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// === Production Static Serving ===
if (process.env.NODE_ENV === 'production') {
  const clientPath = path.join(__dirname, '../frontend/spottie-frontend/build');
  app.use(express.static(clientPath));

  // ✅ Safe catch-all route for serving React frontend
  app.get('*', function (req, res) {
    res.sendFile(path.join(clientPath, 'index.html'));
  });
}

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Listen on the defined PORT
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
