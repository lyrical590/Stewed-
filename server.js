const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

const API_KEY = 'AIzaSyD-arluaFfSq6EbDsYCcNC2OwzqNIL6iIE';

app.use(express.json());
app.use(express.static('public'));

app.get('/youtube/:type', async (req, res) => {
  const { type } = req.params;
  const { q } = req.query;
  let url = '';

  switch(type) {
    case 'trending':
      url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=9&regionCode=US&key=${API_KEY}`;
      break;
    case 'search':
      url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=9&q=${encodeURIComponent(q)}&key=${API_KEY}`;
      break;
    case 'live':
      url = `https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&maxResults=9&key=${API_KEY}`;
      break;
    default:
      return res.status(400).json({ error: 'Invalid type' });
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));