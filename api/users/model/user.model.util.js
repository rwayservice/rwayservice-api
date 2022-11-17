import { model } from './user.schema';

const create = async (document) => {
  const createdDocument = await model.create(document);
  return createdDocument.toObject();
};

const get = ({ query, populate = '' }) =>
  model.find(query).populate(populate).lean().exec();

const update = ({ query, update, options }) => {
  const opts = Object.assign({}, { new: true, runValidators: true }, options);
  return model.updateOne(query, update, opts).lean().exec();
};

export default { create, get, update };
