import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

// Queries
import osStatsQuery from './queries/OSStats';
import svxlinkQueries from './queries/Svxlink';
import fileQueries from './queries/Files';

// Mutations
import fileMutations from './mutations/Files';
import svxlinkMutations from './mutations/Svxlink';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      ...osStatsQuery,
      ...svxlinkQueries,
      ...fileQueries,
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      ...svxlinkMutations,
      ...fileMutations,
    },
  }),
});

export default schema;
