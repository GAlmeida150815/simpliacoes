//Important requires
require('@dotenvx/dotenvx').config()

const express = require('express');
const cors = require('cors');
const path = require('path');

//API setup
const API = express();
const PORT = process.env.PORT || 4000;
API.use(cors());
API.use('/public', express.static(path.join(__dirname, 'public')));

//Google analytics
const analyticsRouter = require('./routes/analytics');
const { GoogleAuth } = require('google-auth-library');

async function authenticate() {
  const auth = new GoogleAuth();
  const authClient = await auth.getClient();
}

authenticate();

//Controller Requires
const postsRouter = require('./routes/posts');
const topicsRouter = require('./routes/topics');
const adminRouter = require('./routes/admin');
const imagesRouter = require('./routes/images');
const instagramRouter = require('./routes/instagram');


API.use('/posts', postsRouter);
API.use('/topics', topicsRouter);
API.use('/admin', adminRouter);
API.use('/images', imagesRouter);
API.use('/instagram', instagramRouter);

//Google analytics
API.use('/metrics', analyticsRouter);

API.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
