const React = require('react');
const { renderToString } = require('react-dom/server');
const Dashboard = require('../../build/components/Dashboard');

// Render top level component without JSX
const renderUser = ({name, programs}) =>
  renderToString(React.createElement(Dashboard, {name, programs}, null));

const render___ = (results) => `
<!doctype html>
<html>
<head>
  <title>McIlroy - Dashboard</title>
  <link rel="stylesheet" href="public/index.css" />
</head>
<body>
  <h1>Programs</h1>
  ${ (results.length === 1) 
      ? renderUser(results[0])
      : "Error: Unique user not found" }
</body>
</html>
`;

// XXX: Untested
const error___ = (err) => `
${error.message}
<!doctype html>
<html>
<body>
  <h1>ERROR!</h1>
  <pre>
    ${err.message};
  </pre>
<body>
</html>
`;

module.exports = { render___, error___ };
