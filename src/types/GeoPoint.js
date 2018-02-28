import { GraphQLObjectType, GraphQLFloat, } from 'graphql';
import { property } from 'lodash/fp';

export default new GraphQLObjectType({
  name: 'GeoPoint',
  fields: {
    latitude: {
      type: GraphQLFloat,
      resolve: property('latitude'),
    },
    longitude: {
      type: GraphQLFloat,
      resolve: property('longitude'),
    },
  },
});
