import express from 'express';
import qs from 'qs';
import renderPage from '../common/render';

const app = express();
const port = 3000;

app.use('/static', express.static('dist'));
app.get('/', (req, res) => {
  const params = qs.parse(req.query);
  const message = params.msg || "Redux";

  res.send(renderPage(message));
});

console.log(`Listening on port ${port}...`);
app.listen(port);
