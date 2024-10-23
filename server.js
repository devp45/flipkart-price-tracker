const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const axios = require('axios');
const cheerio = require('cheerio');

app.get('/fetch-product', async (req, res) => {
  const productUrl = req.query.url; // Example URL: 'https://www.flipkart.com/product'

  try {
    const { data } = await axios.get(productUrl);
    const $ = cheerio.load(data);

    // Example selectors, change these based on the product page structure
    const title = $('._35KyD6').text();
    const price = $('._3qQ9m1').text();
    const description = $('._3cpW1u').text();
    const reviews = $('._38sUEc').text();

    res.json({
      title,
      price,
      description,
      reviews,
    });
  } catch (error) {
    res.status(500).send('Error fetching product details');
  }
});
app.use(express.static('public'));

