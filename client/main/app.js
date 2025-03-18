const express = require('express');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const cron = require('node-cron');
const app = express();
const PORT = process.env.PORT || 3000;

// Define the generateSitemap function
function calculatePriority(creationDate) {
  const now = new Date();
  const postDate = new Date(creationDate);
  const daysOld = Math.floor((now - postDate) / (1000 * 60 * 60 * 24));
  
  return Math.max(1.0 - daysOld / 365, 0.5);
}

async function generateSitemap() {
  const fetch = (await import('node-fetch')).default; 
  const response = await fetch('https://api.simpliacoes.pt/posts');
  const posts = await response.json();

  const sitemapStream = new SitemapStream({ hostname: 'https://simpliacoes.pt' });

  const staticPages = [
    { url: '/', lastmod: new Date().toISOString(), priority: 1 },
    { url: '/produtos', lastmod: new Date().toISOString(), priority: 0.4 },
    { url: '/blog', lastmod: new Date().toISOString(), priority: 0.5 },
    { url: '/calculadora', lastmod: new Date().toISOString(), priority: 0.3 }
  ];

  staticPages.forEach(page => {
    sitemapStream.write(page);
  }); 

  posts.forEach(post => {
    const formattedTitle = post.Title.replace(/ /g, '-');
    const priority = calculatePriority(post.Creation);
    sitemapStream.write({ 
      url: `/post/${formattedTitle}`,
      lastmod: post.Creation, 
      priority 
    });
  });
  sitemapStream.end();

  const sitemap = await streamToPromise(sitemapStream).then(data => data.toString());

  createWriteStream(path.resolve(__dirname, 'public/sitemap.xml')).write(sitemap);
}

// Run the function when the server starts
generateSitemap().catch(err => console.error('Error generating sitemap:', err)).finally(console.log("New sitemap.xml deployed"));

// Schedule the sitemap generation every day at midnight
cron.schedule('0 0 * * *', () => {
  console.log('Running scheduled sitemap generation...');
  generateSitemap().catch(err => console.error('Error generating sitemap:', err));
});

// Serve static assets (JavaScript, CSS, images, etc.) for the React app
app.use(express.static(path.join(__dirname, 'public')));

// Handle all routes and serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});