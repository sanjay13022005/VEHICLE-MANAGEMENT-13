const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/academicFeedback', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => console.log(err));

// Define a schema and model
const feedbackSchema = new mongoose.Schema({
  cartypes: String,
  purpose: String,
  membercount: Number,
  provisionalDocument: String,
  facultyGuide: String,
  fromDate: Date,
  returnDate: Date,
  cityName: String,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Create feedback
app.post('/feedback', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).send(feedback);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all feedbacks
app.get('/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).send(feedbacks);
  } catch (err) {
    res.status(400).send(err);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
