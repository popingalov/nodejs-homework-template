const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const { DB_HOST, PORT = 4000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log('Database tru and we listen port 4000');
    }),
  )
  .catch(error => {
    console.log('Ой-йо-йой', error.message);
    process.exit(1);
  });
