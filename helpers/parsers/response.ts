import { parser } from '../ajv';
import { responseDataSchema } from '../schemas/response';

export const parseResponseData = parser(responseDataSchema);
