import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

// Queries
import osStatsQuery from './queries/OSStats';
import svxlinkQueries from './queries/Svxlink';

// Mutations
import svxlinkMutations from './mutations/Svxlink';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      ...osStatsQuery,
      ...svxlinkQueries,
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      ...svxlinkMutations,
    },
  }),
});

export default schema;
