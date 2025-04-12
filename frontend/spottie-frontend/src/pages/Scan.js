import React, { useState } from 'react';
import './Scan.css';

function Scan() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleCheck = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setResult({ error: data.error || 'Something went wrong.' });
      }
    } catch (error) {
      setResult({ error: 'Unable to connect to backend.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scan-container">
      <h1>Scan a Message</h1>
      <p>Paste a suspicious message below and let Spottie check it for you:</p>

      <textarea
        className="scan-textarea"
        placeholder="Paste your email, message, or link here..."
        value={input}
        onChange={handleInputChange}
        rows={10}
      />

      <button className="scan-button" onClick={handleCheck} disabled={loading}>
        {loading ? 'Scanning...' : 'Check for Scams'}
      </button>

      {result && (
        <div className="scan-result">
          {result.error ? (
            <p style={{ color: 'red' }}>{result.error}</p>
          ) : (
            <>
              <p><strong>Risk Level:</strong> {result.riskLevel}</p>
              <p><strong>Scam Probability:</strong> {(result.probability * 100).toFixed(1)}%</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Scan;
