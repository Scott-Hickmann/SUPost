import { parser } from '../ajv';
import {
  addItemRequestDataSchema,
  addItemResponseDataSchema,
  removeItemRequestDataSchema
} from '../schemas/item';

export const parseAddItemRequestData = parser(addItemRequestDataSchema);
export const parseAddItemResponseData = parser(addItemResponseDataSchema);
export const parseRemoveItemRequestData = parser(removeItemRequestDataSchema);
