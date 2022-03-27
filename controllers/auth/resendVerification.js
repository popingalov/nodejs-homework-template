const { BadRequest } = require('http-errors');
const { User } = require('../../models');
const { sendEmail } = require('../../helpers');

const resendVerification = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email }, '_id email password verify');
  if (!user) {
    throw new BadRequest('Invalid email');
  }
  if (user.verify) {
    throw new BadRequest('Verification has already been passed');
  }
  const data = {
    to: email,
    subject: 'Підтвердження реєстрації на сайті',
    html: `
    <h1>Дякуємо за реєстрацію!</h1>
    <p>
      Ваш логін: ${email}
    </p>
    <p>
      Ваш пароль: *********
    </p>
    <p>
      Для підтвердження реєстрації перейдіть за посиланням:
    </p>
    <<a href="http://localhost:3000/api/auth/users/verify/${user.verify}" target="_blank">
    `,
  };
  await sendEmail(data);
  res.json({
    status: 'success',
    code: 200,
    message: 'Verification email sent',
  });
};

module.exports = resendVerification;
