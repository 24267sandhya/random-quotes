// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import QuoteCard from "./components/QuoteCard";
import "./App.css";

const App = () => {
  const [quote, setQuote] = useState("");
  const [savedQuotes, setSavedQuotes] = useState([]);

  const fetchQuote = async () => {
    try {
      const response = await axios.get(
        "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
      );
      setQuote(response.data[0]);
    } catch (error) {
      console.error("Error fetching the quote", error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleSaveQuote = (quote) => {
    setSavedQuotes((prevQuotes) => [...prevQuotes, quote]);
  };

  return (
    <div className="app">
      <h1>Ron Swanson Quotes</h1>
      <QuoteCard quote={quote} onSave={handleSaveQuote} />
      <button onClick={fetchQuote} className="fetch-button">
        Get New Quote
      </button>
      <h2>Saved Quotes</h2>
      <div className="saved-quotes">
        {savedQuotes.map((q, index) => (
          <QuoteCard key={index} quote={q} onSave={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default App;
