import React, { useState } from 'react';
import './Home.css';
import 'boxicons';
import StockForm from './stockform';
import StockChart from './stockchart';
import { fetchStockData } from '../lib/api';
import qrImg from "./assest/qr.png"

function Home() {
  const [stockData, setStockData] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [symbol, setSymbol] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showQrModal, setShowQrModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
    setShowQrModal(true);
  };

  const handleStockSubmit = async (stockSymbol) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchStockData(stockSymbol);
      setStockData(data);
      setSymbol(stockSymbol);
      
      // Simple prediction algorithm (last price + random small change)
      const lastPrice = data[0].price;
      const randomChange = (Math.random() - 0.5) * lastPrice * 0.05; // +/- 5% change
      const predictedPrice = lastPrice + randomChange;
      setPrediction(predictedPrice);
    } catch (err) {
      setError("Failed to fetch stock data. Please try again.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <main>
      <section id="home" className="hero">
        <h1>Live Stock Prediction</h1>
        <p>°°Stock market prediction is to determine the future value of a company stock on an exchange°°</p>
        <a href="#prediction-section"><button className="cta-button">Start Predict</button></a>
      </section>

      {/* Add Stock Prediction Section */}
      <section id="prediction-section" className="prediction-section">
        <h2>Stock Prediction Tool</h2>
        <div className="prediction-container">
          <div className="form-container">
            <h3>Enter Stock Symbol</h3>
            <StockForm onSubmit={handleStockSubmit} isLoading={loading} />
            {error && <div className="error-message">{error}</div>}
          </div>
          <div className="chart-container">
            <h3>{symbol ? `${symbol} Stock Chart` : 'Stock Chart'}</h3>
            <StockChart data={stockData} prediction={prediction} />
            {prediction && (
              <div className="prediction-result">
                <h4>Prediction Result</h4>
                <p>Predicted next price for {symbol}: ${prediction.toFixed(2)}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="how" className="how-it-works">
        {/* Existing How It Works section */}
        <h2>How It Works</h2>
        <p>Follow these simple steps to ensure your stock predict:</p>
        <ol>
          <li>
            <h3>Real time data</h3>
            <p>Real-time data refers to information that is made available for use as soon as it is generated.</p>
          </li>
          <li>
            <h3>Historical Data analytics</h3>
            <p>Historical data analytics analyzes past data to identify patterns, trends, insights for better decision-making and forecasting, optimizing strategic planning across industries.</p>
          </li>
          <li>
            <h3>Predictive Models</h3>
            <p>Predicting models used are LSTM (Long Short-Term Memory) is a type of recurrent neural network (RNN) architecture designed to handle long-range dependencies in sequential data</p>
          </li>
          <li>
            <h3>Personalized Recommendations</h3>
            <p>With a vast array of investment options available, it can be challenging to make informed decisions. This is where a personalized investment recommendation system can be invaluable.</p>
          </li>
        </ol>
      </section>

      {/* Rest of the existing sections */}
      <section className="cta-section" id="cta-sec">
        <div className="background">
          <div className="blue"></div>
        </div>
        <div className="cta-content">
          <h2>Ready to Take Control of Your Investments?</h2>
          <p>Sign up today and start making data-driven decisions with Stockify.</p>
          <div className="cta-buttons">
            <button className="cta-button primary">Get Started</button>
            <button className="cta-button secondary">Learn More</button>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <div className="feature-card">
          <i className='bx bx-time-five feature-icon'></i>
          <h3>Basic</h3>
          <p className="price">$10/month</p>
          <ul>
            <li>Real-Time Prediction</li>
            <li>Basic Stock Insight</li>
            <li>1 portfolio</li>
          </ul>
          <button className="cta-button" onClick={() => handlePlanSelection('basic')}>Choose Basic</button>
        </div>
        
        <div className="feature-card">
          <i className='bx bx-history feature-icon'></i>
          <h3>Pro</h3>
          <p className="price">$30/month</p>
          <ul>
            <li>All Basic Features</li>
            <li>Advanced Analytics</li>
            <li>Up to 5 Portfolios</li>
            <li>Email Alerts</li>
          </ul>
          <button className="cta-button" onClick={() => handlePlanSelection('pro')}>Choose Pro</button>
        </div>
        
        <div className="feature-card">
          <i className='bx bx-bell feature-icon'></i>
          <h3>Premium</h3>
          <p className="price">$50/month</p>
          <ul>
            <li>All Pro Features</li>
            <li>Customizable Dashboard</li>
            <li>Unlimited Portfolios</li>
            <li>Priority support</li>
          </ul>
          <button className="cta-button" onClick={() => handlePlanSelection('premium')}>Choose Premium</button>
        </div>
      </section>
      {showQrModal && (
        <div className="qr-modal">
          <div className="qr-modal-content">
            <span className="close-button" onClick={() => setShowQrModal(false)}>&times;</span>
            <h3>Scan to Pay for {selectedPlan} Plan</h3>
            <img src={qrImg} alt="QR Code for payment" className="qr-image" />
            <p>Scan this QR code to complete your payment for the {selectedPlan} plan.</p>
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;