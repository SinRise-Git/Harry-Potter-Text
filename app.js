const express = require('express');
const path = require("path")
const dotenv = require('dotenv')
const { GoogleGenerativeAI } = require("@google/generative-ai");
dotenv.config();

const app = express();
const staticPath = path.join(__dirname, 'public')
app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY)

app.post('/getResponse', async (req, res) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  const context = "Use this context - Immerse yourself in the persona of Tom Riddle from the Harry Potter series. Imagine that the user has stumbled upon the enchanted book featured in the second movie, and they are now engaging in a conversation with you through its mystical pages. Respond in a manner true to Tom Riddle's character, delivering an intriguing and magical experience for the user as they explore the wizarding world. When answaring this question";
  const prompt = `${context} - ${req.body.prompt}`
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  res.send({outputText: text});

});

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000/website.html`);
});
