import React from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import './GeminiApp.css'; // Import your CSS file

const makeRequestAPI = async (prompt) => {
  const res = await axios.post('http://localhost:8080/generate', { prompt });
  return res.data;
};

function GeminiApp() {
  const [prompt, setPrompt] = React.useState('');
  const mutation = useMutation({
    mutationFn: makeRequestAPI,
    mutationKey: ['gemini-ai-request'],
  });

  const submitHandler = (e) => {
    e.preventDefault();
    mutation.mutate(prompt);
  };

  return (
    <div className="container">
      <h1 className="title">Gemini Chatbot</h1>
      <form className="form" onSubmit={submitHandler}>
        <label className="label" htmlFor="prompt">Enter your prompt:</label>
        <input
          className="input"
          type="text"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button className="button" type="submit">Generate Content</button>
      </form>
      <div className="result">
        {mutation.isPending && <p>Generating your content...</p>}
        {mutation.isError && <p>Error: {mutation.error.message}</p>}
        {mutation.isSuccess && <p>Generated content: {mutation.data}</p>}
      </div>
    </div>
  );
}

export default GeminiApp;
