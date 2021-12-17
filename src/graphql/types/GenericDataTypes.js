import {
  GraphQLString as StringType,
  GraphQLObjectType as ObjectType,
  GraphQLInputObjectType as InputObjectType,
} from 'graphql';

export const FileDataType = new ObjectType({ 
  name: 'FileDataType',
  description: 'Base64 Encoded File',
  fields: {
    file: { type: StringType },
  }
});

export const FileInputDataType = new InputObjectType({
  name: 'FileInputDataType',
  description: 'Base64 Input File',
  fields: {
    file: { type: StringType  },
  },
});
