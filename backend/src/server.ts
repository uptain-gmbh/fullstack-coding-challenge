import app from './app';
import serverless from 'serverless-http';

app.listen(8080);
module.exports.handler = serverless(app);
