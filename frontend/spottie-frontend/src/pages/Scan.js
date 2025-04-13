import React, { useState } from 'react';

const Scan = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [verdict, setVerdict] = useState('');
  const [explanation, setExplanation] = useState('');

  const handleCheck = async () => {
    setLoading(true);
    setVerdict('');
    setExplanation('');

    try {
      const response = await fetch('http://localhost:3001/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      console.log('🎯 Scan API Response:', data);

      if (response.ok) {
        setVerdict(data.verdict);
        setExplanation(data.explanation);
      } else {
        setVerdict('Error');
        setExplanation(data.error || 'Something went wrong.');
      }
    } catch (err) {
      console.error('❌ Error contacting backend:', err);
      setVerdict('Error');
      setExplanation('Failed to connect to the backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scan-container">
      <h1>Scam Detection</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows="4"
        cols="50"
        placeholder="Paste a suspicious message here"
      />
      <br />
      <button onClick={handleCheck} disabled={loading}>
        {loading ? 'Checking...' : 'Check Message'}
      </button>

      {verdict && (
        <div style={{ marginTop: '20px' }}>
          <h2>Scan Result:</h2>
          {verdict === 'Scam' ? (
            <p style={{ color: 'red' }}>⚠️ This message is a scam!</p>
          ) : (
            <p style={{ color: 'green' }}>✅ This message seems safe.</p>
          )}
          <p><strong>Explanation:</strong> {explanation}</p>
        </div>
      )}
    </div>
  );
};

export default Scan;
