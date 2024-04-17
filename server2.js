const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Route to create a new document (not needed for file-based data)
app.post('/example', (req, res) => {
  res.status(400).send("Cannot create new documents with file-based data");
});

// Route to get all documents
app.get('/example', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json')));
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to filter data by hour
app.get('/example/hour', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json')));
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const filteredData = data.filter(item => new Date(item.timestamp) >= oneHourAgo);
    res.send(filteredData);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to filter data by day
app.get('/example/day', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json')));
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const filteredData = data.filter(item => new Date(item.timestamp) >= oneDayAgo);
    res.send(filteredData);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to filter data by week
app.get('/example/week', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json')));
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const filteredData = data.filter(item => new Date(item.timestamp) >= oneWeekAgo);
    res.send(filteredData);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to filter data by month
app.get('/example/month', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json')));
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const filteredData = data.filter(item => new Date(item.timestamp) >= oneMonthAgo);
    res.send(filteredData);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
