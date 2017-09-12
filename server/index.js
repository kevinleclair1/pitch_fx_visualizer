// Importing node modules
const express = require('express');
const morgan = require('morgan');
// Importing source files
const routes = require('./routes/main.routes.js');

const cors = require('cors');
// consts
const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(cors())
  app.use(morgan('dev'))
}
app.use('/api', routes);

// arrow functions
const server = app.listen(3001, () => {
	// destructuring
  const {address, port} = server.address();

  // string interpolation:
  console.log(`Example app listening at http://${address}:${port}`);
});
