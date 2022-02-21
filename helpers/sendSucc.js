const sendSucc = (res, data, code = 200, status = 'nice') => {
  const testOn204 = code === 204 ? 200 : code;
  res.status(testOn204).json({
    code,
    status,
    data,
  });
};

module.exports = sendSucc;
