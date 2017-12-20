const R = require('ramda');

const empty = body => R.isEmpty(body) || R.isNil(body);

// TODO isn't there already a renderPage?
function renderPage(title, bundle, stylesheets = []) {
  const links = stylesheets.map(
    name => `<link rel="stylesheet" href=/public/${name}.css />`
  );
  return `<!DOCTYPE html>
<html>
  <head>
    <title>${title}</title>
    ${links.join('\n')}
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
