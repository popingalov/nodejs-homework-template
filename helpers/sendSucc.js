const sendSucc = (res, data, code = 200, status = 'nice') => {
  const testOn204 = code === 204 ? 200 : code;
  const { name, email, phone, favorite } = data;
  const user = { name, email, phone, favorite } && data;
  res.status(testOn204).json({
    code,
    status,
    user,
  });
};

module.exports = sendSucc;
