const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/news', async (req, res) => {
  const { q } = req.query;
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        apiKey: process.env.NEWS_API_KEY,
        q,
        pageSize: 5,
        language: 'en'
      },
    });
    res.render('results', { articles: response.data.articles });
  } catch (err) {
    res.status(500).send('Error fetching news');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
