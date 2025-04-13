const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Expanded scam keyword list (can be expanded further)
const scamKeywords = [
  "urgent", "immediate action required", "limited time offer", "act now", "win big",
  "prize", "money", "bank account", "payment", "click here", "verify your account",
  "log in here", "confirm your identity", "secure your account", "password reset",
  "update your information", "exclusive offer", "unsecured", "free", "congratulations",
  "you have been selected", "claim now", "gift card", "wire transfer", "bitcoin"
];

// Regex for detecting suspicious links (especially shorteners)
const suspiciousLinkPattern = /https?:\/\/(?:bit\.ly|tinyurl\.com|t\.co|goo\.gl|ow\.ly|buff\.ly|rb\.gy|rebrand\.ly|shorte\.st|cutt\.ly|shorturl\.at|is\.gd)\/\S+/gi;

// Pattern for suspicious domain extensions
const suspiciousDomainPattern = /https?:\/\/[\w\-\.]+\.(tk|ml|ga|cf|gq|xyz|top|pw|club|info|click|link|email|download|loan|men|mom|win|review|party)(\/\S*)?/gi;

// Red flag phrases that are common in scams
const redFlagPhrases = [
  "your account has been locked", "unauthorized login attempt", "you will be charged",
  "call this number immediately", "we are shutting down your account", "you are under investigation"
];

// Trusted domains (for sender email check)
const trustedDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];

// Personalized greeting check (e.g., "Dear Salome")
const personalizedGreetingPattern = /\bDear\s([A-Za-z]+)\b/i;

// Scan function to detect scam patterns
function scanMessage(message) {
  const lowerMessage = message.toLowerCase();
  let score = 0;

  // Regex match for scam keywords
  const scamKeywordPatterns = [
    /urgent/i, /immediate\s*action\s*required/i, /limited\s*time\s*offer/i, /act\s*now/i, /win\s*big/i,
    /prize/i, /money/i, /bank\s*account/i, /payment/i, /click\s*here/i, /verify\s*your\s*account/i,
    /log\s*in\s*here/i, /confirm\s*your\s*identity/i, /secure\s*your\s*account/i, /password\s*reset/i,
    /update\s*your\s*information/i, /exclusive\s*offer/i, /unsecured/i, /free/i, /congratulations/i,
    /you\s*have\s*been\s*selected/i, /claim\s*now/i, /gift\s*card/i, /wire\s*transfer/i, /bitcoin/i
  ];

  // Keyword match
  for (let pattern of scamKeywordPatterns) {
    if (pattern.test(lowerMessage)) {
      score += 1;
    }
  }

  // Link match (e.g., phishing or shortener links)
  const suspiciousLinks = message.match(suspiciousLinkPattern) || [];
  const suspiciousDomains = message.match(suspiciousDomainPattern) || [];
  score += suspiciousLinks.length * 3;  // Higher score for suspicious links
  score += suspiciousDomains.length * 2; // Suspicious domains

  // Red flag phrase match
  const redFlags = redFlagPhrases.filter(phrase => lowerMessage.includes(phrase));
  score += redFlags.length * 2; // Increase score for red flag phrases

  // Sender email check (if available)
  const senderEmailPattern = /from:\s*([\w\-\.]+@[\w\-\.]+)\s*/i;
  const senderMatch = message.match(senderEmailPattern);
  let senderRiskLevel = "Low Risk";

  if (senderMatch && !trustedDomains.includes(senderMatch[1].split('@')[1])) {
    senderRiskLevel = "High Risk";
    score += 3;  // Increase score for suspicious sender email domain
  }

  // Personalized greeting check
  const personalized = personalizedGreetingPattern.test(message) ? 1 : 0;
  score += (1 - personalized) * 2;  // Add 2 points if not personalized

  // Calculate probability and risk level
  const maxPossible = scamKeywords.length + 5 + 10;  // Adjust for links, sender check, etc.
  const probability = Math.min(score / maxPossible, 1);

  let riskLevel = "Low Risk";
  if (probability >= 0.85) riskLevel = "Very High Risk";
  else if (probability >= 0.75) riskLevel = "High Risk";
  else if (probability >= 0.5) riskLevel = "Medium Risk";
  else if (probability >= 0.25) riskLevel = "Low Risk";

  return {
    probability,
    riskLevel,
    suspiciousLinks,
    suspiciousDomains,
    redFlagPhrases: redFlags,
    senderRisk: senderRiskLevel
  };
}

// API route for scam detection
app.post('/scan', (req, res) => {
  const message = req.body.message;

  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  const result = scanMessage(message);
  res.json(result);
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
