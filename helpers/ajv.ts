import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv, ['date-time', 'email']);

export function parser<T>(
  schema: JSONSchemaType<T>
): (value: unknown) => T | undefined {
  const validate = ajv.compile(schema);
  return (value) => {
    if (validate(value)) {
      return value as T;
    } else {
      // eslint-disable-next-line no-console
      console.error(value, validate.errors);
    }
  };
}
