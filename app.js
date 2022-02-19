const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const versionControl = require('./routes/api/versionController');

// const timeOut = [
//   [9, 10],
//   [15, 17],
//   [15, 16],
//   [14, 16],
// ];

// const startEnd = [9, 18];

// function workTime(arryTime, time) {
//   const arry = {};

//   arryTime.forEach(([start, end]) => {
//     arry[start] = arry[start] > end ? arry[start] : end;
//   });

//   const od = Object.keys(arry);
//   const ddo = Object.values(arry);

//   if (od[0] == time[0] && ddo[0] == time[1]) return [];

//   const result = ddo.reduce((acc, el, i) => {
//     if (el < (od[i + 1] || time[1])) {
//       acc.push([el, Number(od[i + 1]) || time[1]]);
//     }

//     return acc;
//   }, []);

//   if (od[0] > time[0]) result.unshift([time[0], Number(od[0])]);

//   return result;
// }
// console.log(workTime(timeOut, startEnd));

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api', versionControl);

const { notFound, serverError } = require('./libs/http-responses');

app.use((req, res) => {
  res.status(notFound.code).json({ message: notFound.status });
});

app.use((err, req, res, next) => {
  const { status = serverError.code, message = serverError.status } = err;

  res.status(status).json(message);
});

module.exports = app;
