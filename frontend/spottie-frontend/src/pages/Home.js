import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import spottieLogo from '../assets/images/spottie-logo.png';
import '../App.css';


const Home = () =>{
    return (
        <div className="App">

          <header className="App-header"> </header>
    
    {/* WELCOME DIV */}
    <div className='App-welcome'> 
      <div className="welcome-left">
        <p> SPOTTIE: Spot scams before they spot you.</p>
    {/*button */}
        <div className='App-tryNow'>
          <p> Try Spottie Now </p>
        </div>
      </div>
    
      <img src={spottieLogo} alt="Spottie Logo" className="spottie-img" />
    </div>
    
    {/* WHAT IS SPOTTIE */}
          <div className='App-info-div'>
            <div className='App-info-title'> 
              <h2> What is SPOTTIE </h2>
            </div>
    
            <div className='App-info'> 
              <p> Spottie is an intelligent web app that helps users identify and avoid online scams—whether its a shady email, a suspicious link, or a too-good-to-be-true message. Designed with simplicity and accessibility in mind, Spottie brings scam awareness to everyone, especially vulnerable communities.</p>
            </div>
          </div>
    {/* ABOUT SEC */}
          <div className='App-about'>
            <div className='App-how-it-works'>
              <h2>How It Works</h2>
              <p>Spottie is powered by AI trained to spot red flags in emails. Just copy and paste any suspicious message into our checker, and Spottie will instantly analyze the content, sender behavior, and intent. Within seconds, you’ll get a verdict: scam or safe — with a breakdown of why.</p>
            </div>
    
            <div className='App-why-spottie'>
              <h2>Why SPOTTIE</h2>
              <p>Every day, millions fall for phishing scams — even tech-savvy users. Spottie is your digital bodyguard, designed to flag dangerous emails before you click. Whether it's a fake job offer, a phishing link, or an impersonation attempt, Spottie helps you stay a step ahead of scammers.</p>
            </div>
            <div className='App-ai-you-can-trust'>
              <h2>AI You Can Trust</h2>
              <p>Spottie isn’t just smart — it learns from the latest scams in real time. Built on cutting-edge natural language processing, our AI constantly improves to detect new tactics that scammers use to trick people.</p>
            </div>
            <div className='App-instant-results-no-downloads'>
              <h2>Instant Results, No Downloads</h2>
              <p>No extensions. No installations. Just paste your email and hit check. Spottie runs securely in the cloud and gives you results in seconds — no sign-up required.</p>
            </div>
            <div className='App-made-for-everyone'>
              <h2>Made for Everyone</h2>
              <p>Whether you're a student, a working professional, or helping your parents avoid online traps, Spottie is made to be simple, fast, and clear. No tech skills needed — just smart protection.</p>
            </div>
            <div className='App-explainable-results'>
              <h2>Explainable Results</h2>
              <p>Spottie doesn't just say "scam" — it shows you why. From sketchy language to shady links, Spottie highlights the parts of the email that raised red flags, helping you learn how to spot scams on your own.</p>
            </div>
          </div>
        
    
    
    
        </div>
    
      );
    }
    
    export default Home;
    
    