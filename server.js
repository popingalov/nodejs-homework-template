const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const { DB_HOST, PORT = 4000 } = process.env;
// const dbb =
//   'mongodb+srv://popingalo:popingalov2083@cluster0.sgft6.mongodb.net/db-contacts?retryWrites=true&w=majority';
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
