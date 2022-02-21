const HTTP_RESPONSES = {
  ok: {
    code: 200,
    status: 'ok',
  },
  created: {
    code: 201,
    status: 'created',
  },
  deleteEl: {
    code: 204,
    status: 'contact deleted',
  },
  badValid: {
    code: 400,
    status: error => `${error.details[0].message}`,
  },
  notFound: {
    code: 404,
    status: id => `Id ${id} not found`,
  },
  notThisV: {
    code: 307,
    status: 'This version is not ready yet!!! Check out the first version.',
  },
  serverError: {
    code: 500,
    status: 'Sorry, we are being DDoSed. Please call later.',
  },
};

module.exports = HTTP_RESPONSES;
