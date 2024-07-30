import React, { useState, useEffect } from "react";
import "./MotivationalQuote.css";
const MotivationalQuote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      const { text, author } = data[randomIndex];
      setQuote(text);
      setAuthor(author || "Unknown");
    } catch (error) {
      console.error("Error fetching quote:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="motivational-quote">
      <div className="quote">{quote}</div>
      <div className="author">- {author}</div>
    </div>
  );
};

export default MotivationalQuote;
