import { useState } from 'react';
import { Buffer } from 'buffer';

const Home = () => {



  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...")
    const response = await fetch('api/generate', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
    console.log(JSON.stringify);

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)
    

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

const onUserChangedText = (event) => {
  console.log(event.target.value);
  setUserInput(event.target.value);
};

  return (
    <div 
    className="root"
    >
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Project Vettius 0.1</h1>
          </div>
          <div className="header-subtitle">
            <h2>Give me a title related to Astrology, and I will write you a blog post about it. (Right now, I only communicate as 2nd century Roman Astrologer Vettius Valens,
              Please be patient with me as I am very new!) </h2>
          </div>
        </div>
        <div className="prompt-container">
  <textarea
    placeholder="Jupiter in the Transit, Through the Houses"
    className="prompt-box"
    value={userInput}
    onChange={onUserChangedText}
  />
  <div className="prompt-buttons">
    <a 
    className= {isGenerating ? 'generate-button loading' : 'generate-button'} 
    onClick={callGenerateEndpoint}
    >
      <div className="generate">
        {isGenerating ? <span className="loader"> </span> :
        <p>Generate</p>}
      </div>
    </a>
  </div>
  {/* New code I added here */}
  {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}
</div>
        
      </div>
    </div>
  );
};



export default Home;
