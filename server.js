//mongodb+srv://ndeb2450:Krishna1728@cluster0.brah6hk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// server.js
const express = require('express');
const mongoose = require('mongoose');
const ExampleModel = require('./models/ExampleModel'); // Import the Example model

const app = express();
const PORT = process.env.PORT || 3000;



mongoose.connect('mongodb+srv://ndeb2450:Krishna1728@cluster0.brah6hk.mongodb.net/')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
  });

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  

//routes  
app.post('/example', async (req, res) => {
  try {
    const example = new ExampleModel(req.body);
    await example.save();
    res.status(201).send(example);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/example', async (req, res) => {
  try {
    const examples = await ExampleModel.find();
    res.send(examples);
  } catch (error) {
    res.status(500).send(error);
  }
});



// Route to filter data by hour
app.get('/example/hour', async (req, res) => {
    try {
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      const examples = await ExampleModel.find({ ts: { $gte: oneHourAgo.toISOString() } });
      res.send(examples);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Route to filter data by day
  app.get('/example/day', async (req, res) => {
    try {
      const now = new Date();
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const examples = await ExampleModel.find({ ts: { $gte: oneDayAgo.toISOString() } });
      res.send(examples);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Route to filter data by week
  app.get('/example/week', async (req, res) => {
    try {
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const examples = await ExampleModel.find({ ts: { $gte: oneWeekAgo.toISOString() } });
      res.send(examples);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Route to filter data by month
  app.get('/example/month', async (req, res) => {
    try {
      const now = new Date();
      const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      const examples = await ExampleModel.find({ ts: { $gte: oneMonthAgo.toISOString() } });
      res.send(examples);
    } catch (error) {
      res.status(500).send(error);
    }
  });