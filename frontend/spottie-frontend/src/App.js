import './App.css';
import Navbar from './components/Navbar';
import spottieLogo from './assets/images/spottie-logo.png';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <Navbar />
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
          <p>Spottie scans content using AI to identify potential scams and explains why something might be suspicious.</p>
        </div>

        <div className='App-why-spottie'>
          <h2>Why SPOTTIE</h2>
          <p>Many people cant tell whats real and whats not. Spottie simplifies scam detection for everyone.</p>
        </div>
      </div>

      <Footer />

    </div>

  );
}

export default App;

