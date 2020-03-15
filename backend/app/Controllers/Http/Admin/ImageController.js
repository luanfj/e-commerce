/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Image = use('App/Models/Image');

const { manageSingleUpload, manageMultipleUploads } = use('App/Helpers');
const Helpers = use('Helpers');
const fs = use('fs');

class ImageController {
  async index({ response, pagination }) {
    const images = await Image.query()
      .orderBy('id', 'DESC')
      .paginate(pagination.page, pagination.limit);

    return response.send(images);
  }

  async store({ request, response }) {
    try {
      const fileJar = request.file('images', {
        types: ['image'],
        size: '2mb',
      });

      const images = [];

      if (!fileJar.files) {
        const file = await manageSingleUpload(fileJar);

        if (file.moved()) {
          const image = await Image.create({
            path: file.fileName,
            size: file.size,
            original_name: file.clientName,
            extension: file.subtype,
          });

          images.push(image);

          return response.status(201).send({ successes: images, errors: {} });
        }

        return response
          .status(400)
          .send({ message: 'This image could not be processed.' });
      }

      const files = await manageMultipleUploads(fileJar);

      await Promise.all(
        files.successes.map(async file => {
          const image = await Image.create({
            path: file.fileName,
            size: file.size,
            original_name: file.clientName,
            extension: file.subtype,
          });

          images.push(image);
        })
      );

      return response
        .status(201)
        .send({ successes: images, errors: files.errors });
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Error processing your request.' });
    }
  }

  async show({ params: { id }, response }) {
    const image = await Image.findOrFail(id);

    return response.send(image);
  }

  async update({ params: { id }, request, response }) {
    const image = await Image.findOrFail(id);

    try {
      const imageName = request.only(['original_name']);

      image.merge(imageName);

      await image.save();

      return response.send(image);
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Error processing your request.' });
    }
  }

  async destroy({ params: { id }, response }) {
    const image = await Image.findOrFail(id);

    try {
      const filepath = Helpers.publicPath(`uploads/${image.path}`);

      await fs.unlink(filepath, async err => {
        if (!err) await image.delete();
      });

      return response.status(204).send();
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Error processing your request.' });
    }
  }
}

module.exports = ImageController;
