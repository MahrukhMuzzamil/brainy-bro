// index.js

const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const { connectDB } = require("./database");
const TodoModel = require("./models/Todo");
const todoRoutes = require("./routes/todoRoutes");
const NotesTakingRoute = require('./routes/NotesTakingRoute');
const NotesTakingModel = require('./models/NotesTaking'); // Import the NotesTaking model


//!Express instance
const app = express();

//!Middlewares
const corsOptions = {
  origin: ["http://localhost:5174", "http://localhost:5173"],
};
app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/todos", todoRoutes);

app.use('/notestaking', NotesTakingRoute);

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

//!Generate content route
app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.send(text);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to generate content");
  }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Route handler for the root URL
app.get('/', async (req, res) => {
  try {
    // Fetch all notes from the database
    const notes = await NotesTakingModel.find();
    res.send(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});