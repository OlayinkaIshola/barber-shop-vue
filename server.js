const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');

const app = express();
const port = process.env.PORT || 8080;

// Handle client-side routing
app.use(history({
  // Exclude API routes if any
  rewrites: [
    { from: /^\/api\/.*$/, to: function(context) {
      return context.parsedUrl.pathname;
    }}
  ]
}));

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all other routes by serving index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
