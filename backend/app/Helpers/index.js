const crypto = use('crypto');
const Helpers = use('Helpers');

const strRandom = async (length = 40) => {
  let string = '';
  const len = string.length;

  if (len < length) {
    const size = length - len;
    const bytes = await crypto.randomBytes(size);
    const buffer = Buffer.from(bytes);

    string += buffer
      .toString('base64')
      .replace(/[^a-zA-Z0-9]/g, '')
      .substr(0, size);
  }

  return string;
};

const manageSingleUpload = async (file, path = null) => {
  path = path || Helpers.publicPath('uploads');

  const randomName = await strRandom(30);

  const filename = `${new Date().getTime()}-${randomName}.${file.subtype}`;

  await file.move(path, {
    name: filename,
  });

  return file;
};

const manageMultipleUploads = async (fileJar, path = null) => {
  path = path || Helpers.publicPath('uploads');

  const successes = [];
  const errors = [];

  Promise.all(
    fileJar.files.map(async file => {
      const randomName = await strRandom(30);

      const filename = `${new Date().getTime()}-${randomName}.${file.subtype}`;

      await file.move(path, {
        name: filename,
      });

      if (file.moved) {
        successes.push(file);
      } else {
        errors.push(file.error());
      }
    })
  );

  return { successes, errors };
};

module.exports = { strRandom, manageSingleUpload, manageMultipleUploads };
