import ReactDOMServer from 'react-dom/server';
import App from './app';

function render() {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Redux Universal</title>
    </head>
    <body>
      <div id="app">
        ${ ReactDOMServer.renderToString(App) }
      </div>
      <script src="static/bundle.js"></script>
    </body>
  </html>`;
}

module.exports = render;
//export default render; // doesn't seem to work with require() in server/index
