const CreateError = require('http-errors');
const gravatar = require('gravatar');
//

const { User } = require('../../models');
const { сonflict, created } = require('../../libs/http-responses');
const { authSucc, sendEmail } = require('../../helpers/index');
const { v4 } = require('uuid');
//
const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new CreateError(сonflict.code, сonflict.status(email));
  }
  const verifyToken = v4();
  const avatarURL = gravatar.url(email);
  const newUser = new User({ email, avatarURL, verifyToken });

  newUser.setPassword(password);

  await newUser.save();
  //   authSucc(
  //     res,
  //     { user: { email, subscription: 'starter' } },
  //     created.code,
  //     created.status,
  //   );
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
    <<a href="http://localhost:3000/api/auth/users/verify/${newUser.verifyToken}" target="_blank">
    `,
  };

  await sendEmail(data);
  res.status(created.code).json({
    status: created.status,
    code: created.code,
    message: 'Підтвердіть пошту',
  });
};

module.exports = register;
