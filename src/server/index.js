import express from 'express';
import renderPage from '../common/render';

const app = express();
const port = 3000;

app.use('/static', express.static('dist'));
app.use('/public', express.static('public'));
app.get('/', (req, res) => {
  res.send(renderPage());
});

console.log(`Listening on port ${port}...`);
app.listen(port);
