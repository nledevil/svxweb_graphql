import {
  GraphQLString as StringType,
  GraphQLObjectType as ObjectType,
  GraphQLInputObjectType as InputObjectType,
} from 'graphql';

const dataType = {
  headerName: { type: StringType },
  settingName: { type: StringType },
  settingValue: { type: StringType },
};

export const SvxlinkDataInputType = new InputObjectType({
  name: 'SvxlinkDataInputType',
  description: 'SvxlinkDataInputType',
  fields: {
    ...dataType,
  },
});

export const SvxlinkDataType = new ObjectType({
  name: 'SvxlinkDataType',
  description: 'SvxlinkDataType',
  fields: {
    ...dataType,
  },
});
