const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');
const CreateError = require('http-errors');
//
const { User } = require('../../models');
const { badAuth } = require('../../libs/http-responses');

const uploadAvatar = async (req, res, next) => {
  const { _id } = req.user;

  if (req.fileValidationError)
    throw new CreateError(badAuth.code, req.fileValidationError);
  //
  if (!req.file) throw new CreateError(badAuth.code, 'Avatar file is required');
  //
  const { path: tempUpload, filename } = req.file;
  try {
    const [extention] = filename.split('.').reverse();
    const newFileName = `${_id}.${extention}`;

    const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

    const resultUpload = path.join(avatarsDir, newFileName);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join('avatars', newFileName);

    await User.findByIdAndUpdate(_id, { avatarURL });

    await Jimp.read(resultUpload)
      .then(image => {
        return image.cover(250, 250).write(resultUpload);
      })
      .catch(err => next(err));

    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Avatar update',
      avatarURL,
    });
  } catch (err) {
    await fs.unlink(tempUpload);
  }
};

module.exports = uploadAvatar;
