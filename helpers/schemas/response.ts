import { JSONSchemaType } from 'ajv';

import { ResponseData } from '../../types';

export const responseDataSchema: JSONSchemaType<
  ResponseData<Record<string, unknown>>
> = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    data: { type: 'object', nullable: true },
    error: { type: 'string', nullable: true }
  },
  required: ['success'],
  additionalProperties: false
};
