import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';
import './Scan.css';
import spottieLogo from '../assets/images/spottie-logo.png';


const Scan = () => {
 const [input, setInput] = useState('');
 const [loading, setLoading] = useState(false);
 const [verdict, setVerdict] = useState('');
 const [explanation, setExplanation] = useState('');
 const [user, loadingUser] = useAuthState(auth);


 if (loadingUser) return <div>Loading...</div>;
 if (!user) return <Navigate to="/login" />;


 const handleCheck = async () => {
   setLoading(true);
   setVerdict('');
   setExplanation('');
   try {
     const response = await fetch('http://localhost:3001/api/scan', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ message: input }),
     });


     const data = await response.json();
     if (response.ok) {
       setVerdict(data.verdict);
       setExplanation(data.explanation);
     } else {
       setVerdict('Error');
       setExplanation(data.error || 'Something went wrong.');
     }
   } catch (err) {
     setVerdict('Error');
     setExplanation('Failed to connect to the backend.');
   } finally {
     setLoading(false);
   }
 };


 return (
   <>
     <div className="scan-content">
       <div className="scan-box">
         <h1>Scam Detection</h1>
         <textarea
           value={input}
           onChange={(e) => setInput(e.target.value)}
           placeholder="Paste suspicious message here....."
         />
         <button onClick={handleCheck} disabled={loading}>
           {loading ? 'Checking...' : 'CHECK MESSAGE'}
         </button>


         {verdict && (
           <div className="result-box">
             <h2>Scan Result:</h2>
             <p className={verdict === 'Scam' ? 'scam' : 'safe'}>
               {verdict === 'Scam'
                 ? '⚠️ This message is a scam!'
                 : '✅ This message seems safe.'}
             </p>
             <p><strong>Explanation:</strong> {explanation}</p>
           </div>
         )}
       </div>


       <div className="robot-side">
         <div className="speech-bubble">
           Let me help you out!<br />
           Paste the message in the box and then click check message!
         </div>
       <img src={spottieLogo} alt="Spottie Logo" className="spottie-img" />
       </div>
     </div>
   </>
 );
};


export default Scan;
