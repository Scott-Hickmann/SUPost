import { Model, model, models, Schema } from 'mongoose';

import { Item } from '../../types';

const DateString = Date as unknown as StringConstructor;

const schema = new Schema<Item>({
  createdAt: { type: DateString, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  email: { type: String, required: true },
  images: { type: [String], required: true }
});

// eslint-disable-next-line @typescript-eslint/ban-types
export const ItemModel: Model<Item, {}, {}> =
  models.Item ?? model<Item>('Item', schema);
