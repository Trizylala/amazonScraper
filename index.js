const express = require('express');
const request =  require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

//const apiKey = '9107dbff2d5fe4e74dd9849a87f8f4c6';


//const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;



const generateScraperUrl = (api_key) => `http://api.scraperapi.com?api_key=${api_key}&autoparse=true`


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper API by Temidayo.');
});

//  Get Product Details

app.get('/products/:productId', async (req, res) => {

    const { productId } = req.params;
    const { api_key } = req.query;
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`);
        res.json(JSON.parse(response));
        
    } catch (error) {
        res.json(error);
        
    }
} );


//  Get Product Reviews

app.get('/products/:productId/reviews', async (req, res) => {

    const { productId } = req.params;
    const { api_key } = req.params;
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`);
        res.json(JSON.parse(response));
        
    } catch (error) {
        res.json(error);
        
    }
} );

//  Get Product Offers

app.get('/products/:productId/offers', async (req, res) => {

    const { productId } = req.params;
    const { api_key } = req.params;
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        res.json(JSON.parse(response));
        
    } catch (error) {
        res.json(error);
        
    }
} );


//  Get Search results
app.get('/search/:searchQuery', async (req, res) => {

    const { searchQuery } = req.params;
    const { api_key } = req.params;
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`);
        res.json(JSON.parse(response));
        
    } catch (error) {
        res.json(error);
        
    }
} );




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

