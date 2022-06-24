import { JSONSchemaType } from 'ajv';

import {
  AddItemRequestData,
  AddItemResponseData,
  Item,
  RemoveItemRequestData
} from '../../types';
import { idSchema } from './id';

export const itemSchema: JSONSchemaType<Item> = {
  type: 'object',
  properties: {
    id: { ...idSchema, nullable: true },
    createdAt: { type: 'string', format: 'date-time' },
    name: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number', minimum: 0.01 },
    email: { type: 'string' },
    images: { type: 'array', items: { type: 'string' } }
  },
  required: ['createdAt', 'name', 'description', 'price', 'email', 'images'],
  additionalProperties: false
};

export const addItemRequestDataSchema: JSONSchemaType<AddItemRequestData> = {
  type: 'object',
  properties: {
    item: itemSchema
  },
  required: ['item'],
  additionalProperties: false
};

export const addItemResponseDataSchema: JSONSchemaType<AddItemResponseData> = {
  type: 'object',
  properties: {
    item: itemSchema,
    imagesUpload: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          url: { type: 'string' },
          fields: {
            type: 'object',
            properties: {},
            additionalProperties: { type: 'string' },
            required: []
          }
        },
        required: ['url', 'fields'],
        additionalProperties: false
      }
    }
  },
  required: ['item', 'imagesUpload'],
  additionalProperties: false
};

export const removeItemRequestDataSchema: JSONSchemaType<RemoveItemRequestData> =
  {
    type: 'object',
    properties: {
      itemId: idSchema
    },
    required: ['itemId'],
    additionalProperties: false
  };
