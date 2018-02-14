const R = require('ramda');
const { renderToString } = require('react-dom/server');
const dbg = require('debug')('routes:helpers');

const empty = body => R.isEmpty(body) || R.isNil(body);
const stringify = s => JSON.stringify(s).replace(/</g, '\\u003c');

// TODO isn't there already a renderPage?
// This might be a good time to:
// 1. Use an arguments object -- 5 arguments is probably too many...
// 2. Combine with "main" render.js function.
function renderPage(element, title, bundle = null, stylesheets = [], preloaded = null) {
  const links = stylesheets.map(
    name => `<link rel="stylesheet" href=/public/${name}.css />`
  );
  const html = renderToString(element);
  const script = (bundle !== null)
    ? `<script type="text/javascript" src="/static/${bundle}.bundle.js"></script>`
    : ''; 
  const state = (preloaded !== null)
    ? `<script type="text/javascript">
        window.__PRELOADED_STATE__ = ${stringify(preloaded)}
      </script>`
    : '';

  dbg("element %O", element);
  dbg("rendered: %O", html);
  
  dbg('preloaded %o', preloaded);
  dbg('state %o', state)

  return `<!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      ${links.join('\n')}
      <link rel="shortcut icon" href="/public/favicon.ico" />
    </head>
    <body>
      <div id="app">${html}</div>
      ${state}
      ${script}
    </body>
  </html>`;
}

const loggedOn = session =>
  typeof session.user !== undefined 
  && session.user.name !== null 
  && session.user.logged_in === true;

module.exports = { empty, renderPage, loggedOn };
