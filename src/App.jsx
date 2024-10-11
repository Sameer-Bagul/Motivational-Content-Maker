import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import QuoteCard from './components/QuoteCard';
import TimerControl from './components/TimerControl';
import quotes from './Quote.json';
import { toPng } from 'html-to-image';

const PEXELS_API_KEY = 'YOUR_PEXELS_API_KEY'; // Replace with your Pexels API key

const App = () => {
  const [currentQuote, setCurrentQuote] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [interval, setIntervalValue] = useState(60); // Default 60 seconds
  const quoteCardRef = useRef();

  const generateContent = useCallback(async () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote.text);

    try {
      const response = await axios.get('https://api.pexels.com/v1/search', {
        params: { query: 'motivational', per_page: 1 },
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      });
      const imageUrl = response.data.photos[0].src.large;
      setImageUrl(imageUrl);
    } catch (error) {
      console.error('Error fetching image:', error);
    }

    downloadCard();
  }, []);

  useEffect(() => {
    generateContent();
  }, [generateContent]);

  useEffect(() => {
    const timerId = setInterval(() => {
      generateContent();
    }, interval * 1000); // Fetch new content based on the selected interval

    return () => clearInterval(timerId); // Cleanup on unmount
  }, [interval, generateContent]);

  const downloadCard = () => {
    if (quoteCardRef.current) {
      toPng(quoteCardRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'quote-card.png';
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => console.error('Error generating image:', err));
    }
  };

  return (
    <div className="app">
      <div ref={quoteCardRef}>
        <QuoteCard quote={currentQuote} imageUrl={imageUrl} />
      </div>
      <button onClick={generateContent}>Generate New Quote</button>
      <button onClick={downloadCard}>Download Now</button>
      <TimerControl interval={interval} setInterval={setIntervalValue} />
    </div>
  );
};

export default App;
