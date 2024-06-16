import {
  ArgumentMetadata,
  NotImplementedException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { ValidatorPipe } from './requestValidator.pipe';

import * as Joi from 'joi';

describe('ValidatorPipe', () => {
  const schema = Joi.object().keys({ name: Joi.string().valid('valid_name') });
  const metadata = { metatype: 'any' } as any;

  it('should be defined', () => {
    const pipe = new ValidatorPipe(schema);
    expect(pipe).toBeDefined();
  });

  it('should be able to validate a request', () => {
    const pipe = new ValidatorPipe(schema);

    const value = { name: 'valid_name' };
    expect(pipe.transform(value, metadata as any)).toEqual(value);
  });

  it('should throw an error if the schema is missing', () => {
    const pipe = new ValidatorPipe(undefined as any);

    try {
      pipe.transform({}, {} as ArgumentMetadata);
    } catch (error) {
      expect(error.message).toEqual('Missing validation schema');
      expect(error).toBeInstanceOf(NotImplementedException);
    }
  });

  it('should throw an error if the metadata is missing', () => {
    const pipe = new ValidatorPipe(schema);

    try {
      pipe.transform({}, {} as ArgumentMetadata);
    } catch (error) {
      expect(error.message).toEqual('Missing validation schema');
      expect(error).toBeInstanceOf(NotImplementedException);
    }
  });

  it('should throw an error if the request is invalid', () => {
    const pipe = new ValidatorPipe(schema);

    try {
      pipe.transform({ name: 'invalid_name' }, metadata as ArgumentMetadata);
    } catch (error) {
      expect(error).toBeInstanceOf(UnprocessableEntityException);
      expect(error).toHaveProperty('message');
    }
  });
});
