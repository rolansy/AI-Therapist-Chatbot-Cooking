import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.get('/search', async (req, res) => {
    const query = req.query.q;
    const apiKey = '4cf480f490246ce71059178749bda6b7cdb5666c0396399fd8d568987aeac74a'; // Replace with your SerpAPI key
    const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});