//// boilerplate
const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  // Send equiv. of :/public/login.html
  // This is duplicated from render()
  const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Login - McIlroy</title>
    <link rel="stylesheet" href="/public/index.css" />
    <link rel="stylesheet" href="/public/login.css" />
    <link rel="shortcut icon" href="/public/favicon.ico" />
  </head>
  <body>
    <div id="app"></div>
    <script type="text/javascript" src="/static/login.bundle.js"></script>
  </body>
</html>
`;

  // What is unique above?
  // - bundle name
  // - (opt.) css
  // - title
  // This could easily be a 3 parameter function.
  res.send(html);
  // next? --> only if error
});

module.exports = router;
