const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors()); // 👈 add this before routes

const app = express();
const port = 5000;

app.use(bodyParser.json());

// List of scam-related keywords
const scamKeywords = [
  "urgent", "immediate action required", "limited time offer", "act now", "win big",
  "prize", "money", "bank account", "payment", "click here", "verify your account",
  "log in here", "confirm your identity", "secure your account", "password reset",
  "update your information", "exclusive offer", "unsecured"
];

// Function to calculate scam probability and flag the message
function scanMessage(message) {
  message = message.toLowerCase(); // Case-insensitive check
  let score = 0;

  // Check if any scam-related keyword is in the message
  for (let keyword of scamKeywords) {
    if (message.includes(keyword)) {
      score++;
    }
  }

  // Calculate probability and assign risk level
  const probability = Math.min(score / scamKeywords.length, 1); // Normalized to 0-1
  let riskLevel = "Low Risk";

  if (probability >= 0.5) {
    riskLevel = "Medium Risk";
  }
  if (probability >= 0.75) {
    riskLevel = "High Risk";
  }

  return { probability, riskLevel };
}

// POST route for scanning messages
app.post('/scan', (req, res) => {
  const message = req.body.message; // Get message from the request body

  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  const result = scanMessage(message); // Scan the message
  res.json(result); // Send back the result with probability and risk level
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
