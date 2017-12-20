const R = require('ramda');

const empty = body => R.isEmpty(body) || R.isNil(body);

// TODO isn't there already a renderPage?
function renderPage(title, bundle, css = null) {
  const cssLink = (css === null) 
            ? ''  
            : `<link rel="stylesheet" href=/public/${css}.css />`;
  return `<!DOCTYPE html>
<html>
  <head>
    <title>${title}</title>
    <link rel="stylesheet" href="/public/index.css" />
    ${cssLink}
    <link rel="shortcut icon" href="/public/favicon.ico" />
  </head>
  <body>
    <div id="app"></div>
    <script type="text/javascript" src="/static/${bundle}.bundle.js"></script>
  </body>
</html>
`;
}

const loggedOn = s =>
  typeof s.user !== undefined && s.user !== null && s.logged_in === true;

module.exports = { empty, renderPage, loggedOn };
