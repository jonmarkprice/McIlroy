const R = require('ramda');
const { renderToString } = require('react-dom/server');

const empty = body => R.isEmpty(body) || R.isNil(body);

// TODO isn't there already a renderPage?
function renderPage(element, title, bundle = null, stylesheets = []) {
  const links = stylesheets.map(
    name => `<link rel="stylesheet" href=/public/${name}.css />`
  );
  const html = renderToString(element);

  const script = (bundle !== null)
    ? `<script type="text/javascript" src="/static/${bundle}.bundle.js"></script>`
    : '';
  
  console.log("element %O", element);
  console.log("rendered: %O", html);

  return `<!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      ${links.join('\n')}
      <link rel="shortcut icon" href="/public/favicon.ico" />
    </head>
    <body>
      <div id="app">${html}</div>
      ${script}
    </body>
  </html>`;
}

const loggedOn = session =>
  typeof session.user !== undefined 
  && session.user.name !== null 
  && session.user.logged_in === true;

module.exports = { empty, renderPage, loggedOn };
