const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

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

  const sitemap = await streamToPromise(sitemapStream).then((data) => data.toString());

  createWriteStream(path.resolve(__dirname, 'public/sitemap.xml')).write(sitemap);
}

module.exports = generateSitemap;
